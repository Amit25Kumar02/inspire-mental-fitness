import React, { useEffect, useState } from "react";
import { getLevel2Status, moveLevel2Request, setLevel2Step } from "../../../../../redux/slice/GamesSlice";
import { useDispatch, useSelector } from "react-redux";
import SquareIcon from "../../../../../assets/image/svg/sad-square-icon.svg";
import StepOneImg from "../../../../../assets/image/png/steponeimg.png";
import Progress4 from "./Progress4";

const OtherSteps = ({ data, defaultImg }) => {
    const { level2Step, isSubmit, level3Day5 } = useSelector((state) => state.games);
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const [selectedval, setSelectedval] = useState(null);
    const [shuffle1, setShuffle1] = useState([]);
    const [shuffle2, setShuffle2] = useState([]);

    const handleAnswer = async (answer) => {
        setSelected(answer?.value);
        if (!answer?.status) {
            setShowModal(true);
        } else if (answer?.status) {
            const correctData = data?.answers?.filter((item) => item?.status === true);
            const submitdata = {
                level: data?.level,
                stage: data?.stage,
                day: data?.day,
                step: data?.step,
                answers: [
                    {
                        questionId: data?._id,
                        selectedValue: correctData[0]?.value,
                        status: correctData[0]?.status,
                    },
                ],
            };
            dispatch(moveLevel2Request(submitdata));
            setTimeout(() => {
                setSelected(null);
            }, 1000);
        }
    };

    const handleMulti = (answer) => {
        setSelected(answer?.value);
        if (!answer?.status) {
            setShowModal(true);
        } else if (answer?.status) {
            const correctData = data?.answers?.filter((item) => item.value === selectedval)[0]?.options?.filter((item) => item?.status === true);
            const submitdata = {
                level: data?.level,
                stage: data?.stage,
                day: data?.day,
                step: data?.step,
                answers: [
                    {
                        questionId: data?._id,
                        selectedValue: correctData[0]?.value,
                        selectedOption: {
                            selectedValue: selectedval,
                            selectedOption: {
                                selectedValue: correctData[0]?.value,
                            }
                        },
                        status: correctData[0]?.status,
                    },
                ],
            };
             dispatch(moveLevel2Request(submitdata));
             setSelectedval(null);
            setTimeout(() => {
                setSelected(null);
            }, 1000);
        }
    };

    useEffect(() => {
        if (isSubmit) {
            dispatch(getLevel2Status());
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
            if (data?.answers?.filter((item) => item.value === selectedval)[0]?.options) {
                const mix2 = shuffleArray(data?.answers?.filter((item) => item.value === selectedval)[0]?.options);
                setShuffle2(mix2);
            }
        }, [data?.answers, selectedval]);

    return (
        <div>
            <Progress4 step={data?.step} />
            <div className="d-flex flex-column justify-content-center align-items-center text-center">
                <div className="my-md-5 my-4">
                    <h6 className="text-uppercase fw-normal stage-text">
                        Stage {data?.stage} – {data?.scenario}
                    </h6>
                    <h2 className="text-white fw-bold">{data?.question}</h2>
                </div>

                <p className="text-light mb-4 h6">Please Select the Correct Answer</p>

                <div className="Steps-two-img-wrap for-mobile-img d-lg-none d-block">
                    <img src={defaultImg} alt="StepOneImg" className="img-fluid" />
                </div>

                <div className="row justify-content-center">
                    {/* Render answers when no options are selected */}
                    {selectedval === null &&
                        shuffle1?.map((answer, idx) => (
                            <div key={idx} className={`col-12 col-md-4 col-lg-${shuffle1?.length > 2 ? '3': '6'} mb-3`}>
                                <div
                                    className={`card step-second-answer-box ${selected === answer?.value ? "bg-dark text-white" : "bg-white light-back-txt"
                                        }`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        if (answer?.options?.length > 0) {
                                            setSelectedval(answer?.value);
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
            </div>

            <div className="Steps-two-img-wrap for-desktop-img d-lg-block d-none">
                <img src={defaultImg} alt="StepOneImg" className="img-fluid" />
            </div>
        </div>
    );
};

export default OtherSteps;