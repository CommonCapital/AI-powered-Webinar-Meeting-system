import React from "react";

/**
 * Static, eye-catching Feature Card
 * - React + TypeScript
 * - Tailwind CSS utility classes
 * - Black textured background + silver metallic sheen overlay
 * - Hover/focus micro-interactions
 *
 * Usage: <FeatureCard />
 */
export default function Featurecard(){
  return (
    <div className="w-full max-w-xl mx-auto p-6">
      {/* Card container */}
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl transform-gpu transition-transform duration-500 hover:-translate-y-1 focus-within:-translate-y-1"
        aria-hidden={false}
        role="region"
        aria-label="Premium feature card"
      >
        {/* Textured black background (image) */}
        <div
          className="absolute inset-0 bg-black bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1600&q=60')",
            // the above photo is a neutral dark texture; swap for your preferred metallic texture
          }}
        />

        {/* Silver metallic sheen (angled gradient) */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 20%, rgba(0,0,0,0.2) 50%, rgba(192,192,192,0.06) 80%, rgba(255,255,255,0.08) 100%)",
            mixBlendMode: "overlay",
          }}
        />

        {/* Subtle chrome stripe for extra 'metal' effect */}
        <div
          className="absolute -left-32 top-0 h-full w-80 transform rotate-12 opacity-30 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.12) 100%)",
            filter: "blur(14px)",
          }}
        />

        {/* Dark vignette to deepen edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 px-8 py-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gray-300/10 to-white/10 px-3 py-1 mb-4">
            <span className="text-xs font-semibold tracking-wider text-gray-200 uppercase">Premium</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md">Ultraviolet Pro</h3>

          <p className="mt-3 max-w-xl text-sm sm:text-base text-gray-300">
            Experience unprecedented speed and precision — engineered for creators and teams who demand
            subliminal performance with a refined metallic aesthetic.
          </p>

          <div className="mt-6 flex gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-gray-100/10 to-white/5 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/10 shadow-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-400/30 transition-transform"
              aria-label="Activate feature"
            >
              Activate
            </button>

            <button
              className="inline-flex items-center gap-2 rounded-lg bg-transparent px-5 py-2 text-sm font-medium text-gray-200/80 border border-white/10 hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400/20"
              aria-label="Learn more about feature"
            >
              Learn more
            </button>
          </div>

          {/* Subtle footer note */}
          <div className="mt-6 text-xs text-gray-400">No trial required • Secure • Fast</div>
        </div>
      </div>
    </div>
  );
}
