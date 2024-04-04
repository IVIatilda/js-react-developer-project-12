import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import loginImg from "../../assets/images/registration.jpeg";
import { userSignup } from "../../api/api";
import { actions as usersActions } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const initialValues = {
    username: "",
    password: "",
    repeatPassword: "",
};

export const SignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .trim()
            .min(3, t("errors.username"))
            .max(20, t("errors.username"))
            .required(t("errors.required")),
        password: Yup.string()
            .trim()
            .min(6, t("errors.password"))
            .required(t("errors.required")),
        repeatPassword: Yup.string()
            .trim()
            .required(t("errors.required"))
            .oneOf([Yup.ref("password"), null], t("errors.repeatPassword")),
    });

    const submitForm = (setSubmitting) => {
        userSignup(setSubmitting)
            .then((response) => {
                dispatch(usersActions.userLogin(response.data));
                navigate("/");
            })
            .catch((error) => {
                if (error.request.status === 409) {
                    formik.setErrors({
                        username: t("errors.userIsset"),
                    });
                } else {
                    formik.setErrors({
                        username: t("errors.serverError"),
                    });
                }
            });
    };
    const formik = useFormik({
        initialValues,
        validationSchema: SignupSchema,
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
                                {t("headers.register")}
                            </h1>
                            <FloatingLabel
                                label={t("placeholders.username")}
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder={t("placeholders.username")}
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    name="username"
                                    isInvalid={
                                        formik.errors.username &&
                                        !!formik.touched.username
                                    }
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {formik.errors.username &&
                                    formik.touched.username ? (
                                        <div>
                                            {formik.errors.username.toString()}
                                        </div>
                                    ) : null}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel
                                label={t("placeholders.password")}
                                className="mb-4"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder={t("placeholders.password")}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    isInvalid={
                                        formik.errors.password &&
                                        !!formik.touched.password
                                    }
                                    name="password"
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {formik.errors.password &&
                                    formik.touched.password ? (
                                        <div>
                                            {formik.errors.password.toString()}
                                        </div>
                                    ) : null}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel
                                label={t("placeholders.repeatPassword")}
                                className="mb-4"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder={t("placeholders.repeatPassword")}
                                    onChange={formik.handleChange}
                                    value={formik.values.repeatPassword}
                                    isInvalid={
                                        formik.errors.repeatPassword &&
                                        !!formik.touched.repeatPassword
                                    }
                                    name="repeatPassword"
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {formik.errors.repeatPassword &&
                                    formik.touched.repeatPassword ? (
                                        <div>
                                            {formik.errors.repeatPassword.toString()}
                                        </div>
                                    ) : null}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            <div className="d-grid gap-2">
                                <Button
                                    variant="w-100 mb-3 btn btn-outline-primary"
                                    type="submit"
                                >
                                    {t("buttons.register")}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};
