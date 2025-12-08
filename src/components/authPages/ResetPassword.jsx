import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../authPages/auth.css";
import { resetPassword } from "../../services/PasswordServices";
import AuthHeader from "./AuthHeader";
import ice_icon from "../../assets/image/svg/ice_icon.svg";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", otp: "", newPassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErrors({ email: "", otp: "", newPassword: "" });

    let hasErrors = false;

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      hasErrors = true;
    }
    if (!otp) {
      setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
      hasErrors = true;
    }
    if (!newPassword) {
      setErrors((prev) => ({
        ...prev,
        newPassword: "New password is required",
      }));
      hasErrors = true;
    }

    if (!hasErrors) {
      try {
        const response = await resetPassword({ email, otp, newPassword });
        if (response.status === "success") {
          toast.success("Password reset successfully!", {
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate("/sign-in");
          }, 2000);
        } else {
          toast.error(`${response.message}`);
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        toast.error("Failed to reset password. Please try again.");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex min-vh-100 flex-column">
        <AuthHeader />
        <div className="d-flex py-4 flex-column flex-grow-1 justify-content-center align-items-center">
          <div className="custom_width">
            <h4 className="fw-bold text-center ff-gotham-bold fs_24 color_black2">
              Reset Your Password
            </h4>
            <div className="mt-4">
              {/* Email Field */}
              <label className="ff-gotham-bold fs_14 mb-0" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                className="w-100 mt-2 custom_border ff-gotham-light fs_14 py-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-danger ff-gotham-normal fs_12 mb-0">
                  {errors.email}
                </p>
              )}

              {/* OTP Field */}
              <label className="ff-gotham-bold fs_14 mt-4 mb-0" htmlFor="otp">
                OTP
              </label>
              <input
                type="text"
                className="w-100 mt-2 custom_border ff-gotham-light fs_14 py-2"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {errors.otp && (
                <p className="text-danger ff-gotham-normal fs_12 mb-0">
                  {errors.otp}
                </p>
              )}

              {/* New Password Field */}
              <label
                className="ff-gotham-bold fs_14 mt-4 mb-0"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-100 mt-2 custom_border ff-gotham-light fs_14 py-2"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <img
                  className="position-absolute top-0 end-0 pt-4 cursor-pointer pe-3"
                  src={ice_icon}
                  alt="Toggle visibility"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              {errors.newPassword && (
                <p className="text-danger ff-gotham-normal fs_12 mb-0">
                  {errors.newPassword}
                </p>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                style={{
                  letterSpacing: "0.50px",
                  height: "42px",
                  borderRadius: "8.66px",
                }}
                className="w-100 bg_theme ff-gotham-bold text-white border-0 mt-4"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
