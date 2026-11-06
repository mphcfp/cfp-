import { ArrowIcon, SparkIcon } from './icons';
import BriefForm from './brief-form';

export function Hero() {
  return (
    <section id="home" className="hero container">
  <div className="hero-copy">
    <div className="eyebrow"><span className="status-dot"></span> Independent branding &amp; creative studio</div>
    <h1>Bold ideas.<br />Lasting <span className="accent-text">brands<span className="hand-line" aria-hidden="true"></span></span><span className="title-dot">.</span></h1>
    <p className="hero-description">We bring ideas to life and give brands a voice.<br />Through strategy, design and a little courage,<br className="desktop-break" /> we turn your story into something worth noticing.</p>
    <div className="hero-actions"><a className="button button-primary magnetic" href="#contact">Let’s create together <span aria-hidden="true"><ArrowIcon direction="up-right" /></span></a><a className="text-link" href="#work"><span className="play-icon" aria-hidden="true"><ArrowIcon direction="down-right" /></span> Explore our work</a></div>
    <div className="hero-footnote"><span className="mini-spark" aria-hidden="true"><SparkIcon /></span><span>From the first spark to the final detail.</span><span className="small-line"></span></div>
  </div>
  <div className="hero-visual" aria-label="An abstract glass sculpture representing AURA’s creative spirit" role="img">
    <div className="visual-grid" aria-hidden="true"></div><div className="orbital-line orbit-one" aria-hidden="true"></div><div className="orbital-line orbit-two" aria-hidden="true"></div>
    <div className="visual-glow" aria-hidden="true"></div>
    <img className="hero-sculpture" src="/assets/hero.svg" alt="" width="900" height="900" fetchPriority="high" />
    <div className="floating-label label-one glass" aria-hidden="true"><span className="label-symbol">✧</span><div><span className="tiny-label" dir="ltr">A LITTLE DIFFERENT</span><strong>A little different.</strong></div></div>
    <div className="floating-label label-two glass" aria-hidden="true"><span className="status-dot"></span> Ideas come alive here</div>
    <span className="coordinate" dir="ltr" aria-hidden="true">STRATEGY × CREATIVITY</span><span className="visual-star" aria-hidden="true"><SparkIcon /></span>
  </div>
  <div className="hero-bottom"><span dir="ltr">INDEPENDENT MINDS. BOLD IDEAS.</span><a href="#about">Scroll to explore <span aria-hidden="true"><ArrowIcon direction="down" /></span></a><span dir="ltr">AURA® CREATIVE STUDIO</span></div>
</section>
  );
}

export function CreativeMarquee() {
  return (
    <div className="marquee" aria-hidden="true"><div className="marquee-track"><span>IDEATION</span><i><SparkIcon /></i><span className="outline">BRANDING</span><i><SparkIcon /></i><span>CREATIVITY WITHOUT LIMITS</span><i><SparkIcon /></i><span className="outline">MAKE IT MATTER</span><i><SparkIcon /></i><span>IDEATION</span><i><SparkIcon /></i><span className="outline">BRANDING</span><i><SparkIcon /></i><span>CREATIVITY WITHOUT LIMITS</span><i><SparkIcon /></i><span className="outline">MAKE IT MATTER</span><i><SparkIcon /></i></div></div>
  );
}

export function About() {
  return (
    <section id="about" className="section container about-section">
  <div className="section-caption reveal"><span className="section-number">01 / ABOUT AURA</span><span className="section-kicker" dir="ltr">SMALL SPARK. BIG POSSIBILITIES.</span></div>
  <div className="about-layout"><h2 className="reveal">Every brand,<br />a story <span className="serif-accent">untold.</span></h2><div className="about-copy reveal"><p>We believe in the power of a good idea. One rooted in insight, shaped by design and made to stay with you.</p><p className="muted">AURA is where strategy meets creativity. We build clear identities, fresh stories and thoughtful experiences that give your brand meaning.</p><div className="values"><span>Bold thinking</span><span>Purposeful design</span><span>Care in every detail</span></div></div></div>
</section>
  );
}

