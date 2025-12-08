import React, { Suspense, useState, useRef, useEffect } from "react";
import { Container, Button, Card, Form, Row, Col } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone } from "react-icons/fa";
import "./AiCoach.css";

import Katie from "../../../assets/avatars/Katie.png";
import Kevin from "../../../assets/avatars/Kevin.jpeg";
import Maggie from "../../../assets/avatars/Maggie.png";
import Maya from "../../../assets/avatars/Maya.jpeg";
import Ricardo from "../../../assets/avatars/Ricardo.jpeg";
import Will from "../../../assets/avatars/Will.jpeg";
import Zach from "../../../assets/avatars/Zach.jpeg";
import Zoey from "../../../assets/avatars/Zoey.png";
import { openAiService } from "../../../services/AiCoachService";
const Avatar = React.lazy(() => import("./Avatar"));

const coachProfiles = {
  "Coach Kevin": {
    name: "Coach Kevin",
    gender: "male",
    image: Kevin,
    traits: "Energetic, Positive, Encouraging, Enthusiastic",
    attire: "Track Suit, Sneakers, Whistle",
    agent_id: "v2_agt_Mh0_S0p0",
  },
  "Coach Zoey": {
    name: "Coach Zoey",
    gender: "female",
    name: "Coach Zoey",
    image: Zoey,
    traits: "Energetic, Positive, Encouraging, Enthusiastic",
    attire: "Track Suit, Sneakers, Whistle",
    agent_id: "v2_agt_RMX75O8B",
  },
  "Coach Zach": {
    name: "Coach Zach",
    gender: "male",
    image: Zach,
    name: "Coach Zach",
    traits: "Relaxed, Calm, Gentle, Kind, Compassionate",
    attire: "T-Shirt, Shorts, Whistle",
    agent_id: "v2_agt_12rL12Vq",
  },
  "Coach Maya": {
    name: "Coach Maya",
    gender: "female",
    image: Maya,
    name: "Coach Maya",
    traits: "Relaxed, Calm, Gentle, Kind, Compassionate",
    attire: "T-Shirt, Shorts, Whistle",
    agent_id: "v2_agt_-sv7oQ7d",
  },
  "Coach Will": {
    name: "Coach Will",
    gender: "male",
    image: Will,
    name: "Coach Will",
    traits: "Strict, Regimented, Demanding, No Excuses",
    attire: "Military Camouflage, Fatigues, Boots, Whistle",
    agent_id: "v2_agt_wYnc6uYu",
  },
  "Coach Maggie": {
    name: "Coach Maggie",
    gender: "female",
    image: Maggie,
    name: "Coach Maggie",
    traits: "Strict, Regimented, Demanding, No Excuses",
    attire: "Military Camouflage, Fatigues, Boots, Whistle",
    agent_id: "v2_agt_YcXWXQCM",
  },
  "Coach Ricardo": {
    name: "Coach Ricardo",
    gender: "male",
    image: Ricardo,
    traits: "Analytical, Practical, Realistic, Straightforward",
    attire: "Business Casual, Slacks, Buttoned-up Shirt",
    agent_id: "v2_agt_Ekw_ixgq",
  },
  "Coach Katie": {
    name: "Coach Katie",
    gender: "female",
    image: Katie,
    traits: "Analytical, Practical, Realistic, Straightforward",
    attire: "Business Casual, Slacks, Buttoned-up Shirt",
    agent_id: "v2_agt_rj-kNAYY",
  },
};

