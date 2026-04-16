const GallerySkeleton = () => {
  const skeletonItems = Array.from({ length: 8 });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="aspect-[4/3] rounded-2xl overflow-hidden"
        >
          <div className="w-full h-full bg-gradient-to-br from-secondary via-muted to-secondary animate-pulse rounded-2xl" />
        </div>
      ))}
    </div>
  );
};

export default GallerySkeleton;