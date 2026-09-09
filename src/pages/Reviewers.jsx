import PageTransition from '../components/layout/PageTransition';
import PageBackground from '../components/animations/PageBackground';
import SectionHeading from '../components/common/SectionHeading';
import { useApiData } from '../hooks/useApiData';
import { api } from '../utils/api';

// Add any supplied reviewer fallback records here. Admin-managed records take priority.
const FALLBACK_REVIEWERS = [];

const ReviewerCard = ({ reviewer }) => (
  <article className="bg-bg-card border border-border-subtle rounded-xl p-5 text-center shadow-sm">
    {reviewer.photo ? <img src={reviewer.photo} alt={reviewer.name} className="w-24 h-24 object-cover rounded-full mx-auto border-2 border-accent/30" /> : <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center bg-accent/10 text-accent text-3xl font-bold">{reviewer.name.charAt(0)}</div>}
    <h3 className="mt-4 text-base font-bold text-text-primary">{reviewer.name}</h3>
    {reviewer.email && <a href={`mailto:${reviewer.email}`} className="block mt-1 text-sm text-accent hover:underline break-all">{reviewer.email}</a>}
    {reviewer.from && <p className="mt-2 text-xs text-text-muted"><span className="font-semibold text-text-secondary">From:</span> {reviewer.from}</p>}
  </article>
);

export default function Reviewers() {
  const { data: reviewers, loading } = useApiData(api.getReviewers, FALLBACK_REVIEWERS);
  const nedReviewers = reviewers.filter(reviewer => reviewer.isNed);
  const externalReviewers = reviewers.filter(reviewer => !reviewer.isNed);
  const Section = ({ title, people }) => people.length > 0 && (
    <section className="mb-12">
      <h2 className="text-lg font-bold text-text-primary mb-5">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{people.map(reviewer => <ReviewerCard key={reviewer.id || reviewer.email} reviewer={reviewer} />)}</div>
    </section>
  );
  return <PageTransition><div className="relative min-h-screen pb-20 bg-bg-primary"><PageBackground /><div className="relative z-10 pt-24 sm:pt-32 px-4 sm:px-8"><div className="container mx-auto max-w-[1200px]">
    <SectionHeading title="Reviewers" subtitle="The experts who support the ICONICS peer-review process" />
    <Section title="Reviewers from NED University" people={nedReviewers} />
    <Section title="External Reviewers" people={externalReviewers} />
    {loading && <p className="text-center text-sm text-text-muted py-12">Loading reviewers…</p>}
    {!loading && !reviewers.length && <p className="text-center text-sm text-text-muted py-12">Reviewer details will be announced soon.</p>}
  </div></div></div></PageTransition>;
}
