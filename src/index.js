import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Revamped from "./Presentation/Pages/Revamped";
import reportWebVitals from "./reportWebVitals";
import DieProvider from "./Presentation/Context/DieProvider";
import DieSkinProvider from "./Presentation/Context/DieSkinProvider";
import "./Presentation/Pages/Revamped.css";
import { ThemeProvider } from "./Presentation/Context/ThemeContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <DieSkinProvider>
        <DieProvider>
          <ThemeProvider>
            <Revamped />
          </ThemeProvider>
        </DieProvider>
      </DieSkinProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
