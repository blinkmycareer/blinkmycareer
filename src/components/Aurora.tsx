/** The living aurora — a slow, blurred light behind everything. Pure CSS. */
export default function Aurora({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`aurora ${className}`} />;
}
