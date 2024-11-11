import { FC, useEffect, useState } from 'react';

import './timer.scss';
import { useDispatch, useSelector } from '../../services/store';
import { decrTime, initalTime } from '../../services/timer/slice';
import { secondsToTime } from '../../utils/time';

const Timer: FC = () => {
  const dispatch = useDispatch();
  const time = useSelector(state => state.timer.time);
  const [times, setTimes] = useState<{minStr: null | string, secStr: null | string}>({ minStr: null, secStr: null });


  useEffect(() => {
    dispatch(initalTime(40));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(time) {
      const {minStr, secStr} = secondsToTime(time);
      setTimes({minStr, secStr});
    }
  }, [time]);

  useEffect(() => {
    let timerId = setInterval(() => {
        if(time === 0) {
          clearInterval(timerId);
        } else {
          dispatch(decrTime());
        }
    }, 1000);
    return () => clearInterval(timerId);
  }, [dispatch, time])


  return (
    <div className="w-full h-20 bg-white">
      <div className="timer flex justify-center items-center gap-7">
        <span className="timer__title">Скидка действует:</span>
        <div className="timer__numbers flex gap-2">
          <div className="timer__min relative">
            <div className={(time < 30) && (time !== 0) ? "timer__num timer-danger" : "timer__num"}>{times.minStr}</div>
            <span className="timer__text">минут</span>
          </div>
          <span className={(time < 30) && (time !== 0) ? "timer__colon timer__num timer-danger" : "timer__colon timer__num"}>:</span>
          <div className="timer__sec relative">
            <div className={(time < 30) && (time !== 0) ? "timer__num timer-danger" : "timer__num"}>{time === 0 ? '00' : times.secStr}</div>
            <span className="timer__text">секунд</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;