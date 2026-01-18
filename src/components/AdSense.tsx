import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface AdSenseProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal";
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSense({
  adSlot,
  adFormat = "auto",
  style = { display: "block" },
  className = "",
}: AdSenseProps) {
  const location = useLocation();
  const adRef = useRef<HTMLModElement>(null);
  const publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID;

  // Load AdSense script dynamically if not already loaded
  useEffect(() => {
    if (!publisherId || typeof window === "undefined") return;

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
    const scriptSrc = existingScript?.getAttribute("src");

    // If script exists but has placeholder, update it
    if (existingScript && scriptSrc?.includes("PLACEHOLDER") && publisherId) {
      const newSrc = scriptSrc.replace("ca-pub-PLACEHOLDER", publisherId);
      existingScript.setAttribute("src", newSrc);
    }

    // Load script if it doesn't exist
    if (!existingScript && publisherId) {
      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, [publisherId]);

  useEffect(() => {
    // Only initialize if publisher ID is set
    if (!publisherId) {
      return;
    }

    try {
      // Initialize adsbygoogle array if it doesn't exist
      if (typeof window !== "undefined") {
        window.adsbygoogle = window.adsbygoogle || [];
      }

      // Push ad configuration to initialize the ad after a short delay
      // to ensure script is loaded
      const timeoutId = setTimeout(() => {
        if (adRef.current && window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, [location.pathname, publisherId]); // Reinitialize on route change

  // Don't render if publisher ID is not set
  if (!publisherId) {
    return null;
  }

  return (
    <div className={className} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
