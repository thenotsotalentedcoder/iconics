import Hero from '../components/home/Hero';
import AboutStatsSection from '../components/home/AboutStatsSection';
import TracksSection from '../components/home/TracksSection';
import SpeakersPreview from '../components/home/SpeakersPreview';
import ImportantDates from '../components/home/ImportantDates';
import CTASection from '../components/home/CTASection';
import PageTransition from '../components/layout/PageTransition';

const Home = () => {
  return (
    <PageTransition>
      <Hero />
      <AboutStatsSection />
      <TracksSection />
      <SpeakersPreview />
      <ImportantDates />
      <CTASection />
    </PageTransition>
  );
};

export default Home;
