import { fetchAllArticles } from './rss';
import { getTodayData, saveTodayData, getHistory, DayData } from './db';

// Ensure this function always returns fresh data based on the timezone Date
export async function getOrGenerateTodayArticles(): Promise<DayData> {
  const today = new Date().toISOString().split('T')[0]; // Format: "YYYY-MM-DD"
  
  // 1. Check if we already generated it for today
  const todayData = await getTodayData(today);
  if (todayData) {
    return todayData;
  }

  // 2. We need to generate a new list. Start by getting history to avoid repeats.
  const history = await getHistory(30);
  const seenUrls = new Set<string>();
  history.forEach(day => {
    day.articles.forEach(art => seenUrls.add(art.url));
  });

  // 3. Fetch fresh articles from all feeds
  const allArticles = await fetchAllArticles();
  
  // 4. Filter out any article that has been seen in the last 30 days
  const validArticles = allArticles.filter(a => !seenUrls.has(a.url));

  // 5. Shuffle the valid articles array
  const shuffled = validArticles.sort(() => 0.5 - Math.random());
  
  // 6. Select top 5
  const selected = shuffled.slice(0, 5);
  
  // Edge case fallback: if filters removed too many, fill in from original set
  if (selected.length < 5) {
      const fallback = allArticles.filter(a => !selected.find(s => s.url === a.url)).slice(0, 5 - selected.length);
      selected.push(...fallback);
  }

  const newData: DayData = {
    date: today,
    articles: selected.slice(0, 5) // ensure exactly 5
  };

  // 7. Save to Redis
  await saveTodayData(newData);
  
  return newData;
}
