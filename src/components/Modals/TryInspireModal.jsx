import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { PhoneInput } from "react-international-phone";
import {
  createDiscoveryCallRequest,
  sendAiFeedbackToBackend,
} from "../../services/discoveryCallRequestService";
import { openAiService } from "../../services/AiCoachService";

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

const reverseScoredQuestions = [2, 6, 9, 12, 18, 23];

const TryInspireModal = ({ show, handleClose }) => {
  const [step, setStep] = useState(-1);
  const [responses, setResponses] = useState(Array(28).fill(null));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    bestTimeToContact: "",
  });
  const [aiSuggestions, setAiSuggestions] = useState({});
  const [loading, setLoading] = useState(false);

  const options = ["Almost Never", "Sometimes", "Often", "Almost Always"];

  const handleInputChange = (e) => {
    if (typeof e === "string") {
      setFormData((prev) => ({ ...prev, phoneNumber: e }));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleQuestionChange = (index, value) => {
    setResponses((prev) => {
      const updatedResponses = [...prev];
      updatedResponses[index] = parseInt(value);
      return updatedResponses;
    });
  };

  const calculateScores = () => {
    let subscaleScores = {};
    let totalScore = 0;
    Object.keys(scoreCategories).forEach((category) => {
      const maxScore = scoreCategories[category].length * 3;
      const rawScore = scoreCategories[category].reduce((sum, idx) => {
        const isReversed = reverseScoredQuestions.includes(idx);
        return sum + (isReversed ? 3 - responses[idx] : responses[idx]);
      }, 0);
      const percentageScore = Math.round((rawScore / maxScore) * 100);
      subscaleScores[category] = percentageScore;
      totalScore += percentageScore;
    });
    return {
      subscaleScores,
      totalScore: Math.round(totalScore / Object.keys(scoreCategories).length),
    };
  };

  // const fetchAiSuggestions = async () => {
  //   setLoading(true);
  //   const { subscaleScores, totalScore } = calculateScores();

  //   try {
  //     const subscaleResponses = await Promise.all(
  //       Object.keys(subscaleScores).map((category) => {
  //         const score = subscaleScores[category];

  //         let userMessage = `Category: ${category}
  //         Score: ${score}

  //         This response should come from "Inspire Mental Fitness" and feel like a personal, supportive message from the company.

  //         If the score is **low (0-49)**:
  //         - Offer encouragement and reassurance.
  //         - Suggest ways to improve with a growth mindset.
  //         - Let the user know that Inspire Mental Fitness is here to support them if they need help.

  //         If the score is **moderate (50-79)**:
  //         - Acknowledge their progress while encouraging further growth.
  //         - Provide motivation and reinforcement.

  //         If the score is **high (80-100)**:
  //         - Celebrate their achievement while emphasizing continuous self-improvement.
  //         - Encourage them to maintain their success and keep growing.

  //         Make the response feel **warm, supportive, and directly from Inspire Mental Fitness**. Keep it in simple text, no lists, no special characters, and make it feel like a natural conversation.

  //         Only mention that the user can reach out for support **if their score is 50 or below**.`;

  //         return openai.chat.completions.create({
  //           model: "gpt-4o-mini",
  //           messages: [{ role: "user", content: userMessage }],
  //           max_tokens: 500,
  //           temperature: 0.8,
  //         });
  //       })
  //     );

  //     let totalScoreMessage = `My Total Score: ${totalScore}

  //     This response should come from "Inspire Mental Fitness" and provide a **general overview** of the user's overall mental fitness based on their score.

  //     If the total score is **low (0-49)**:
  //     - Offer encouragement, highlighting areas of growth.
  //     - Let the user know that Inspire Mental Fitness is here to support them if they need guidance.

  //     If the total score is **moderate (50-79)**:
  //     - Acknowledge their progress while encouraging further growth.
  //     - Provide motivation to keep improving.

  //     If the total score is **high (80-100)**:
  //     - Celebrate their mental strength and encourage them to maintain their success.
  //     - Reinforce that even strong performers can continue to grow.

  //     Make the response feel **warm, positive, and directly from Inspire Mental Fitness**. Keep it in simple text, no lists, no special characters, and make it feel like a natural conversation.

  //     Only mention that the user can reach out for support **if their total score is 50 or below**.`;

  //     const totalScoreResponse = await openai.chat.completions.create({
  //       model: "gpt-4o-mini",
  //       messages: [{ role: "user", content: totalScoreMessage }],
  //       max_tokens: 600,
  //       temperature: 0.8,
  //     });

  //     let subScoreArray = Object.keys(subscaleScores).map(
  //       (category, index) => ({
  //         subscore: subscaleScores[category],
  //         subscoreCategory: category,
  //         tips: subscaleResponses[index].choices[0].message.content,
  //       })
  //     );

  //     let suggestions = {
  //       totalScore,
  //       totalScoreTips: totalScoreResponse.choices[0].message.content,
  //       subScore: subScoreArray,
  //     };

  //     setAiSuggestions(suggestions);

  //     const requestData = {
  //       name: formData.name,
  //       email: formData.email,
  //       phoneNumber: formData.phoneNumber,
  //       bestTimeToContact: formData.bestTimeToContact,
  //       totalScore: totalScore,
  //       subScore: subScoreArray,
  //     };

  //     await sendAiFeedbackToBackend({
  //       username: formData.name,
  //       userEmail: formData.email,
  //       suggestions,
  //     });

  //     await createDiscoveryCallRequest(requestData);
  //   } catch (error) {
  //     console.error("AI Error:", error);
  //   }

  //   setLoading(false);
  // };

  const fetchAiSuggestions = async () => {
    setLoading(true);
    const { subscaleScores, totalScore } = calculateScores();

    try {
      const subscaleResponses = await Promise.all(
        Object.keys(subscaleScores).map(async (category) => {
          const score = subscaleScores[category];

          let userMessage = `Category: ${category}  
        Score: ${score}  
        
        This response should come from "Inspire Mental Fitness" and feel like a personal, supportive message from the company.  
        
        If the score is low (0-49):  
        - Offer encouragement and reassurance.  
        - Suggest ways to improve with a growth mindset.  
        - Let the user know that Inspire Mental Fitness is here to support them if they need help.  
        
        If the score is moderate (50-79):  
        - Acknowledge their progress while encouraging further growth.  
        - Provide motivation and reinforcement.  
        
        If the score is high (80-100):  
        - Celebrate their achievement while emphasizing continuous self-improvement.  
        - Encourage them to maintain their success and keep growing.  
        
        Make the response feel warm, supportive, and directly from Inspire Mental Fitness. Keep it in simple text, no lists, no special characters, and make it feel like a natural conversation.  
        
        Only mention that the user can reach out for support if their score is 50 or below.`;

          const data = {
            messages: [{ role: "user", content: userMessage }],
            max_tokens: 500,
          };

          return await openAiService(data);
        })
      );

      let totalScoreMessage = `My Total Score: ${totalScore}  
    
    This response should come from "Inspire Mental Fitness" and provide a general overview of the user's overall mental fitness based on their score.  
    
    If the total score is low (0-49):  
    - Offer encouragement, highlighting areas of growth.  
    - Let the user know that Inspire Mental Fitness is here to support them if they need guidance.  
    
    If the total score is moderate (50-79):  
    - Acknowledge their progress while encouraging further growth.  
    - Provide motivation to keep improving.  
    
    If the total score is high (80-100):  
    - Celebrate their mental strength and encourage them to maintain their success.  
    - Reinforce that even strong performers can continue to grow.  
    
    Make the response feel warm, positive, and directly from Inspire Mental Fitness. Keep it in simple text, no lists, no special characters, and make it feel like a natural conversation.  
    
    Only mention that the user can reach out for support if their total score is 50 or below.`;

      const totalScoreResponse = await openAiService({
        messages: [{ role: "user", content: totalScoreMessage }],
        max_tokens: 600,
      });

      let subScoreArray = Object.keys(subscaleScores).map(
        (category, index) => ({
          subscore: subscaleScores[category],
          subscoreCategory: category,
          tips: subscaleResponses[index]?.choices?.[0]?.message?.content || "",
        })
      );

      let suggestions = {
        totalScore,
        totalScoreTips:
          totalScoreResponse?.choices?.[0]?.message?.content || "",
        subScore: subScoreArray,
      };

      setAiSuggestions(suggestions);

      const requestData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        bestTimeToContact: formData.bestTimeToContact,
        totalScore,
        subScore: subScoreArray,
      };

      await sendAiFeedbackToBackend({
        username: formData.name,
        userEmail: formData.email,
        suggestions,
      });

      await createDiscoveryCallRequest(requestData);
    } catch (error) {
      console.error("AI Error:", error);
    }

    setLoading(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header className="position-relative" closeButton>
        <Modal.Title>Discover Test</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === -1 ? (
          <>
            <Form.Control
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-3"
            />
            <Form.Select
              name="bestTimeToContact"
              value={formData.bestTimeToContact}
              onChange={handleInputChange}
              required
              className="mt-3"
            >
              <option value="">Best Time to Contact</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </Form.Select>
            <PhoneInput
              value={formData.phoneNumber}
              onChange={handleInputChange}
              defaultCountry="US"
              required
              className="mt-3"
            />
            <Button
              variant="success"
              className="w-100 mt-3"
              onClick={() => setStep(0)}
            >
              Start
            </Button>
          </>
        ) : step < 28 ? (
          <>
            <Form.Label>{`Q${step + 1}: ${ACSIQuestions[step]}`}</Form.Label>
            {options.map((option, index) => (
              <Form.Check
                key={index}
                type="radio"
                name={`question-${step}`}
                label={option}
                value={index}
                checked={responses[step] === index}
                onChange={(e) => handleQuestionChange(step, e.target.value)}
              />
            ))}
            <Button
              variant="success"
              className="w-100 mt-3"
              onClick={() => {
                if (step === 27) {
                  fetchAiSuggestions();
                }
                setStep(step + 1);
              }}
              disabled={responses[step] === null}
            >
              {step === 27 ? "Get Results" : "Next"}
            </Button>
          </>
        ) : loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
          </div>
        ) : (
          <div>
            <h4 className="mb-4 text-center ff-gotham-bold">
              🎉 Congratulations!
            </h4>
            <p className="text-center ff-gotham-normal">
              You've completed your mental fitness test
            </p>
            <div className="p-3 border rounded mb-3">
              <h5 className="ff-gotham-medium">
                Total Score: {aiSuggestions.totalScore}
              </h5>
              <p className=" ff-gotham-normal">
                {aiSuggestions.totalScoreTips}
              </p>
            </div>
            <Button
              variant="success"
              className="w-100 mt-3"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TryInspireModal;