const ACSIQuestions = [
  "On a daily or weekly basis, I set very specific goals for myself that guide what I do.",
  "I get the most out of my talent and skill.",
  "When a coach or manager tells me how to correct a mistake I've made, I tend to take it personally and feel upset.",
  "When I'm playing sports, I can focus my attention and block out distractions.",
  "I remain positive and enthusiastic during competition, no matter how badly things are going.",
  "I tend to play better under pressure because I think more clearly.",
  "I worry quite a bit about what others think of my performance.",
  "I tend to do lots of planning about how to reach my goals.",
  "I feel confident that I will play well.",
  "When a coach or manager criticizes me, I become upset rather than feel helped.",
  "It is easy for me to keep distracting thoughts from interfering with something I am watching or listening to.",
  "I put a lot of pressure on myself by worrying about how I will perform.",
  "I set my own performance goals for each practice.",
  "I don't have to be pushed to practice or play hard; I give 100%.",
  "If a coach criticizes or yells at me, I correct the mistake without getting upset about it.",
  "I handle unexpected situations in my sport very well.",
  "When things are going badly, I tell myself to keep calm, and this works for me.",
  "The more pressure there is during a game, the more I enjoy it.",
  "While competing, I worry about making mistakes or failing to come through.",
  "I have my own game plan worked out in my head long before the game begins.",
  "When I feel myself getting too tense, I can quickly relax my body and calm myself.",
  "To me, pressure situations are challenges that I welcome.",
  "I think about and imagine what will happen if I fail or screw up.",
  "I maintain emotional control regardless of how things are going for me.",
  "It is easy for me to direct my attention and focus on a single object or person.",
  "When I fail to reach my goals, it makes me try even harder.",
  "I improve my skills by listening carefully to advice and instruction from coaches and managers.",
  "I make fewer mistakes when the pressure is on because I concentrate better.",
];

const scoreCategories = {
  "Coping With Adversity": [4, 16, 20, 23],
  Coachability: [2, 9, 14, 27],
  Concentration: [3, 10, 15, 25],
  "Confidence and Achievement Motivation": [1, 8, 13, 26],
  "Goal Setting and Mental Preparation": [0, 7, 12, 19],
  "Peaking Under Pressure": [5, 17, 21, 27],
  "Freedom From Worry": [6, 11, 18, 22],
};

