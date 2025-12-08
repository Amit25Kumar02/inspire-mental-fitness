/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./App.css";
import "./vision-custom.css";
import "quill/dist/quill.snow.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import ChooseRole from "./components/authPages/ChooseRole";
import SignUp from "./components/authPages/SignUp";
import SignIn from "./components/authPages/SignIn";
import OtpVerification from "./components/authPages/OtpVerification";
import FildHouseDashboard from "./pages/FildHouseDashboard";
import Dashboard from "./components/fildHouseDashboard/Dashboard";
import Session from "./components/fildHouseDashboard/Session/Session";
import Journal from "./components/fildHouseDashboard/Journal/Journal";
import AssesmentTests from "./components/fildHouseDashboard/Assesment/AssesmentTests";
import AssesmentQuestions from "./components/fildHouseDashboard/Assesment/AssesmentQuestions";
import Library from "./components/fildHouseDashboard/Library/Library";
import AddNew from "./components/fildHouseDashboard/Library/AddNew/AddNew";
import QuiteRoomPage from "./components/fildHouseDashboard/QuietRoom/QuiteRoomPage";
import LandingPage from "./pages/LandingPage";
import CoachingRoomDashboard from "./pages/CoachingRoomDashboard";
import CoachDashboard from "./components/CoachRoomDashboard/CoachDashboard/CoachDashboard";
import CoachArena from "./components/CoachRoomDashboard/CoachArena/CoachArena";
import CoachSessions from "./components/CoachRoomDashboard/CoachSessions/CoachSessionPage";
import CoachLibrary from "./components/CoachRoomDashboard/CoachLibrary/CoachLibrary";
import CoachChatRoom from "./components/CoachRoomDashboard/CoachChatRoom/CoachChatRoom";
import CounselorDashboard from "./components/CounselorPortal/CounselorDashboard/CounselorDashboard";
import CounselorePortalDashboard from "./pages/CounselorePortalDashboard";
import CounselorJournal from "./components/CounselorPortal/CounselorJournal/CounselorJournal";
import CounselorChat from "./components/CounselorPortal/CounselorChat/CounselorChat";
import Counsel from "./components/CounselorPortal/CounselorCalendar/Counsel";
import CounselorSignin from "./components/authPages/CounselorSignin";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AddJournalPage from "./components/fildHouseDashboard/Journal/AddJournalPage";
import JournalDetails from "./components/fildHouseDashboard/Journal/JournalDetails/JournalDetails";
import UserJournal from "./components/common/UserJournal/UserJournal";
import AlbumSongs from "./components/fildHouseDashboard/QuietRoom/AlbumSongs/AlbumSongs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermAndConditions";
import AboutUsPage from "./pages/AboutUsPage";
import AllBlogs from "../src/components/landingPage/Blogs/AllBlogs";
import AthleteChatRoom from "./components/fildHouseDashboard/athleteChat/AthleteChatRoom";
import PatientDemographicForm from "./components/fildHouseDashboard/PatientDemographicForm/PatientDemographicForm";
import CounselorAvailability from "./components/CounselorPortal/CounselorAvailability/CounselorAvailability";
import AllSongs from "./components/fildHouseDashboard/QuietRoom/AllSongs/AllSongs";
import BlogDetails from "./components/landingPage/Blogs/BlogDetails";
import OurTeam from "./pages/OurTeam";
import PaymentPage from "./pages/PaymentPage";
import AthleteArena from "./components/fildHouseDashboard/AthleteArena/AthleteArena";
import AiCoach from "./components/fildHouseDashboard/AiCoach/AiCoach";
import CoachRequest from "./components/CoachRoomDashboard/CoachRequestPage/CoachRequest";
import SubscriptionPlanPage from "./components/authPages/SubscriptionPlanPage";
import ContactUsPage from "./pages/ContactUsPage";
import ResetPassword from "./components/authPages/ResetPassword";
import CounselorArena from "./components/CounselorPortal/CounselorArena/CounselorArena";
import BreathingExercise from "./pages/BreathingExercise";
import CounselorCompanion from "./components/CounselorPortal/CounselorCompanion/CounselorCompanion";
import CognifitGame from "./components/fildHouseDashboard/CognifitGames/CognifitGame";
import CoachCompanion from "./components/CoachRoomDashboard/CoachCompanion/CoachCompanion";
import DemoAiCoach from "./components/fildHouseDashboard/AiCoach/DemoAiCoach";
import RouteAwareTranslationProvider from "./provider/translationProvider";
import FocusFieldGame from "./components/fildHouseDashboard/CognifitGames/focusField/FocusFieldGame";
import SupportTab from "./components/fildHouseDashboard/SupportTab/SupportTab";
import VictoryVoiceHome from "./components/fildHouseDashboard/CognifitGames/VictoryVoice";
import UpdatePassword from "./components/common/UpdatePassword/UpdatePassword";
import MindMatchHome from "./components/fildHouseDashboard/CognifitGames/MindMatch";
import CogniFitGames from "./components/fildHouseDashboard/CognifitGames/mindGames/CognifitGames";
import ReactionTime from "./components/fildHouseDashboard/CognifitGames/leaderboardGames/reactionTime/ReactionTime";
import AimTrainer from "./components/fildHouseDashboard/CognifitGames/leaderboardGames/aimTrainer/AimTrainer";
import LeaderBoard from "./components/fildHouseDashboard/LeaderBoard/LeaderBoard";
import TawkWidget from "./components/common/TawkWidget/TawkWidget";

