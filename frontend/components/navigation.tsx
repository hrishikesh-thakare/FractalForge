"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThemeSelector } from "@/components/theme-selector";
import { Menu, X } from "lucide-react";

// Kolam-inspired icon for the theme selector
const KolamIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C12 2 14 6 18 6C22 6 22 12 22 12C22 12 18 14 18 18C18 22 12 22 12 22C12 22 10 18 6 18C2 18 2 12 2 12C2 12 6 10 6 6C6 2 12 2 12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 5C12 5 14 8 17 8C20 8 20 12 20 12C20 12 17 14 17 16C17 19 12 19 12 19C12 19 10 16 7 16C4 16 4 12 4 12C4 12 7 10 7 8C7 5 12 5 12 5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.6"
    />
    <circle
      cx="12"
      cy="12"
      r="1.5"
      fill="currentColor"
    />
  </svg>
);

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
                href="/create"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Create Your Kolam
              </Link>
              <Link
                href="/analyze"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Analyze Your Kolam
              </Link>
            </div>
            <div className="ml-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <KolamIcon />
                    <span className="sr-only">Select Theme</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto">
                  <ThemeSelector />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Mobile menu button & Theme Selector */}
          <div className="md:hidden flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <KolamIcon />
                  <span className="sr-only">Select Theme</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto mr-4">
                <ThemeSelector />
              </PopoverContent>
            </Popover>
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
