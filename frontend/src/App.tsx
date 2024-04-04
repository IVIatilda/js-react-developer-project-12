import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/main";
import { LoginPage } from "./pages/login";
import { NotFoundPage } from "./pages/404";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { SignupPage } from "./pages/signup";
import { actions as usersActions } from "./slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { Provider, ErrorBoundary } from "@rollbar/react";

const rollbarConfig = {
    accessToken: "a070cd6a84bd42bbb1a352271473b304",
    environment: "testenv",
};

function App() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const isAuth = useSelector((state: any) => state.user.token);

    if (username && token) {
        dispatch(usersActions.userLogin({ username, token }));
    }

    useEffect(() => {
        const rootElement = document.getElementById("root");
        if (rootElement) {
            rootElement.classList.add("h-100");
        }
        return () => {
            if (rootElement) {
                rootElement.classList.remove("my-root-class");
            }
        };
    }, []);

    const userLogout = () => {
        dispatch(usersActions.userLogout());
    };

    return (
        <Provider config={rollbarConfig}>
            <ErrorBoundary>
                <div className="d-flex flex-column h-100">
                    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container justify-content-between">
                            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
                            {isAuth && (
                                <Button type="button" onClick={userLogout}>
                                    {t("buttons.logout")}
                                </Button>
                            )}
                        </div>
                    </Navbar>
                    <div className="d-flex flex-column h-100 bg-body-tertiary">
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<MainPage />} />
                                <Route path="login" element={<LoginPage />} />
                                <Route path="signup" element={<SignupPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </BrowserRouter>
                    </div>
                    <ToastContainer />
                </div>
            </ErrorBoundary>
        </Provider>
    );
}

export default App;

