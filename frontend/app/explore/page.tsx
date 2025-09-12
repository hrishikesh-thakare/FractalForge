"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Calendar,
  Sparkles,
  Heart,
  BookOpen,
  Globe,
  Camera,
  Palette,
  ArrowRight,
  Star,
  Flower2,
  Circle,
  ExternalLink,
} from "lucide-react";

interface TimelineEvent {
  era: string;
  period: string;
  title: string;
  description: string;
  culturalContext: string;
  image: string;
  highlights: string[];
}

interface RegionalVariation {
  region: string;
  state: string;
  characteristics: string[];
  uniqueFeatures: string;
  image: string;
  popularPatterns: string[];
}

interface CulturalStory {
  title: string;
  type: "legend" | "folktale" | "tradition";
  region: string;
  story: string;
  meaning: string;
  image: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    era: "Ancient Period",
    period: "3000+ BCE",
    title: "The Sacred Beginning",
    description:
      "Kolam traces its origins to the Indus Valley Civilization, where geometric floor patterns were first discovered as spiritual and protective symbols.",
    culturalContext: "Vedic traditions, temple worship, daily rituals",
    image: "/traditional-indian-kolam-design-with-intricate-geo.jpg",
    highlights: [
      "Sacred geometry principles",
      "Temple entrance decorations",
      "Protection from evil spirits",
    ],
  },
  {
    era: "Classical Period",
    period: "500-1500 CE",
    title: "Royal Patronage & Temple Art",
    description:
      "During the Chola and Pandya dynasties, Kolam became an integral part of temple architecture and royal court ceremonies.",
    culturalContext:
      "Tamil literature mentions, royal ceremonies, temple festivals",
    image: "/templeinspiredkolam.jpg",
    highlights: [
      "Literary documentation",
      "Architectural integration",
      "Royal court ceremonies",
    ],
  },
  {
    era: "Medieval Period",
    period: "1000-1600 CE",
    title: "Community Traditions",
    description:
      "Kolam evolved into a daily practice among common people, with mothers teaching daughters the intricate patterns and their meanings.",
    culturalContext:
      "Community bonding, seasonal festivals, daily household rituals",
    image: "/grandmother-teaching-young-girl-kolam-art-traditio.jpg",
    highlights: [
      "Intergenerational knowledge transfer",
      "Community competitions",
      "Seasonal pattern variations",
    ],
  },
  {
    era: "Modern Era",
    period: "1947-2000 CE",
    title: "Urban Revival",
    description:
      "Post-independence India saw Kolam adapting to urban life while maintaining its traditional essence through apartment complexes and cultural societies.",
    culturalContext: "Urbanization, cultural societies, festival celebrations",
    image: "/colorful-festival-kolam-with-flower-petals-and-ran.jpg",
    highlights: [
      "Urban adaptation",
      "Cultural society formation",
      "Festival standardization",
    ],
  },
  {
    era: "Digital Age",
    period: "2000-Present",
    title: "Global Recognition",
    description:
      "Kolam has gained international recognition as mathematical art, inspiring computer algorithms, digital art, and cultural preservation initiatives.",
    culturalContext:
      "Digital preservation, global awareness, mathematical research",
    image: "/geometric-grid-kolam-pattern-with-connecting-lines.jpg",
    highlights: [
      "Mathematical research",
      "Digital preservation",
      "Global cultural exchange",
    ],
  },
];

const regionalVariations: RegionalVariation[] = [
  {
    region: "Tamil Nadu",
    state: "Tamil Nadu",
    characteristics: [
      "Intricate geometric patterns",
      "Use of rice flour",
      "Daily morning practice",
    ],
    uniqueFeatures:
      "Known for complex mathematical precision and symmetrical designs with dots (pulli) forming the foundation.",
    image: "/tamil-nadu-geometric-kolam-pattern-with-rice-flour.jpg",
    popularPatterns: ["Lotus designs", "Geometric grids", "Star formations"],
  },
  {
    region: "Andhra Pradesh",
    state: "Andhra Pradesh",
    characteristics: [
      "Bold colorful patterns",
      "Flower petal usage",
      "Festival-specific designs",
    ],
    uniqueFeatures:
      "Muggulu patterns often incorporate vibrant colors and are larger in scale, especially during festivals.",
    image: "/andhra-pradesh-muggulu-floral-pattern-with-white-c.jpg",
    popularPatterns: ["Floral muggulu", "Peacock motifs", "Festival rangoli"],
  },
  {
    region: "Karnataka",
    state: "Karnataka",
    characteristics: [
      "Rangoli with colors",
      "Flower integration",
      "Artistic elaboration",
    ],
    uniqueFeatures:
      "Rangavalli combines geometric precision with artistic flair, often using vibrant flower petals and colored powders.",
    image: "/karnataka-rangoli-colorful-pattern-with-flower-pet.jpg",
    popularPatterns: [
      "Floral rangoli",
      "Geometric combinations",
      "Festival decorations",
    ],
  },
];

