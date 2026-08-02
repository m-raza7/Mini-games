import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppLoader from "./components/AppLoader";
import IntroVideo from "./components/IntroVideo";

import Home from "./pages/Home";
import TodoApp from "./pages/TodoApp";
import FlipCoinApp from "./pages/FlipCoinApp";
import RightWrongGame from "./pages/RightWrongGame";
import RightWrongGrid from "./pages/RightWrongGrid";
import TermsConditions from "./pages/TermsConditions";
import ExpenseTracker from "./pages/ExpenseTracker/ExpenseTracker";

const App = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const introPlayed = sessionStorage.getItem("introPlayed");

    if (introPlayed) {
      setLoading(false);
      return;
    }

    setShowIntro(true);

    const timer = setTimeout(() => {
      sessionStorage.setItem("introPlayed", "true");
      setShowIntro(false);
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading && !showIntro) {
    return null;
  }

  if (showIntro) {
    return <AppLoader />;
  }

  return (
    <main>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<TodoApp />} />
        <Route path="/flip-coin" element={<FlipCoinApp />} />
        <Route path="/right-wrong" element={<RightWrongGame />} />
        <Route path="/right-wrong-grid" element={<RightWrongGrid />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
      </Routes>

      {/* <Footer /> */}
    </main>
  );
};

export default App;