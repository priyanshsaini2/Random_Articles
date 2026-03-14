

import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';
import { getOrGenerateTodayArticles } from '../lib/logic';

// Fetch new data / generate new data every time the page loads if needed.
// This enables Next.js to dynamically check if the day has changed instead of sticking to a stale cache.
export const revalidate = 60; // revalidate every 60 seconds

export default async function Home() {
  const data = await getOrGenerateTodayArticles();
  
  return (
    <>
      <main className="flex-1 w-full max-w-7xl mx-auto px-6">
        <Header />
        
        {!data || data.articles.length === 0 ? (
          <div className="text-center py-32 text-muted border border-border/50 rounded-2xl bg-paper/50">
            <h2 className="text-xl font-serif text-foreground mb-2">Unable to load today's essays</h2>
            <p>Please check your Upstash Redis credentials in the environment variables.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {data.articles.map((article, idx) => (
              <div 
                key={article.url} 
                className={idx === 0 || idx === 1 ? "lg:col-span-1" : ""} // Can customize layout further
              >
                 <ArticleCard article={article} />
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
