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
              className="text-2xl font-bold text-primary"
            >
              FractalForge
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