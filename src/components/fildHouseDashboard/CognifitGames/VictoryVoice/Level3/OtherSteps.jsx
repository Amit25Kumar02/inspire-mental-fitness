import React, { useEffect, useState } from "react";
import { getLevel2Status, moveLevel2Request, setLevel2Step } from "../../../../../redux/slice/GamesSlice";
import { useDispatch, useSelector } from "react-redux";
import SquareIcon from "../../../../../assets/image/svg/sad-square-icon.svg";
import StepOneImg from "../../../../../assets/image/png/steponeimg.png";
import Progress3 from "./Progress3";

const OtherSteps = ({ data, subData, optId, defaultImg }) => {
    const { isSubmit } = useSelector((state) => state.games);
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const [selectedval, setSelectedval] = useState(null);
    const [isMultiOpt, setIsMultiOpt] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
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

    const handleMulti = (answer, optionsData) => {
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
                        selectedOption: { "0": [...optionsData, ...(Array.isArray(subData) ? subData : []) ] },
                        status: correctData[0]?.status,
                    }
                ]
            };
            if(optId) submitdata.id = optId;
            
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
        setShuffle1(mix1);
    }, [data?.answers]);

    useEffect(() => {
        if (data?.answers?.filter((item) => item.value === selectedval)[0]?.options) {
            const mix2 = shuffleArray(data?.answers?.filter((item) => item.value === selectedval)[0]?.options);
            setShuffle2(mix2);
        }
    }, [data?.answers, selectedval]);

    //multi option answer checking
    useEffect(() => {
        if (data?.answers?.find(item => Array.isArray(item?.options) && item?.options?.length !== 0)) {
            setIsMultiOpt(true);
        }
    }, [data?.answers]);

    return (
        <div>
            <Progress3 step={data?.step} isLast={data?.day === 6 ? true : false} />
            <div className="container-xxl text-center">
                <div className="my-md-5 my-4">
                    <h6 className="text-uppercase fw-normal stage-text">
                        Stage {data?.stage} – {data?.scenario}
                    </h6>
                    <h2 className="text-white fw-bold">{data?.question}</h2>
                </div>

               {(data?.stage !==5 && data?.stage !== 6) && <p className="text-light mb-4 h6">Please select the correct scenario</p>}

                <div className="Steps-two-img-wrap for-mobile-img d-lg-none d-block">
                    <img src={defaultImg} alt="StepOneImg" className="img-fluid" />
                </div>

                <div className="row justify-content-center">
                    {/* Render answers when no options are selected */}
                    {selectedval === null &&
                        shuffle1?.map((answer, idx) => (
                            <div key={idx} className="col-12 col-md-4 col-lg-2 mb-3">
                                <div
                                    className={`card step-second-answer-box ${selected === answer?.value ? "bg-dark text-white" : Array.isArray(subData) && subData?.find((itm) => itm?.selectedValue === answer?.value) ? "light-back-txt" : "bg-white light-back-txt"
                                        }`}
                                    style={{
                                        cursor: Array.isArray(subData) && subData?.find((itm) => itm?.selectedValue === answer?.value) ? "auto" : "pointer",
                                        background: Array.isArray(subData) && subData?.find((itm) => itm?.selectedValue === answer?.value) ? '#8f8f87' : ''
                                    }}
                                    onClick={() => {
                                        if (Array.isArray(subData) && subData?.find((itm) => itm?.selectedValue === answer?.value)) return;

                                        if (isMultiOpt) {
                                            setSelectedval(answer?.value);
                                            setShowOptions(true);
                                        } else {
                                            handleAnswer(answer);
                                        }
                                    }}
                                >
                                    <p className={`${Array.isArray(subData) && subData?.find((itm) => itm?.selectedValue === answer?.value) && 'd-flex align-items-center justify-content-center gap-2 '}mb-0 h6`}>
                                        {answer?.value}
                                        {Array.isArray(subData) && subData?.find((itm) => itm?.selectedValue === answer?.value) && 
                                        <i className="bi bi-check-circle-fill"></i>}
                                    </p>
                                </div>
                            </div>
                        ))}

                    {/* Render options for the selected answer */}
                    {/* {selectedval !== null && (
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
                    )} */}
                </div>

                {/* Options modal */}
                {showOptions && selectedval !== null && (
                    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}>
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content rounded-4 shadow position-relative">
                                <div className="modal-body text-center px-4 py-5">
                                    <span className="try-again-popup-close-btn">
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => {
                                                setSelectedval(null);
                                                setShowOptions(false);
                                            }}
                                        ></button>
                                    </span>
                                    <div className="row justify-content-center">
                                        {shuffle2?.map((option, index) => (
                                            <div key={index} className="col-12 col-md-4 col-lg-3 mb-3">
                                                <div
                                                    className={`card step-second-answer-box ${selected === option?.value ? "bg-dark text-white" : "bg-white light-back-txt"
                                                        }`}
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => {
                                                        let defaultdata = [
                                                            {
                                                                selectedValue: selectedval,
                                                                selectedOption: {
                                                                    selectedValue: option?.value,
                                                                }
                                                            }
                                                        ];
                                                        handleMulti(option, defaultdata);
                                                        // setSelectedval(null);
                                                    }}
                                                >
                                                    <p className="mb-0 h6">{option?.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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