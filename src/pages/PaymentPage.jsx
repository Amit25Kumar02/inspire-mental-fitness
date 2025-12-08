import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "react-bootstrap";
import { createPaymentIntentForUserSignup } from "../services/CounselingTicketRaising";
import { toast, ToastContainer } from "react-toastify";
import { saveUser, updateSubscriptionPlan } from "../services/otpService";
import logo from "../assets/image/png/logo.png";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const PaymentForm = () => {
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  const { userData, type, email, amount } = location.state || {};
  const navigate = useNavigate();

  const submitDetails = async () => {
    const userDataWithPlan = {
      ...userData,
      subscriptionPlan: type,
    };
    const response = await saveUser(userDataWithPlan);
    const { status, token, data } = response;
    if (status === "success") {
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(data));
      toast.success("Welcome to Inspire Mental Fitness");
      navigate("/fieldhouse-dashboard");
    }
  };

  const updateUserPlan = async () => {
    const datasending = {
      email: email,
      subscriptionPlan: type,
    };
    const response = await updateSubscriptionPlan(datasending);
    if (response.status === "success") {
      const { token, data } = response;
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(data));
      toast.success("Welcome to Inspire Mental Fitness");
      navigate("/fieldhouse-dashboard");
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe has not loaded.");
      return;
    }

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: "if_required",
      });
      if (error) {
        toast.error("Payment failed");
      } else {
        if (email) {
          updateUserPlan();
        } else {
          submitDetails();
        }
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handlePayment}>
        <PaymentElement />
        <Button
          type="submit"
          disabled={!stripe}
          className="mt-3 w-100"
          style={{ backgroundColor: "#009345", color: "#fff" }}
        >
          Pay Now ${amount}
        </Button>
      </form>
    </>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, currentDate } = location.state || {};
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      const amountInCents = Math.round(amount * 100);
      try {
        const { clientSecret } = await createPaymentIntentForUserSignup(
          amountInCents,
          currentDate
        );
        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    if (amount && currentDate) {
      fetchClientSecret();
    }
  }, [amount, currentDate]);

  if (!amount || !currentDate) {
    return (
      <div
        style={{ width: "100%" }}
        className="vh-100 d-flex align-items-center justify-content-center"
      >
        Error: Missing payment details.
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div
        style={{ width: "100%" }}
        className="vh-100 d-flex align-items-center justify-content-center"
      >
        Loading payment details...
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="d-flex justify-content-center align-items-center min-vh-100 py-5 px-3">
        <div style={{ width: "400px" }}>
          <div className="text-center">
            <img
              onClick={() => navigate("/")}
              className="position-relative logo-index my-4"
              style={{ width: "200px", height: "62px" }}
              src={logo}
              alt="logo"
            />
          </div>
          <h4 className="ff-gotham-medium mb-4 text-center">
            Complete Your Payment
          </h4>
          <PaymentForm />
        </div>
      </div>
    </Elements>
  );
};

export default PaymentPage;
