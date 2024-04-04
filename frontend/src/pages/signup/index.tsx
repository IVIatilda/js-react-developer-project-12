import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import loginImg from "../../assets/images/registration.jpeg";
import { UserLoginDto } from "../../api/dto";
import { userSignup } from "../../api/api";
import { actions as usersActions } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .min(3, "От 3 до 20 символов")
        .max(20, "От 3 до 20 символов")
        .required("Обязательное поле"),
    password: Yup.string()
        .trim()
        .min(6, "Не менее 6 символов")
        .required("Обязательное поле"),
    repeatPassword: Yup.string()
        .trim()
        .required("Обязательное поле")
        .oneOf([Yup.ref("password"), null], "Пароли не совпадают"),
});

const initialValues = {
    username: "",
    password: "",
    repeatPassword: "",
};

export const SignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitForm = (setSubmitting) => {
        userSignup(setSubmitting)
            .then((response) => {
                // localStorage.setItem("token", response.data.token);
                // localStorage.setItem("username", response.data.username);
                dispatch(usersActions.userLogin(response.data));
                navigate("/");
            })
            .catch((error) => {
                if (error.request.status === 409) {
                    formik.setErrors({
                        username: "Такой пользователь уже существует",
                    });
                } else {
                    formik.setErrors({
                        username: "Ошибка сервера. Попробуйте позже.",
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
                            <h1 className="text-center mb-4">Регистрация</h1>
                            <FloatingLabel
                                label="Имя пользователя"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Имя пользователя"
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
                            <FloatingLabel label="Пароль" className="mb-4">
                                <Form.Control
                                    type="password"
                                    placeholder="Пароль"
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
                                label="Подтвердите пароль"
                                className="mb-4"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Подтвердите пароль"
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
                                    Зарегистрироваться
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};
