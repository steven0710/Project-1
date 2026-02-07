import { useEffect, useRef, useState } from "react";
import { getRandomQuote } from "./services/quoteServices";

export interface Quote {
  q: string;
  a: string;
}

const QuoteDisplay = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let isCancelled = false; // Local to this specific effect execution

    const fetchQuote = async () => {
      try {
        const q = await getRandomQuote();

        // If this specific effect was cleaned up, stop everything
        if (isCancelled) return;

        setQuote(q);

        // Schedule next fetch
        timeoutRef.current = window.setTimeout(fetchQuote, 10000);
      } catch (err) {
        if (!isCancelled) console.error(err);
      }
    };

    void fetchQuote();

    return () => {
      isCancelled = true; // Mark THIS execution as dead
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-20">
      {quote ? (
        <>
          "{quote.q}" — <strong>{quote.a}</strong>
        </>
      ) : (
        <div>Loading quote…</div>
      )}
    </div>
  );
};

export default QuoteDisplay;
