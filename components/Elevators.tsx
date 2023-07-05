import React, { useEffect, useState } from "react";
import { MdElevator } from "react-icons/md";

interface ElevatorProps {
  index: number;
  currentFloor: number;
  color: string;

  targetFloor: number;
}

function Elevators({ currentFloor, color, targetFloor }: ElevatorProps) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (targetFloor) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 0.1);
      }, 100);
    }

    return () => {
      clearInterval(interval);
      setTimer(0);
    };
  }, [targetFloor]);

  return (
    <div className="relative">
      <div
        className=" w-14 md:w-20  h-10 flex justify-center items-center"
        style={{
          transform: `translateY(-${Math.abs(currentFloor * 40)}px)`,
          transition: "transform 1s linear",
        }}
      >
        <MdElevator color={color} className="w-8  h-8" />
      </div>
      {color == "red" && (
        <div
          style={{ transform: `translateY(-${targetFloor * 40}px)` }}
          className="text-center bottom-3 left-3 md:left-5  text-[8px] md:text-xs absolute mt-2"
        >
          {timer.toFixed(2)} Sec
        </div>
      )}
    </div>
  );
}

export default Elevators;
