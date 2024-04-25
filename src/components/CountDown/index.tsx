/* eslint-disable react-hooks/exhaustive-deps */

import useRefresh from "hooks/useRefresh";
import { useEffect, useState } from "react";

const CountDown = ({ time, finishedText }: { time: number; finishedText?: string }) => {
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const { secondRefresh } = useRefresh();

  const formatNumber = (date: any) => {
    return ("0" + date.toString()).slice(-2);
  };
  const formatTime = () => {
    const _time = Math.floor((time - Date.now()) / 1000);
    if (_time <= 0) {
      return;
    }
    const d = Math.floor(_time / 3600 / 24);
    const h = Math.floor((_time % 86400) / 3600);
    const m = Math.floor(((_time % 86400) % 3600) / 60);
    const s = _time % 60;
    setDay(d);
    setHour(h);
    setMinute(m);
    setSecond(s);
  };
  useEffect(() => {
    formatTime();
  }, [time, secondRefresh]);
  return (
    <div className="leading-none text-[#C4C4C4]">
      <span className="font-semibold text-white text-lg ">{formatNumber(day)}</span> day&nbsp;&nbsp;
      <span className="font-semibold text-white text-lg ">{formatNumber(hour)}</span> h&nbsp;&nbsp;
      <span className="font-semibold text-white text-lg ">{formatNumber(minute)}</span>{" "}
      m&nbsp;&nbsp;
      <span className="font-semibold text-white text-lg ">{formatNumber(second)}</span> s
    </div>
  );
};

export default CountDown;
