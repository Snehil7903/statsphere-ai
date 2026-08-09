"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  Settings as SettingsIcon, 
  User, 
  Key, 
  Bell, 
  ShieldCheck, 
  Save, 
  Database 
} from "lucide-react";

export default function SettingsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("general");

  useGSAP(() => {
    gsap.fromTo(".settings-node",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="space-y-8 p-1 relative z-10">
      
      {/* Header */}
      <div className="settings-node flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">
            <SettingsIcon className="w-3.5 h-3.5 text-indigo-400" /> Platform Configuration
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Workspace Settings
          </h1>
          <p className="text-sm text-zinc-500 font-light mt-1">
            Manage your account preferences, AI API keys, and workspace parameters
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-all shadow-lg shadow-white/10 self-start sm:self-center">
          <Save className="w-3.5 h-3.5" /> Save Preferences
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Tab Switcher */}
        <div className="settings-node space-y-1">
          {[
            { id: "general", label: "General & Profile", icon: User },
            { id: "api", label: "API & Integrations", icon: Key },
            { id: "database", label: "Data Pipeline", icon: Database },
            { id: "notifications", label: "Alerts & Sync", icon: Bell },
            { id: "security", label: "Security & Access", icon: ShieldCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white/10 text-white border border-white/10 shadow-lg"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-indigo-400" : "text-zinc-600"}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Configuration Form */}
        <div className="settings-node md:col-span-3 bg-white/[0.01] border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
          
          <div className="border-b border-white/5 pb-4">
            <h3 className="text-xl font-bold text-white">Profile Preferences</h3>
            <p className="text-xs text-zinc-500">Configure your personal workspace identity</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                defaultValue="Snehil Raj" 
                className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                defaultValue="developer@statsphere.ai" 
                className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">StatSphere OpenAI Key</label>
            <input 
              type="password" 
              defaultValue="sk-proj-********************************" 
              className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 font-mono"
            />
            <p className="text-[11px] text-zinc-600">Used to generate cognitive AI insights on your uploaded survey datasets.</p>
          </div>

          {/* Toggle Switches */}
          <div className="pt-6 border-t border-white/5 space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.01] border border-white/5">
              <div>
                <h4 className="text-sm font-semibold text-white">Automated Anomaly Detection</h4>
                <p className="text-xs text-zinc-500">Flag suspicious dropouts and unusual response variance automatically</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-500 cursor-pointer" />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.01] border border-white/5">
              <div>
                <h4 className="text-sm font-semibold text-white">Dark Glassmorphic UI Mode</h4>
                <p className="text-xs text-zinc-500">Enable spatial ambient blur effects and glow vectors</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-500 cursor-pointer" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}