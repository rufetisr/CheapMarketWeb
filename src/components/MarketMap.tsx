// src/pages/ClosestMarket.tsx
import { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";

interface Branch {
  name: string;
  lat: number;
  lon: number;
}

interface Market {
  name: string;
  branches: Branch[];
}

interface ClosestBranch extends Branch {
  market: string;
  distance: number;
}

export default function ClosestMarket() {
  const [userLoc, setUserLoc] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [closest, setClosest] = useState<ClosestBranch | null>(null);
  const [selected, setSelected] = useState<ClosestBranch | null>(null);
  const mapApi = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapApi, // 🔑 replace with your key
  });

   const markets: Market[] = [
    {
      name: 'Bazar Store',
      branches: [
        {
          name: 'Bazarstore Gənclik',
          lat: 40.4117646,
          lon: 49.8251536
        },
        {
          name: 'Bazarstore (M.Ə.Rəsulzadə qəs)',
          lat: 40.4134514,
          lon: 49.8274558
        },
        {
          name: 'Bazarstore 28 May Filialı',
          lat: 40.4005581,
          lon: 49.825741
        },

      ]
    },
    {
      name: 'Oba Market',
      branches: [
        {
          name: 'Oba Market Xutor-2',
          lat: 40.413349,
          lon: 49.825150
        },
        {
          name: 'OBA-3 MKR 3',
          lat: 40.4098184,
          lon: 49.8209525
        },
        {
          name: 'OBA-28 MAY 3',
          lat: 40.385434,
          lon: 49.839563
        },
      ]

    },
  ]


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setUserLoc({ lat: latitude, lon: longitude });
      const result = findClosestOverall(latitude, longitude, markets);
      setClosest(result.closestOverall);
    });
  }, []);

  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function findClosestBranch(
    userLat: number,
    userLon: number,
    market: Market
  ): ClosestBranch {
    let closest: Branch | null = null;
    let minDistance = Infinity;

    for (const branch of market.branches) {
      const dist = getDistance(userLat, userLon, branch.lat, branch.lon);
      if (dist < minDistance) {
        minDistance = dist;
        closest = branch;
      }
    }

    return { ...closest!, market: market.name, distance: minDistance };
  }

  function findClosestOverall(
    userLat: number,
    userLon: number,
    markets: Market[]
  ) {
    const allClosest = markets.map((m) =>
      findClosestBranch(userLat, userLon, m)
    );
    allClosest.sort((a, b) => a.distance - b.distance);
    return { closestOverall: allClosest[0], allClosest };
  }

  if (!isLoaded || !userLoc) return <p>📍 Loading map...</p>;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h1 className="text-xl font-bold mb-3 text-center">
        🗺️Find Closest Market
      </h1>

      <GoogleMap
        zoom={13}
        center={{ lat: userLoc.lat, lng: userLoc.lon }}
        mapContainerStyle={{ height: "85vh", width: "100%" }}
      >
        {/* User marker */}
        <Marker
          position={{ lat: userLoc.lat, lng: userLoc.lon }}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />

        {/* Branch markers */}
        {markets.map((market) =>
          market.branches.map((branch, i) => (
            <Marker
              key={`${market.name}-${i}`}
              position={{ lat: branch.lat, lng: branch.lon }}
              icon={{
                url:
                  closest &&
                    branch.name === closest.name &&
                    market.name === closest.market
                    ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    : "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
              onClick={() =>
                setSelected({ ...branch, market: market.name, distance: 0 })
              }
            />
          ))
        )}

        {/* Info window when marker clicked */}
        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lon }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <b>{selected.name}</b> <br />
              Market: {selected.market} <br />
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lon}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                📍 Get Directions
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
