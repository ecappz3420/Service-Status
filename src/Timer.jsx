import React, { useEffect, useState, memo, useMemo } from 'react';

const Timer = memo(({ startTime }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const timeDiff = useMemo(() => {
    const calculateTimeDifference = (startDateTime, endDateTime) => {
      const startDate = new Date(startDateTime);
      const endDate = new Date(endDateTime);
      const diff = endDate - startDate;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      return { days, hours, minutes, seconds };
    };

    return calculateTimeDifference(startTime, now);
  }, [startTime, now]);

  return (
    <span>
      {`${timeDiff.days}d ${timeDiff.hours}h ${timeDiff.minutes}m ${timeDiff.seconds}s`}
    </span>
  );
});

export default Timer;
