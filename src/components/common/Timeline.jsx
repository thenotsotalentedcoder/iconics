const Timeline = ({ items }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-600" />

      <div className="space-y-6 sm:space-y-8">
        {items.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

const TimelineItem = ({ item }) => {
  return (
    <div className="relative pl-6 sm:pl-8">
      {/* Dot */}
      <div className="absolute left-0 top-1 sm:top-2 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-red-600 rounded-full -translate-x-[4.5px] sm:-translate-x-[5px]" />

      <div className="text-xs sm:text-sm text-red-600 font-semibold mb-1">
        {item.date}
      </div>
      <div className="text-base sm:text-lg text-white font-medium">
        {item.title}
      </div>
      {item.description && (
        <div className="text-text-secondary text-sm sm:text-base mt-1">
          {item.description}
        </div>
      )}
    </div>
  );
};

export default Timeline;
