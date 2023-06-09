import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import Register from "./pages/Register";
import CustomNavbar from "./components/Nav";
import { NotFoundTitle } from "./pages/404Page";

function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const content = await response.json();
        setName(content.name);
      } else {
        setName("");
      }
    })();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <CustomNavbar name={name} setName={setName} />
        <Routes>
          <Route path="/" Component={() => <Login setName={setName} />} />
          <Route path="/home" Component={() => <Home />} />
          <Route
            path="/em-desenvolvimento"
            Component={() => <NotFoundTitle />}
          />
          <Route path="/register" Component={Register} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
