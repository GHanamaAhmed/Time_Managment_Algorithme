import { useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./form";
import Simulator from "./xarrows";
import Context from "./context";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/simulator" element={<Simulator />} />
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;
