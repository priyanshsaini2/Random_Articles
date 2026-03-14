import Parser from 'rss-parser';
import { ExternalArticle } from './db';

const parser = new Parser({
  customFields: {
    item: ['description', 'content:encoded', 'category'],
  }
});

// A curated list of intellectual magazines
const RSS_FEEDS = [
  { name: 'JSTOR Daily', url: 'https://daily.jstor.org/feed/' },
  { name: 'Aeon Essays', url: 'https://aeon.co/feed.rss' },
  { name: 'Smithsonian Magazine', url: 'https://www.smithsonianmag.com/rss/smart-news/' },
  { name: 'Quanta Magazine', url: 'https://api.quantamagazine.org/feed/' },
  { name: 'Nautilus', url: 'https://nautil.us/feed/' },
];

export async function fetchAllArticles(): Promise<ExternalArticle[]> {
  const allArticles: ExternalArticle[] = [];

  for (const feedConfig of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedConfig.url);
      
      feed.items?.forEach(item => {
        // basic excerpt extraction, strip html tags
        let excerpt = item.description || (item as any).contentSnippet || (item as any)['content:encoded'] || '';
        excerpt = excerpt.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/gi, " ").substring(0, 250).trim();
        if (excerpt.length >= 240) excerpt += '...';

        if (item.title && item.link) {
          allArticles.push({
            title: item.title,
            source: feedConfig.name,
            url: item.link,
            excerpt: excerpt,
            category: item.categories?.[0] || 'General',
            publishDate: item.pubDate || new Date().toISOString()
          });
        }
      });
    } catch (e) {
      console.error(`Failed to fetch ${feedConfig.name}:`, e);
      // We log but continue, so one down site doesn't break the whole app
    }
  }

  return allArticles;
}
