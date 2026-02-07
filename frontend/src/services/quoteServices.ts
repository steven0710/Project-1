export interface Quote {
  q: string;
  a: string;
}

const QUOTE_URL = "https://dummyjson.com/quotes/random";

export async function getRandomQuote(): Promise<Quote> {
  const res = await fetch(QUOTE_URL);
  const data = await res.json();
  return { q: data.quote, a: data.author };
}
