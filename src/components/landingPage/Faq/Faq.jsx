import React from "react";
import { Accordion } from "react-bootstrap";
import "./Faq.css";

const faqData = [
  {
    title: "General Questions",
    items: [
      {
        question: "What is Inspire Mental Fitness?",
        answer:
          "An interactive platform consisting of mental health professionals that specialize in sports performance for the aspiring young athlete.",
      },
      {
        question: "Who is Inspire Mental Fitness for?",
        answer:
          "Inspire Mental Fitness caters to the individual athlete, teams, and clubs/organizations that emphasize the importance of mental health in their curriculums.",
      },
      {
        question: "What sports does Inspire Mental Fitness cater to?",
        answer:
          "Inspire Mental Fitness works across the spectrum of all individual and team sports.",
      },
      {
        question: "How does Inspire Mental Fitness work?",
        answer:
          "Inspire Mental Fitness is an interactive platform that encourages the athlete to engage in shaping their mental fitness by utilizing the features crafted by mental health and sports performance professionals.",
      },
      {
        question: "What are the benefits of using Inspire Mental Fitness?",
        answer:
          "Our platform enables the athlete to focus on their minds and overcome any issues that are holding them back from performing at their best.",
      },
      {
        question: "How much does Inspire Mental Fitness cost?",
        answer:
          "The subscription cost for an individual athlete is $12.00 monthly or $120.00 annually. For teams or clubs, pricing will vary depending on the plan. Additional costs apply for mental fitness counseling programs, with health insurance options if covered by your provider.",
      },
      {
        question: "How do I sign up for Inspire Mental Fitness?",
        answer:
          "Individual athletes can click 'Subscribe' to begin. Teams and clubs are assigned a relationship manager for easy onboarding.",
      },
      {
        question: "Can I cancel my subscription at any time?",
        answer:
          "Yes, you may cancel at any time if you find the Inspire platform is not suitable for you.",
      },
      {
        question: "How secure is my personal information on the platform?",
        answer:
          "Inspire Mental Fitness is safe, secure, and HIPAA-compliant. Please review our Privacy Notice on the platform for more details.",
      },
    ],
  },
  {
    title: "For Athletes",
    items: [
      {
        question: "What types of mental fitness training plans are available?",
        answer:
          "Our platform offers subscription-based self-navigating pathways with tools for athletes to enhance their mental performance. We also offer 3- and 6-month individual plans with one-on-one virtual counseling.",
      },
      {
        question: "How do I know which mental training plan is right for me?",
        answer:
          "Our licensed counseling team will discuss and recommend the best plan for your pathway to peak mental fitness.",
      },
      {
        question: "Can I track my progress on the platform?",
        answer:
          "Yes, we offer interactive self-discovery assessments and badges for completing assessments on topics associated with your mental health and performance.",
      },
      {
        question: "What are the benefits of journaling?",
        answer:
          "Journaling allows athletes to record their journey, view their growth, and learn from the past to improve mental performance over time.",
      },
    ],
  },
  {
    title: "For Coaches",
    items: [
      {
        question: "How can Inspire Mental Fitness help me be a better coach?",
        answer:
          "Inspire provides resources in the Coaching Room, including workshops and presentations on athlete and coach mental health, giving coaches tools to guide athletes towards positive outcomes.",
      },
      {
        question: "Can I track my athletes' progress on the platform?",
        answer:
          "Coaches can track progress through team chat and permissible journal entries required as part of the mental fitness pathway.",
      },
      {
        question: "How can I use the platform to communicate with my athletes?",
        answer:
          "Team Chat is available for interaction between coaches, teams, and athletes as part of the curriculum.",
      },
      {
        question: "What are the benefits of accessing athlete journals?",
        answer:
          "Self-reflection is key to a healthier mind. Sharing reflective thoughts with the counselor, coach, and team supports athlete's growth.",
      },
    ],
  },
  {
    title: "For Parents",
    items: [
      {
        question: "How can Inspire Mental Fitness help my child athlete?",
        answer:
          "Inspire uses a whole-child-centered approach, encouraging evaluations to identify if one-on-one counseling is needed for sports and life performance.",
      },
      {
        question:
          "How can I be involved in my child's mental fitness training?",
        answer:
          "It’s a team effort involving the counselor, athlete, and parent, with everyone working towards the same pathway to peak mental fitness.",
      },
      {
        question: "How do I book a counseling session for my child?",
        answer:
          "Follow the prompts on the platform to choose a date and time for a counseling session. A confirmation email will follow with additional instructions.",
      },
      {
        question: "Can I track my child's progress on the platform?",
        answer:
          "Yes, upon subscription or onboarding, you’ll receive user credentials for your athlete to access the platform.",
      },
    ],
  },
  {
    title: "The Arena",
    items: [
      {
        question:
          "What types of presentations and workshops are offered in The Arena?",
        answer:
          "Special guest speakers present on topics related to mental health and performance in sports.",
      },
      {
        question: "How can I access The Arena?",
        answer: "Subscribe to the platform and enter the portal.",
      },
      {
        question: "Are the presentations live or pre-recorded?",
        answer:
          "Presentations are both live and pre-recorded, and stored in the library for future viewing.",
      },
      {
        question: "Can I interact with the speakers in The Arena?",
        answer:
          "Interaction is limited and managed based on time constraints. Questions can be submitted via the chat option on the portal.",
      },
    ],
  },
];

const Faqs = () => {
  return (
    <div className="faq-bg-theme">
      <div className="container py-5">
        <h2 className="mb-4 ff-gotham-bold fs-56 text-center mx-auto elevated-text">
          Frequently Asked <span className="elevate-text">Questions</span>
        </h2>
        <Accordion defaultActiveKey="0">
          {faqData.map((section, index) => (
            <Accordion.Item
              key={index}
              eventKey={String(index)}
              className="border border-2"
            >
              <Accordion.Header className="fs_24 ff-gotham-bold">
                {section.title}
              </Accordion.Header>
              <Accordion.Body>
                <Accordion>
                  {section.items.map((item, subIndex) => (
                    <Accordion.Item
                      key={subIndex}
                      eventKey={`${index}-${subIndex}`}
                    >
                      <Accordion.Header className="ff-gotham-medium">
                        {item.question}
                      </Accordion.Header>
                      <Accordion.Body className="ff-gotham-normal">
                        {item.answer}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Faqs;
