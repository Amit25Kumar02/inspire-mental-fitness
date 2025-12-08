import React, { useEffect, useState } from "react";
import boxImg from "../../../../assets/image/png/recoverysilhouette.png";
import { useNavigate } from "react-router-dom";

const SongSlider = () => {
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.role) {
      setUserRole(userData.role);
    }
  }, []);
  return (
    <div>
      <div
        className={`${
          userRole === "Coach" ? "bg_blue" : "bg_theme"
        }  bg_image p-sm-5 px-3 py-4 rounded-4 position-relative overflow-hidden`}
      >
        <img className="box-img w-25" src={boxImg} alt="player" />
        <div
          style={{ height: "150px" }}
          className="position-relative z-1 d-flex flex-column justify-content-between"
        >
          <h2 className="fs_50 ff-gotham-bold text-white mb-0">
            Welcome to the Recovery Room!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SongSlider;
