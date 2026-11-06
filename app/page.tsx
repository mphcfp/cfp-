import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import Portfolio from '@/components/portfolio';
import { Hero, CreativeMarquee, About, Services, Process, FrequentlyAskedQuestions, Contact } from '@/components/studio-sections';

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <SiteHeader />
      <main id="main">
        <Hero />
        <CreativeMarquee />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <FrequentlyAskedQuestions />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
