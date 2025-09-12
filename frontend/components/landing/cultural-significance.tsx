import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Heart, Home, Sun, Users } from "lucide-react";

const significanceAspects = [
  {
    icon: Home,
    title: "Daily Ritual",
    description:
      "Kolams are drawn fresh every morning at the entrance of homes, welcoming prosperity and positive energy for the day ahead.",
  },
  {
    icon: Sun,
    title: "Spiritual Practice",
    description:
      "The act of creating Kolam is a form of meditation, connecting the artist with divine consciousness through focused, rhythmic movement.",
  },
  {
    icon: Users,
    title: "Community Tradition",
    description:
      "Passed down through generations of women, Kolam represents the continuity of cultural knowledge and artistic expression.",
  },
  {
    icon: Heart,
    title: "Sacred Geometry",
    description:
      "Each pattern embodies cosmic principles, representing the interconnectedness of all life and the mathematical order of the universe.",
  },
];

export function CulturalSignificance() {
  return (
    <section
      id="significance"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Cultural Heritage & Significance
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Kolam is more than art—it's a living tradition that connects
            communities, preserves ancient wisdom, and celebrates the sacred
            relationship between mathematics, nature, and spirituality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="relative group overflow-hidden rounded-xl">
            <img
              src="/indian-woman-drawing-kolam-at-home-entrance-in-tra.jpg"
              alt="Woman creating Kolam at home entrance"
              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-semibold">Morning Ritual</h3>
              <p className="text-sm opacity-90">
                Daily Kolam creation at home entrance
              </p>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-xl">
            <img
              src="/colorful-festival-kolam-with-flower-petals-and-ran.jpg"
              alt="Festival Kolam with vibrant colors"
              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-semibold">Festival Celebrations</h3>
              <p className="text-sm opacity-90">
                Vibrant Kolam during Pongal festival
              </p>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-xl">
            <img
              src="/grandmother-teaching-young-girl-kolam-art-traditio.jpg"
              alt="Grandmother teaching Kolam to young girl"
              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-semibold">Cultural Transmission</h3>
              <p className="text-sm opacity-90">
                Passing knowledge to next generation
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {significanceAspects.map((aspect, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow hover-lift"
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <aspect.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{aspect.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {aspect.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Regional Variations */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 hover-lift">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Regional Variations</CardTitle>
            <CardDescription>
              Kolam traditions vary beautifully across different regions of
              South India
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                  <img
                    src="/tamil-nadu-geometric-kolam-pattern-with-rice-flour.jpg"
                    alt="Tamil Nadu Kolam style"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-primary mb-2">Tamil Nadu</h4>
                <p className="text-sm text-muted-foreground">
                  Known for intricate geometric patterns and the use of rice
                  flour, creating elaborate designs during festivals like
                  Pongal.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                  <img
                    src="/andhra-pradesh-muggulu-floral-pattern-with-white-c.jpg"
                    alt="Andhra Pradesh Muggulu style"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-primary mb-2">
                  Andhra Pradesh
                </h4>
                <p className="text-sm text-muted-foreground">
                  Called "Muggulu," these designs often incorporate floral
                  motifs and are drawn with white chalk or rice flour.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                  <img
                    src="/karnataka-rangoli-colorful-pattern-with-flower-pet.jpg"
                    alt="Karnataka Rangoli style"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-primary mb-2">Karnataka</h4>
                <p className="text-sm text-muted-foreground">
                  Known as "Rangoli," featuring vibrant colors and often
                  incorporating natural elements like flower petals.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
