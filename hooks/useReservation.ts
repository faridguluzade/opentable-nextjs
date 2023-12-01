import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

export const useReservation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReservation = async ({
    slug,
    day,
    time,
    partySize,
    bookerFirstName,
    bookerLastName,
    bookerEmail,
    bookerPhone,
    bookerRequest,
    bookerOccasion,
    setDidBook,
  }: {
    slug: string;
    day: string;
    time: string;
    partySize: string;
    bookerFirstName: string;
    bookerLastName: string;
    bookerEmail: string;
    bookerPhone: string;
    bookerRequest: string;
    bookerOccasion: string;
    setDidBook: Dispatch<SetStateAction<boolean>>;
  }) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerFirstName,
          bookerLastName,
          bookerEmail,
          bookerPhone,
          bookerRequest,
          bookerOccasion,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setDidBook(true);
      return res.data;
    } catch (error: any) {
      setError(error.response.data.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, createReservation };
};
