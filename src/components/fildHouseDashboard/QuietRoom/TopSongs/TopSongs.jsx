import React, { useState, useEffect } from "react";
import "./TopSongs.css";
import headPhone from "../../../../assets/image/svg/headphoneIcon.svg";
import coachHeadPhone from "../../../../assets/image/svg/coachHeadphoneIcon.svg";
import { getAllTopSongs } from "../../../../services/TopSongsService";
import playIcon from "../../../../assets/image/svg/playicon.svg";
import pauseIcon from "../../../../assets/image/svg/pauseIcon.svg";
import nextIcon from "../../../../assets/image/svg/nextIcon.svg"; // Add appropriate icons
import backIcon from "../../../../assets/image/svg/backIcon.svg";
import speakerIcon from "../../../../assets/image/svg/speakerIcon.svg";
import muteIcon from "../../../../assets/image/svg/muteIcon.svg";
import { Link } from "react-router-dom";

const TopSongs = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [isMuted, setIsMuted] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchTopSongs = async () => {
      const topSongs = await getAllTopSongs();
      setSongs(topSongs);
    };

    fetchTopSongs();

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.role) {
      setUserRole(userData.role);
    }
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
    const nextIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(prevIndex);
  };

  const handleAudioTimeUpdate = () => {
    setProgress((audio.currentTime / audio.duration) * 100);
    setCurrentTime(formatTime(audio.currentTime));
  };

  const handleSliderChange = (e) => {
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(e.target.value);
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

  return (
    <div className="top-songs">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="ff-gotham-bold mb-0">Top Audio</h2>
        <Link
          className={`ff-gotham-bold ${
            userRole === "Coach" ? "color_blue" : "color_theme"
          }  text-decoration-underline`}
          to={
            userRole === "Coach"
              ? "/coaching-dashboard/songs"
              : "/fieldhouse-dashboard/songs"
          }
        >
          View all
        </Link>
      </div>
      <ul>
        {songs.map((song, index) => (
          <li key={song._id} className="song-item px-3">
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
              </div>
            </div>
            <button className="play-pause-btn" onClick={() => playSong(index)}>
              {currentSongIndex === index && !audio.paused ? (
                <img src={pauseIcon} alt="Pause" />
              ) : (
                <img src={playIcon} alt="Play" />
              )}
            </button>
          </li>
        ))}
      </ul>
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

export default TopSongs;
