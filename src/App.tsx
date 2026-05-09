import { useEffect } from "react";
import { MorphStage } from "./components/layout/MorphStage";
import { WhatsAppButton } from "./components/ui/whatsapp-button";

function App() {
  // Lock body scroll — morph handles all navigation via wheel/touch/keyboard.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <>
      <MorphStage />
      <WhatsAppButton />
    </>
  );
}

export default App;
