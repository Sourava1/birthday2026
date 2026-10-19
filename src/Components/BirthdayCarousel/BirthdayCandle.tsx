import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import "./BirthdayCandle.css";

interface BirthdayCandleProps {
  onBlowOut?: () => void;
}

const BirthdayCandle: React.FC<BirthdayCandleProps> = ({ onBlowOut }) => {
  const [isBlownOut, setIsBlownOut] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const blastAudioRef = useRef<HTMLAudioElement | null>(null);
  const cakeSongAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload audio files
    blastAudioRef.current = new Audio("/pop.mp3");
    cakeSongAudioRef.current = new Audio("/cake-song.mp3");

    // Initialize microphone blow detection
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          streamRef.current = stream;
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext;
          const audioContext = new AudioContextClass();
          audioContextRef.current = audioContext;

          const analyser = audioContext.createAnalyser();
          analyser.smoothingTimeConstant = 0.8;
          analyser.fftSize = 512;

          const microphone = audioContext.createMediaStreamSource(stream);
          microphone.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const detectBlow = () => {
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const average = sum / dataArray.length;

            if (average > 42) {
              handleBlowOut();
            } else {
              animFrameRef.current = requestAnimationFrame(detectBlow);
            }
          };

          detectBlow();
        })
        .catch((err) => {
          console.log("Microphone access unavailable or denied:", err);
        });
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
      if (cakeSongAudioRef.current) {
        cakeSongAudioRef.current.pause();
      }
    };
  }, []);

  const handleBlowOut = () => {
    if (isBlownOut) return;
    setIsBlownOut(true);

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Play blast pop sound
    if (blastAudioRef.current) {
      blastAudioRef.current.currentTime = 0;
      blastAudioRef.current.play().catch(() => {});
    }

    // Play celebration birthday song
    if (cakeSongAudioRef.current) {
      cakeSongAudioRef.current.currentTime = 0;
      cakeSongAudioRef.current.volume = 0.85;
      cakeSongAudioRef.current.play().catch(() => {});
    }

    // Festive confetti blast
    confetti({
      particleCount: 150,
      spread: 85,
      origin: { y: 0.75 },
      colors: ["#ffd166", "#06d6a0", "#118ab2", "#7b2cbf", "#ffffff", "#ff70a6"],
    });

    if (onBlowOut) onBlowOut();
  };

  return (
    <div
      className="bottom-candle-container"
      onClick={handleBlowOut}
      title={isBlownOut ? "Candle blown out! 🎉" : "Blow into mic or tap to blow the candle! 🕯️"}
    >
      {/* Candle Ambient Light Glow (Removed when blown out!) */}
      {!isBlownOut && <div className="candle-ambient-glow" />}

      {/* Candle Unit */}
      <div className="candle-wrapper">
        <div className="candle-flame-container">
          {!isBlownOut ? (
            <div className="candle-flame" />
          ) : (
            <div className="candle-smoke" />
          )}
        </div>
        <div className="candle-wick" />
        <div className="candle-body" />
      </div>

      {/* Status Hint / Wish Banner */}
      {!isBlownOut ? (
        <div className="candle-hint">
          💨 Blow into mic or tap to blow the candle!
        </div>
      ) : (
        <div className="candle-wish-granted">
          🎉 Wish Granted! Happy Birthday, Riya! 🎂
        </div>
      )}
    </div>
  );
};

export default BirthdayCandle;
