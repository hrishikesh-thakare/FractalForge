export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-20 left-10 w-32 h-32 kolam-pattern rounded-full floating-element opacity-20" />
      <div className="absolute top-40 right-20 w-24 h-24 kolam-pattern rounded-full floating-element opacity-15" />
      <div className="absolute bottom-32 left-1/4 w-40 h-40 kolam-pattern rounded-full floating-element opacity-10" />
      <div className="absolute bottom-20 right-10 w-28 h-28 kolam-pattern rounded-full floating-element opacity-25" />

      <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-primary/10 rotate-45 floating-element" />
      <div className="absolute bottom-1/2 right-1/3 w-12 h-12 bg-accent/10 rounded-full floating-element" />
    </div>
  )
}
