import React, { useEffect, useState } from "react";
import { getFocusFieldWeeklyLeaderBoard } from "../../../../services/FocusFieldLeaderboardService";
import "bootstrap/dist/css/bootstrap.min.css";

import maleAvatar from "../../../../assets/avatars/3d-male-avatar.jpg";
import Avatar1 from "../../../../assets/avatars/handsome-smiling-man.jpg";
import Avatar2 from "../../../../assets/avatars/stylish-spectacles.png";
import Avatar3 from "../../../../assets/avatars/smiling-redhaired-boy.jpg";

import FirstMedal from "../../../../assets/image/png/1st.png";
import SecondMedal from "../../../../assets/image/png/2nd.png";
import ThirdMedal from "../../../../assets/image/png/3rd.png";


import "./FocusField.css";

const avatarList = [maleAvatar, Avatar1, Avatar2, Avatar3];

const FocusFieldWeeklyLeaderBoard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const assignRandomAvatar = (data) =>
    data.map((item) => ({
      ...item,
      avatarUrl: item.avatarUrl || avatarList[Math.floor(Math.random() * avatarList.length)],
    }));

 const medalImages = {
    1: FirstMedal,
    2: SecondMedal,
    3: ThirdMedal,
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await getFocusFieldWeeklyLeaderBoard();
        const leaderboardData = res?.data?.leaderboard || res?.leaderboard;

        if (leaderboardData) {
          const updatedPlayers = assignRandomAvatar(leaderboardData).map((player) => ({
            ...player,
            totalPoints: player.totalPoints || 0,
          }));


          // Sort by highest totalPoints
          updatedPlayers.sort((a, b) => b.totalPoints - a.totalPoints);

          setPlayers(updatedPlayers);
        }
      } catch (err) {
        console.error("Error loading weekly leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
      <div className="leaderboard-wrapper">
      <div className="leaderboard-container">
        <table className="leaderboard-table">
          <thead>
            <tr className="leaderboard-table-row">
              <th className="px-2">Rank</th>
              <th>Player</th>
              <th>Team</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, idx) => (
              <tr key={player.userId + idx}>
                 <td className="points-icon-card">
                  <span>{idx + 1}</span>
                  {medalImages[idx + 1] && (
                    <img
                      src={medalImages[idx + 1]}
                      alt="medal"
                      className="points-icon-card-img"
                    />
                  )}
                </td>
                <td className="player-info">
                  <img src={player.avatarUrl} alt="avatar" className="avatar-img" />
                  <span>{player.username}</span>
                </td>
                <td>{player.teamName}</td>
                  <td className="points">
                  {player.totalPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FocusFieldWeeklyLeaderBoard;
