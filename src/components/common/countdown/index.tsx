import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string | Date;
}

const getTimeLeft = (target: Date) => {
  const now = new Date();
  let diff = target.getTime() - now.getTime();
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));

  return `${days} Day: ${hours} Hours: ${minutes} Mins left`;
};

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const dateObj = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
    setDisplay(getTimeLeft(dateObj));
    const interval = setInterval(() => {
      setDisplay(getTimeLeft(dateObj));
    }, 60000); // update every minute

    return () => clearInterval(interval);
  }, [targetDate]);

  return <span>{display}</span>;
};

export default Countdown;