const culturalStories: CulturalStory[] = [
  {
    title: "The Legend of Gowri",
    type: "legend",
    region: "Tamil Nadu",
    story:
      "According to legend, Goddess Gowri taught the first Kolam to women to bring prosperity and protect their homes. The continuous lines represent the cycle of life and rebirth.",
    meaning: "Kolam as divine blessing and protection for the household",
    image: "/lotus-kolam-design-with-symmetrical-petals.jpg",
  },
  {
    title: "The Rice Flour Tradition",
    type: "tradition",
    region: "South India",
    story:
      "Traditionally drawn with rice flour, Kolam serves a practical purpose - providing food for ants, small insects, and birds, embodying the principle of 'sharing with all beings'.",
    meaning: "Harmony with nature and compassion for all living creatures",
    image: "/simple-kolam-dot-pattern-with-connecting-lines.jpg",
  },
  {
    title: "The Mathematical Cosmos",
    type: "folktale",
    region: "Ancient Tamil",
    story:
      "Ancient Tamil mathematicians believed that Kolam patterns contained the secrets of the universe - fractals, infinity, and cosmic harmony were all encoded in these sacred geometries.",
    meaning: "Connection between human creativity and cosmic order",
    image: "/star-formation-kolam-pattern-with-radiating-geomet.jpg",
  },
];

