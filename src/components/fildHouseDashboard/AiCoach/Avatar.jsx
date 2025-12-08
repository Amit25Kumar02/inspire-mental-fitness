import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./AiCoach.css";

const apiConfig = {
  key: "cGZic3BvcnRzQGdtYWlsLmNvbQ:LWF2x-aB-y7l_6EBNtmvD",
  url: "https://api.d-id.com",
};

const RTCPeerConnectionClass =
  window.RTCPeerConnection ||
  window.webkitRTCPeerConnection ||
  window.mozRTCPeerConnection;

const fetchWithRetry = async (url, options = {}, retries = 3) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok && retries > 0) {
      await new Promise((r) => setTimeout(r, (Math.random() + 1) * 800));
      return fetchWithRetry(url, options, retries - 1);
    }
    return res;
  } catch (err) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, (Math.random() + 1) * 800));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw err;
  }
};

const Avatar = forwardRef((props, ref) => {
  const agentId = props?.agentData?.agent_id;
  const rawAiResponse = props?.aiResponse || "";

  const aiResponse = rawAiResponse
    .replace(/ChatType:\s*\w+\s*/i, "")
    .replace(/<[^>]*>/g, "")
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\u24C2|\uFE0F|\u200D|\u23CF|\u23E9|\u231A|\u3030|\u303D|\u3297|\u3299|\u25AA|\u25AB|\u25B6|\u25C0|\u25FB|\u25FC|\u25FD|\u25FE|\u2600-\u26FF|\u2B05|\u2B06|\u2B07|\u2B1B|\u2B1C|\u2B50|\u2B55|\u2934|\u2935|\u27A1|\u2194|\u2195|\u2196|\u2197|\u2198|\u2199)/g,
      ""
    )
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const coachImage = props?.agentData?.image;

  const videoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const dataChannelRef = useRef(null);
  const streamIdRef = useRef(null);
  const sessionIdRef = useRef(null);

  const [isConnected, setIsConnected] = useState(false);
  const [hideImage, setHideImage] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useImperativeHandle(ref, () => ({
    triggerSpeak: async (text) => {
      if (isConnected) {
        await speak(text);
      }
    },
    isConnected: () => isConnected,
  }));

  // cleanup
  useEffect(() => {
    return () => {
      try {
        peerConnectionRef.current?.close();
      } catch (error) {
        console.error("Cleanup error:", error);
      }
    };
  }, []);

  useEffect(() => {
    if (agentId && !isInitialized && !connectionError) {
      initializeConnection();
    }
  }, [agentId, isInitialized, connectionError]);

  useEffect(() => {
    if (isConnected && aiResponse) {
      speak(aiResponse);
    }
  }, [aiResponse, isConnected]);

  const initializeConnection = async () => {
    try {
      setConnectionError(false);
      await connect();
      setIsInitialized(true);
    } catch (error) {
      console.error("Initialization error:", error);
      setConnectionError(true);
    }
  };

  const handleVideoPlay = () => {
    setShowVideo(true);
    setHideImage(true); // hide only when video confirmed
  };

  const handleVideoError = () => {
    setConnectionError(true);
    setShowVideo(false);
    setHideImage(false); // fallback to image
  };

  const createPeerConnection = (iceServers = []) => {
    const pc = new RTCPeerConnectionClass({ iceServers });
    peerConnectionRef.current = pc;

    const remoteStream = new MediaStream();
    if (videoRef.current) {
      videoRef.current.srcObject = remoteStream;
      videoRef.current.playsInline = true;
      videoRef.current.autoplay = true;
      videoRef.current.muted = false;
    }

    pc.ontrack = (event) => {
      event.streams?.[0]?.getTracks()?.forEach((t) => remoteStream.addTrack(t));
      try {
        videoRef.current?.play().catch(() => {});
      } catch {}
    };

    pc.onconnectionstatechange = () => {
      const state = pc.connectionState;
      if (state === "connected") {
        setIsConnected(true);
      }
      if (["disconnected", "closed", "failed"].includes(state)) {
        setIsConnected(false);
        setConnectionError(true);
        setShowVideo(false);
        setHideImage(false);
      }
    };

    const dc = pc.createDataChannel("JanusDataChannel");
    dc.onopen = () => console.log("Data channel open");
    dc.onclose = () => console.log("Data channel closed");
    dataChannelRef.current = dc;

    return pc;
  };

  const connect = async () => {
    if (!apiConfig || !agentId)
      throw new Error("API config or agent ID missing");

    try {
      const resAgent = await fetch(`${apiConfig.url}/agents/${agentId}`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${apiConfig.key.replace(/^Basic\s*/i, "")}`,
          "Content-Type": "application/json",
        },
      });
      if (!resAgent.ok)
        throw new Error("Failed to fetch agent info: " + resAgent.status);

      const streamOptions = { compatibility_mode: "on", fluent: true };
      const resStream = await fetchWithRetry(
        `${apiConfig.url}/agents/${agentId}/streams`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${apiConfig.key.replace(/^Basic\s*/i, "")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(streamOptions),
        }
      );
      if (!resStream.ok)
        throw new Error("Failed to create stream: " + resStream.status);

      const streamJson = await resStream.json();
      const { id: streamId, session_id, offer, ice_servers } = streamJson;
      streamIdRef.current = streamId;
      sessionIdRef.current = session_id;

      const pc = createPeerConnection(ice_servers || []);
      let remoteDesc = offer;
      if (typeof offer === "string") {
        remoteDesc = { type: "offer", sdp: offer };
      }

      try {
        await pc.setRemoteDescription(remoteDesc);
      } catch (err) {
        const sdp = offer.sdp || (typeof offer === "string" ? offer : "");
        await pc.setRemoteDescription({ type: "offer", sdp });
      }

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      await fetch(
        `${apiConfig.url}/agents/${agentId}/streams/${streamId}/sdp`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${apiConfig.key.replace(/^Basic\s*/i, "")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answer, session_id }),
        }
      );

      setIsConnected(true);
      return true;
    } catch (err) {
      console.error("Connection error:", err);
      throw err;
    }
  };

  const speak = async (text) => {
    if (!apiConfig || !streamIdRef.current || !sessionIdRef.current || !text) {
      console.error("Cannot speak: missing required parameters");
      return;
    }

    try {
      const response = await fetchWithRetry(
        `${apiConfig.url}/agents/${agentId}/streams/${streamIdRef.current}`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${apiConfig.key.replace(/^Basic\s*/i, "")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            script: { type: "text", input: text },
            session_id: sessionIdRef.current,
          }),
        }
      );
      if (response.status === 200) {
        props.onSpeakStart?.(text);
        setShowVideo(true); // show video container
      }
    } catch (err) {
      console.error("Speak error:", err);
    }
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-lg h-100 position-relative"
      style={{ minHeight: "490px", maxHeight: "490px" }}
    >
      {/* Always show image until video plays */}
      <img
        src={coachImage}
        alt="Coach Avatar"
        className="position-absolute"
        style={{
          zIndex: 1,
          display: hideImage ? "none" : "block",
          height: "80%",
          objectFit: "cover",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Video overlays once playing */}
      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted
        className="position-absolute top-0 start-0 w-100 h-100 object-cover"
        style={{ zIndex: 2, display: showVideo ? "block" : "none" }}
        onLoadedData={handleVideoPlay}
        onPlaying={handleVideoPlay}
        onError={handleVideoError}
      />
    </div>
  );
});

Avatar.displayName = "Avatar";
export default Avatar;
