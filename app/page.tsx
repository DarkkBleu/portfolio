"use client";

import React, { useEffect, useRef, useState } from "react";

// --- LIGHT PROJECT DATA --- HEELLOOO DEAR VIEWER
type Project = {
  id: string;
  title: string;
  accent: string;
  role: string;
  year: string;
  summary: string;
  image: string; // primary image
  github?: string;
  fdr?: string; // final design review / PDF link
  polysat_website?: string; //polysat website lol
  gallery?: string[]; // extra images for the detail section
  highlights?: string[]; // SHORT bullets for sticky panel
  tech?: string[]; // tech stack / tools
  abstractTitle?: string; // bottom "paper-like" heading
  abstract?: string; // bottom abstract-style paragraph
};

const PROJECTS: Project[] = [
  {
    id: "nerf-turret",
    title: "Autonomous Nerf Turret",
    accent: "#e96112",
    role: "Python",
    year: "2024",
    summary:
      "Turret that aims using a thermal sensor",
    image: "/projects/nerf-turret-main.jpg",
    github: "https://github.com/fmoren05/Term-Project",
    gallery: [
      "/projects/nerf-turret-main.jpg",
      "/projects/nerf-turret-side.jpg",
      "/projects/nerf-turret-thermal.jpg",
      "https://drive.google.com/file/d/1898FJT0jIi6c01ILZBM89t2987Pqvz_G/preview",
      "https://drive.google.com/file/d/1l8kSO0vYaUGgQLaVvaD6BNZ9J0VO4BSx/preview",
      "https://drive.google.com/file/d/1mLuf-DcBSHBue66RncZfcMSVJwaqkHj2/preview",
      "/projects/nerf-turret-internals.jpg",
    ],

    highlights: [
      "Closed-loop precise PID control.",
      "Custom feed and shoot mechanism.",
      "Column-wise temperature averaging for robust target selection.",
    ],
    abstractTitle: "Control Loop & Competition Context",
    },

  {
    id: "robot-rodeo",
    title: "Cal Poly Robot Rodeo",
    accent: "#38bdf8",
    role: "Python",
    year: "2024",
    summary:
      "Robot that climbs stairs and toggles switches.",
    image: "/projects/robot-rodeo-main.jpg",
    fdr: "https://drive.google.com/file/d/1n4Sx_59qJmOYlScuPie2GpwRyVYjAOwJ/view?usp=sharing",
    gallery: [
      "/projects/robot-rodeo-main.jpg",
      "/projects/robot-rodeo-stairs.jpg",
      "/projects/robot-rodeo-switches.jpg",
      "/projects/robot-rodeo-chassis.jpg",
      "/projects/robot-rodeo-drivetrain.jpg",
      "/projects/robot-rodeo-balance.jpg",
    ],
   
    highlights: [
      "Owned chassis and drivetrain design",
      "Implemented Raspberry Pi based wireless control",
      "Manufactured and assembled all frame and drivetrain components",
    ],
    abstractTitle: "Course Constraints & Chassis Decisions",
  },

  {
    id: "cubesat",
    title: "CubeSat",
    accent: "#22c55e",
    role: "Python • Cpp • MATLAB",
    year: "2020-2024",
    summary:
      "Worked on mechanical systems.",
    image: "/projects/cubesat-main.jpg",
    polysat_website: "https://www.polysat.org/in-development",
    gallery: [
      "/projects/cubesat-main.jpg",
      "/projects/cubesat-amdrohp.jpg",
      "/projects/cubesat-drag-sail.jpg",
      "/projects/cubesat-battery-pack.jpg",
      "https://drive.google.com/file/d/1beix8_-4QKVdmhAQNja72RonBiP-tqxd/preview",
    ],
    
    highlights: [
      "Helped design an oscillating heat pipe radiator with spring-deployed panels.",
      "Owned hinge layouts, damping, and pre-deployment latching features.",
      "Worked on a drag-sail deorbit concept.",
    ],
    abstractTitle: "CubeSat Research & Flight Systems",

  },

  {
    id: "baja",
    title: "Baja SAE Design & Manufacturing",
    accent: "#fbbf24",
    role: "matlab",
    year: "2021-2023",
    summary:
      "Design and manufacturing work.",
    image: "/projects/baja-main.jpg",
    gallery: [
      "/projects/baja-main.jpg",
      "/projects/baja-pedal.jpg",
      "/projects/baja-tabs.jpg",
      "/projects/baja-team.jpg",
    ],
    highlights: [
      "Redesigned the pedal.",
      "Created 3D-printed tab fixtures to solve awkward-angle welding.",
      "Helped build a tire inertia test method.",
      "Learned how to design for manufacturing.",
    ],
    abstractTitle: "Baja SAE: Design, Testing & Machining",
    abstract:
      "On the Baja SAE team I split time between design and hands-on manufacturing. I redesigned the driver pedal as a 3D-printed component, cutting peak stress by roughly half compared to the previous iteration and enabling more aggressive maneuvers without failures. To address the recurring problem of welding small tabs at odd angles on the frame, I developed 3D-printed fixturing that located parts consistently and sped up fabrication. I also helped define a test method for tire moment of inertia so that the team had measured data for both hand calculations and simulations. Most of my machining experience came from this car: spending hundreds of hours on lathes and mills shaped how I think about tolerances, set-ups, and how design choices translate into actual manufacturing effort.",
  },

  {
    id: "sensor-logger",
    title: "Sensor Data Logger",
    accent: "#fb7185",
    role: "Embedded • Logging",
    year: "2023",
    summary:
      "Multi-channel sensor logger for capturing real-world signals and replaying them into analysis scripts.",
    image: "/projects/sensor-logger.jpg",
    tech: ["Embedded", "SD logging"],
    highlights: [
      "Captures multi-channel data with stable timestamps to SD.",
      "Designed around clean shutdown and log recovery after power loss.",
    ],
    abstractTitle: "Logging Architecture",
    abstract:
      "This sensor logger was built to capture multi-channel signals from real hardware and replay those traces into offline analysis scripts. The design emphasized timestamp stability and log integrity rather than UI, with a focus on how sample timing propagates into downstream control and estimation algorithms. The firmware and file format were structured so that logs would remain recoverable even if power was pulled mid-run, minimizing the amount of data lost to unexpected resets and making the tool useful for long-duration or failure-prone tests.",
  },

  {
    id: "portfolio",
    title: "Portfolio Surface",
    accent: "#eab308",
    role: "UX • Frontend",
    year: "2025",
    summary:
      "Next.js portfolio with interactive skill band and project coverflow, tuned to feel like a hardware UI.",
    image: "/projects/portfolio.jpg",
    tech: ["Next.js", "React", "Tailwind"],
    highlights: [
      "Built the skill band, coverflow, and detail views in React/Next.js.",
      "Motion and opacity tuned to feel like a hardware-status UI, not a blog.",
    ],
    abstractTitle: "Interaction & Visual Language",
    abstract:
      "This site doubles as a design project. The scrolling skill band, coverflow hero, and cursor-reactive grid are tuned to feel like a hardware UI rather than a marketing page. Most of the effort went into motion curves, opacity ramps, and layout choices that keep the interface readable while still conveying that the owner works on physical systems. The result is a portfolio surface that behaves more like an instrument cluster for projects than a traditional scroll-down résumé.",
  },

  {
  id: "drawings",
  title: "Drawings",
  accent: "#a78bfa",
  role: "Traditional • Digital",
  year: "Ongoing",
  summary: "A selection of my drawings.",
  image: "/drawings/cover.jpg",
  gallery: [
    "/drawings/01.jpg",
    "/drawings/02.jpg",
    "/drawings/03.jpg",
    "/drawings/04.jpg",
    "/drawings/05.jpg",
    "/drawings/06.jpg",
  ],
}

];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-slate-100">
      <div className="mx-auto max-w-5xl px-5 pt-24 pb-24">
        {/* NAME + CONTACTS ROW */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* LEFT BLOCK — NAME, TAGLINE, LOCATION */}
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
              Mechatronics Test Engineer
            </p>
            <h1 className="text-3xl font-semibold md:text-5xl">
              Berent Baysal
            </h1>
            <p className="text-sm text-slate-300">
              I build and debug physical systems.
            </p>

            {/* Location with pin */}
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <img
                src="/logos/pin.png"
                alt="Location"
                className="h-3.5 w-3.5 opacity-70"
              />
              <span>Orange County, CA</span>
            </div>
          </div>

          {/* RIGHT BLOCK — CONTACT ICONS */}
          <div className="flex items-center gap-4 pt-1">
            {/* Email */}
            <a
              href="mailto:berentbaysal02@gmail.com"
              className="opacity-60 hover:opacity-100 transition"
            >
              <img
                src="/logos/mail.png"
                alt="Email"
                className="h-5 w-5 object-contain"
              />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/berent-d-baysal/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition"
            >
              <img
                src="/logos/linkedin.png"
                alt="LinkedIn"
                className="h-5 w-5 object-contain"
              />
            </a>
          </div>
        </div>

        {/* SKILL BAND */}
        <SkillBand />

        {/* COVERFLOW + DETAILS + DEEP DIVE */}
        <ProjectsCoverflow />
      </div>
    </main>
  );
}

