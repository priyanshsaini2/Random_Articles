import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full py-12 md:py-20 px-6 text-center max-w-4xl mx-auto">
      <Link href="/" className="inline-block group mb-6">
        <div className="flex items-center justify-center mb-4 text-accent">
          <BookOpen className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-balance">
          Daily Random Essays
        </h1>
      </Link>
      <p className="text-lg md:text-xl text-muted font-medium tracking-wide max-w-xl mx-auto text-balance">
        Five ideas worth thinking about today. Sourced from the best intellectual magazines on the internet.
      </p>
    </header>
  );
}
