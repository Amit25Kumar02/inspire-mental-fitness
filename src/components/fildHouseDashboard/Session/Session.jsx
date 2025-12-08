import React, { useEffect, useState } from "react";
import GenerateLink from "./GenerateLink/GenerateLink";
import Sessions from "./Sessions/Sessions";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  createPaymentIntent,
  getAllSessions,
} from "../../../services/CounselingTicketRaising";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);
const Session = () => {
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
          loadPaymentIntent={loadPaymentIntent}
        />
      </Elements>
      <Sessions userSessions={userSessions} />
    </div>
  );
};

export default Session;
