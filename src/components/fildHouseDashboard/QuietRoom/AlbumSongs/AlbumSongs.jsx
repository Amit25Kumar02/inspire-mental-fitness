import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./AlbumSongs.css";
import { getAlbumsSongs } from "../../../../services/AllAlbumsService";
import { getAllAlbums } from "../../../../services/AllAlbumsService";
import playIcon from "../../../../assets/image/svg/playicon.svg";
import pauseIcon from "../../../../assets/image/svg/pauseIcon.svg";

const AlbumSongs = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [songs, setSongs] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);
  const [currentSong, setCurrentSong] = useState(null); // Track the current song
  const [isPlaying, setIsPlaying] = useState(false); // Track if the song is playing
  const [audio, setAudio] = useState(new Audio()); // Create an audio object

  // Play or pause the song
  const handlePlayPause = (song) => {
    if (currentSong && currentSong._id === song._id) {
      // If the same song is clicked, toggle play/pause
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      // If a new song is clicked, stop the current one and play the new one
      if (currentSong) {
        audio.pause(); // Pause the current song if there's another one
      }
      const newAudio = new Audio(song.songFile);
      newAudio.play(); // Play the new song
      newAudio.onended = () => {
        setIsPlaying(false); // Reset state when song ends
        setCurrentSong(null); // Reset current song
      };
      setAudio(newAudio);
      setCurrentSong(song);
      setIsPlaying(true); // Update isPlaying to true
    }
  };

  useEffect(() => {
    const fetchAlbumSongs = async () => {
      const data = await getAlbumsSongs(id);
      if (data) {
        // Check if the 'songs' key exists and has content
        if (data.songs && data.songs.length > 0) {
          setSongs(data.songs); // Set the songs if they exist
        } else {
          setSongs([]); // No songs found, set empty array
        }
        setAlbumData(data.album); // Set album info regardless of song existence
      }
    };

    const fetchAllAlbums = async () => {
      const allData = await getAllAlbums();
      setAllAlbums(allData);
    };

    fetchAlbumSongs();
    fetchAllAlbums();
  }, [id]);

  if (!albumData) {
    return <div>Loading...</div>; // This will display until the album info is fetched
  }

  return (
    <div className="album-container">
      <div className="album-content">
        <div className="album-header">
          <div className="album-cover">
            <img src={albumData.coverImage} alt="Album Artwork" />
          </div>
          <div className="album-info">
            <h2 className="ff-gotham-bold text-capitalize">{albumData.name}</h2>
          </div>
        </div>

        <h2 className="ff-gotham-bold">Audio</h2>

        {/* Check if no songs found */}
        {songs.length === 0 ? (
          <p>No songs found in this album.</p>
        ) : (
          <div className="song-list d-flex align-items-center justify-content-between gap-3 flex-wrap">
            {songs.map((song) => (
              <div className="song-item px-3 w-100" key={song._id}>
                <span className="song-title ff-gotham-medium">{song.name}</span>

                {/* Play/Pause Button with Font Awesome Icons */}
                <button
                  className="play-pause-btn"
                  onClick={() => handlePlayPause(song)}
                  style={{
                    border: `2px solid ${
                      currentSong && currentSong._id === song._id
                        ? "green"
                        : "gray"
                    }`,
                    background: "transparent", // Remove background styling
                  }}
                >
                  {currentSong && currentSong._id === song._id && isPlaying ? (
                    <img src={pauseIcon} alt="" />
                  ) : (
                    <img src={playIcon} alt="" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="all-albums">
        <h3 className="ff-gotham-medium">All Albums</h3>
        <div className="d-flex align-items-center flex-wrap gap-2">
          {allAlbums.map((album) => (
            <Link
              to={`/fieldhouse-dashboard/album/${album?._id}`}
              key={album._id}
            >
              <div className="album-item d-flex flex-column">
                <img
                  src={album.coverImage}
                  alt={album.name}
                  className="album-thumbnail"
                />
                <p className="ff-gotham-normal fs_18">{album.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumSongs;
