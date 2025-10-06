import { ArrowDown, Sparkles, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-background">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary font-medium static-text">
                <Sparkles className="h-5 w-5" />
                <span>Ancient Art • Modern Discovery</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight text-balance static-text">
                Traditional{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Kolam
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty max-w-2xl static-text">
                Discover the ancient Indian tradition that transforms simple
                grids into profound art through intricate patterns of dots,
                lines, and geometric beauty.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 static-text">
              <Link href="/create">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Create Your Kolam
                </Button>
              </Link>
              <Link href="/explore">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Explore History
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50 static-text">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5000+</div>
                <div className="text-sm text-muted-foreground">
                  Years of Tradition
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">
                  Regional Variations
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground">
                  Possible Patterns
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 relative">
            <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              {/* Traditional Kolam background image */}
              <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
                <img
                  src="/traditional-indian-kolam-design-with-intricate-geo.jpg"
                  alt="Traditional Kolam Pattern"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 kolam-pattern rounded-full opacity-10" />

              <svg
                viewBox="0 0 300 300"
                className="w-full h-full relative z-10"
              >
                <defs>
                  <pattern
                    id="dots"
                    patternUnits="userSpaceOnUse"
                    width="30"
                    height="30"
                  >
                    <circle
                      cx="15"
                      cy="15"
                      r="2"
                      fill="currentColor"
                      className="text-primary/30"
                    />
                  </pattern>
                  <linearGradient
                    id="kolamGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="currentColor"
                      className="text-primary"
                    />
                    <stop
                      offset="100%"
                      stopColor="currentColor"
                      className="text-accent"
                    />
                  </linearGradient>
                </defs>

                <rect
                  width="300"
                  height="300"
                  fill="url(#dots)"
                />

                <g
                  stroke="url(#kolamGradient)"
                  strokeWidth="3"
                  fill="none"
                >
                  {/* Outer lotus petals */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                    (angle, i) => (
                      <g
                        key={i}
                        transform={`rotate(${angle} 150 150)`}
                      >
                        <path
                          d="M 150 50 Q 170 80 150 110 Q 130 80 150 50"
                          strokeWidth="2"
                        />
                      </g>
                    )
                  )}

                  {/* Inner geometric pattern */}
                  <circle
                    cx="150"
                    cy="150"
                    r="80"
                    strokeWidth="2"
                  />
                  <circle
                    cx="150"
                    cy="150"
                    r="60"
                    strokeWidth="2"
                  />
                  <circle
                    cx="150"
                    cy="150"
                    r="40"
                    strokeWidth="2"
                  />
                  <circle
                    cx="150"
                    cy="150"
                    r="20"
                    strokeWidth="2"
                  />

                  {/* Central star pattern */}
                  {[0, 45, 90, 135].map((angle, i) => (
                    <g
                      key={i}
                      transform={`rotate(${angle} 150 150)`}
                    >
                      <line
                        x1="150"
                        y1="130"
                        x2="150"
                        y2="170"
                        strokeWidth="3"
                      />
                      <line
                        x1="130"
                        y1="150"
                        x2="170"
                        y2="150"
                        strokeWidth="3"
                      />
                    </g>
                  ))}
                </g>
              </svg>

              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full opacity-60" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary rounded-full opacity-80" />
            </div>

            <div className="absolute -top-8 -left-8 w-20 h-20 rounded-lg overflow-hidden opacity-60">
              <img
                src="/simple-kolam-dot-pattern-with-connecting-lines.jpg"
                alt="Simple Kolam Pattern"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-lg overflow-hidden opacity-70">
              <img
                src="/lotus-kolam-design-with-symmetrical-petals.jpg"
                alt="Lotus Kolam Pattern"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
