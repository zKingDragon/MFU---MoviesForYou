export function Logo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-background rounded-2xl blur-xl opacity-50" />

        {/* Logo text */}
        <div className="relative px-8 py-4 rounded-2xl glass">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent">
              MFU
            </span>
          </h1>
        </div>
      </div>

      {/* Slogan */}
      <p className="text-sm md:text-base text-muted-foreground font-light tracking-wide">
        A IA que entende o seu cinema
      </p>
    </div>
  )
}
