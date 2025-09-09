"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette } from "lucide-react";

const themes = [
  {
    name: "Traditional",
    class: "light",
    colors: ["#D2691E", "#8B4513", "#CD853F"],
  },
  { name: "Dark", class: "dark", colors: ["#FB923C", "#7C2D12", "#451A03"] },
  {
    name: "Royal",
    class: "theme-royal",
    colors: ["#663399", "#FFD700", "#DA70D6"],
  },
  {
    name: "Forest",
    class: "theme-forest",
    colors: ["#228B22", "#DAA520", "#9ACD32"],
  },
  {
    name: "Ocean",
    class: "theme-ocean",
    colors: ["#4682B4", "#20B2AA", "#87CEEB"],
  },
];

export function ThemeSelector() {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
      <div className="flex items-center gap-2 mb-3">
        <Palette className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">
          Color Themes
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {themes.map((theme) => (
          <Button
            key={theme.name}
            variant={currentTheme === theme.class ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme(theme.class)}
            className="flex items-center gap-2 h-auto p-2"
          >
            <div className="flex gap-1">
              {theme.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full border border-border/30"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-xs text-current">{theme.name}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}
