import Footer from '../../components/Footer';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 md:py-24 min-h-[80vh]">
        <Link href="/" className="text-accent hover:underline underline-offset-4 mb-10 inline-block font-medium">
          &larr; Back to Today's Essays
        </Link>
        
        <article className="prose prose-lg dark:prose-invert prose-headings:font-serif prose-headings:font-black prose-a:text-accent hover:prose-a:text-accent/80 max-w-none prose-p:leading-relaxed prose-p:text-muted">
          <h1 className="text-5xl md:text-6xl text-foreground mb-8 text-balance">About Daily Random Essays</h1>
          
          <p className="text-2xl text-foreground/90 font-medium mb-12 leading-normal">
            This site surfaces five random, high-quality essays daily from the best intellectual magazines on the internet to encourage curiosity and deep reading.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-3xl text-foreground mt-12 mb-6 border-b border-border/50 pb-4">The Concept</h2>
              <p>
                In an era of endless scrolling and algorithmically curated echo chambers, we often lose the joy of stumbling upon something profoundly interesting outside our usual domains.
              </p>
              <p>
                This project restricts choice to foster exploration. Instead of presenting an endless feed, you get <strong>exactly five articles</strong> every 24 hours. Once the day is over, they disappear into the Read Log, making way for five new ideas.
              </p>
            </section>

            <section>
              <h2 className="text-3xl text-foreground mt-12 mb-6 border-b border-border/50 pb-4">The Sources</h2>
              <p>
                We aggregate content from respected publications across disciplines including Science, Philosophy, Culture, History, and Technology. Some of our sources include:
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-6 text-foreground/80">
                <li><strong>JSTOR Daily</strong> &mdash; Where news meets its scholarly match</li>
                <li><strong>Aeon Essays</strong> &mdash; Big ideas crafted by leading thinkers</li>
                <li><strong>Quanta Magazine</strong> &mdash; Illuminating science and mathematics</li>
                <li><strong>Smithsonian Magazine</strong> &mdash; Exploring history, science, and the world</li>
                <li><strong>Nautilus</strong> &mdash; Connecting science and culture</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl text-foreground mt-12 mb-6 border-b border-border/50 pb-4">The Ephemeral Nature</h2>
              <p>
                The ephemeral design is intentional. If you see something interesting today, read it today. Tomorrow brings different ideas.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
