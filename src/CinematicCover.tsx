
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Fingerprint,
  Play,
  SkipForward,
  Sparkles,
  Ticket,
  X,
} from "lucide-react";
import "./CinematicCover.css";

const photos = [
  {
    src: "/images/shreeya-01.JPG",
    label: "FILE / 001",
    note: "Some moments deserve their own chapter.",
    rotation: -11,
  },
  {
    src: "/images/shreeya-02.JPG",
    label: "FILE / 002",
    note: "A little memory, kept forever.",
    rotation: 8,
  },
  {
    src: "/images/shreeya-03.JPG",
    label: "FILE / 003",
    note: "The story is still being written.",
    rotation: -5,
  },
];

const introScenes = [
  {
    overline: "PRIVATE PRODUCTION · 2026",
    headline: "SOME STORIES",
    subline: "DESERVE THEIR OWN FILM.",
  },
  {
    overline: "OCTOBER 23 · CONFIDENTIAL",
    headline: "ONE SUBJECT.",
    subline: "A THOUSAND LITTLE STORIES.",
  },
  {
    overline: "CASE FILE NO. 023",
    headline: "SHREEYA.",
    subline: "YOUR STORY CONTINUES.",
  },
];

export default function CinematicCover() {
  const reducedMotion = useReducedMotion();
  const [intro, setIntro] = useState(
    () => !sessionStorage.getItem("shreeya-cover-intro-seen")
  );
  const [scene, setScene] = useState(0);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);
  const [spot, setSpot] = useState({ x: 50, y: 45 });
  const coverRef = useRef<HTMLElement>(null);

  function finishIntro() {
    sessionStorage.setItem("shreeya-cover-intro-seen", "yes");
    setIntro(false);
  }

  useEffect(() => {
    if (!intro || reducedMotion) return;

    if (scene >= introScenes.length) {
      finishIntro();
      return;
    }

    const timer = window.setTimeout(
      () => setScene((old) => old + 1),
      scene === 0 ? 2100 : 2400
    );

    return () => window.clearTimeout(timer);
  }, [intro, scene, reducedMotion]);

  useEffect(() => {
    if (intro && reducedMotion) finishIntro();
  }, [intro, reducedMotion]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (intro) finishIntro();
        setTicketOpen(false);
        setSecretOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [intro]);

  function togglePhoto(index: number) {
    setFlipped((old) =>
      old.includes(index)
        ? old.filter((i) => i !== index)
        : [...old, index]
    );
  }

  function moveSpotlight(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType === "touch" || reducedMotion) return;

    const rect = coverRef.current?.getBoundingClientRect();
    if (!rect) return;

    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <>
      <main
        ref={coverRef}
        className="cc-page"
        onPointerMove={moveSpotlight}
        style={
          {
            "--spot-x": `${spot.x}%`,
            "--spot-y": `${spot.y}%`,
          } as React.CSSProperties
        }
      >
        <div className="cc-grain" aria-hidden="true" />
        <div className="cc-spotlight" aria-hidden="true" />

        <div className="cc-topline">
          <span>AN EXCLUSIVE BIRTHDAY EDITION</span>
          <span>23 OCTOBER 2026</span>
        </div>

        <div className="cc-hero">
          <div className="cc-copy">
            <motion.div
              className="cc-kicker"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="cc-kicker-dot" />
              THE UNOFFICIAL STORY OF SHREEYA
            </motion.div>

            <motion.h1
              className="cc-heading"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              THE
              <br />
              23RD
              <br />
              <em>CASE.</em>
            </motion.h1>

            <motion.p
              className="cc-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              One extraordinary subject. A few classified
              memories. And a mystery waiting to be solved.
            </motion.p>
          </div>

          <div className="cc-photo-stage">
            {photos.map((photo, index) => {
              const isFlipped = flipped.includes(index);

              return (
                <motion.button
                  type="button"
                  key={photo.src}
                  className={`cc-polaroid cc-photo-${index + 1}`}
                  initial={{
                    opacity: 0,
                    y: 70,
                    rotate: 0,
                  }}
                  animate={{
                    opacity: 1,
                    y: [0, -8, 0],
                    rotate: photo.rotation,
                  }}
                  transition={{
                    opacity: {
                      delay: 0.35 + index * 0.2,
                      duration: 0.6,
                    },
                    y: {
                      delay: index * 0.5,
                      duration: 5 + index,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 0.8,
                    },
                  }}
                  whileHover={{
                    scale: 1.07,
                    rotate: 0,
                    zIndex: 10,
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => togglePhoto(index)}
                  aria-label={
                    isFlipped
                      ? `Show photo ${index + 1}`
                      : `Flip photo ${index + 1} to read note`
                  }
                >
                  <div className="cc-polaroid-inner">
                    <div
                      className={`cc-polaroid-face ${
                        isFlipped ? "is-flipped" : ""
                      }`}
                    >
                      <div className="cc-polaroid-front">
                        <img
                          src={photo.src}
                          alt={`Memory ${index + 1}`}
                        />
                        <span>{photo.label}</span>
                      </div>

                      <div className="cc-polaroid-back">
                        <span>PERSONAL ARCHIVE</span>
                        <p>{photo.note}</p>
                        <small>CLICK TO TURN BACK ↻</small>
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
            <span className="cc-photo-hint">
              CLICK A PHOTO TO FLIP IT ↗
            </span>
          </div>
        </div>

        <div className="cc-bottom">
          <div className="cc-case-summary">
            <span className="cc-mini-label">
              CASE STATUS / UNOPENED
            </span>
            <p>
              Six chapters. A collection of surprises.
              <br />
              One final reveal.
            </p>
          </div>

          <motion.button
            className="cc-ticket-trigger"
            onClick={() => setTicketOpen(true)}
            whileHover={{ y: -6, rotate: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="cc-ticket-icon">
              <Ticket size={22} strokeWidth={1.5} />
            </span>
            <span>
              <strong>YOUR ADMISSION TICKET</strong>
              <small>CLICK TO BEGIN THE EXPERIENCE</small>
            </span>
            <ArrowRight size={21} />
          </motion.button>
        </div>

        <div className="cc-bottomline">
          <span>PRIVATE EDITION · NO. 023</span>

          <button
            className="cc-secret-trigger"
            onClick={() => setSecretOpen(true)}
            aria-label="Inspect the secret case seal"
            title="Something seems hidden here..."
          >
            <Fingerprint size={21} />
            <span>OFFICIAL CASE SEAL</span>
          </button>
        </div>
      </main>

      {/* CINEMATIC INTRO */}
      <AnimatePresence>
        {intro && (
          <motion.div
            className="cc-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            role="dialog"
            aria-modal="true"
            aria-label="Opening cinematic"
          >
            <div className="cc-intro-grain" />

            <button
              className="cc-skip"
              onClick={finishIntro}
            >
              SKIP INTRO <SkipForward size={15} />
            </button>

            <AnimatePresence mode="wait">
              {scene < introScenes.length && (
                <motion.div
                  key={scene}
                  className="cc-intro-scene"
                  initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.65 }}
                >
                  <span>{introScenes[scene].overline}</span>
                  <h2>{introScenes[scene].headline}</h2>
                  <p>{introScenes[scene].subline}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="cc-intro-bottom">
              <span>SHREEYA — THE 23RD CASE</span>
              <div className="cc-intro-bars">
                {introScenes.map((_, i) => (
                  <span
                    key={i}
                    className={i <= scene ? "active" : ""}
                  />
                ))}
              </div>
              <span>AN ORIGINAL EXPERIENCE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMISSION TICKET MODAL */}
      <AnimatePresence>
        {ticketOpen && (
          <motion.div
            className="cc-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setTicketOpen(false)}
            role="presentation"
          >
            <motion.div
              className="cc-ticket-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Admission ticket"
              initial={{ scale: 0.8, rotate: -6, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotate: 5, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 18,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cc-modal-close"
                onClick={() => setTicketOpen(false)}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="cc-ticket-header">
                PRIVATE SCREENING · ADMIT ONE
              </div>

              <div className="cc-ticket-body">
                <Ticket size={34} strokeWidth={1} />
                <span>YOU ARE INVITED TO</span>
                <h2>THE 23RD CASE.</h2>
                <p>AN EXPERIENCE CREATED FOR SHREEYA</p>
              </div>

              <div className="cc-ticket-details">
                <div>
                  <small>DATE</small>
                  <strong>23 OCT 2026</strong>
                </div>
                <div>
                  <small>SEAT</small>
                  <strong>VIP / 001</strong>
                </div>
                <div>
                  <small>STATUS</small>
                  <strong>ADMITTED</strong>
                </div>
              </div>

              <div className="cc-ticket-tear">
                <span />
                <span>TEAR HERE TO ENTER</span>
                <span />
              </div>

              <Link
                className="cc-enter"
                to="/mystery"
                onClick={() => setTicketOpen(false)}
              >
                <Play size={16} fill="currentColor" />
                ENTER THE INVESTIGATION
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECRET EASTER EGG */}
      <AnimatePresence>
        {secretOpen && (
          <motion.div
            className="cc-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSecretOpen(false)}
            role="presentation"
          >
            <motion.div
              className="cc-secret-card"
              role="dialog"
              aria-modal="true"
              aria-label="Secret discovered"
              initial={{ scale: 0.75, rotate: 8, opacity: 0 }}
              animate={{ scale: 1, rotate: -2, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cc-modal-close"
                onClick={() => setSecretOpen(false)}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <Sparkles size={34} />
              <span>SECRET FILE FOUND</span>
              <h2>Well, well, well...</h2>
              <p>
                Already looking for secrets?
                <br />
                You're going to be very good at this.
              </p>
              <small>KEEP YOUR EYES OPEN · FILE 023</small>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
