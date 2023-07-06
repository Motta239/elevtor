import useStore from "@/app/store";
import React, { useEffect, useState } from "react";
import { MdElevator } from "react-icons/md";

interface ElevatorProps {
  index: number;
  currentFloor: number;
  color: string;
  targetFloor: number;
}

function Elevators({ currentFloor, color, targetFloor }: ElevatorProps) {
  const { elevatorSpeed, elevatorsNum: elevators } = useStore();
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (targetFloor) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
      setTimer(0);
    };
  }, [targetFloor]);

  return (
    <div className="relative">
      <div
        className={`  w-8 ${
          elevators.length <= 10 ? "md:w-20  " : ""
        } h-10 flex justify-center items-center`}
        style={{
          transform: `translateY(-${Math.abs(currentFloor * 40)}px)`,
          transition: `transform ${elevatorSpeed / 1000}s linear`,
        }}
      >
        <MdElevator color={color} className=" h-4 w-4  md:w-8 md:h-8" />
      </div>
      {color == "red" && currentFloor !== targetFloor && (
        <div
          style={{ transform: `translateY(-${targetFloor * 40}px)` }}
          className="text-center bottom-3 left-3 md:left-5   md:text-xs absolute mt-2"
        >
          {timer} Sec
        </div>
      )}
    </div>
  );
}

export default Elevators;
