import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IntroVideo from "./components/IntroVideo";

import Home from "./pages/Home";
import TodoApp from "./pages/TodoApp";
import FlipCoinApp from "./pages/FlipCoinApp";
import RightWrongGame from "./pages/RightWrongGame";
import RightWrongGrid from "./pages/RightWrongGrid";
import TermsConditions from "./pages/TermsConditions";

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
    setLoading(false);
  }, []);

  const handleVideoEnd = () => {
    sessionStorage.setItem("introPlayed", "true");
    setShowIntro(false);
  };

  if (loading) return null;

  if (showIntro) {
    return <IntroVideo onFinish={handleVideoEnd} />;
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
      </Routes>

      <Footer />
    </main>
  );
};

export default App;