function App() {
  const location = useLocation();
  const redirectedRef = useRef(false);

  const user = {
    userId: JSON.parse(localStorage.getItem("userData"))?.userId,
  };

  const sha256 = async (message) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  useEffect(() => {
    window._mtm = window._mtm || [];
    window._paq = window._paq || [];

    const _mtm = window._mtm;
    _mtm.push({ "mtm.startTime": new Date().getTime(), event: "mtm.Start" });

    const d = document,
      g = d.createElement("script"),
      s = d.getElementsByTagName("script")[0];
    g.async = true;
    g.src = process.env.REACT_APP_MATOMO_URL;
    s.parentNode.insertBefore(g, s);

    const initMatomoUser = async () => {
      const _paq = window._paq;

      if (user?.userId) {
        _paq.push(["setUserId", user.userId]);
      }

      if (user?.email) {
        const hashedEmail = await sha256(user.email);
        _paq.push(["setCustomDimension", 1, hashedEmail, "visit"]);
      }

      if (user?.plan) {
        _paq.push(["setCustomDimension", 2, user.plan, "visit"]);
      }

      _paq.push(["setCustomUrl", window.location.href]);
      _paq.push(["setDocumentTitle", document.title]);
      _paq.push(["trackPageView"]);
    };

    initMatomoUser();
  }, [user]);

  // const isDevToolsOpen = () => {
  //   const threshold = 160;
  //   const widthDiff = window.outerWidth - window.innerWidth;
  //   const heightDiff = window.outerHeight - window.innerHeight;
  //   if (widthDiff > threshold || heightDiff > threshold) return true;

  //   const start = performance.now();
  //   try {
  //     new Function("debugger;")();
  //   } catch {}
  //   const end = performance.now();
  //   if (end - start > 100) return true;

  //   return false;
  // };

  // const checkAndRedirect = () => {
  //   if (window.innerWidth <= 1024) return;
  //   if (isDevToolsOpen()) {
  //     if (!redirectedRef.current) {
  //       redirectedRef.current = true;
  //       console.log("DevTools detected! Redirecting...");
  //       window.location.href = "https://www.google.com";
  //     }
  //   } else {
  //     redirectedRef.current = false;
  //   }
  // };

  // useEffect(() => {
  //   checkAndRedirect();

  //   const interval = setInterval(checkAndRedirect, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    if (window._paq) {
      window._paq.push(["setCustomUrl", window.location.href]);
      window._paq.push(["setDocumentTitle", document.title]);
      window._paq.push(["trackPageView"]);
    }
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <RouteAwareTranslationProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <LandingPage />
              </>
            }
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/term-and-conditions" element={<TermsConditions />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/choose-role"
            element={
              <PrivateRoute>
                <ChooseRole />
              </PrivateRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <PrivateRoute>
                <SignUp />
              </PrivateRoute>
            }
          />
          <Route
            path="/sign-in"
            element={
              <PrivateRoute>
                <SignIn />
              </PrivateRoute>
            }
          />
          <Route
            path="/counselor-sign-in"
            element={
              <PrivateRoute>
                <CounselorSignin />
              </PrivateRoute>
            }
          />
          <Route
            path="/otp-verification"
            element={
              <PrivateRoute>
                <OtpVerification />
              </PrivateRoute>
            }
          />
          <Route
            path="patient-demographic-form"
            element={<PatientDemographicForm />}
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute>
                <PaymentPage />
              </PrivateRoute>
            }
          />
          <Route path="/focus-field" element={<FocusFieldGame />} />
          <Route path="/reaction-time" element={<ReactionTime />} />
          <Route path="/aim-trainer" element={<AimTrainer />} />
          <Route path="/victory-voice" element={<VictoryVoiceHome />} />
          <Route path="/mind-match" element={<MindMatchHome />} />
          <Route path="/breathing-exercise" element={<BreathingExercise />} />
          <Route path="/coach-request" element={<CoachRequest />} />
          <Route path="/choose-plan" element={<SubscriptionPlanPage />} />
          <Route path="/fieldhouse-dashboard" element={<FildHouseDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="session" element={<Session />} />
            <Route path="journal" element={<Journal />} />
            <Route path="games" element={<CognifitGame />} />
            <Route path="mind-games" element={<CogniFitGames />} />
            <Route path="coach" element={<AiCoach />} />
            <Route path="update-password" element={<UpdatePassword />} />

            <Route
              path="user-guide"
              element={
                <>
                  <SupportTab />
                </>
              }
            />
             <Route path="support" element={<TawkWidget/>} />
            <Route
              path="/fieldhouse-dashboard/journal/:id"
              element={<JournalDetails />}
            />
            <Route path="journal/add-new" element={<AddJournalPage />} />
            <Route path="journal/my-journal" element={<UserJournal />} />
            <Route
              path="self-discovery-tests/:id"
              element={<AssesmentQuestions />}
            />
            <Route path="self-discovery" element={<AssesmentTests />} />
            <Route path="library" element={<Library />} />
            <Route path="leaderboard" element={<LeaderBoard />} />
            <Route path="chat" element={<AthleteChatRoom />} />
            <Route path="arena" element={<AthleteArena />} />
            <Route path="library/add-new" element={<AddNew />} />
            <Route path="recovery-room" element={<QuiteRoomPage />} />
            <Route path="demo-ai-coach" element={<DemoAiCoach />} />
            <Route
              path="/fieldhouse-dashboard/album/:id"
              element={<AlbumSongs />}
            />
            <Route path="/fieldhouse-dashboard/songs" element={<AllSongs />} />
          </Route>
          <Route path="/coaching-dashboard" element={<CoachingRoomDashboard />}>
            <Route index element={<CoachDashboard />} />
            <Route path="dashboard" element={<CoachDashboard />} />
            <Route path="session" element={<CoachSessions />} />
            {/* <Route path="journal" element={<CoachJournal />} /> */}
            <Route path="arena" element={<CoachArena />} />

            <Route
              path="/coaching-dashboard/journal/:id"
              element={<JournalDetails />}
            />

            <Route path="journal/add-new" element={<AddJournalPage />} />
            <Route path="journal/my-journal" element={<UserJournal />} />
            <Route path="chat" element={<CoachChatRoom />} />
            <Route path="library" element={<CoachLibrary />} />
            <Route path="recovery-room" element={<QuiteRoomPage />} />
            <Route path="coach-companion" element={<CoachCompanion />} />
            <Route path="update-password" element={<UpdatePassword />} />
            <Route
              path="/coaching-dashboard/album/:id"
              element={<AlbumSongs />}
            />
            <Route
              path="user-guide"
              element={
                <>
                  <SupportTab />
                </>
              }
            />
             <Route path="support" element={<TawkWidget/>} />
            <Route path="/coaching-dashboard/songs" element={<AllSongs />} />
          </Route>
          <Route
            path="/counselor-portal"
            element={<CounselorePortalDashboard />}
          >
            <Route index element={<CounselorDashboard />} />
            <Route path="dashboard" element={<CounselorDashboard />} />
            <Route path="calendar" element={<Counsel />} />
            <Route path="journal" element={<CounselorJournal />} />
            <Route
              path="counselor-companion"
              element={<CounselorCompanion />}
            />
            <Route
              path="counselor-availability"
              element={<CounselorAvailability />}
            />

            <Route
              path="/counselor-portal/journal/:id"
              element={<JournalDetails />}
            />
            <Route path="journal/add-new" element={<AddJournalPage />} />
            <Route path="journal/my-journal" element={<UserJournal />} />
            <Route path="chat" element={<CounselorChat />} />
            <Route path="update-password" element={<UpdatePassword />} />
            <Route path="arena" element={<CounselorArena />} />
            <Route
              path="user-guide"
              element={
                <>
                  <SupportTab />
                </>
              }
            />
          </Route>
           <Route path="support" element={<TawkWidget/>} />
        </Routes>
      </RouteAwareTranslationProvider>
    </>
  );
}

export default App;
