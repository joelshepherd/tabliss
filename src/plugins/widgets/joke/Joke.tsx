import React, { useState, useEffect } from "react";
import { useCachedEffect } from "../../../hooks";
import { db } from "../../../db/state";
import { useValue } from "../../../lib/db/react";
import { getJoke } from "./api";
import "./Joke.sass";
import {
  defaultData,
  Props,
  isSingleJoke,
  isTwoPartJoke,
  TwoPartJokeAPIResponse,
  isJokeError,
} from "./types";

const Joke: React.FC<Props> = ({
  cache,
  data = defaultData,
  setCache,
  loader,
}) => {
  // Grab the user's locale
  const locale = useValue(db, "locale");

  // Map to supported language
  const mapLocaleToJokeAPILang = (locale: string): string => {
    const defaultLanguage = "en";
    const supportedLanguages: string[] = ["cs", "de", "en", "es", "fr", "pt"];
    const [lang] = locale.split("-");
    return supportedLanguages.includes(lang) ? lang : defaultLanguage;
  };

  useCachedEffect(
    () => {
      loader.push();
      const apiLocale = mapLocaleToJokeAPILang(locale);
      getJoke(data.categories, apiLocale).then(setCache).finally(loader.pop);
    },
    cache?.timestamp ? cache.timestamp + data.timeout : 0,
    [data.categories],
  );

  if (!cache) {
    return null;
  }

  if (isJokeError(cache)) {
    return (
      <>
        {cache.causedBy.map((errorMessage, index) => {
          return <p key={index}>{errorMessage}</p>;
        })}
      </>
    );
  }

  return (
    <div className="joke-container">
      {isSingleJoke(cache) && <h5>{cache.joke}</h5>}

      {isTwoPartJoke(cache) && <TwoPartJoke joke={cache} />}
    </div>
  );
};

const TwoPartJoke: React.FC<{ joke: TwoPartJokeAPIResponse }> = ({ joke }) => {
  const isJokeAQuestion = joke.setup.slice(-1) === "?";
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
  }, [joke]);

  if (!isJokeAQuestion) {
    return (
      <>
        <h5>{joke.setup}</h5>
        <p>. . .</p>
        <h5>{joke.delivery}</h5>
      </>
    );
  }

  return (
    <>
      <h5
        className="question-joke-setup"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {joke.setup}
      </h5>
      {showAnswer && (
        <h5 className="question-joke-delivery">{joke.delivery}</h5>
      )}
    </>
  );
};

export default Joke;
