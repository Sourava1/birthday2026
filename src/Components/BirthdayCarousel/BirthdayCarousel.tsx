import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import BirthdayCake from "./BirthdayCake";
import BirthdayCandle from "./BirthdayCandle";
import "./BirthdayCarousel.css";

interface BirthdayCarouselProps {
  onStartVisualizer: () => void;
}

const IMAGES = [
  "/images/riyaa.jpeg",
  "/images/r1.jpeg",
  "/images/r2.jpeg",
  "/images/r3.jpeg",
  "/images/r4.jpeg",
  "/images/r5.jpeg",
  "/images/r6.jpeg",
  "/images/r7.jpeg",
  "/images/r8.jpeg",
  "/images/r9.jpeg",
  "/images/r10.jpeg",
];

const BALLOONS = [
  { left: "5%", color: "#ffd166", duration: "16s", delay: "0s" },
  { left: "16%", color: "#a855f7", duration: "20s", delay: "4s" },
  { left: "26%", color: "#06d6a0", duration: "18s", delay: "8s" },
  { left: "74%", color: "#38bdf8", duration: "19s", delay: "2s" },
  { left: "85%", color: "#ffd166", duration: "22s", delay: "6s" },
  { left: "93%", color: "#ff70a6", duration: "17s", delay: "10s" },
];

