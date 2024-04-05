import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import loginImg from "../../assets/images/login.jpeg";
import { UserLoginDto } from "../../api/dto";
import { userLogin } from "../../api/api";
import { actions as usersActions } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const initialValues: UserLoginDto = {
    username: "",
    password: "",
};

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [errorForm, setErrorForm] = React.useState(false);

    const submitForm = (userInfo: UserLoginDto) => {
        userLogin(userInfo)
            .then((response) => {
                setErrorForm(false);
                dispatch(usersActions.userLogin(response.data));
                navigate("/");
            })
            .catch((error) => {
                if (error.request.status === 401) {
                    setErrorForm(true);
                }
            });
    };
    const formik = useFormik({
        initialValues,
        onSubmit: submitForm,
    });
    return (
        <div className="row justify-content-center align-content-center h-100 m-0">
            <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                    <div className="card-body row p-5">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                            <img
                                src={loginImg}
                                alt="Logo"
                                className="rounded-circle"
                            />
                        </div>
                        <Form
                            className="col-12 col-md-6 mt-3 mt-mb-0"
                            onSubmit={formik.handleSubmit}
                        >
                            <h1 className="text-center mb-4">
                                {t("headers.login")}
                            </h1>
                            <FloatingLabel
                                label={t("placeholders.nickname")}
                                className="mb-3"
                                controlId="usernameField"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder={t("placeholders.nickname")}
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    name="username"
                                    required
                                    isInvalid={errorForm}
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                label={t("placeholders.password")}
                                className="mb-4"
                                controlId="passwordField"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder={t("placeholders.password")}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    required
                                    name="password"
                                    isInvalid={errorForm}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {t("errors.wrongUsernameOrPassword")}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            <div className="d-grid gap-2">
                                <Button
                                    variant="w-100 mb-3 btn btn-outline-primary"
                                    type="submit"
                                >
                                    {t("buttons.login")}
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <div className="card-footer p-4">
                        <div className="text-center">
                            <span>{t("texts.noAccount")}</span>{" "}
                            <a href="/signup">{t("headers.register")}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
