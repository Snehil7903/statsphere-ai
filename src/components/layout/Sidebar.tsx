"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  LineChart, 
  UploadCloud, 
  Sparkles, 
  Settings, 
  UserCircle 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  // Navigation schema defining parameters cleanly
  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Analytics", href: "/analytics", icon: LineChart },
    { label: "Upload", href: "/upload", icon: UploadCloud },
    { label: "AI Insights", href: "/ai-insights", icon: Sparkles, badge: "New" },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#050505]/60 border-r border-white/5 p-6 backdrop-blur-xl flex flex-col justify-between sticky top-0 z-40 select-none">
      
      {/* Top Half Section: Branding & Navigation Links */}
      <div className="space-y-10">
        
        {/* Elite Branding Header Badge Group */}
        <Link 
          href="/" 
          className="flex items-center gap-3 font-black text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 group pl-2"
        >
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 flex items-center justify-center text-xs text-white font-black shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            S
          </div>
          <div className="flex items-center">
            StatSphere <span className="text-indigo-400 font-light ml-1">AI</span>
          </div>
        </Link>

        {/* Navigation Core List Block */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  isActive 
                    ? "bg-white/10 text-white border border-white/10 shadow-lg shadow-black/40" 
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                {/* Active Left-Side Neon Border Pillar */}
                {isActive && (
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-indigo-500 rounded-r-md" />
                )}

                <div className="flex items-center gap-3.5 relative z-10">
                  <Icon className={`w-4 h-4 transition-colors ${
                    isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"
                  }`} />
                  <span>{item.label}</span>
                </div>

                {/* Optional Alert Badge Micro-Tag */}
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 relative z-10 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Half Section: User Account Profile Snippet Footer */}
      <div className="pt-6 border-t border-white/5 flex items-center gap-3.5 px-2">
        <div className="relative">
          <UserCircle className="w-9 h-9 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#050505]" />
        </div>
        <div className="text-left overflow-hidden">
          <p className="text-sm font-semibold text-zinc-200 truncate leading-none mb-1">
            Snehil Raj
          </p>
          <p className="text-xs text-zinc-500 font-light truncate">
            developer@statsphere.ai
          </p>
        </div>
      </div>

    </aside>
  );
}