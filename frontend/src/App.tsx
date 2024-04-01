import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/main";
import { LoginPage } from "./pages/login";
import { NotFoundPage } from "./pages/404";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function App() {
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

    return (
        <div className="d-flex flex-column h-100">
            <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                <div className="container justify-content-between">
                    <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
                    <Button type="submit">Submit</Button>
                </div>
            </Navbar>
            <div className="d-flex flex-column h-100 bg-body-tertiary">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

