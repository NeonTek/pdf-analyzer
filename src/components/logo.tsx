import { Bot } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center" aria-label="Tekscan PDF Analyzer">
      <div className="p-1.5 bg-primary rounded-lg mr-3">
         <Bot className="w-6 h-6 text-primary-foreground shrink-0" />
      </div>
      <h1 className="text-xl md:text-2xl font-bold font-headline text-primary-foreground-from-background">
        Tekscan PDF Analyzer
      </h1>
      <style jsx>{`
        .text-primary-foreground-from-background {
          color: hsl(var(--foreground));
        }
      `}</style>
    </div>
  );
}
