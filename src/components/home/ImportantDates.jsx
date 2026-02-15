import SectionHeading from '../common/SectionHeading';
import Timeline from '../common/Timeline';
import { importantDates } from '../../data/dates';

const ImportantDates = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <SectionHeading
          title="Important Dates"
          subtitle="Mark your calendar for these key milestones"
        />
        <Timeline items={importantDates} />
      </div>
    </section>
  );
};

export default ImportantDates;
