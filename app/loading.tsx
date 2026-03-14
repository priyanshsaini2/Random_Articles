export default function Loading() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4"></div>
      <p className="font-serif text-xl animate-pulse text-muted">Curating today's essays...</p>
    </div>
  );
}