/* ==============================
   SKILL BAND COMPONENT
================================*/
function SkillBand() {
  const [offset, setOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartOffset, setDragStartOffset] = useState(0);
  const [rowWidth, setRowWidth] = useState(0);

  const rowRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  useEffect(() => {
    if (rowRef.current) {
      const rect = rowRef.current.getBoundingClientRect();
      setRowWidth(rect.width);
    }
  }, []);

  useEffect(() => {
    const baseSpeed = 0.08;
    const friction = 0.92;
    const minVel = 0.02;

    const animate = () => {
      let next = offsetRef.current;

      if (!isHovered && !isDragging) {
        next -= baseSpeed;
      }

      if (!isDragging && Math.abs(velocityRef.current) > minVel) {
        next += velocityRef.current;
        velocityRef.current *= friction;
      }

      offsetRef.current = next;
      setOffset(next);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartOffset(offsetRef.current);
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const delta = e.clientX - dragStartX;
    const next = dragStartOffset + delta;

    const deltaSinceLast = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velocityRef.current = deltaSinceLast;

    offsetRef.current = next;
    setOffset(next);
  };

  const endDrag = () => setIsDragging(false);

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  let displayOffset = offset;
  if (rowWidth > 0) {
    displayOffset = offset % rowWidth;
    if (displayOffset > 0) displayOffset -= rowWidth;
  }

  return (
    <div
      className="relative w-full mt-6 overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={endDrag}
    >
      <div
        className="flex items-center"
        style={{
          transform: `translateX(${displayOffset}px)`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {/* Row 1 */}
        <div ref={rowRef} className="inline-flex items-center gap-4 pr-6">
          <SkillItem logo="/logos/python.png" label="Python" />
          <SkillItem logo="/logos/fusion360.png" label="Fusion 360" />
          <SkillItem logo="/logos/catia.png" label="CATIA" />
          <SkillItem logo="/logos/solidworks.png" label="SolidWorks" />
          <SkillItem logo="/logos/blender.png" label="Blender" />
          <SkillItem logo="/logos/unity.png" label="Unity" />
          <SkillItem logo="/logos/git.png" label="Git" />
          <SkillItem logo="/logos/cplusplus.png" label="C / C++" />
          <SkillItem logo="/logos/arduino.png" label="Arduino" />
          <SkillItem logo="/logos/altium.png" label="Altium" />
          <SkillItem logo="/logos/canalyzer.png" label="CANalyzer" />
          <SkillItem logo="/logos/matlab.png" label="MATLAB" />
        </div>

        {/* Row 2 — duplicate */}
        <div className="inline-flex items-center gap-4 pr-6">
          <SkillItem logo="/logos/python.png" label="Python" />
          <SkillItem logo="/logos/fusion360.png" label="Fusion 360" />
          <SkillItem logo="/logos/catia.png" label="CATIA" />
          <SkillItem logo="/logos/solidworks.png" label="SolidWorks" />
          <SkillItem logo="/logos/blender.png" label="Blender" />
          <SkillItem logo="/logos/unity.png" label="Unity" />
          <SkillItem logo="/logos/git.png" label="Git" />
          <SkillItem logo="/logos/cplusplus.png" label="C / C++" />
          <SkillItem logo="/logos/arduino.png" label="Arduino" />
          <SkillItem logo="/logos/altium.png" label="Altium" />
          <SkillItem logo="/logos/canalyzer.png" label="CANalyzer" />
          <SkillItem logo="/logos/matlab.png" label="MATLAB" />
        </div>
      </div>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-15 bg-gradient-to-r from-black via-black/85 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-15 bg-gradient-to-l from-black via-black/85 to-transparent" />
    </div>
  );
}

function SkillItem({ logo, label }: { logo: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-[12px] text-slate-200 whitespace-nowrap">
      <div className="h-5 w-5 flex items-center justify-center shrink-0">
        <img
          src={logo}
          alt={label}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}


/* ==============================
   PROJECTS COVERFLOW + DETAILS
================================*/
function ProjectsCoverflow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = PROJECTS[currentIndex];
  const [detailPhase, setDetailPhase] =
    useState<"hidden" | "visible">("visible");

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null
  );

  // Lightbox for enlarged images / videos
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);

  const openLightbox = (src: string) => {
    setLightboxSrc(src);
    setLightboxZoomed(false);
    requestAnimationFrame(() => {
      setLightboxZoomed(true);
    });
  };

  const closeLightbox = () => {
    setLightboxZoomed(false);
    setLightboxSrc(null);
  };

  const go = (dir: "prev" | "next") => {
    setDetailPhase("hidden");
    setCurrentIndex((prev) =>
      dir === "prev"
        ? (prev - 1 + PROJECTS.length) % PROJECTS.length
        : (prev + 1) % PROJECTS.length
    );
  };

  // Arrow keys left/right
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go("prev");
      if (e.key === "ArrowRight") go("next");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Escape to close lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Animate detail panel when project changes
  useEffect(() => {
    setDetailPhase("hidden");
    const t = setTimeout(() => setDetailPhase("visible"), 20);
    return () => clearTimeout(t);
  }, [currentIndex]);

  // Track cursor inside the coverflow section
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y });
  };

  const handleMouseLeave = () => {
    setCursorPos(null);
  };

  return (
    <>
      {/* HERO COVERFLOW */}
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="mt-8 relative"
      >
        {/* BACKGROUND: dot field, lifted higher */}
<div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
  <div
    className="absolute -inset-[40%]"
    style={{
      top: "-10%", // ⬆ move dots upward (adjustable)
      backgroundImage:
        "radial-gradient(circle, rgba(148,163,184,0.38) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
      opacity: 0.7,
    }}
  />

</div>
{/* SOFT VIGNETTE OVER DOTS */}
<div
  className="pointer-events-none absolute inset-0 z-10"
  style={{
    background:
      "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,1) 100%)",
  }}
/>

        {/* FOREGROUND CONTENT */}
        <div className="relative z-30 mx-auto flex w-full max-w-6xl flex-col items-center gap-6 md:gap-8 py-8 md:py-10">
          {/* CAROUSEL AREA */}
<div className="relative flex w-full items-center justify-center
                h-[18rem] sm:h-[22rem] md:h-[26rem] lg:h-[30rem]">

            {/* CENTER GLOW */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-72 w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(148,163,184,0.35),_transparent_70%)] blur-[90px]" />

            {/* ARROWS */}
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between">
              <button
                onClick={() => go("prev")}
                className="pointer-events-auto ml-1 sm:ml-2 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-slate-700/30 bg-black/40 text-[10px] sm:text-[11px] text-slate-400 transition hover:border-slate-500/60 hover:bg-black/80 hover:text-slate-100"
                aria-label="Previous project"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                  aria-hidden="true"
                >
                  <path
                    d="M14.5 6 8.5 12l6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={() => go("next")}
                className="pointer-events-auto mr-1 sm:mr-2 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-slate-700/30 bg-black/40 text-[10px] sm:text-[11px] text-slate-400 transition hover:border-slate-500/60 hover:bg-black/80 hover:text-slate-100"
                aria-label="Next project"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                  aria-hidden="true"
                >
                  <path
                    d="M9.5 6 15.5 12l-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* CARDS */}
            <div className="relative z-20 h-full w-full">
              {PROJECTS.map((p, i) => {
                const total = PROJECTS.length;
                let delta = i - currentIndex;

                // circular wrap for seamless looping
                if (delta > total / 2) delta -= total;
                if (delta < -total / 2) delta += total;

                const d = Math.abs(delta);
                if (d > 3) return null; // center + up to 3 on each side

                const x = delta * 230;
                const isActive = d === 0;

                const scale =
                  d === 0 ? 1.18 : d === 1 ? 1.02 : d === 2 ? 0.92 : 0.84;

                const cardOpacity =
                  d === 0 ? 1 : d === 1 ? 0.6 : d === 2 ? 0.35 : 0.18;

                const translateY =
                  d === 0 ? 0 : d === 1 ? 22 : d === 2 ? 40 : 56;
                const zIndex = 30 - d;
                const rotateY =
                  d === 0 ? 0 : delta < 0 ? 12 * d : -12 * d;

                return (
                  <button
                    key={p.id}
                    onClick={() => setCurrentIndex(i)}
                    className="absolute left-1/2 top-1/2 cursor-pointer"
                    style={{
                      transform: `translateX(${x}px)
                                  translateY(${translateY}px)
                                  translate(-50%, -50%)
                                  scale(${scale})
                                  perspective(1100px)
                                  rotateY(${rotateY}deg)`,
                      opacity: cardOpacity,
                      zIndex,
                      transition:
                        "transform 300ms cubic-bezier(0.22,0.61,0.36,1), opacity 240ms ease-out",
                    }}
                  >
                    {/* CARD BODY WITH IMAGE */}
                    <div className="relative overflow-hidden rounded-2xl bg-slate-950/95 shadow-[0_0_70px_rgba(15,23,42,1)] border border-slate-800/70">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-56 w-56 sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-[22rem] lg:w-[22rem] object-cover"
                      />

                      {/* Accent gradient overlay */}
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background: `
                            radial-gradient(circle at 0% 0%, rgba(148,163,184,0.4), transparent 60%),
                            radial-gradient(circle at 100% 100%, ${p.accent}80, transparent 65%)
                          `,
                          mixBlendMode: "screen",
                          opacity: 0.9,
                        }}
                      />

                      {/* Active card highlight */}
                      <div
                        className="pointer-events-none absolute inset-0 transition-all duration-300 ease-out"
                        style={{
                          opacity: isActive ? 1 : 0,
                          background:
                            "radial-gradient(circle at center, rgba(255,255,255,0.10) 0%, transparent 70%)",
                        }}
                      />

                      {/* Bottom label */}
                      <div className="relative flex items-center justify-between px-4 sm:px-6 pb-3 sm:pb-4 pt-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <span
                            className="inline-block h-2 w-2 rounded-full"
                            style={{ backgroundColor: p.accent }}
                          />
                          <span>{String(i + 1).padStart(2, "0")}</span>
                        </span>
                        <span className="truncate max-w-[150px] sm:max-w-[180px] text-right text-[8px] sm:text-[9px] text-slate-500">
                          {p.title}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BOTTOM TEXT – hide on very small screens */}
          <div className="hidden sm:flex flex-col items-center gap-2 pb-2 text-center">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="uppercase tracking-[0.2em]">
                Scroll for details
              </span>
              <span className="animate-bounce text-slate-400 text-xs">↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS SECTION (images + sticky aside) */}