export function Services() {
  return (
    <section id="services" className="section container services-section">
  <div className="section-caption reveal"><span className="section-number">02 / WHAT WE DO</span><span className="section-kicker" dir="ltr">FROM WHAT IF, TO WHAT'S NEXT.</span></div>
  <div className="section-heading reveal"><h2>From spark to <span className="serif-accent">impact.</span></h2><p>Everything your brand needs to tell a better story,<br />connected by one creative vision.</p></div>
  <div className="service-grid">
    <a className="service-card glass tilt-card reveal" href="#contact"><div className="service-top"><span className="service-icon" aria-hidden="true">◎</span><span className="service-index" dir="ltr">01</span></div><h3>Brand strategy &amp; identity</h3><p>A distinct personality, voice and visual language. From the first positioning statement to the final brand mark.</p><div className="service-bottom"><span dir="ltr">BRAND STRATEGY &amp; IDENTITY</span><span className="circle-arrow" aria-hidden="true"><ArrowIcon direction="up-right" /></span></div></a>
    <a className="service-card glass tilt-card reveal" href="#contact"><div className="service-top"><span className="service-icon orange" aria-hidden="true"><SparkIcon /></span><span className="service-index" dir="ltr">02</span></div><h3>Creative campaigns</h3><p>One clear idea, brought to life across channels. The right message, designed for the right audience.</p><div className="service-bottom"><span dir="ltr">CREATIVE CAMPAIGNS</span><span className="circle-arrow" aria-hidden="true"><ArrowIcon direction="up-right" /></span></div></a>
    <a className="service-card glass tilt-card reveal" href="#contact"><div className="service-top"><span className="service-icon lilac" aria-hidden="true">◈</span><span className="service-index" dir="ltr">03</span></div><h3>Content &amp; motion</h3><p>Stories with movement. From social content and illustration to motion design that gives your message life.</p><div className="service-bottom"><span dir="ltr">CONTENT &amp; MOTION</span><span className="circle-arrow" aria-hidden="true"><ArrowIcon direction="up-right" /></span></div></a>
    <a className="service-card glass tilt-card reveal" href="#contact"><div className="service-top"><span className="service-icon" aria-hidden="true">⌘</span><span className="service-index" dir="ltr">04</span></div><h3>Digital experiences</h3><p>Websites and campaign pages that make discovering your brand a memorable, effortless experience.</p><div className="service-bottom"><span dir="ltr">DIGITAL EXPERIENCES</span><span className="circle-arrow" aria-hidden="true"><ArrowIcon direction="up-right" /></span></div></a>
  </div>
</section>
  );
}

export function Process() {
  return (
    <section id="process" className="section container process-section">
  <div className="section-caption reveal"><span className="section-number">04 / OUR PROCESS</span><span className="section-kicker" dir="ltr">GOOD THINGS TAKE A PROCESS.</span></div>
  <div className="section-heading reveal"><h2>With you, every <span className="serif-accent">step.</span></h2><p>A clear process. Room for unexpected ideas.</p></div>
  <div className="process-grid"><article className="process-step reveal"><span className="step-number">01</span><h3>Discover</h3><p>First, we listen. To you, your audience and the challenge you want to solve.</p></article><article className="process-step reveal"><span className="step-number">02</span><h3>Imagine</h3><p>We explore creative possibilities and choose a direction together, before bringing it to life.</p></article><article className="process-step reveal"><span className="step-number">03</span><h3>Create</h3><p>We turn the idea into cohesive design and content, refining the details with your feedback.</p></article><article className="process-step reveal"><span className="step-number">04</span><h3>Deliver</h3><p>We prepare the final assets and practical guidelines for your brand’s next chapter.</p></article></div>
</section>
  );
}

export function FrequentlyAskedQuestions() {
  return (
    <section className="section container faq-section">
  <div className="faq-intro reveal"><span className="section-number">BEFORE WE BEGIN</span><h2>A few things<br /><span className="serif-accent">you might wonder.</span></h2><span className="faq-star" aria-hidden="true"><SparkIcon /></span></div>
  <div className="faq-list reveal"><details><summary>What do we need to get started?<span aria-hidden="true">+</span></summary><p>A short introduction to your business, your project goals and your preferred timeline is enough. If you have references or inspiration, mention them in your brief.</p></details><details><summary>What if I don’t have a clear idea yet?<span aria-hidden="true">+</span></summary><p>We start with the challenge and the goal. You don’t need to know the final answer; finding the creative direction is part of the process.</p></details><details><summary>How are timelines and costs determined?<span aria-hidden="true">+</span></summary><p>Once the requirements, deliverables and priorities are clear, we can define a realistic timeline and project budget.</p></details><details><summary>Can I choose just one service?<span aria-hidden="true">+</span></summary><p>Absolutely. A project can focus on one specific need or bring several connected services together.</p></details></div>
</section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section container contact-section">
  <div className="contact-panel glass"><div className="contact-copy reveal"><span className="eyebrow"><span className="status-dot"></span> YOUR NEXT IDEA STARTS HERE</span><h2>Let’s make<br /><span className="accent-text">what’s next.</span></h2><p>Every good project starts with a simple conversation.<br />Tell us what’s on your mind, even if it’s just a spark.</p><span className="contact-art" aria-hidden="true"><ArrowIcon direction="up-right" /></span><span className="contact-english" dir="ltr">LET’S MAKE<br />SOMETHING MATTER.</span></div>
  <BriefForm /></div>
</section>
  );
}

