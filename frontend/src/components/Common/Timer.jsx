import { useState, useRef, useEffect } from "react";
import { convertSecondToTimerFormat } from "../../utils/convertor";

function Timer({ time = 300 }) {
  const [m, s] = convertSecondToTimerFormat(time); // 5분
  const [minute, setMinute] = useState(m);
  const [second, setSecond] = useState(s);
  const timerId = useRef();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setSecond((prevSec) => {
        if (prevSec > 0) {
          return prevSec - 1;
        } else {
          setMinute((prevMin) => {
            if (prevMin > 0) {
              return prevMin - 1;
            } else {
              clearInterval(timerId.current);
              setSecond(0);
              return 0;
            }
          });
          return 59;
        }
      });
    }, 1000);
    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  return (
    <span className="position-absolute small text-primary timer-position">
      {`${minute}:${String(second).padStart(2, "0")}`}
    </span>
  );
}

export default Timer;
