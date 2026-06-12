"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles, ArrowRight, BarChart3, ShieldCheck, Cpu } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // High-end cinematic entrance orchestrator
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(".hero-badge", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(".hero-title", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      "-=0.7"
    )
    .fromTo(".hero-subtitle", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8"
    )
    .fromTo(".hero-action", 
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" },
      "-=0.6"
    )
    .fromTo(".hero-feature", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
      "-=0.5"
    );
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black overflow-hidden relative flex flex-col justify-between"
    >
      {/* Immersive Deep Spatial Background Glows */}
      <div className="absolute top-[-30%] left-[-20%] w-[70vw] h-[70vw] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-30%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-fuchsia-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none" />

      {/* Navigation Subtle Accent Row */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between border-b border-white/5 backdrop-blur-sm bg-black/10">
        <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-[11px] text-white font-black shadow-lg shadow-indigo-500/20">S</div>
          StatSphere <span className="text-indigo-400 font-light">AI</span>
        </div>
        <div className="text-xs font-semibold text-zinc-500 tracking-wider uppercase bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
          v2.4.0 Live
        </div>
      </header>

      {/* Main Hero Showcase Grid Matrix */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center flex-grow text-center">
        
        {/* Dynamic Context Tag Pill */}
        <div className="hero-badge opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 mb-8 backdrop-blur-md shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          Next-Generation Structural Analytics
        </div>

        {/* Cinematic Title Header Display */}
        <h1 className="hero-title opacity-0 text-6xl sm:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 max-w-4xl leading-[1.05]">
          StatSphere <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">AI</span>
        </h1>

        {/* Context Subtext Vector */}
        <p className="hero-subtitle opacity-0 text-lg sm:text-2xl text-zinc-400 font-light max-w-2xl mb-12 leading-relaxed">
          The autonomous engineering ecosystem built to turn massive CSV clusters into gorgeous, instantly customizable analytical matrix profiles.
        </p>

        {/* Premium Core Call-to-Action Link Mechanism */}
        <div className="hero-action opacity-0 mb-24">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-base shadow-2xl shadow-white/10 hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden"
          >
            Launch Core Studio
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* High-End Platform Highlights Array */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left mt-10">
          {[
            { title: "Bivariate Vectors", desc: "Instantly cross-reference matching dimensions using real ascending numeric sequence pipelines.", icon: BarChart3 },
            { title: "Glassmorphic Tables", desc: "Iterate across over 50,000+ matrix index rows dynamically with client pagination.", icon: ShieldCheck },
            { title: "Statistical Bins", desc: "No more broken raw distributions. Experience true density bucket histogram aggregation.", icon: Cpu },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="hero-feature opacity-0 bg-white/[0.01] border border-white/5 rounded-2xl p-6 backdrop-blur-md hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 group"
            >
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 w-fit text-zinc-400 group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-all mb-4">
                <item.icon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-1.5">{item.title}</h4>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </main>

      {/* Minimal Footer Signature Block */}
      <footer className="relative z-10 w-full text-center py-6 text-xs text-zinc-600 font-light border-t border-white/5 bg-zinc-950/20">
        Engineered for ultra-performance browser response environments.
      </footer>
    </div>
  );
}