import chalk from "chalk";
import { useEffect, useState } from "react";

export default function Cursor({ char = "" }) {
  const [inverse, setInverse] = useState(true);

  useEffect(() => {
    const i = setInterval(() => {
      setInverse(!inverse);
    }, 500);

    return () => {
      clearInterval(i);
    };
  }, [inverse]);

  return inverse ? chalk.inverse(char) : char;
}
