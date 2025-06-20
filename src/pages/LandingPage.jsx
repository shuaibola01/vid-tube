import React from "react";
import { Link } from "react-router-dom";
import * as SC from "../../style";
import logo from "/logo.png";

export default function LandingPage() {
  return (
    <SC.Main7 className="min-h-screen text-light-text flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center text-center px-6 bg-[url('/cover.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 backdrop-blur-sm z-0" />

        {/* Overlay content */}
        <div className="relative z-10 max-w-3xl">
          <img src={logo} alt="Trendz Logo" className="h-60 mx-auto" />

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Your Movie Universe
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-8">
            Discover new worlds, stories, and experiences through the best movies curated just for you.
          </p>
          <Link
            to="/log_in"
            className="inline-block bg-[var(--color-buttons)] hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Dive In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-16 bg-[var(--color-container)]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Tailored Picks",
              desc: "Smart suggestions based on your viewing habits.",
            },
            {
              title: "Movie Watchlist",
              desc: "Easily track, save, and revisit your favorite films.",
            },
            {
              title: "Trailer Access",
              desc: "Preview films with HD trailers before you commit.",
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow transition hover:scale-[1.02]"
            >
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-[var(--color-sub-text)]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6 mt-auto bg-[var(--color-background)] border-t border-muted">
        &copy; {new Date().getFullYear()} VidTube. All rights reserved.
      </footer>
    </SC.Main7>
  );
}