const AiCoach = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const tenant = localStorage.getItem("tenant");

  const [selectedCoach, setSelectedCoach] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const [userScores, setUserScores] = useState(0);
  const [aiResponse, setAiResponse] = useState(null);
  const [showWelcomeLoader, setShowWelcomeLoader] = useState(true);
  const [pendingResponse, setPendingResponse] = useState(null);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    // Stop any ongoing speech immediately when component mounts
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  useEffect(() => {
    const stopSpeech = () => {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }
    };

    window.addEventListener("beforeunload", stopSpeech);
    window.addEventListener("pagehide", stopSpeech);

    return () => {
      stopSpeech();
      window.removeEventListener("beforeunload", stopSpeech);
      window.removeEventListener("pagehide", stopSpeech);
    };
  }, []);

  const getVoiceByGender = (gender) => {
    if (!voices.length) return null;

    const lowerGender = gender.toLowerCase();

    // Try to pick by known names
    const preferredVoices = {
      male: [
        "Google UK English Male",
        "Microsoft David - English (United States)",
        "Daniel",
      ],
      female: [
        "Google UK English Female",
        "Google US English",
        "Samantha",
        "Microsoft Zira - English (United States)",
      ],
    };

    const match = voices.find((v) =>
      preferredVoices[lowerGender]?.some((name) =>
        v.name.toLowerCase().includes(name.toLowerCase())
      )
    );

    if (match) return match;
    return voices.find((v) => v.lang.startsWith("en")) || voices[0];
  };

  const audioRef = useRef(null);
  const avatarRef = useRef(null);

  const speakText = (text, gender, lang = "en-US", preferredName = "") => {
    if (!window.speechSynthesis) return;

    // ✅ Cancel all ongoing speech first
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;

    const selectedVoice = getVoiceByGender(gender);
    if (selectedVoice) utterance.voice = selectedVoice;

    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    const killSpeech = setTimeout(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    }, 200); // kills anything still speaking after 0.2s

    return () => clearTimeout(killSpeech);
  }, []);

  const silenceTimeoutRef = useRef(null);

  useEffect(() => {
    if (!transcript) return;

    setInput(transcript);

    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }

    silenceTimeoutRef.current = setTimeout(() => {
      if (transcript.trim()) {
        SpeechRecognition.stopListening();

        setTimeout(() => {
          console.log("transcript", transcript);
          setInput(transcript);
          handleSend();
          resetTranscript();
        }, 300);
      }
    }, 2000);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    console.warn("Browser does not support speech recognition.");
  }

  const [userResponseForPlanQuestions, setUserResponseForPlanQuestions] =
    useState("");
  const [previousPlansByCategory, setPreviousPlansByCategory] = useState({
    "Confidence and Achievement Motivation": "",
    Coachability: "",
    "Goal Setting and Mental Preparation": "",
    Concentration: "",
    "Peaking Under Pressure": "",
  });

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcomeLoader(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  function getCategoryFromPlan(planText) {
    const lowerPlan = planText.toLowerCase();

    if (lowerPlan.includes("confidence"))
      return "Confidence and Achievement Motivation";
    if (lowerPlan.includes("coachability")) return "Coachability";
    if (lowerPlan.includes("goal setting"))
      return "Goal Setting and Mental Preparation";
    if (lowerPlan.includes("concentration")) return "Concentration";
    if (lowerPlan.includes("pressure")) return "Peaking Under Pressure";

    return "Confidence and Achievement Motivation";
  }

  useEffect(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [prompts]);

  const handleCoachSelection = async (coach) => {
    const coachData = coachProfiles[coach];

    setSelectedCoach(coach);
    if (!coachData) {
      console.error("Coach data not found");
      return;
    }
    const language = localStorage.getItem("appLanguage");
    let coachingPrompt = `
You are ${coach}, a ${coachData.traits} coach wearing ${coachData.attire}.  
The user wants to chat with you in ${language} language.  

🔥 **Make the conversation fun and engaging!**
- Use **emojis** to highlight key points (e.g., 🏆, 💪, 🧠, 🎯).
- Structure responses with **clear bullet points** for readability.
- Keep it **motivational** and **supportive**.
- If the user has test results, analyze their strengths and weaknesses and suggest improvements.

⚠️ **Important:** Format your response in proper **HTML**.  
Use **<h2>, <strong>, <p>** for structure.  
Use **<ul>, <li>** for lists only when necessary.
`;

    if (userScores && userScores.subScore?.length > 0) {
      const subscaleScores = userScores.subScore.reduce((acc, item) => {
        acc[item.subscoreCategory] = item.subscore;
        return acc;
      }, {});

      const sortedCategories = [...userScores.subScore].sort(
        (a, b) => a.subscore - b.subscore
      );
      const orderedCategories = sortedCategories.map(
        (item) => item.subscoreCategory
      );
      const language = localStorage.getItem("appLanguage");

      coachingPrompt = `
  📊 **User's Test Results:**
  - **Total Score**: ${userScores.totalScore || "Unknown"} 🏅
  - **Category Scores**: ${JSON.stringify(subscaleScores, null, 2)}
  - **12-Month Coaching Focus Order** (by priority): ${orderedCategories.join(
        ", "
      )} 📅

  🧠 **AI Instructions:**
  You are a world-class mental performance coach. Create a fully immersive and structured **12-month coaching program**, where each month focuses on one category from this list in ${language ? language : "en"
        } language, in this exact order:

  👉 ${orderedCategories.map((cat, i) => `${i + 1}. ${cat}`).join("\n👉 ")}

  ✅ **You must generate the full yearly plan immediately and output it in clean, structured HTML.**

  <h2>📅 Monthly Coaching Plan Format</h2>

  - Each of the 12 months should:
    - Focus on **one category** (in the given order)
    - Have a powerful **monthly theme or motto**
    - Each Month should have **Weekly tasks** example this complete week you will focus on these things and elaborate in few words like the total token you will be using to give response are 4k so you have plan the response accordingly to give compplete plan for all the categories like you the tasks more so the athlete can understand what he has to do exactly and make sure to give response in HTML like ul li
      - Use short, focused activities (🧠 mindset shifts, 💪 challenges, ✍️ journal prompts) and tell them to write journal in the website itself by going to Mental Fitness Training Center > Journal > Add New (url :- /fieldhouse-dashboard/journal/add-new)
      - Sundays are always for **light reflection/rest**
      - Tasks must be listed using bullet points and HTML list tags

  <h2>🌟 Output Format & Tone</h2>

  - Use proper HTML formatting: headers, bullet lists, bold text
  - Make it feel premium, inspiring, and personalized
  - Use **emojis** to enhance clarity and tone
  - Mention journaling with: Mental Fitness Training Center > Journal > Add New
  - Do **not pause or summarize** — return the full plan in one single response

  ⚠️ **Important Notes**:
  - Every month and day should feel fresh, motivational, and clear
  - Keep content simple, engaging, and specific
  - Format must be clean and fully structured in HTML
  `;
    } else {
      coachingPrompt += `
The user has not taken the self-discovery test yet. 🎭 Just engage in a **friendly, casual conversation** in ${language ? language : "en"
        } language.
- Answer any **sports-related questions** they have.
- Provide **general training advice** (💡 Tips, exercises, mindset strategies).
- Be **encouraging and supportive** 💪🔥.
- Use **fun and engaging language with emojis**.

⚠️ **Reminder:**  
**Format your response using proper HTML** with headings, bold text, and paragraphs.
`;
    }

    setPrompts([{ userPrompt: "Hello Coach!", aiResponse: "Typing..." }]);

    try {
      const maxTokens = userScores.subScore?.length > 0 ? 6000 : 100;

      const data = {
        messages: [
          { role: "system", content: coachingPrompt },
          { role: "user", content: "Hello Coach!" },
        ],
        maxTokens: maxTokens,
      };

      const aiResponse = await openAiService(data);

      const responseMessage =
        aiResponse.choices[0]?.message?.content ||
        `Hello, I'm ${coach}! Ready to train? 🏋️‍♂️🔥`;

      setPrompts([{ userPrompt: "Hello Coach!", aiResponse: responseMessage }]);

      setAiResponse(responseMessage);

      const aiResponseClearMessage = responseMessage
        .replace(/<[^>]*>/g, "")
        .replace(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\u24C2|\uFE0F|\u200D|\u23CF|\u23E9|\u231A|\u3030|\u303D|\u3297|\u3299|\u25AA|\u25AB|\u25B6|\u25C0|\u25FB|\u25FC|\u25FD|\u25FE|\u2600-\u26FF|\u2B05|\u2B06|\u2B07|\u2B1B|\u2B1C|\u2B50|\u2B55|\u2934|\u2935|\u27A1|\u2194|\u2195|\u2196|\u2197|\u2198|\u2199)/g,
          ""
        )
        .trim();

      speakText(
        aiResponseClearMessage,
        coachData.gender,
        language === "en" ? "en-US" : `${language}-${language}`
      );

      const chatType =
        userScores && userScores.subScore?.length > 0 ? "plan" : "conversation";
    } catch (error) {
      console.error("AI Greeting Error:", error);
      setPrompts([
        {
          userPrompt: "Hello Coach!",
          aiResponse: "Failed to generate response.",
        },
      ]);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    let userMessage;

    if (transcript) {
      userMessage = transcript;
    } else {
      userMessage = input;
    }
    setInput("");
    console.log("userMessage", userMessage);
    const coach = coachProfiles[selectedCoach];

    const localLanguageNames = {
      en: "English",
      es: "Español",
      sr: "Српски",
      pt: "Português",
      sv: "Svenska",
      de: "Deutsch",
      it: "Italiano",
    };

    let language = localStorage.getItem("appLanguage") || "en";
    localStorage.setItem("appLanguage", language);

    const languageRequestMatch = userMessage.match(/respond in (\w{2})/i);
    if (languageRequestMatch) {
      language = languageRequestMatch[1];
      localStorage.setItem("appLanguage", language);
      console.log(
        "User requested response in:",
        localLanguageNames[language] || language
      );
    }

    const needsPlatformExplanation =
      /what is inspire mental fitness|about inspire mental fitness|platform/i.test(
        userMessage
      );
    const safeMaxTokens = needsPlatformExplanation ? 500 : 900;
    const maxTokens = safeMaxTokens - 50;

    const currentLanguageName = localLanguageNames[language];

    const bannedWords = [
      "kill",
      "die",
      "suicide",
      "hurt",
      "violence",
      "anger",
      "explosives",
      "weapon",
      "attack",
      "revenge",
      "assault",
    ].join(", ");

    const coachingStyle = `You are ${selectedCoach}, a ${coach.traits} coach wearing ${coach.attire}. 
  Your goal is to provide highly detailed and if you see the token ${maxTokens} is very less than reduce detail instead of leaving the response coaching primarily focused on improving the user's mental fitness, mindset, physical training, nutrition, and strategy.
  Always maintain your personality and adapt to the user's needs.

  **Important:**  
  - If there is anything regarding breathing exercise suggest user to do breathing exercise in Inspired breathing which is in Mental fitness training center tab whixh have multiple breathing exercise
  - Respond in the user's selected language: <b>${language}</b> unless the user explicitly requests another language.
  - Format your responses using proper HTML: headings, bold, paragraphs. Use lists only when necessary.
  - Use emojis to make message look attractive.
  - Keep answers concise. If space is limited, reduce detail instead of leaving the response unfinished.
  - Always finish with a clear summary or motivational wrap-up, even if shortening is required.
  - Never stop in the middle of a list, sentence, or section.
  - Stay within the token budget: ${maxTokens}.
  - Start your response with a tag indicating the ChatType: 
    <b>ChatType: coaching</b> OR <b>ChatType: requireHelp</b> OR <b>ChatType: general</b> OR <b>ChatType: task</b> OR <b>ChatType: plan-complete</b>.
  `;

    const recentPrompts = prompts.slice(-5);
    const planRelatedPrompts = recentPrompts.filter((p) =>
      ["plan", "plan-follow-up", "plan-complete"].includes(p.chatType)
    );

    const selectedPrompts =
      planRelatedPrompts.length >= 2
        ? planRelatedPrompts.slice(-2)
        : recentPrompts;

    let conversationContext = selectedPrompts
      .map((p) => `User: ${p.userPrompt}\nCoach: ${p.aiResponse}`)
      .join("\n");

    conversationContext = conversationContext
      ? `Here's the recent chat context:\n${conversationContext}\nNow respond to the new input below.`
      : "";

    setPrompts((prev) => [
      ...prev,
      { userPrompt: userMessage, aiResponse: "..." },
    ]);

    setUserResponseForPlanQuestions(userMessage);

    try {
      // const aiResponse = await openai.chat.completions.create({
      //   model: "gpt-4",
      //   messages: [
      //     { role: "system", content: coachingStyle },
      //     { role: "system", content: conversationContext },
      //     { role: "user", content: userMessage },
      //   ],
      //   temperature: 0.7,
      //   max_tokens: maxTokens,
      // });
      const data = {
        messages: [
          { role: "system", content: coachingStyle },
          { role: "system", content: conversationContext },
          { role: "user", content: userMessage },
        ],
        maxTokens: maxTokens,
      };

      const aiResponse = await openAiService(data);

      let aiMessage = aiResponse.choices[0]?.message?.content || "No response.";
      setPendingResponse({ userPrompt: userMessage, aiResponse: aiMessage });

      let planText = aiMessage.replace(/<[^>]*>/g, " ");

      planText = planText.replace(
        /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
        ""
      );

      planText = planText.replace(/\s+/g, " ").trim();
      setAiResponse(planText);

      // Extract ChatType
      const chatTypeMatch = aiMessage.match(
        /ChatType:\s*(coaching|requireHelp|general|task|plan-complete)/i
      );
      const chatType = chatTypeMatch ? chatTypeMatch[1] : "general";

      aiMessage = aiMessage
        .replace(
          /<b>ChatType:\s*(coaching|requireHelp|general|task|plan-complete)<\/b>\s*/i,
          ""
        )
        .trim();

      const aiMessageText = aiMessage
        .replace(/<[^>]*>/g, "")
        .replace(
          /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\u24C2|\uFE0F|\u200D|\u23CF|\u23E9|\u231A|\u3030|\u303D|\u3297|\u3299|\u25AA|\u25AB|\u25B6|\u25C0|\u25FB|\u25FC|\u25FD|\u25FE|\u2600-\u26FF|\u2B05|\u2B06|\u2B07|\u2B1B|\u2B1C|\u2B50|\u2B55|\u2934|\u2935|\u27A1|\u2194|\u2195|\u2196|\u2197|\u2198|\u2199)/g,
          ""
        )
        .trim();
      const coach = coachProfiles[selectedCoach];
      console.log("coach", coach);
      speakText(
        aiMessageText,
        coach.gender,
        language === "en" ? "en-US" : `${language}-${language.toUpperCase()}`
      );

      setPrompts((prev) => [
        ...prev.slice(0, -1),
        { userPrompt: userMessage, aiResponse: aiMessage },
      ]);

      const isTaskCompletion =
        /(?:done|completed|finished|accomplished|i did it|yes i did|task is done)/i.test(
          userMessage
        );
      if (isTaskCompletion) {
        const lastTaskIndex = [...prompts]
          .reverse()
          .findIndex((p) => p.chatType === "task" && !p.isTaskdone);
        const lastTask =
          lastTaskIndex !== -1
            ? prompts[prompts.length - 1 - lastTaskIndex]
            : null;

        if (lastTask && lastTask._id) {
          try {
            await axios.patch(
              `${baseUrl}/mark-task-done/${selectedCoach}/${lastTask._id}`,
              {},
              { headers: { token } }
            );
            setPrompts((prev) =>
              prev.map((p) =>
                p._id === lastTask._id ? { ...p, isTaskdone: true } : p
              )
            );
          } catch (err) {
            console.error("Failed to update task as done", err);
          }
        }
      }

      if (chatType === "plan-complete") {
        const lastPlan = [...prompts]
          .reverse()
          .find((p) => p.chatType === "plan" && !p.isPlanComplete);

        if (lastPlan?._id) {
          await axios.post(
            `${baseUrl}/mark-task-done/${selectedCoach}/${lastPlan._id}`,
            {},
            { headers: { token } }
          );

          setPrompts((prev) =>
            prev.map((p) =>
              p._id === lastPlan._id ? { ...p, isPlanComplete: true } : p
            )
          );

          const category = getCategoryFromPlan(lastPlan.aiResponse);
          const previousPlans = prompts.filter(
            (p) =>
              p.chatType === "plan" &&
              p.isPlanComplete &&
              getCategoryFromPlan(p.aiResponse) === category
          );

          if (previousPlans.length < 3) {
            // generateNextPlan(category, userMessage);
          } else {
            console.log("User already completed 3 plans in this category.");
          }
        }
      }
    } catch (error) {
      console.error("Request failed:", error);
      setPrompts((prev) => [
        ...prev.slice(0, -1),
        { userPrompt: userMessage, aiResponse: "Failed to generate response." },
      ]);
    }
  };

  return (
    <Container className="mt-4 px-0 px-md-4 text-start pb-5 mb-lg-4 personal-ai-coach">
      {showWelcomeLoader && (
        <div
          className="welcome-loader d-flex flex-column justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "linear-gradient(135deg, #009345, #0071bd)",
            zIndex: 9999,
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h1 className="welcome-title mb-2">Welcome to</h1>
          <h2 className="welcome-subtitle mb-4">Inspire Fit Performance Coach</h2>
          <div className="loader-dot d-flex gap-2">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      )}

      {!selectedCoach ? (
        <>
          <h2 className="ff-gotham-medium mb-4 text-center">
            Choose Your Performance Coach
          </h2>

          {[
            {
              title: "Energetic & Enthusiastic",
              subtitle: "High-energy motivation and positive encouragement",
              bg: "#e8f9e6ff",
              color: "green",
              coaches: ["Coach Kevin", "Coach Zoey"],
              traits: "Energetic, Positive",
            },
            {
              title: "Calm & Compassionate",
              subtitle: "Gentle guidance with empathy and understanding",
              coaches: ["Coach Zach", "Coach Katie"],
              traits: "Calm, Caring",
              bg: "#e7ebfd",
              color: "blue",
            },
            {
              title: "Strict & Disciplined",
              subtitle: "No-excuses approach with military-style training",
              coaches: ["Coach Will", "Coach Maggie"],
              traits: "Strict, Regimented",
              bg: "#ffe8d8",
              color: "brown",
            },
            {
              title: "Analytical & Strategic",
              subtitle: "Data-driven coaching with practical solutions",
              bg: "#efefef",
              color: "black",
              coaches: ["Coach Ricardo", "Coach Maya"],
              traits: "Analytical, Practical",
            },
          ].map((category, catIndex) => (
            <div key={catIndex} className="mb-5">
              {/* Category Header */}
              <div
                className="text-center p-3 rounded-4 mx-auto"
                style={{ background: category.bg , maxWidth: "60%", width: "100%"  }}
              >
                <h3 className="ff-gotham-bold" style={{ color: category.color }}>
                  {category.title}
                </h3>
                <p className="ff-gotham-light m-0 fs-6">{category.subtitle}</p>
              </div>

              {/* Coach Cards */}
              <Row className="mt-4 gy-4 justify-content-center">
                {category.coaches.map((coachName) => {
                  const coach = coachProfiles[coachName];
                  return (
                    <Col
                      xs={6}
                      sm={6}
                      md={4}
                      lg={3}
                      xl={3}
                      key={coach.name}
                      className="d-flex justify-content-center"
                    >
                      <Card
                        onClick={() => handleCoachSelection(coach.name)}
                        className="coach-card text-center cursor-pointer"
                      >
                        <img src={coach.image} alt={coach.name} />
                        <Card.Title className="coach-name mt-2">
                          {coach.name}
                        </Card.Title>
                        <Card.Text className="coach-trait">
                          {category.traits}
                        </Card.Text>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
          ))}
        </>
      ) : (
        <>
          <h2 className="ff-gotham-medium mb-4">
            Inspire Fit Performance Coach
          </h2>

          <div className="d-flex align-items-md-end align-items-lg-start align-items-xl-center">
            {selectedCoach && (
              <div className="d-none d-md-block w-25 pe-md-2 me-lg-0">
                <img
                  src={coachProfiles[selectedCoach]?.image}
                  alt="Coach Avatar"
                  style={{ width: "300px", height: "450px" }}
                  className="object-fit-contain"
                />
              </div>
            )}

            <Card className="bg-white w-100 chat-box-div">
              <Card className="mb-3 p-3 chat-box border-0">
                {prompts.map((prompt, index) => (
                  <React.Fragment key={index}>
                    {prompt.userPrompt && (
                      <div className="chat-bubble user-bubble">
                        {prompt.userPrompt}
                      </div>
                    )}
                    <div className="d-flex align-items-end gap-2">
                      <div className="chat-bubble ai-bubble">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: prompt.aiResponse,
                          }}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                <div ref={chatEndRef} />
              </Card>

              <div className="chat-input-container px-2 pb-2">
                <Form.Control
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="chat-input"
                />

                <Button
                  onClick={() => {
                    if (listening) {
                      SpeechRecognition.stopListening();
                    } else {
                      resetTranscript();
                      SpeechRecognition.startListening({
                        continuous: true,
                        language: "en-US",
                      });
                    }
                  }}
                  className={`send-button ms-2 text-white ${listening ? "bg-danger" : ""
                    }`}
                >
                  <FaMicrophone />
                </Button>

                <Button onClick={handleSend} className="send-button ms-3 text-white">
                  <FaPaperPlane />
                </Button>
              </div>
            </Card>
          </div>
        </>
      )}
    </Container>
  );


};

export default AiCoach;
