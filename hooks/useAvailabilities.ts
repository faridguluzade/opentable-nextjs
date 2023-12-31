import { useState } from "react";
import axios from "axios";

export function useAvailabilities() {
  const [data, setData] = useState<
    { time: string; available: boolean }[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailabilities = async ({
    slug,
    day,
    time,
    partySize,
  }: {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  }) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/restaurant/${slug}/availability`,
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setData(res.data);
    } catch (error: any) {
      setError(error.response.data.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, error, fetchAvailabilities };
}
