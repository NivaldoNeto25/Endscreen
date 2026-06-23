import "./index.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AuthModal } from "./components/AuthModal";
import { GameModal } from "./components/GameModal";
import { useState } from "react";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  return (
    <>
      <Header 
      onOpenLogin={() => setIsAuthModalOpen(true)} 
      onOpenNewGame={() => setIsGameModalOpen(true)}
      />
      <main>
        <Hero onOpenNewGame={() => setIsGameModalOpen(true)}/>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      <GameModal 
        isOpen={isGameModalOpen} 
        onClose={() => setIsGameModalOpen(false)} 
      />
    </>


  );
}

export default App;