const BirthdayCarousel: React.FC<BirthdayCarouselProps> = ({
  onStartVisualizer,
}) => {
  const [showWishModal, setShowWishModal] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragRef = useRef<HTMLDivElement | null>(null);
  const spinRef = useRef<HTMLDivElement | null>(null);
  const groundRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);

  // Trigger festive birthday confetti
  const triggerConfetti = (originY = 0.6) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: originY },
      colors: ["#ffd166", "#06d6a0", "#118ab2", "#7b2cbf", "#ffffff"],
    });
  };

  useEffect(() => {
    // Pre-cache birthday song in memory so it plays with 0ms lag on mobile
    const audioPreload = new Audio();
    audioPreload.src = "/riyasong.mp3";
    audioPreload.preload = "auto";

    // Initial welcome confetti burst
    const confettiTimer = setTimeout(() => {
      triggerConfetti();
    }, 800);

    // ==========================================
    // 1. Festive Fireworks & Star Sparkles Background
    // ==========================================
    const canvas = canvasRef.current;
    let animId: number;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const resizeCanvas = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const random = (min: number, max: number) =>
          Math.random() * (max - min) + min;

        class Firework {
          x: number;
          y: number;
          radius: number;
          color: string;
          vx: number;
          vy: number;
          life: number;

          constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
            this.radius = random(2, 3.5);
            this.color = `hsl(${random(35, 220)}, 95%, 65%)`;
            this.vx = random(-2.2, 2.2);
            this.vy = random(-2.2, 2.2);
            this.life = 75;
          }

          draw(context: CanvasRenderingContext2D) {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fillStyle = this.color;
            context.shadowBlur = 8;
            context.shadowColor = this.color;
            context.fill();
            context.shadowBlur = 0;
          }

          update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
          }
        }

        class Sparkle {
          x: number;
          y: number;
          radius: number;
          maxRadius: number;
          color: string;
          vy: number;
          vx: number;
          alpha: number;
          growing: boolean;

          constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
            this.radius = random(1, 2.5);
            this.maxRadius = random(2.5, 4.5);
            this.color = random(0, 1) > 0.4 ? "#ffd166" : "#64dfdf";
            this.vy = random(-1.2, -0.4);
            this.vx = random(-0.3, 0.3);
            this.alpha = random(0.3, 0.85);
            this.growing = Math.random() > 0.5;
          }

          draw(context: CanvasRenderingContext2D) {
            context.save();
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fillStyle = this.color;
            context.globalAlpha = this.alpha;
            context.shadowBlur = 8;
            context.shadowColor = this.color;
            context.fill();
            context.restore();
          }

          update() {
            this.y += this.vy;
            this.x += this.vx;
            if (this.growing) {
              this.radius += 0.04;
              if (this.radius >= this.maxRadius) this.growing = false;
            } else {
              this.radius -= 0.04;
              if (this.radius <= 1) this.growing = true;
            }
            if (this.y < 0) this.y = window.innerHeight;
          }
        }

        let fireworks: Firework[] = [];
        let sparkles: Sparkle[] = [];

        for (let j = 0; j < 35; j++) {
          sparkles.push(
            new Sparkle(random(0, window.innerWidth), random(0, window.innerHeight))
          );
        }

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (Math.random() < 0.06) {
            fireworks.push(
              new Firework(
                random(0, canvas.width),
                random(0, canvas.height * 0.6)
              )
            );
          }

          fireworks.forEach((fw, idx) => {
            fw.draw(ctx);
            fw.update();
            if (fw.life <= 0) fireworks.splice(idx, 1);
          });

          sparkles.forEach((sp) => {
            sp.draw(ctx);
            sp.update();
          });

          animId = requestAnimationFrame(animate);
        };
        animate();
      }
    }

    // ==========================================
    // 2. 3D Rotating Carousel Geometry & Drag Math
    // ==========================================
    const getResponsiveRadius = () => (window.innerWidth <= 658 ? 150 : 255);
    let radius = getResponsiveRadius();
    const rotateSpeed = -60;
    const odrag = dragRef.current;
    const ospin = spinRef.current;
    const ground = groundRef.current;

    if (ospin && ground && odrag) {
      const aEle = ospin.querySelectorAll<HTMLElement>("img");

      const initPositions = (delay?: number) => {
        for (let i = 0; i < aEle.length; i++) {
          aEle[i].style.transform = `rotateY(${
            i * (360 / aEle.length)
          }deg) translateZ(${radius}px)`;
          aEle[i].style.transition = "transform 1s";
          aEle[i].style.transitionDelay =
            delay !== undefined ? `${delay}s` : `${(aEle.length - i) / 5}s`;
        }
      };

      const initTimer = setTimeout(() => {
        initPositions();
      }, 300);

      const animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
      ospin.style.animation = `${animationName} ${Math.abs(
        rotateSpeed
      )}s infinite linear`;

      let sX = 0;
      let sY = 0;
      let desX = 0;
      let desY = 0;
      let tX = 0;
      let tY = window.innerWidth <= 658 ? 14 : 10;

      const applyTransform = (obj: HTMLElement) => {
        if (tY > 180) tY = 180;
        if (tY < 0) tY = 0;
        obj.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
      };

      const playSpin = (yes: boolean) => {
        if (ospin) {
          ospin.style.animationPlayState = yes ? "running" : "paused";
        }
      };

      const handlePointerDown = (e: PointerEvent) => {
        if (timerRef.current) clearInterval(timerRef.current);
        sX = e.clientX;
        sY = e.clientY;

        const handlePointerMove = (moveEvt: PointerEvent) => {
          const nX = moveEvt.clientX;
          const nY = moveEvt.clientY;
          desX = nX - sX;
          desY = nY - sY;
          tX += desX * 0.1;
          tY += desY * 0.1;
          applyTransform(odrag);
          sX = nX;
          sY = nY;
        };

        const handlePointerUp = () => {
          timerRef.current = window.setInterval(() => {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTransform(odrag);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
              if (timerRef.current) clearInterval(timerRef.current);
              playSpin(true);
            }
          }, 17);

          window.removeEventListener("pointermove", handlePointerMove);
          window.removeEventListener("pointerup", handlePointerUp);
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
      };

      const handleWheel = (e: WheelEvent) => {
        const d = e.deltaY ? -e.deltaY / 20 : 0;
        radius = Math.max(140, Math.min(380, radius + d));
        initPositions(1);
      };

      const handleWindowResize = () => {
        radius = getResponsiveRadius();
        initPositions(0);
      };

      window.addEventListener("pointerdown", handlePointerDown);
      window.addEventListener("wheel", handleWheel);
      window.addEventListener("resize", handleWindowResize);

      return () => {
        clearTimeout(confettiTimer);
        clearTimeout(initTimer);
        if (animId) cancelAnimationFrame(animId);
        if (timerRef.current) clearInterval(timerRef.current);
        window.removeEventListener("pointerdown", handlePointerDown);
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  }, []);

  const handleStart = () => {
    triggerConfetti();
    onStartVisualizer();
  };

  const handleOpenEnvelope = () => {
    triggerConfetti();
    setShowWishModal(true);
  };

  const handleBalloonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originY = rect.top / window.innerHeight;
    triggerConfetti(originY);
  };

  return (
    <div className="carousel-page">
      {/* Background Sparkles & Fireworks Canvas */}
      <canvas id="birthday-canvas" ref={canvasRef} />

      {/* Floating Festive Balloons */}
      <div className="balloons-container">
        {BALLOONS.map((b, idx) => (
          <div
            key={idx}
            className="balloon"
            style={{
              left: b.left,
              backgroundColor: b.color,
              animationDuration: b.duration,
              animationDelay: b.delay,
            }}
            onClick={handleBalloonClick}
            title="Click to pop confetti! 🎈"
          />
        ))}
      </div>

      {/* Clean Fixed Header */}
      <header className="carousel-header">
        <h1 className="birthday-main-title">Happy Birthday Riya ✨</h1>
      </header>

      {/* Interactive Birthday Message Button */}
      <button
        className="envelope-btn"
        onClick={handleOpenEnvelope}
        title="Open birthday note 🎁"
      />

      {/* Friendly Birthday Wish Card */}
      {showWishModal && (
        <div
          className="wish-modal-backdrop"
          onClick={() => setShowWishModal(false)}
        >
          <div
            className="wish-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="wish-modal-emoji">🎂✨</div>
            <h2 className="wish-modal-title">Happy Birthday, Riya!</h2>
            <p className="wish-modal-text">
              Wishing you a truly wonderful birthday filled with great moments,
              lots of smiles, and an amazing year ahead!
            </p>
            <button
              className="wish-modal-close-btn"
              onClick={() => setShowWishModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 3D Drag & Spin Containers anchored dead center */}
      <div className="carousel-viewport">
        <div id="drag-container" ref={dragRef}>
          <div id="spin-container" ref={spinRef}>
            {IMAGES.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Memory ${index + 1}`}
              />
            ))}
          </div>

          {/* Interactive Birthday Cake in the center of surrounding photos */}
          <BirthdayCake />

          <div id="ground" ref={groundRef} />
        </div>
      </div>

      {/* Standalone Birthday Candle at bottom of screen */}
      <BirthdayCandle />

      {/* Start Music Button */}
      <div className="start-music-btn-container">
        <button className="start-music-btn" onClick={handleStart}>
          <span>Tap to Play 🎵</span>
        </button>
      </div>
    </div>
  );
};

export default BirthdayCarousel;
