import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createVictoryVoiceRequest } from "../../../../../redux/slice/GamesSlice";
import TextArea from "antd/es/input/TextArea";
import StepSevenImg from "../../../../../assets/image/png/StepSevenImg.png";
import StepsProgress from "../StepsProgress";

const Step7 = () => {
    const { levelnumber, stepnumber, gameId, gameData, stage, levelNumber, stageNumber, stepNumber } = useSelector((state) => state.games);
    const dispatch = useDispatch();
    const validationSchema = Yup.object().shape({
        thing1: Yup.string().trim().required("Please enter your one thing"),
        thing2: Yup.string().trim().required("Please enter your second thing"),
        thing3: Yup.string().trim().required("Please enter your third thing"),
    });

    const getLocalDate = () => {
        const today = new Date();
        const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
        return local.toISOString().split("T")[0];
    };

    const handleSubmit = async (values) => {
        const valData = Object.values(values);
        const payloaddata = {
            currentLevel: levelNumber,
            step: stepNumber + 1,
            id: gameId,
            things: {
                one: valData[0],
                two: valData[1],
                three: valData[2]
            },
            stage: stageNumber
        };
        dispatch(createVictoryVoiceRequest(payloaddata));
    };

    return (
        <div className="position-relative step-one-main-div-wrap">
            <StepsProgress />
            <div className="d-flex flex-column align-items-center justify-content-center mt-2">
                <div className="things-today-container">
                    <h2 className="text-center mb-4 h2 fw-bold text-white">3 things I did well today</h2>

                    <Formik
                        initialValues={{ thing1: "", thing2: "", thing3: "" }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => { handleSubmit(values) }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {/* Thing 1 */}
                                <div className="mb-3">
                                    <Field
                                        as={TextArea}
                                        name="thing1"
                                        className="form-control"
                                        placeholder="Enter thing 1"
                                    />
                                    <ErrorMessage
                                        name="thing1"
                                        component="div"
                                        className="text-warning small mt-1 text-start"
                                    />
                                </div>

                                {/* Thing 2 */}
                                <div className="mb-3">
                                    <Field
                                        as={TextArea}
                                        name="thing2"
                                        className="form-control"
                                        placeholder="Enter thing 2"
                                    />
                                    <ErrorMessage
                                        name="thing2"
                                        component="div"
                                        className="text-warning small mt-1 text-start"
                                    />
                                </div>

                                {/* Thing 3 */}
                                <div className="mb-3">
                                    <Field
                                        as={TextArea}
                                        name="thing3"
                                        className="form-control"
                                        placeholder="Enter thing 3"
                                    />
                                    <ErrorMessage
                                        name="thing3"
                                        component="div"
                                        className="text-warning small mt-1 text-start"
                                    />
                                </div>

                                <div className="Steps-two-img-wrap for-mobile-img d-lg-none d-block">
                                    <img src={StepSevenImg} alt="StepOneImg" className="img-fluid" />
                                </div>
                                {/* Submit */}
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn green-btn d-flex ms-auto"
                                        disabled={isSubmitting}
                                    >
                                        Next
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </div>
            </div>

            <div className="Steps-two-img-wrap for-desktop-img d-lg-block d-none">
                <img src={StepSevenImg} alt="StepOneImg" className="img-fluid" />
            </div>
        </div>
    )
};

export default Step7;