import "./index.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AuthModal } from "./components/AuthModal";
import { useState } from "react";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <Header onOpenLogin={() => setIsAuthModalOpen(true)} />
      <main>
        <Hero />
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>


  );
}

export default App;
