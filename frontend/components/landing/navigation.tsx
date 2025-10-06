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
                <img src="/kolam_icon.svg" alt="Kolam Icon" className="h-8 w-8" />
                
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
                Create Kolam
              </Link>

              <Link
                href="/analyze"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-lg font-bold transition-colors"
              >
                Analyze Kolam
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
                href="/explore"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="/create"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Create Kolam
              </Link>
              
              <Link
                href="/analyze"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Analyze Kolam
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
