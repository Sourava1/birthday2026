import { useState, lazy, Suspense } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import BigSphere from "./Components/BigSphere/BigSphere";
import Icosahedron from "./Components/Icosahedron/Icosahedron";
import ResponsiveCamera from "./Components/ReponsiveCamera";
import Loading from "./Components/Loading";
import BirthdayCarousel from "./Components/BirthdayCarousel/BirthdayCarousel";

function App() {
  const [state, setState] = useState<boolean>(false);
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);

  const handleStartVisualizer = () => {
    // Unlock and resume AudioContext immediately inside the user touch/click gesture
    import("three").then(({ AudioContext: ThreeAudioContext }) => {
      try {
        const ctx = ThreeAudioContext.getContext();
        if (ctx && ctx.state === "suspended") {
          ctx.resume();
        }
      } catch (e) {
        // ignore
      }
    });
    setState(true);
  };

  return (
    <main>
      <Leva hidden />

      {state ? (
        <>
          {/* Floating Birthday Badge in Visualizer */}
          <div
            className="visualizer-overlay"
            onClick={() => setShowPhotoModal(true)}
            title="Click to view photo"
          >
            <img src="/images/riyaa.jpeg" alt="Riya" className="visualizer-avatar" />
            <div className="visualizer-info">
              <span className="visualizer-title">Happy Birthday, Riya 🎂</span>
              <span className="visualizer-status">Now Playing 🎵</span>
            </div>
          </div>

          <button className="back-btn" onClick={() => setState(false)}>
            ← Photo Gallery
          </button>

          {/* Lightbox Modal */}
          {showPhotoModal && (
            <div
              className="photo-modal-backdrop"
              onClick={() => setShowPhotoModal(false)}
            >
              <div
                className="photo-modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="photo-modal-close"
                  onClick={() => setShowPhotoModal(false)}
                >
                  ✕
                </button>
                <img
                  src="/images/riyaa.jpeg"
                  alt="Happy Birthday Riya"
                  className="photo-modal-img"
                />
                <div className="photo-modal-caption">
                  Happy Birthday, Riya! 🎂
                </div>
              </div>
            </div>
          )}

          <Canvas camera={{ fov: 75 }}>
            <color attach={"background"} args={["#0d021f"]} />
            <Suspense fallback={<Loading />}>
              <group>
                <Icosahedron />
                <ResponsiveCamera />
                <BigSphere />
              </group>
              <perspectiveCamera />
            </Suspense>
          </Canvas>
        </>
      ) : (
        <BirthdayCarousel onStartVisualizer={handleStartVisualizer} />
      )}
    </main>
  );
}

export default App;
