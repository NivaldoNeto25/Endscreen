import "./index.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AuthModal } from "./components/AuthModal";
import { GameModal } from "./components/GameModal";
import { LibraryModal } from "./components/LibraryModal";
import { useState } from "react";
import { Footer } from "./components/Footer";
import { Reviews } from "./components/Reviews";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);

  return (
    <>
      <Header
        onOpenLogin={() => setIsAuthModalOpen(true)}
        onOpenNewGame={() => setIsGameModalOpen(true)}
        onOpenLibrary={() => setIsLibraryModalOpen(true)}
      />
      <main>
        <Hero onOpenNewGame={() => setIsGameModalOpen(true)} />
        <Reviews />
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <GameModal
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
      />

      <LibraryModal
        isOpen={isLibraryModalOpen}
        onClose={() => setIsLibraryModalOpen(false)}
      />
    </>
  );
}

export default App;
