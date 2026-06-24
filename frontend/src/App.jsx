import "./index.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AuthModal } from "./components/AuthModal";
import { GameModal } from "./components/GameModal";
import { LibraryModal } from "./components/LibraryModal";
import { useState, useEffect } from "react";
import { Footer } from "./components/Footer";
import { Reviews } from "./components/Reviews";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
  const [gameToEdit, setGameToEdit] = useState(null);
  const [user, setUser] = useState(null);
  const [refreshData, setRefreshData] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);
  const handleOpenNewGame = () => {
    setGameToEdit(null);
    setIsGameModalOpen(true);
  };
  const handleDataChanged = () => {
    setRefreshData(refreshData + 1);
  };

  return (
    <>
      <Header
        user={user}
        setUser={setUser}
        onOpenLogin={() => setIsAuthModalOpen(true)}
        onOpenNewGame={handleOpenNewGame}
        onOpenLibrary={() => setIsLibraryModalOpen(true)}
      />

      <main>
        <Hero onOpenNewGame={handleOpenNewGame} />
        <Reviews refreshTrigger={refreshData} />
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(loggedInUser) => setUser(loggedInUser)}
      />

      <GameModal
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
        gameToEdit={gameToEdit}
        onSaveSuccess={handleDataChanged}
      />

      <LibraryModal
        isOpen={isLibraryModalOpen}
        onClose={() => setIsLibraryModalOpen(false)}
        onEditGame={(jogo) => {
          setGameToEdit(jogo);
          setIsLibraryModalOpen(false);
          setIsGameModalOpen(true);
        }}
        onDeleteSuccess={handleDataChanged}
      />
    </>
  );
}

export default App;
