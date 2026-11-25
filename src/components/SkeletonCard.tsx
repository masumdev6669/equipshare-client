export default function SkeletonCard() {
  return (
    <div className="rounded-2xl border bg-card shadow-sm overflow-hidden animate-pulse">
      <div className="h-48 w-full bg-muted"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 w-1/3 bg-muted rounded"></div>
        <div className="h-6 w-3/4 bg-muted rounded"></div>
        <div className="h-4 w-1/2 bg-muted rounded"></div>
        <div className="h-10 w-full bg-muted rounded-full mt-4"></div>
      </div>
    </div>
  );
}
