export function Logo() {
  return (
   <div
    className="flex items-center justify-between w-full"
    aria-label="Tekscan PDF Analyzer"
  >
    {/* Left side — heading */}
    <h1 className="text-xl md:text-2xl font-bold font-headline text-primary-foreground-from-background">
      Tekscan PDF Analyzer
    </h1>

    {/* Right side — logo button */}
    <a
      href="https://neontek.co.ke"
      title="Neontek Homepage"
      className="flex items-center px-3 py-2 bg-primary rounded-lg hover:opacity-90 transition"
    >
      <img
        src="https://www.neontek.co.ke/images/neon-lamp.png"
        alt="Neontek Logo"
        className="w-8 h-8 mr-2"
      />
      Home
    </a>

    <style jsx>{`
      .text-primary-foreground-from-background {
        color: hsl(var(--foreground));
      }
    `}</style>
  </div>

  );
}
