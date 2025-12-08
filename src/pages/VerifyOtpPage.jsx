import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import OtpVerification from "../components/authPages/OtpVerification";
import { createPaymentIntentForUserSignup } from "../services/CounselingTicketRaising";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error Boundary Caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>Something went wrong while loading the Stripe component.</div>
      );
    }
    return this.props.children;
  }
}

const VerifyOtpPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const loadPaymentIntent = async () => {
      try {
        const response = await createPaymentIntentForUserSignup(50 * 100);

        console.log("API Response:", response);

        if (response?.clientSecret) {
          setClientSecret(response.clientSecret);
        } else {
          console.error("No clientSecret found in response.");
          setClientSecret(null);
        }
      } catch (error) {
        console.error("API call to fetch clientSecret failed:", error);
        setClientSecret(null);
      }
    };

    loadPaymentIntent();
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
      >
        Loading payment information...
      </div>
    );
  }

  if (typeof clientSecret !== "string") {
    return <div>Error: Invalid clientSecret received.</div>;
  }

  console.log("Valid clientSecret:", clientSecret);

  const options = { clientSecret };

  return (
    <ErrorBoundary>
      <Elements stripe={stripePromise} options={options}>
        <OtpVerification />
      </Elements>
    </ErrorBoundary>
  );
};

export default VerifyOtpPage;
