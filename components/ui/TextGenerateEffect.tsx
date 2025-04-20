"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [text, setText] = useState<string[]>([]);
  const scopeRef = useRef<HTMLDivElement>(null);
  const wordsArray = words.split(" ");

  const animate = useCallback(() => {
    let currentIndex = 0;
    setText([]);

    const intervalId = setInterval(() => {
      if (currentIndex < wordsArray.length) {
        setText((prevText) => [...prevText, wordsArray[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 80);

    return () => clearInterval(intervalId);
  }, [wordsArray]);

  useEffect(() => {
    animate();
  }, [animate]);

  return (
    <div ref={scopeRef} className={cn("font-bold", className)}>
      {text.map((word, idx) => (
        <span key={`${word}-${idx}`} className="dark:text-white text-black">
          {word}{" "}
        </span>
      ))}
    </div>
  );
};