export default function ExplorePage() {
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState<number>(0);
  const [selectedRegion, setSelectedRegion] = useState<string>("Tamil Nadu");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
          <div className="relative z-10">
            <div className="mb-8 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src="/intricate-lotus-mandala-kolam-pattern-with-symmetr.jpg"
                alt="Intricate Kolam Pattern"
                width={192}
                height={192}
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Kolam: Tracing the Lines of Tradition Through Time
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Journey through 5000+ years of sacred geometry, cultural heritage,
              and artistic evolution. Discover how this ancient South Indian
              floor art continues to inspire mathematicians, artists, and
              communities worldwide.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Badge
                variant="secondary"
                className="text-lg px-4 py-2"
              >
                <Calendar className="mr-2 h-4 w-4" />
                5000+ Years of Tradition
              </Badge>
              <Badge
                variant="secondary"
                className="text-lg px-4 py-2"
              >
                <Globe className="mr-2 h-4 w-4" />
                UNESCO Cultural Heritage
              </Badge>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12">
          <Card className="max-w-6xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">What is Kolam?</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  <strong>Kolam</strong> is a traditional South Indian
                  decorative art form practiced for over 5,000 years. These
                  intricate geometric patterns are drawn at the entrance of
                  homes, temples, and public spaces using rice flour, chalk
                  powder, or colored materials.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Beyond aesthetic beauty, Kolam serves multiple purposes:
                  welcoming guests, warding off negativity, providing food for
                  small creatures, and creating community bonds. Each pattern
                  carries deep spiritual meaning and mathematical precision.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <Heart className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">Spiritual</div>
                    <div className="text-sm text-muted-foreground">
                      Sacred protection
                    </div>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">Community</div>
                    <div className="text-sm text-muted-foreground">
                      Cultural bonding
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/floral-vine-kolam-pattern-with-leaves-and-flowers.jpg"
                  alt="Traditional Kolam Example"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Timeline of Kolam History */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Timeline of Kolam History
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Trace the evolution of Kolam through millennia of cultural
              development
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs
              value={selectedTimelineEvent.toString()}
              onValueChange={(value) =>
                setSelectedTimelineEvent(parseInt(value))
              }
            >
              <TabsList className="grid grid-cols-3 lg:grid-cols-5 w-full mb-8">
                {timelineEvents.map((event, index) => (
                  <TabsTrigger
                    key={index}
                    value={index.toString()}
                    className="text-xs lg:text-sm"
                  >
                    {event.era.split(" ")[0]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {timelineEvents.map((event, index) => (
                <TabsContent
                  key={index}
                  value={index.toString()}
                >
                  <Card>
                    <CardContent className="grid md:grid-cols-2 gap-8 p-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 mb-4">
                          <Badge
                            variant="outline"
                            className="text-lg px-3 py-1"
                          >
                            {event.period}
                          </Badge>
                        </div>
                        <h3 className="text-2xl font-bold">{event.title}</h3>
                        <p className="text-lg leading-relaxed">
                          {event.description}
                        </p>

                        <div className="bg-primary/5 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Cultural Context
                          </h4>
                          <p className="text-muted-foreground">
                            {event.culturalContext}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">
                            Key Highlights:
                          </h4>
                          <div className="grid gap-2">
                            {event.highlights.map((highlight, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2"
                              >
                                <Star className="h-4 w-4 text-primary" />
                                <span className="text-sm">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <Image
                          src={event.image}
                          alt={event.title}
                          width={400}
                          height={400}
                          className="rounded-lg shadow-lg object-cover w-full h-full"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-black/70 text-white">
                            {event.era}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Regional Variations */}
        <section className="py-12 bg-muted/30">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Regional Variations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how Kolam traditions vary across different states and
              regions of South India
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs
              value={selectedRegion}
              onValueChange={setSelectedRegion}
            >
              <TabsList className="grid grid-cols-3 w-full mb-8">
                {regionalVariations.map((region) => (
                  <TabsTrigger
                    key={region.region}
                    value={region.region}
                  >
                    {region.region}
                  </TabsTrigger>
                ))}
              </TabsList>

              {regionalVariations.map((region) => (
                <TabsContent
                  key={region.region}
                  value={region.region}
                >
                  <Card>
                    <CardContent className="grid md:grid-cols-2 gap-8 p-8">
                      <div className="relative">
                        <Image
                          src={region.image}
                          alt={`${region.region} Kolam Style`}
                          width={400}
                          height={400}
                          className="rounded-lg shadow-lg object-cover w-full"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-primary text-primary-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {region.state}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold mb-4">
                            {region.region} Style
                          </h3>
                          <p className="text-lg leading-relaxed text-muted-foreground">
                            {region.uniqueFeatures}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            Characteristics
                          </h4>
                          <div className="grid gap-2">
                            {region.characteristics.map((char, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2"
                              >
                                <Circle className="h-3 w-3 text-primary fill-current" />
                                <span className="text-sm">{char}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Palette className="h-4 w-4" />
                            Popular Patterns
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {region.popularPatterns.map((pattern, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                              >
                                {pattern}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Symbolism and Philosophy */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Symbolism & Philosophy
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding the deeper meanings behind dots, lines, and sacred
              geometry
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Circle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>The Dots (Pulli)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Dots represent the cosmos, potential energy, and the starting
                  point of creation. They symbolize the infinite possibilities
                  that emerge from a single point.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>The Lines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Continuous lines connecting dots represent the journey of
                  life, interconnectedness of all beings, and the flow of cosmic
                  energy through the universe.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Flower2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Sacred Geometry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Symmetrical patterns reflect divine order, mathematical
                  harmony, and the perfect balance that exists in nature and
                  spiritual consciousness.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cultural Stories & Anecdotes */}
        <section className="py-12 bg-muted/30">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Cultural Stories & Legends
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the folktales, legends, and spiritual stories behind
              Kolam traditions
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {culturalStories.map((story, index) => (
              <Card
                key={index}
                className="overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={
                        story.type === "legend"
                          ? "bg-purple-600"
                          : story.type === "folktale"
                          ? "bg-blue-600"
                          : "bg-green-600"
                      }
                    >
                      {story.type}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{story.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {story.region}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {story.story}
                  </p>
                  <div className="bg-primary/5 p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1">
                      Cultural Meaning:
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {story.meaning}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Evolution Over Time */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Evolution Over Time
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From traditional hand-drawn patterns to modern digital
              representations
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <Palette className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle>Traditional Era</CardTitle>
                  <CardDescription>
                    Hand-drawn with natural materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Rice flour, chalk powder, and flower petals on doorsteps and
                    temple floors.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Camera className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Documentation Era</CardTitle>
                  <CardDescription>
                    Photography and academic study
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Cultural preservation through books, museums, and
                    educational institutions.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Globe className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Digital Era</CardTitle>
                  <CardDescription>
                    Apps, algorithms, and global reach
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Mathematical research, digital art tools, and international
                    cultural exchange.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Preservation & Modern Revival */}
        <section className="py-12 bg-muted/30">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Preservation & Modern Revival
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              How Kolam traditions are being kept alive in the modern world
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">
                      Modern Initiatives
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold">UNESCO Recognition</h4>
                          <p className="text-sm text-muted-foreground">
                            Recognized as Intangible Cultural Heritage
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold">Digital Platforms</h4>
                          <p className="text-sm text-muted-foreground">
                            Apps and websites for learning and sharing
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold">Academic Research</h4>
                          <p className="text-sm text-muted-foreground">
                            Mathematical and computational studies
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold">Cultural Festivals</h4>
                          <p className="text-sm text-muted-foreground">
                            Competitions and workshops worldwide
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src="/peacock-kolam-design-with-flowing-tail-feathers-pa.jpg"
                      alt="Modern Kolam Festival"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-lg object-cover w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Begin Your Own Kolam Journey
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to create your own traditional patterns? Use our interactive
              editor to explore the art of Kolam design with authentic
              algorithms and mathematical precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
              >
                <Link href="/create">
                  <Palette className="mr-2 h-5 w-5" />
                  Try Kolam Editor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
              >
                <Link
                  href="https://en.wikipedia.org/wiki/Kolam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Learn More
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
