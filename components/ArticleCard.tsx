import Link from 'next/link';
import { ExternalArticle } from '../lib/db';
import { ExternalLink, Clock } from 'lucide-react';

export default function ArticleCard({ article }: { article: ExternalArticle }) {
  // Rough estimate logic since we only have excerpt
  const estimatedMin = Math.floor(article.title.length % 10) + 4; 

  return (
    <article className="group bg-paper dark:bg-zinc-900 border border-border/50 dark:border-zinc-800 rounded-xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-accent tracking-wide uppercase px-3 py-1 bg-accent/10 dark:bg-accent/20 rounded-full inline-block">
          {article.source}
        </span>
        {article.category && article.category !== 'General' && (
          <span className="text-xs text-muted font-medium">
            {article.category}
          </span>
        )}
      </div>
      
      <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug mb-4 group-hover:text-accent transition-colors duration-300 line-clamp-3">
        {article.title}
      </h3>
      
      <p className="text-muted leading-relaxed mb-8 flex-grow line-clamp-4">
        {article.excerpt}
      </p>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-border/50 dark:border-zinc-800 mt-auto gap-4">
        <div className="flex items-center text-sm text-muted">
          <Clock className="w-4 h-4 mr-2" />
          <span>{estimatedMin} min read</span>
        </div>
        
        <a 
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-foreground text-background hover:bg-zinc-800 dark:hover:bg-zinc-200 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200"
        >
          Read Article
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>
    </article>
  );
}
