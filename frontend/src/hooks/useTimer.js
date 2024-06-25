import { useEffect, useState } from "react";
import { convertSecondToTimerFormat } from "../utils/convertor";

function useTimer(time) {
  const [m, s] = convertSecondToTimerFormat(time); // 5분
  const [minute, setMinute] = useState(m);
  const [second, setSecond] = useState(s);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecond((prevSec) => {
        if (prevSec > 0) {
          return prevSec - 1;
        } else {
          setMinute((prevMin) => {
            if (prevMin > 0) {
              return prevMin - 1;
            } else {
              clearInterval(timer);
              setSecond(0);
              return 0;
            }
          });
          return 59;
        }
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return { minute, second };
}

export default useTimer;