<section className="mt-10 pb-10 mx-auto w-full max-w-5xl">
  <div
    key={current.id}
    className={[
      "grid gap-10 items-start",
      current.id === "drawings"
        ? "grid-cols-1" // ✅ drawings: full width, no empty right column
        : "lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]", // ✅ others: original layout
    ].join(" ")}
  >
    {/* LEFT: gallery */}
    <div className={current.id === "drawings" ? "" : "space-y-6"}>
      {current.id === "drawings" ? (
        (() => {
          const media =
            current.gallery && current.gallery.length > 0
              ? current.gallery
              : [current.image];

          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {media.map((src, idx) => {
                const isDriveVideo = src.includes("drive.google.com/file");

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => openLightbox(src)}
                    className={[
                      "group relative w-full overflow-hidden rounded-2xl",
                      "bg-slate-950/70 border border-slate-800/60",
                      "transform-gpu transition-all duration-500 ease-out",
                      detailPhase === "visible"
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4",
                      "cursor-zoom-in",
                      // ✅ stagger effect: every other tile bumps down on sm+
                      idx % 2 === 1 ? "sm:translate-y-6" : "",
                    ].join(" ")}
                    style={{
                      boxShadow: `0 0 70px ${current.accent}22`,
                      transitionDelay: `${120 + idx * 70}ms`,
                    }}
                  >
                    {/* ✅ BIG SQUARE TILE */}
                    <div className="aspect-square w-full">
                      {isDriveVideo ? (
                        <iframe
                          src={src}
                          className="h-full w-full"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      ) : (
                        <img
                          src={src}
                          alt={`${current.title} ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                        />
                      )}
                    </div>

                    {/* bottom gradient overlay */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* Play icon overlay for videos */}
                    {isDriveVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/60 rounded-full p-3 backdrop-blur-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })()
      ) : (
        // ===== NORMAL PROJECTS: your original left gallery (unchanged) =====
        (() => {
          const filtered =
            current.gallery?.filter((media) => media !== current.image) || [];
          const mediaToShow = filtered.length > 0 ? filtered : [current.image];

          return mediaToShow.map((src, idx) => {
            const isDriveVideo = src.includes("drive.google.com/file");

            return (
              <button
                key={idx}
                type="button"
                onClick={() => openLightbox(src)}
                className={[
                  "group relative block overflow-hidden rounded-2xl bg-slate-950/70 border border-slate-800/60",
                  "transform-gpu transition-all duration-500 ease-out",
                  detailPhase === "visible"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                  "cursor-zoom-in",
                ].join(" ")}
                style={{
                  boxShadow: `0 0 55px ${current.accent}20`,
                  transitionDelay: `${120 + idx * 80}ms`,
                }}
              >
                {isDriveVideo ? (
                  <iframe
                    src={src}
                    className="w-full h-[260px] sm:h-[320px] md:h-[420px] lg:h-[460px] rounded-xl"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={src}
                    alt={`${current.title} view ${idx + 1}`}
                    className="w-full h-[260px] sm:h-[320px] md:h-[420px] lg:h-[460px] object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                )}

                {/* bottom gradient overlay */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Play icon overlay for videos */}
                {isDriveVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 rounded-full p-3 backdrop-blur-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            );
          });
        })()
      )}
    </div>

    {/* RIGHT: compact info panel (sticky) — HIDE ONLY for drawings */}
    {current.id !== "drawings" && (
      <aside className="sticky top-24 space-y-5 text-sm">
        {/* Title / summary */}
        <div
          className={[
            "space-y-1 transform-gpu transition-all duration-400 ease-out",
            detailPhase === "visible"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3",
          ].join(" ")}
          style={{ transitionDelay: "140ms" }}
        >
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
            {current.role} • {current.year}
          </div>
          <h3 className="text-lg font-semibold text-slate-100">
            {current.title}
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-300">
            {current.summary}
          </p>
        </div>

        {/* Highlights */}
        {current.highlights && current.highlights.length > 0 && (
          <div
            className={[
              "space-y-2 transform-gpu transition-all duration-400 ease-out",
              detailPhase === "visible"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3",
            ].join(" ")}
            style={{ transitionDelay: "220ms" }}
          >
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Highlights
            </div>
            <ul className="space-y-1.5 text-[13px] text-slate-300">
              {current.highlights.map((h, idx) => (
                <li key={idx} className="flex gap-2">
                  <span
                    className="mt-[6px] inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: current.accent }}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech tags */}
        {current.tech && current.tech.length > 0 && (
          <div
            className={[
              "space-y-2 pt-1 transform-gpu transition-all duration-400 ease-out",
              detailPhase === "visible"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3",
            ].join(" ")}
            style={{ transitionDelay: "280ms" }}
          >
            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Stack / Tools
            </div>
            <div className="flex flex-wrap gap-1.5">
              {current.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-slate-700/70 bg-slate-950/60 px-2 py-0.5 text-[11px] text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Code / FDR / Polysat buttons */}
        {(current.github || current.fdr || current.polysat_website) && (
          <div
            className={[
              "pt-2 flex flex-wrap gap-2 transform-gpu transition-all duration-400 ease-out",
              detailPhase === "visible"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3",
            ].join(" ")}
            style={{ transitionDelay: "340ms" }}
          >
            {current.github && (
              <a
                href={current.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-950 px-3 py-1.5 text-[11px] font-medium text-slate-200 hover:border-slate-300 hover:bg-slate-900 transition"
              >
                <span className="h-3.5 w-3.5">
                  <img
                    src="/logos/github.png"
                    alt="GitHub"
                    className="h-full w-full object-contain invert"
                  />
                </span>
                <span className="tracking-[0.12em] uppercase">Github</span>
                <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
                  <path
                    d="M8 16l8-8M10 8h6v6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}

            {current.fdr && (
              <a
                href={current.fdr}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-950 px-3 py-1.5 text-[11px] font-medium text-slate-200 hover:border-slate-300 hover:bg-slate-900 transition"
              >
                <span className="h-3.5 w-3.5 flex items-center justify-center">
                  <span className="inline-block h-2.5 w-2.5 rounded-[3px] bg-slate-200" />
                </span>
                <span className="tracking-[0.12em] uppercase">
                  Final Design Review
                </span>
                <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
                  <path
                    d="M8 16l8-8M10 8h6v6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}

            {current.polysat_website && (
              <a
                href={current.polysat_website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-950 px-3 py-1.5 text-[11px] font-medium text-slate-200 hover:border-slate-300 hover:bg-slate-900 transition"
              >
                <span className="h-3.5 w-3.5 flex items-center justify-center">
                  <img
                    src="/logos/wednesday-frog.png"
                    alt="It's Wednesday my dudes"
                    className="h-3 w-3 object-contain"
                  />
                </span>

                <span className="tracking-[0.12em] uppercase">Polysat Website</span>
                <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
                  <path
                    d="M8 16l8-8M10 8h6v6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </div>
        )}
      </aside>
    )}
  </div>
</section>

{/* FULL-WIDTH DEEP DIVE, BELOW ALL PHOTOS */}
<ProjectDeepDive project={current} />

{/* LIGHTBOX OVERLAY WITH ZOOM ANIMATION + DRIVE SUPPORT */}
{lightboxSrc && (
  <Lightbox
    src={lightboxSrc}
    zoomed={lightboxZoomed}
    onClose={closeLightbox}
  />
)}


    </>
  );
}


/* ==============================
   LIGHTBOX COMPONENT
================================*/
function Lightbox({
  src,
  zoomed,
  onClose,
}: {
  src: string;
  zoomed: boolean;
  onClose: () => void;
}) {
  const isDriveVideo = src.includes("drive.google.com/file");

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative max-w-5xl w-[92vw] max-h-[88vh] rounded-2xl overflow-hidden border border-slate-700/80 bg-black/90 shadow-2xl transform transition-transform duration-200 ease-out ${
          zoomed ? "scale-100" : "scale-[0.95]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-slate-300 text-xs border border-slate-600/70 hover:bg-black hover:text-white"
        >
          ✕
        </button>

        {isDriveVideo ? (
          <iframe
            src={src}
            className="w-full h-[88vh]"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <img
            src={src}
            alt="Expanded view"
            className="w-full h-full max-h-[88vh] object-contain"
          />
        )}
      </div>
    </div>
  );
}

/* ==============================
   PROJECT DEEP DIVE (BOTTOM)
================================*/
function ProjectDeepDive({ project }: { project: Project }) {
  if (project.id === "cubesat") {
    return (
      <section className="mt-10 border-t border-slate-800/70 pt-8 mx-auto w-full max-w-3xl space-y-4">
        <h2 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-400">
          CubeSat Research & Flight Systems
        </h2>

        <p className="text-[13px] leading-relaxed text-slate-300">
        On the CubeSat team I contributed to two major systems: AMDROHP, a 3D printed oscillating heat pipe radiator,
        and a deployable drag sail for deorbit. AMDROHP uses spring-driven panels that double as working-fluid channels, 
        allowing the radiator to stow compactly and deploy on orbit; I focused on the deployment mechanism, including hinge placement,
         damping elements, and features that mechanically secure the radiators prior to release. 
         </p>
         <p className="text-[13px] leading-relaxed text-slate-300">For the drag sail, I supported concept 
         development and testing for a 1U configuration aimed at reducing deorbit time as part of space debris mitigation. In parallel, I 
         designed a modular battery bracket that could scale pack capacity with different mission energy budgets.
</p>
         
          <p className="text-[13px] leading-relaxed text-slate-300"> The work also exposed me 
         to RF link testing and the operational stress of bringing up satellite radios, which showed me how sensitive flight systems are to 
         integration and test discipline.
        </p>

      </section>
    );
  }

  if (project.id === "nerf-turret") {
    return (
      <section className="mt-10 border-t border-slate-800/70 pt-8 mx-auto w/full max-w-3xl space-y-3">
        <h2 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-400">
          Control Loop & Competition Context
        </h2>
        <p className="text-[13px] leading-relaxed text-slate-300">
          This turret was built for a mechatronics course competition where the
          goal was to automatically detect and tag opponents as they entered the
          field of view. I built a pipeline that takes a thermal snapshot,
          processes it, then pushes the target location into a motor control
          loop that drives the crosshair.
        </p>
        <p className="text-[13px] leading-relaxed text-slate-300">
          Most of the work was in edge cases. Filtering noisy readings, dealing
          with partial occlusions, making sure the mechanism never drove
          itself into a hard stop even when the sensor got confused.
          There was a tactic that some teams tried utilizing that included using a hot object to confuse the thermal sensor, but we were able to overcome that by finding the hottest column, so evenly spread body heat outweighs the single hot pixel in the snapshot.  
        </p>
      </section>
    );
  }

  if (project.id === "robot-rodeo") {
    return (
      <section className="mt-10 border-t border-slate-800/70 pt-8 mx-auto w/full max-w-3xl space-y-3">
        <h2 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-400">
          Course Constraints & Chassis Decisions
        </h2>
        <p className="text-[13px] leading-relaxed text-slate-300">
          The Naval Surface Warfare Center’s Robot Rodeo course packed stairs, 
          tight turns, light switches, and a rocking table into a 1/3-scale ship interior.
          The competition’s goal is to reduce risk to sailors by validating robotic systems 
          that can inspect confined shipboard environments and identify unsafe conditions before humans enter.
        </p>
        <p className="text-[13px] leading-relaxed text-slate-300">
          That mission drove nearly every chassis decision: wheelbase,
          center of gravity, ground clearance, and how the drivetrain handled transitions 
          between flat decks and stair edges. I iterated through layouts in CAD, then validated
           them with fast hardware mockups to ensure the robot would not bottom out or hang up on stair lips.
            Balancing on the rocking platform forced careful consideration of how the robot recovered as its contact patch shifted under dynamic motion.
        </p>
      </section>
    );
  }

  if (project.id === "baja") {
    return (
      <section className="mt-10 border-t border-slate-800/70 pt-8 mx-auto w/full max-w-3xl space-y-4">
        <h2 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-400">
          Baja SAE: Design, Testing & Machining
        </h2>

        <p className="text-[13px] leading-relaxed text-slate-300">
          On the Baja SAE team I split time between design and hands-on manufacturing.
           I redesigned the driver pedal as a 3D-printed component, cutting peak stress by roughly half 
           compared to the previous iteration and enabling more aggressive maneuvers without failures. 
        
        </p>

        <p className="text-[13px] leading-relaxed text-slate-300">
            To address the recurring problem of welding small tabs at odd angles on the frame, I developed 
           3D-printed fixturing that located parts consistently and sped up fabrication. 
        </p>

<p className="text-[13px] leading-relaxed text-slate-300">

            I also helped define a
            test method for tire moment of inertia so that the team had measured data for both hand calculations 
            and simulations. 
</p>
<p className="text-[13px] leading-relaxed text-slate-300">
            Most of my machining experience came from this car: spending hundreds of hours on lathes and mills 
            shaped how I think about tolerances, set-ups, and how design choices translate into actual manufacturing effort.

</p>




<p className="text-[13px] leading-relaxed text-slate-300">



</p>
      </section>
    );
  }

  if (project.id === "sensor-logger") {
    return (
      <section className="mt-10 border-t border-slate-800/70 pt-8 mx-auto w/full max-w-3xl space-y-3">
        <h2 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-400">
          Logging Architecture
        </h2>
        <p className="text-[13px] leading-relaxed text-slate-300">
          This logger was built so I could capture multi-channel signals from
          real hardware, then replay them into analysis scripts. The focus was
          on timestamp accuracy, log robustness, and being able to recover data
          even if power was pulled mid-run.
        </p>
      </section>
    );
  }

  if (project.id === "portfolio") {
    return (
      <section className="mt-10 border-t border-slate-800/70 pt-8 mx-auto w/full max-w-3xl space-y-3">
        <h2 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-400">
          Interaction & Visual Language
        </h2>
        <p className="text-[13px] leading-relaxed text-slate-300">
          This site is also a design project: the scrolling skill band,
          coverflow, and cursor-reactive grid are tuned to feel like a hardware
          UI. Most of the work went into getting motion curves and opacity ramps
          to feel smooth without hurting readability.
        </p>
      </section>
    );
  }

  if (project.id === "hardware-lab") {
    return (
      <section className="mt-10 border-t border-slate-800/70 pt-8 mx-auto w/full max-w-3xl space-y-3">
        <h2 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-400">
          Bench Workflow
        </h2>
        <p className="text-[13px] leading-relaxed text-slate-300">
          The lab is laid out so I can move quickly between scopes, supplies,
          CAN tools, and boards without recabling everything. The goal is to
          reduce setup friction so most of the time is spent on actual debug,
          not fighting the bench.
        </p>
      </section>
    );
  }

  return null;
}
