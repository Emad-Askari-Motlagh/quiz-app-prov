import React, { useEffect, useState } from "react";
import getLocation from "../utils/getCurrentLocation";

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  error: { message: string } | string | null;
}

export default function useLocation() {
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
    error: null || { message: "" },
  });

  useEffect(() => {
    async function fetchLocation() {
      try {
        const { latitude, longitude } = await getLocation();
        setLocation({ latitude, longitude, error: null });
      } catch (error: any) {
        setLocation({
          latitude: null,
          longitude: null,
          error: error.message,
        });
      }
    }

    fetchLocation();
  }, []);

  return { location };
}
