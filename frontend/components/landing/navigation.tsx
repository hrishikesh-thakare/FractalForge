"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-3 group"
            >
              {/* Kolam-inspired Logo SVG */}
              <div className="relative">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  className="text-primary group-hover:scale-105 transition-transform duration-300"
                  style={{ color: "#7c2d12" }}
                >
                  {/* Outer ring of dots */}
                  <circle
                    cx="20"
                    cy="6"
                    r="1.5"
                    fill="currentColor"
                    opacity="0.8"
                  />
                  <circle
                    cx="28"
                    cy="8"
                    r="1.5"
                    fill="currentColor"
                    opacity="0.8"
                  />
                  <circle
                    cx="34"
                    cy="20"
                    r="1.5"
                    fill="currentColor"
                    opacity="0.8"
                  />
                  <circle
                    cx="28"
                    cy="32"
                    r="1.5"
                    fill="currentColor"
                    opacity="0.8"
                  />
                  <circle
                    cx="20"
                    cy="34"
                    r="1.5"
                    fill="currentColor"
                    opacity="0.8"
                  />
                  <circle
                    cx="12"
                    cy="32"
                    r="1.5"
                    fill="currentColor"
                    opacity="0.8"
                  />
                  <circle
                    cx="6"
                    cy="20"
                    r="1.5"
                    fill="currentColor"
                    opacity="0.8"
                  />
                  <circle
                    cx="12"
                    cy="8"
                    r="1.5"
                    fill="currentColor"
                    opacity="0.8"
                  />

                  {/* Inner ring of dots */}
                  <circle
                    cx="20"
                    cy="12"
                    r="1.2"
                    fill="currentColor"
                    opacity="0.9"
                  />
                  <circle
                    cx="25"
                    cy="15"
                    r="1.2"
                    fill="currentColor"
                    opacity="0.9"
                  />
                  <circle
                    cx="28"
                    cy="20"
                    r="1.2"
                    fill="currentColor"
                    opacity="0.9"
                  />
                  <circle
                    cx="25"
                    cy="25"
                    r="1.2"
                    fill="currentColor"
                    opacity="0.9"
                  />
                  <circle
                    cx="20"
                    cy="28"
                    r="1.2"
                    fill="currentColor"
                    opacity="0.9"
                  />
                  <circle
                    cx="15"
                    cy="25"
                    r="1.2"
                    fill="currentColor"
                    opacity="0.9"
                  />
                  <circle
                    cx="12"
                    cy="20"
                    r="1.2"
                    fill="currentColor"
                    opacity="0.9"
                  />
                  <circle
                    cx="15"
                    cy="15"
                    r="1.2"
                    fill="currentColor"
                    opacity="0.9"
                  />

                  {/* Center dot */}
                  <circle
                    cx="20"
                    cy="20"
                    r="2"
                    fill="currentColor"
                  />

                  {/* Connecting curves - Kolam style */}
                  <path
                    d="M 20 12 Q 25 15 28 20 Q 25 25 20 28 Q 15 25 12 20 Q 15 15 20 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0.6"
                  />

                  {/* Outer decorative curves */}
                  <path
                    d="M 20 6 Q 30 10 34 20 Q 30 30 20 34 Q 10 30 6 20 Q 10 10 20 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.4"
                  />

                  {/* Inner decorative pattern */}
                  <path
                    d="M 18 18 L 22 18 L 22 22 L 18 22 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    opacity="0.7"
                  />
                </svg>
              </div>
              <span
                className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300"
                style={{ color: "#7c2d12" }}
              >
                FractalForge
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/explore"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-lg font-bold transition-colors"
              >
                Explore
              </Link>
              <Link
                href="/create"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-lg font-bold transition-colors"
              >
                Create Your Kolam
              </Link>

              <Link
                href="/analyze"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-lg font-bold transition-colors"
              >
                Analyze Your Kolam
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/create"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Create Your Kolam
              </Link>
              <Link
                href="/explore"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="/analyze"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Analyze Your Kolam
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
