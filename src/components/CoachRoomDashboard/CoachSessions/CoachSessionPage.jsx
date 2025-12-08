import React, { useEffect, useState } from "react";
import CoachSessions from "./CoachSessions.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  createPaymentIntent,
  getAllSessions,
} from "../../../services/CounselingTicketRaising";
import GenerateLink from "../../fildHouseDashboard/Session/GenerateLink/GenerateLink";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const CoachSessionPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [userSessions, setUserSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSessions = async () => {
    const response = await getAllSessions();
    setUserSessions(response?.tickets);
  };

  const loadPaymentIntent = async () => {
    const { clientSecret } = await createPaymentIntent(100 * 100);
    setClientSecret(clientSecret);
  };

  useEffect(() => {
    loadPaymentIntent();
    getSessions();
  }, []);

  if (!clientSecret) {
    return (
      <div
        style={{
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="ff-gotham-medium fs_18"
      >
        Loading...
      </div>
    );
  }

  const options = { clientSecret };

  return (
    <div className="pt-4">
      <Elements stripe={stripePromise} options={options}>
        <GenerateLink
          getSessions={getSessions}
          role="coach"
          loadPaymentIntent={loadPaymentIntent}
        />
      </Elements>
      <CoachSessions userSessions={userSessions} />
    </div>
  );
};

export default CoachSessionPage;
