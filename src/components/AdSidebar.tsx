import AdSense from "./AdSense";

interface AdSidebarProps {
  adSlot?: string;
  className?: string;
}

export default function AdSidebar({
  adSlot = "YOUR_SIDEBAR_SLOT_ID",
  className = "",
}: AdSidebarProps) {
  // Only show on desktop/tablet, hidden on mobile
  return (
    <aside
      className={`hidden lg:block lg:w-72 xl:w-80 ml-6 ${className}`}
      aria-label="Advertisement"
    >
      <div className="sticky top-24">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <AdSense
            adSlot={adSlot}
            adFormat="rectangle"
            style={{
              display: "block",
              minHeight: "250px",
              width: "100%",
            }}
          />
        </div>
      </div>
    </aside>
  );
}
