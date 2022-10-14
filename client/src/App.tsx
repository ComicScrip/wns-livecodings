import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./screens/Home";
import SkillsAdmin from "./screens/SkillsAdmin";
import { Toaster } from "react-hot-toast";
import WilderDetails from "./screens/WilderDetails";
import EditWilder from "./components/EditWilder";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <Header />
      <main className="container pb-8 bg-cream">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<SkillsAdmin />} />
          <Route path="/wilders/:id" element={<WilderDetails />} />
          <Route path="/wilders/:id/edit" element={<EditWilder />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
