import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Regi5Form from "./components/register/Register5/Regi5Form.jsx";
import Regi3Form from "./components/register/Register3/Regi3Form.jsx";
import Nbti from "./components/register/Nbti.jsx";
import { Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* <Routes>
      <Route path="/" element={<Nbti />} />
      <Route path="/new" element={<Regi3Form />} />
      <Route path="/meet" element={<Regi5Form />} />
      <Route path="*" element={<App />} />
    </Routes> */}
  </React.StrictMode>
);
