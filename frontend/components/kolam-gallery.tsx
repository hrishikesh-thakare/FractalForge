export function KolamGallery() {
  const kolamPatterns = [
    {
      title: "Lotus Mandala",
      description: "Sacred lotus pattern representing purity and enlightenment",
      image: "/intricate-lotus-mandala-kolam-pattern-with-symmetr.jpg",
    },
    {
      title: "Geometric Grid",
      description: "Mathematical precision in traditional dot-grid design",
      image: "/geometric-grid-kolam-pattern-with-connecting-lines.jpg",
    },
    {
      title: "Peacock Design",
      description: "Elegant peacock motif celebrating nature's beauty",
      image: "/peacock-kolam-design-with-flowing-tail-feathers-pa.jpg",
    },
    {
      title: "Star Formation",
      description: "Celestial star pattern representing cosmic harmony",
      image: "/star-formation-kolam-pattern-with-radiating-geomet.jpg",
    },
    {
      title: "Floral Vine",
      description: "Organic vine pattern symbolizing growth and prosperity",
      image: "/floral-vine-kolam-pattern-with-leaves-and-flowers.jpg",
    },
    {
      title: "Temple Gateway",
      description: "Architectural pattern inspired by temple designs",
      image: "/temple-gateway-kolam-pattern-with-pillars-and-arch.jpg",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Traditional Kolam Patterns
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Explore the rich diversity of Kolam designs, each carrying deep cultural meaning and mathematical beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kolamPatterns.map((pattern, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl bg-card hover-lift">
              <div className="aspect-square overflow-hidden">
                <img
                  src={pattern.image || "/placeholder.svg"}
                  alt={pattern.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{pattern.title}</h3>
                <p className="text-muted-foreground text-sm">{pattern.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
