import React, { useEffect, useState } from "react";
import "./AllSongs.css";
import { getAllSongs } from "../../../../services/TopSongsService";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import playIcon from "../../../../assets/image/svg/playicon.svg";
import coachHeadPhone from "../../../../assets/image/svg/coachHeadphoneIcon.svg";
import pauseIcon from "../../../../assets/image/svg/pauseIcon.svg";
import nextIcon from "../../../../assets/image/svg/nextIcon.svg"; // Add appropriate icons
import backIcon from "../../../../assets/image/svg/backIcon.svg";
import speakerIcon from "../../../../assets/image/svg/speakerIcon.svg";
import muteIcon from "../../../../assets/image/svg/muteIcon.svg";
import headPhone from "../../../../assets/image/svg/headphoneIcon.svg";

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [isMuted, setIsMuted] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchSongs = async () => {
      const allSongs = await getAllSongs();
      setSongs(allSongs);
    };

    fetchSongs();

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const playSong = (index) => {
    if (currentSongIndex === index) {
      audio.paused ? audio.play() : audio.pause();
    } else {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(songs[index].songFile);
      setAudio(newAudio);
      setCurrentSongIndex(index);

      newAudio.addEventListener("loadedmetadata", () => {
        setDuration(formatTime(newAudio.duration));
      });

      newAudio.play();
    }
  };

  const handleNext = () => {
    if (songs.length === 0) return;
    const nextIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextIndex);
  };

  const handlePrevious = () => {
    if (songs.length === 0) return;
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(prevIndex);
  };

  const handleAudioTimeUpdate = () => {
    if (audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
      setCurrentTime(formatTime(audio.currentTime));
    }
  };

  const handleSliderChange = (e) => {
    if (audio.duration) {
      const newTime = (e.target.value / 100) * audio.duration;
      audio.currentTime = newTime;
      setProgress(e.target.value);
    }
  };

  const toggleMute = () => {
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  useEffect(() => {
    if (audio) {
      audio.addEventListener("timeupdate", handleAudioTimeUpdate);
      return () => {
        audio.removeEventListener("timeupdate", handleAudioTimeUpdate);
      };
    }
  }, [audio]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.role) {
      setUserRole(userData.role);
    }
  }, []);

  return (
    <div className="all-songs">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="ff-gotham-bold mb-0 mt-3">All Songs</h2>
      </div>
      <Row gutter={[16, 16]}>
        {songs.map((song, index) => (
          <Col className="px-2" sm={6} key={song._id}>
            <li className="song-item px-3">
              <div className="song-info">
                <div className="song-icon">
                  {userRole === "Coach" ? (
                    <img
                      style={{ width: "27px", height: "27px" }}
                      src={coachHeadPhone}
                      alt="icon"
                    />
                  ) : (
                    <img
                      style={{ width: "27px", height: "27px" }}
                      src={headPhone}
                      alt="icon"
                    />
                  )}
                </div>
                <div className="song-details">
                  <p className="song-title text-capitalize mb-0">{song.name}</p>
                  <p className="song-artist mb-0 text-capitalize">
                    {song.genre}
                  </p>
                </div>
              </div>
              <button
                className="play-pause-btn"
                onClick={() => playSong(index)}
              >
                {currentSongIndex === index && !audio.paused ? (
                  <img src={pauseIcon} alt="Pause" />
                ) : (
                  <img src={playIcon} alt="Play" />
                )}
              </button>
            </li>
          </Col>
        ))}
      </Row>
      {currentSongIndex !== null && (
        <div className="song-info-div">
          {/* Slider and Time */}
          <div className="song-controls d-flex align-items-center justify-content-between">
            {/* Left: Song name */}
            <div className="song-details">
              <p className="song-title text-capitalize mb-0 ff-gotham-bold fs_18">
                {songs[currentSongIndex]?.name}
              </p>
            </div>
            {/* Center: Controls */}
            <div className="control-buttons d-flex align-items-center">
              <button className="back-nex-button" onClick={handlePrevious}>
                <img src={backIcon} alt="Previous" />
              </button>
              <button
                className="play-pause-btn"
                onClick={() => playSong(currentSongIndex)}
              >
                {audio.paused ? (
                  <img src={playIcon} alt="Play" />
                ) : (
                  <img src={pauseIcon} alt="Pause" />
                )}
              </button>
              <button className="back-nex-button" onClick={handleNext}>
                <img src={nextIcon} alt="Next" />
              </button>
            </div>
            {/* Right: Mute/Unmute */}
            <button className="mute-unmute-button" onClick={toggleMute}>
              <img
                src={isMuted ? muteIcon : speakerIcon}
                alt={isMuted ? "Unmute" : "Mute"}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSongs;
