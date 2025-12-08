import React, { useEffect, useState } from "react";
import "./AimTrainer.css";
import { getAimTrainerDailyLeaderboard } from "../../../../../services/AimTrainerService";

// Avatar Imports
import maleAvatar from "../../../../../assets/avatars/3d-male-avatar.jpg";
import Avatar1 from "../../../../../assets/avatars/handsome-smiling-man.jpg";
import Avatar2 from "../../../../../assets/avatars/stylish-spectacles.png";
import Avatar3 from "../../../../../assets/avatars/smiling-redhaired-boy.jpg";

const avatarList = [maleAvatar, Avatar1, Avatar2, Avatar3];

// Dummy data for testing
const dummyLeaderboard = [
  { userId: "1", rank: 1, username: "Player1", bestTime: 14.5, points: 120 },
  { userId: "2", rank: 2, username: "Player2", bestTime: 15.2, points: 110 },
  { userId: "3", rank: 3, username: "Player3", bestTime: 17.0, points: 95 },
  { userId: "4", rank: 4, username: "Player4", bestTime: 19.0, points: 85 },
  { userId: "5", rank: 5, username: "Player5", bestTime: 21.0, points: 80 },
];

const AimTrainerDailyLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const assignRandomAvatar = (data) => {
    return data.map((item) => ({
      ...item,
      avatarUrl: item.avatarUrl || avatarList[Math.floor(Math.random() * avatarList.length)],
    }));
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await getAimTrainerDailyLeaderboard();
        if (res?.leaderboard?.length > 0) {
          setLeaderboard(assignRandomAvatar(res.leaderboard));
        } else {
          //  Using dummy data when API gives empty or failed response
          setLeaderboard(assignRandomAvatar(dummyLeaderboard));
        }
      } catch (err) {
        console.error("Error fetching Aim Trainer leaderboard:", err);
         setLeaderboard(assignRandomAvatar(dummyLeaderboard));
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="mt-5">
      <h3 className="mb-4 ff-gotham-bold">Aim Trainer </h3>
      <div className="table-responsive mx-0 shadow-sm p-3 mb-5 bg-light rounded">
        <table className="table text-center mb-0 leaderboard-table">
          <thead>
            <tr className="leaderboard-header ff-gotham-normal">
              <th className="text-center">Rank</th>
              <th className="text-center">Username</th>
              <th className="text-center">Score</th>
              <th className="text-center">Points</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-3">
                  Loading...
                </td>
              </tr>
            ) : leaderboard.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-3 ff-gotham-normal">
                  No records for today. Be the first to play! 🚀
                </td>
              </tr>
            ) : (
              leaderboard.map((player) => (
                <tr
                  key={player.userId}
                  className="leaderboard-row ff-gotham-normal"
                >
                  <td className="ff-gotham-bold">{player.rank}</td>
                  <td className="d-flex align-items-start justify-content-start fw-bold gap-2">
                    <img
                      src={player.avatarUrl}
                      alt="avatar"
                      className="leaderboard-avatar"
                    />
                    {player.username}</td>
                  <td>{player.score}</td>
                  <td>{player.points}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AimTrainerDailyLeaderboard;
