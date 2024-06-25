import useTimer from "../../hooks/useTimer";
import { padNumber } from "../../utils/convertor";

function Timer({ time = 300 }) {
  const { minute, second } = useTimer(time);

  return (
    <span className="position-absolute small text-primary timer-position">
      {`${padNumber(minute)}:${padNumber(second)}`}
    </span>
  );
}

export default Timer;
