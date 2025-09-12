import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Grid3X3, RotateCcw, Layers, Compass, Sparkles } from "lucide-react";

const principles = [
  {
    icon: Grid3X3,
    title: "Grid Foundation",
    description:
      "Every Kolam begins with a grid of dots that serves as the foundation for creating intricate patterns and maintaining structural harmony.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: RotateCcw,
    title: "Symmetry & Balance",
    description:
      "Kolam designs embody perfect symmetry, reflecting the cosmic order and balance that governs the universe in Hindu philosophy.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Layers,
    title: "Repetition & Rhythm",
    description:
      "Patterns repeat and flow in rhythmic sequences, creating visual music that represents the cyclical nature of life and time.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Compass,
    title: "Sacred Geometry",
    description:
      "Mathematical precision meets spiritual symbolism, where each line and curve carries deeper meaning about the divine order.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

export function PrinciplesSection() {
  return (
    <section
      id="learn"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 kolam-pattern opacity-5" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 text-primary font-medium mb-4">
            <Sparkles className="h-5 w-5" />
            <span>Core Principles</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            The Mathematics of{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sacred Art
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Understanding the fundamental elements that make Kolam designs both
            mathematically precise and spiritually meaningful across generations
            of Indian culture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {principles.map((principle, index) => (
            <Card
              key={index}
              className={`hover-lift glass-morphism border-0 shadow-lg ${
                index % 2 === 1 ? "md:mt-12" : ""
              }`}
            >
              <CardHeader className="pb-4">
                <div
                  className={`w-16 h-16 ${principle.bgColor} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <principle.icon className={`h-8 w-8 ${principle.color}`} />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  {principle.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  {principle.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-foreground italic max-w-4xl mx-auto leading-relaxed">
            "In every dot lies infinite possibility, in every line flows eternal
            wisdom"
          </blockquote>
          <cite className="block mt-4 text-muted-foreground">
            — Ancient Tamil Proverb
          </cite>
        </div>
      </div>
    </section>
  );
}
