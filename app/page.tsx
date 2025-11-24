"use client";

import React, { useEffect, useRef, useState } from "react";

// --- LIGHT PROJECT DATA ---
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
  gallery?: string[]; // extra images for the detail section
  highlights?: string[]; // bullet points
  tech?: string[]; // tech stack / tools
};

const PROJECTS: Project[] = [
  {
    id: "nerf-turret",
    title: "Autonomous Nerf Turret",
    accent: "#f97316",
    role: "Python • Mechatronics",
    year: "2022",
    summary:
      "Autonomous Nerf turret that detects people using a thermal sensor, aims with pan/tilt motors, and fires darts for a mechatronics class competition.",
    image: "/projects/nerf-turret-main.jpg",
    github: "https://github.com/fmoren05/Term-Project",
    gallery: [
  "/projects/nerf-turret-main.jpg",
  "/projects/nerf-turret-side.jpg",
  "/projects/nerf-turret-thermal.jpg",

  // 🎥 Google Drive videos – in the order you want them
  "https://drive.google.com/file/d/1898FJT0jIi6c01ILZBM89t2987Pqvz_G/preview",
  "https://drive.google.com/file/d/1l8kSO0vYaUGgQLaVvaD6BNZ9J0VO4BSx/preview",
  "https://drive.google.com/file/d/1mLuf-DcBSHBue66RncZfcMSVJwaqkHj2/preview",

  "/projects/nerf-turret-internals.jpg"
],

    tech: ["Python", "Thermal sensor", "DC motors", "Mechanisms", "Control"],
    highlights: [
      "Linked a thermal camera snapshot to a motor control loop that automatically aims at the hottest region in the frame.",
      "Designed the pan/tilt and firing mechanism to minimize backlash and avoid jams during rapid firing in competition.",
      "Realized column-wise temperature averaging would make target selection more robust than a single hottest pixel.",
    ],
  },

  {
    id: "robot-rodeo",
    title: "Cal Poly Robot Rodeo Robot",
    accent: "#38bdf8",
    role: "Mechanical • Robotics",
    year: "2023",
    summary:
      "Competition robot for Cal Poly’s Robot Rodeo that climbed stairs, toggled switches, and balanced on a rocking platform inside a 1/3-scale ship interior.",
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
    tech: [
      "3D printed structure",
      "Aluminum T-slot extrusions",
      "Aluminum sheet",
      "Stair-climbing drivetrain",
      "Competition robot design",
    ],
    highlights: [
      "Designed and manufactured the full chassis and drivetrain for a competition robot navigating a 1/3-scale interior of a naval ship.",
      "Robot handled tight turns, stair ascent/descent, and balancing on a rocking table while interacting with light switches.",
      "Mixed 3D-printed parts, aluminum T-slot, and sheet metal to keep the frame lightweight and reduce load on the drive motors.",
      "Gained end-to-end experience taking a mechanical concept through design, fabrication, and competition validation.",
    ],
  },

  // CubeSat project
  {
    id: "cubesat",
    title: "CubeSat Thermal & Deorbit Systems",
    accent: "#22c55e",
    role: "Thermal • Mechanisms",
    year: "2022",
    summary:
      "Contributed to an oscillating heat pipe radiator, deployable drag sail, and modular battery pack for a 1U CubeSat focused on deorbit and space sustainability.",
    image: "/projects/cubesat-main.jpg",
    gallery: [
      "/projects/cubesat-main.jpg",
      "/projects/cubesat-amdroph.jpg",
      "/projects/cubesat-drag-sail.jpg",
      "/projects/cubesat-battery-pack.jpg",
      "/projects/cubesat-ground-station.jpg",
    ],
    tech: [
      "CubeSat",
      "Oscillating heat pipe",
      "Deployable mechanisms",
      "Drag sail",
      "Battery packaging",
      "RF & radios",
    ],
    highlights: [
      "Worked on AMDROHP, an oscillating heat pipe radiator deployed with spring elements that also act as the working-fluid channels.",
      "Owned deployment mechanism details, including hinge placement, dampers, and the features that secure radiators prior to deployment.",
      "Contributed to a deployable drag sail system for a 1U CubeSat to reduce deorbit time as part of space debris mitigation efforts.",
      "Designed a modular battery bracket that can scale pack capacity based on mission energy budget requirements.",
      "Gained hands-on experience with CubeSat radio systems during high-stress communication and link-testing sessions.",
    ],
  },

  // Baja SAE project
  {
    id: "baja",
    title: "Baja SAE Design & Manufacturing",
    accent: "#fbbf24",
    role: "Design • Manufacturing",
    year: "2021",
    summary:
      "Design and manufacturing work on a Baja SAE off-road car, including a 3D-printed pedal, tab mounting fixtures, tire inertia testing, and extensive manual machining.",
    image: "/projects/baja-main.jpg",
    gallery: [
      "/projects/baja-main.jpg",
      "/projects/baja-pedal.jpg",
      "/projects/baja-tabs.jpg",
      "/projects/baja-machining.jpg",
    ],
    tech: [
      "Baja SAE",
      "3D printing",
      "Fixture design",
      "Manual machining",
      "Testing methods",
      "Design for manufacturing",
    ],
    highlights: [
      "Designed a 3D-printed pedal that cut peak stress roughly in half compared to the previous design, enabling more aggressive maneuvers and better reliability.",
      "Developed 3D-printed tab mounting fixtures to solve awkward-angle welding problems and improve repeatability.",
      "Helped create a test method to determine tire moment of inertia and feed that data into both hand calcs and simulations.",
      "Spent hundreds of hours on lathes and mills creating Baja parts, which heavily shaped how I think about designing for manufacturability.",
    ],
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
  },
  {
    id: "hardware-lab",
    title: "Hardware Lab Setup",
    accent: "#4ade80",
    role: "Lab • Instrumentation",
    year: "2024",
    summary:
      "Bench setup with scopes, supplies, CAN tools, and PCBs optimized for fast bring-up and debug of physical systems.",
    image: "/projects/hardware-lab.jpg",
    tech: ["Lab tooling", "Instrumentation"],
  },
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
              Hardware Validation Engineer
            </p>
            <h1 className="text-3xl font-semibold md:text-5xl">
              Berent Baysal
            </h1>
            <p className="text-sm text-slate-300">
              I build shit that works
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
              href="mailto:YOUR_EMAIL_HERE"
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
              href="https://www.linkedin.com/in/YOUR-LINKEDIN-ID/"
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
        {/* BASE GRID OVER WHOLE SECTION */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.45) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.45) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            opacity: 1,
          }}
        />

        {/* VIGNETTE */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,1) 80%)",
          }}
        />

        {/* CURSOR-REACTIVE HIGHLIGHT OVER GRID */}
        {cursorPos && (
          <div
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-400 ease-out"
            style={{
              opacity: cursorPos ? 0.75 : 0,
              background: cursorPos
                ? `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px,
                    rgba(148,163,184,0.55),
                    transparent 20%)`
                : "none",
              mixBlendMode: "screen",
            }}
          />
        )}

        {/* FOREGROUND CONTENT */}
        <div className="relative z-30 mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-between">
          {/* CAROUSEL AREA */}
          <div className="relative flex flex-1 items-center justify-center">
            {/* CENTER GLOW */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-80 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(148,163,184,0.35),_transparent_70%)] blur-[95px]" />

            {/* ARROWS */}
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between">
              <button
                onClick={() => go("prev")}
                className="pointer-events-auto ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/30 bg-black/40 text-[11px] text-slate-400 transition hover:border-slate-500/60 hover:bg-black/80 hover:text-slate-100"
                aria-label="Previous project"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
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
                className="pointer-events-auto mr-2 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/30 bg-black/40 text-[11px] text-slate-400 transition hover:border-slate-500/60 hover:bg-black/80 hover:text-slate-100"
                aria-label="Next project"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
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
                  d === 0 ? 1.28 : d === 1 ? 1.04 : d === 2 ? 0.94 : 0.86;

                const cardOpacity =
                  d === 0 ? 1 : d === 1 ? 0.6 : d === 2 ? 0.35 : 0.18;

                const translateY =
                  d === 0 ? 0 : d === 1 ? 26 : d === 2 ? 44 : 60;
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
                        className="h-[22rem] w-[22rem] sm:h-[24rem] sm:w-[24rem] object-cover"
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
                      <div className="relative flex items-center justify-between px-6 pb-4 pt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <span
                            className="inline-block h-2 w-2 rounded-full"
                            style={{ backgroundColor: p.accent }}
                          />
                          <span>{String(i + 1).padStart(2, "0")}</span>
                        </span>
                        <span className="truncate max-w-[180px] text-right text-[9px] text-slate-500">
                          {p.title}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BOTTOM TEXT */}
          <div className="flex flex-col items-center gap-2 pb-6">
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
          className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start"
        >
          {/* LEFT: gallery, staggered cards */}
          <div className="space-y-6">
            {(() => {
              const filtered =
                current.gallery?.filter((media) => media !== current.image) ||
                [];
              const mediaToShow =
                filtered.length > 0 ? filtered : [current.image];

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
                        className="w-full h-[320px] md:h-[420px] lg:h-[460px] rounded-xl"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    ) : (
                      <img
                        src={src}
                        alt={`${current.title} view ${idx + 1}`}
                        className="w-full h-[320px] md:h-[420px] lg:h-[460px] object-cover transition-transform duration-200 group-hover:scale-[1.02]"
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
            })()}
          </div>

          {/* RIGHT: compact info panel (sticky) */}
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

            {/* Code / FDR buttons */}
            {(current.github || current.fdr) && (
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
                    <span className="tracking-[0.12em] uppercase">
                      View Code
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3"
                      aria-hidden="true"
                    >
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
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3"
                      aria-hidden="true"
                    >
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
          During my time at CubeSat, I worked on two major projects. One of them
          was <span className="font-medium">AMDROHP</span>, an oscillating heat
          pipe that&apos;s deployed with springs that also act as the tubes
          which refrigerant is allowed to travel in. An oscillating heat pipe
          has not been tested in space as of the time this is written, so
          AMDROHP is one of a kind. I worked on the deployment mechanism, which
          includes the placement and designs of the hinges with dampers, and the
          barriers that hold and secure the radiators prior to deployment.
        </p>

        <p className="text-[13px] leading-relaxed text-slate-300">
          In addition, I contributed to the development and testing of a
          deployable drag sail system for a 1U CubeSat. The drag sail was
          designed to reduce satellite deorbit times, which are a potential
          solution in space debris mitigation efforts. This work was part of
          broader efforts to ensure the sustainability of future satellite
          missions.
        </p>

        <p className="text-[13px] leading-relaxed text-slate-300">
          I also worked on a mini project focused on battery packing for a
          CubeSat, where I designed a modular bracket that could house batteries
          and adjust its capacity based on the energy budget requirements.
        </p>

        <p className="text-[13px] leading-relaxed text-slate-300">
          Through these projects, I also gained experience with radio
          technology, which was perhaps the most stressful situations that
          I&apos;ve ever been in. They are crucial for satellite communication
          and control. This exposure allowed me to understand the challenges and
          solutions involved in maintaining reliable communication with
          satellites in orbit.
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
          loop that drives the pan/tilt axes.
        </p>
        <p className="text-[13px] leading-relaxed text-slate-300">
          Most of the work was in edge cases: filtering noisy readings, dealing
          with partial occlusions, and making sure the mechanism never drove
          itself into a hard stop even when the sensor got confused.
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
          The Robot Rodeo course packed stairs, tight turns, light switches, and
          a rocking table into a 1/3-scale ship interior. That environment drove
          almost every chassis choice: wheelbase, center of gravity, clearances,
          and how the drivetrain handled transitions between flat ground and
          stairs.
        </p>
        <p className="text-[13px] leading-relaxed text-slate-300">
          I iterated through layouts in CAD, then validated with fast hardware
          mockups to make sure the robot didn&apos;t bottom out or hang up on
          stair lips. Balancing on the rocking platform forced us to think about
          how the robot recovered when its contact patch shifted.
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
          During my time in Baja, I was heavily involved in both designing and
          manufacturing. One of my projects was a 3D-printed pedal which cut
          down the maximum stress in half compared to the previous year&apos;s
          pedal. This allowed the team to take more aggressive maneuvers and
          improved reliability significantly.
        </p>

        <p className="text-[13px] leading-relaxed text-slate-300">
          Another project included rethinking the notoriously difficult tab
          mounting problem when it comes to welding, since those tabs are always
          at odd angles and locations. 3D printing was once again the avenue I
          resorted to, building fixtures that made it much easier to locate and
          hold tabs consistently during welding.
        </p>

        <p className="text-[13px] leading-relaxed text-slate-300">
          In addition to design work, I helped develop a method to determine the
          moment of inertia of our tires. This testing procedure allowed us to
          gather data that was used for both manual calculations and computer
          simulations, which helped with accuracy in our performance assessments
          and design improvements.
        </p>

        <p className="text-[13px] leading-relaxed text-slate-300">
          A large portion of my hands-on experience in manual machining came
          from Baja. I spent hundreds of hours creating parts using lathes and
          mills. This gave me a lot of practical knowledge and expanded my
          skills in designing for manufacturing, since I was constantly bouncing
          between CAD and the realities of how parts actually get made.
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
