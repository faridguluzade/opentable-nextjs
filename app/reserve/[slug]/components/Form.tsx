"use client";

import { useEffect, useState } from "react";

import { CircularProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { useReservation } from "../../../../hooks/useReservation";

const initialState = {
  bookerFirstName: "",
  bookerLastName: "",
  bookerEmail: "",
  bookerPhone: "",
  bookerRequest: "",
  bookerOccasion: "",
};

export default function Form({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) {
  const { isLoading, error, createReservation } = useReservation();
  const [inputs, setInputs] = useState(initialState);
  const [disabled, setDisabled] = useState(true);
  const [didBook, setDidBook] = useState(false);
  const [day, time] = date.split("T");

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerEmail &&
      inputs.bookerPhone
    ) {
      return setDisabled(false);
    }

    return setDisabled(true);
  }, [inputs]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      day,
      time,
      partySize,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerPhone: inputs.bookerPhone,
      bookerRequest: inputs.bookerRequest,
      bookerOccasion: inputs.bookerOccasion,
      setDidBook,
    });

    setInputs(initialState);

    console.log(booking);
  };

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          You are all booked aup — <strong>Enjoy your reservation!</strong>
        </Alert>
      ) : (
        <>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            name="bookerFirstName"
            value={inputs.bookerFirstName}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            name="bookerLastName"
            value={inputs.bookerLastName}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            name="bookerEmail"
            value={inputs.bookerEmail}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            name="bookerPhone"
            value={inputs.bookerPhone}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            name="bookerRequest"
            value={inputs.bookerRequest}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            name="bookerOccasion"
            value={inputs.bookerOccasion}
            onChange={handleChangeInput}
          />
          <button
            disabled={disabled}
            onClick={handleClick}
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
          >
            {isLoading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
}
