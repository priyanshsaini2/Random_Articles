import Footer from '../../components/Footer';
import { getHistory } from '../../lib/db';
import { ExternalLink, Calendar } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60; // keep it fresh

export default async function ReadLog() {
  // Fetch up to 30 past days
  const history = await getHistory(30);

  // Sort history by date descending
  const sortedHistory = history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 md:py-20 min-h-[80vh]">
        <div className="mb-16">
          <Link href="/" className="text-accent underline-offset-4 hover:underline mb-6 inline-block font-medium">
            &larr; Back to Today's Essays
          </Link>
          <h1 className="font-serif text-5xl md:text-6xl font-black mb-6 tracking-tight">Read Log</h1>
          <p className="text-muted text-xl max-w-2xl leading-relaxed text-balance">
            An archive of past essays. This is a read-only history meant for reference, not endless scrolling.
          </p>
        </div>

        <div className="space-y-20">
          {sortedHistory.length === 0 ? (
            <p className="text-muted py-8 border-t border-border/50 text-lg">No reading history available yet. Check back tomorrow!</p>
          ) : (
            sortedHistory.map(day => (
              <section key={day.date} className="relative">
                <div className="absolute top-0 left-0 w-8 h-8 -ml-12 hidden lg:flex items-center justify-center bg-accent/10 rounded-full text-accent">
                  <Calendar className="w-4 h-4" />
                </div>
                
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="lg:hidden text-accent">
                    <Calendar className="w-5 h-5" />
                  </span>
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h2>
                
                <div className="grid gap-4">
                  {day.articles.map(article => (
                    <a 
                      key={article.url}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block bg-paper dark:bg-zinc-900/50 border border-border/50 dark:border-zinc-800 rounded-xl p-6 hover:border-accent/40 hover:shadow-md transition-all duration-300"
                    >
                     <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-6">
                       <div className="flex-1">
                         <h3 className="font-serif text-xl sm:text-2xl font-bold group-hover:text-accent transition-colors duration-300 mb-3 leading-snug">
                           {article.title}
                         </h3>
                         <div className="flex items-center text-sm text-muted gap-3 flex-wrap">
                           <span className="text-accent font-medium uppercase tracking-wider text-xs bg-accent/10 px-3 py-1 rounded-full">{article.source}</span>
                           {article.category && <span>&mdash;</span>}
                           {article.category && <span>{article.category}</span>}
                         </div>
                       </div>
                       <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                         <ExternalLink className="w-4 h-4 text-muted group-hover:text-white" />
                       </div>
                     </div>
                    </a>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
