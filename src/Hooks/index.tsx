/** @format */

import { useEffect, useRef, useState } from "react";
import valid from "card-validator";
import useDidUpdate from "../components/useDidUpdate";

const FALLBACK_CARD = { gaps: [4, 8, 12], lengths: [16], code: { size: 3 } };

function useInterval(callback: () => void, delay: number) {
  const intervalRef = useRef<number>();
  const callbackRef = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(
        () => callbackRef.current(),
        delay
      );
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
}

const useValidationCard = (
  cardNumber: string,
  expiryCard: string,
  cvccard: string,
  emailcard: string
) => {
  const [card, setCard] = useState<{
    type: any;
    isValid: boolean;
    maxcard?: number | undefined;
    card?: any;
  } | null>(null);
  const [cvc, setCvc] = useState<boolean | null>(null);
  const [expiry, setExpiry] = useState<boolean | null>(null);
  const [email, setEmail] = useState<boolean | null>(null);

  let numberCard: any;
  const valitedCard = (cardNumber: string) => {
    if (cardNumber.length === 0) return;
    const numberValidation = valid.number(cardNumber);
    numberCard = numberValidation.card;
    const maxLength =
      numberValidation.card?.lengths[numberValidation.card.lengths.length - 1];
    setCard({
      type: numberValidation.card?.type,
      isValid: numberValidation.isValid,
      card: numberValidation.card,
      maxcard: maxLength,
    });
  };

  const valitedExpiryDat = (dateExpiry: string) => {
    if (dateExpiry.length === 0) return;
    const expiryValidation = valid.expirationDate(dateExpiry);
    setExpiry(expiryValidation.isValid);
  };

  const cvcValidation = (cvc: string) => {
    if (cvc.length === 0) return;
    const maxCVCLength = (numberCard || FALLBACK_CARD).code.size;
    const cvcValidation = valid.cvv(cvc, maxCVCLength);
    setCvc(cvcValidation.isValid);
    console.log(cvcValidation);
  };

  const emailValidation = (email: string) => {
    const emailValid = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (email === "" || email.length < 3) {
      setEmail(false);
    } else if (!email.match(emailValid)) {
      setEmail(false);
    } else {
      setEmail(true);
    }
  };

  useDidUpdate(() => {
    emailValidation(emailcard);
  }, [emailcard]);

  useDidUpdate(() => {
    cvcValidation(cvccard);
  }, [cvccard]);

  useDidUpdate(() => {
    valitedExpiryDat(expiryCard);
  }, [expiryCard]);

  useDidUpdate(() => {
    valitedCard(cardNumber);
  }, [cardNumber]);

  //   useEffect(() => {}, []);

  return { card, expiry, cvc, email };
};

export { useInterval, useValidationCard };
