// src/pages/ClosestMarket.tsx
import { useEffect, useState } from "react";
import {
  GoogleMap,
  KmlLayer,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";



export default function ClosestMarket() {
  const [userLoc, setUserLoc] = useState<{ lat: number; lon: number } | null>(
    null
  );

  // const [closest, setClosest] = useState<google.maps.LatLng | null>(null);

  const mapApi = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapApi, // 🔑 replace with your key
  });

  //  

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLoc({ lat: latitude, lon: longitude });

      }, (err) => console.error("Location error:", err),
      { enableHighAccuracy: true });
  }, []);



  if (!isLoaded) return <p>📍 Loading Google Map...</p>;
  if (!userLoc) return <p>📍 Getting your location...</p>;

  const kmlUrl =
    "https://www.google.com/maps/d/u/0/kml?mid=1yfSHoGucilui9a048gcG6Bv30jE_qzI";


  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h1 className="text-xl font-bold mb-3 text-center">
        🗺️Find Closest Market
      </h1>

      <GoogleMap
        zoom={13}
        center={{ lat: userLoc.lat, lng: userLoc.lon }}
        mapContainerStyle={{ height: "90vh", width: "100%" }}
      >
   {/* Show user marker */}
        <Marker
          position={{ lat: userLoc.lat, lng: userLoc.lon }}
          icon={{ url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
        />

        {/* Load your My Maps layer */}
        <KmlLayer url={kmlUrl} />

        {/* Optional: could add a green marker if you calculate closest later */}
        {/* {closest && (
          <Marker
            position={closest}
            icon={{ url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png" }}
          />
        )} */}

      </GoogleMap>
    </div>
  );
}
