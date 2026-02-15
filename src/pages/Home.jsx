import Hero from '../components/home/Hero';
import ConferenceBanner from '../components/home/ConferenceBanner';
import AboutSnippet from '../components/home/AboutSnippet';
import StatsSection from '../components/home/StatsSection';
import SpeakersPreview from '../components/home/SpeakersPreview';
import ImportantDates from '../components/home/ImportantDates';
import CTASection from '../components/home/CTASection';
import PageTransition from '../components/layout/PageTransition';

const Home = () => {
  return (
    <PageTransition>
      <ConferenceBanner />
      <Hero />
      <AboutSnippet />
      <StatsSection />
      <SpeakersPreview />
      <ImportantDates />
      <CTASection />
    </PageTransition>
  );
};

export default Home;
