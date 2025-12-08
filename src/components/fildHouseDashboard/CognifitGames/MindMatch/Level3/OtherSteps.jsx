import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SquareIcon from "../../../../../assets/image/svg/sad-square-icon.svg";
import { getSubmissionData, setSubmit, submitDataRequest } from "../../../../../redux/slice/Game2Slice";
import { toast } from "react-toastify";
import Progress from "../Progress";

const OtherSteps = ({ data, defaultImg }) => {
    const { isSubmit } = useSelector((state) => state.game2);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isMulti, setIsMulti] = useState(false);
    const dispatch = useDispatch();
    const [selectedval, setSelectedval] = useState(null);
    const [shuffle1, setShuffle1] = useState([]);
    const [shuffle2, setShuffle2] = useState([]);
  const [submitting,setSubmitting] = useState(false);


    const handleAnswer = async (answer) => {
        setSelected(answer?.value);
        if (!answer?.status) {
            setShowModal(true);
        }
    };

    const handleMulti = (answer) => {
        setSelected(answer?.value);
        if (!answer?.status) {
            setShowModal(true);
        }
    };

    const handleNext = async () => {
        // setLoading(true);
        // try {
        if (!selected) {
            toast.error("Select the scenario!!", { toastId: "scenarioId", autoClose: 3000 });
            return;
        }
         if(showModal) return ;

        const { level, stage, day, step, _id, answers } = data || {};

        const submitdata = { level, stage, day, step, answers: [] };
        let correctData;

        if (isMulti) {
            const selectedAnswer = answers?.find((item) => item.value === selectedval);
            correctData = selectedAnswer?.options?.find((opt) => opt.status === true);

            if (!correctData) return;

            submitdata.answers.push({
                questionId: _id,
                selectedValue: correctData.value,
                selectedOption: {
                    selectedValue: selectedval,
                    selectedOption: { selectedValue: correctData.value },
                },
                status: correctData.status,
            });

            setIsMulti(false);
            setSelectedval(null);
        } else {
            correctData = answers?.find((item) => item.status === true);
            if (!correctData) return;

            submitdata.answers.push({
                questionId: _id,
                selectedValue: correctData.value,
                status: correctData.status,
            });
        }

        setSubmitting(true);
        dispatch(submitDataRequest(submitdata));

        setTimeout(() => setSelected(null), 1000);
        // } catch (error) {
        //     console.log(error);
        // } finally {
        //     setLoading(false);
        // }
    };


    useEffect(() => {
        if (isSubmit) {
            dispatch(getSubmissionData());
            dispatch(setSubmit(false));
                setSelected(null);
            setSelectedval(null);
            setSubmitting(false);
        }
    }, [isSubmit]);


    const shuffleArray = (array) => {
         if (!Array.isArray(array)) return [];
        // if(selectedval !== null) return;
        const shuffled = [...array].map((item) => ({ ...item })).sort(() => Math.random() - 0.5);
        return shuffled;
    };

    useEffect(() => {
        const mix1 = shuffleArray(data?.answers);
        //console.log("mix1", mix1, data?.answers);
        setShuffle1(mix1);
    }, [data?.answers]);

    useEffect(() => {
        if(data?.answers?.filter((item) => item.value === selectedval)[0]?.options){
            const mix2 = shuffleArray(data?.answers?.filter((item) => item.value === selectedval)[0]?.options);
            setShuffle2(mix2);
        }
    }, [data?.answers, selectedval]);

    //console.log(data?.answers, shuffle1, shuffle2);

    return (
        <div>
            <div className="d-flex gap-4 flex-column justify-content-center align-items-center text-center">
                <button className="btn green-btn border-rounded">Level 3</button>
                <p className="mb-4 h6 text-uppercase">Spiral – Negative Thought Loop</p>
            </div>

            <Progress step={data?.step} totalSteps={20} />

            <div className="d-flex flex-column justify-content-center align-items-center text-center p-5">
                <div className="my-md-5 my-4">
                    <h6 className="text-uppercase fw-normal">
                        Stage {data?.stage} – {data?.scenario}
                    </h6>
                    <h2 className="fw-bold">{data?.question}</h2>
                </div>

                <p className="mb-4 h6">Please select the correct scenario</p>

                <div className="Steps-two-img-wrap for-mobile-img d-lg-none d-block">
                    <img src={defaultImg} alt="StepOneImg" className="img-fluid" />
                </div>

                <div className="container-fluid px-0">
                    <div className="row justify-content-center">
                        {/* Render answers when no options are selected */}
                        {selectedval === null &&
                             shuffle1?.map((answer, idx) => (
                                <div key={idx} className="col-12 col-md-4 col-lg-3 mb-3">
                                    <div
                                        className={`card step-second-answer-box ${selected === answer?.value ? "bg-dark text-white" : "bg-white light-back-txt"
                                            }`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            if (answer?.options?.length > 0) {
                                                setSelectedval(answer?.value);
                                                setIsMulti(true);
                                            } else {
                                                handleAnswer(answer);
                                            }
                                        }}
                                    >
                                        <p className="mb-0 h6">{answer?.value}</p>
                                    </div>
                                </div>
                            ))}

                        {/* Render options for the selected answer */}
                        {selectedval !== null && (
                            <div className="row justify-content-center">
                                {shuffle2?.map((option, index) => (
                                        <div key={index} className="col-12 col-md-4 col-lg-2 mb-3">
                                            <div
                                                className={`card step-second-answer-box ${selected === option?.value ? "bg-dark text-white" : "bg-white light-back-txt"
                                                    }`}
                                                style={{ cursor: "pointer" }}
                                                onClick={() => handleMulti(option)}
                                            >
                                                <p className="mb-0 h6">{option?.value}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Incorrect answer modal */}
                {showModal && (
                    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content rounded-4 shadow position-relative">
                                <div className="modal-body text-center px-4 py-5">
                                    <span className="try-again-popup-close-btn">
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => {
                                                setSelected(null);
                                                setShowModal(false);
                                            }}
                                        ></button>
                                    </span>
                                    <div className="fs-1 text-danger">
                                        <img src={SquareIcon} alt="SquareIcon" className="img-fluid" />
                                    </div>
                                    <h4 className="my-3 fw-bold">Try Again</h4>
                                    <p className="txt-muted h6 mb-0">
                                        Mistakes are part of learning — give it another shot.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <button className="green-btn d-flex ms-auto" disabled={submitting } onClick={handleNext}>Next</button>
            </div>

            <div className="Steps-two-img-wrap for-desktop-img d-lg-block d-none">
                <img src={defaultImg} alt="StepOneImg" className="img-fluid" />
            </div>
        </div>
    );
};

export default OtherSteps;