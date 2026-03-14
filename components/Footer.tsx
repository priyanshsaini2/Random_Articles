import Link from 'next/link';

export default function Footer() {
  const getTomorrowString = () => {
    // Basic helper for tomorrow's notice
    return "Check back tomorrow at midnight for 5 new essays.";
  };

  return (
    <footer className="w-full py-12 mt-24 border-t border-border bg-paper/50 dark:bg-zinc-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-muted hover:text-foreground transition-colors">
            Today's Essays
          </Link>
          <Link href="/log" className="text-muted hover:text-foreground transition-colors">
            Read Log
          </Link>
          <Link href="/about" className="text-muted hover:text-foreground transition-colors">
            About
          </Link>
        </div>
        
        <p className="text-sm text-muted/80 text-center md:text-right">
          {getTomorrowString()}
        </p>
      </div>
    </footer>
  );
}
