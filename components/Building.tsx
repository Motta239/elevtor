import React, { useEffect } from "react";
import CallButton from "@/components/CallButton";
import FloorNumber from "@/components/FloorNumber";
import Elevators from "./Elevators";
interface BuildingProps {
  floorsNum: number[];
  elevators: [];
}
export function Building({ floorsNum, elevators }: BuildingProps) {
  return (
    <div className="flex flex-col-reverse relative  overflow-scroll  overflow-x-auto  border-gray-950">
      {floorsNum.map((floorNumber, index) => (
        <div key={floorNumber} className=" flex bg-white">
          <FloorNumber index={index} />
          {elevators.map(() => (
            <div className="  w-14 md:w-20 h-10   border-r-[1px] border-b-[1px]" />
          ))}
          <CallButton index={index} />
        </div>
      ))}
      <div className="absolute bottom-0 left-20 right-20 flex">
        {elevators.map(({ currentFloor, color, targetFloor }, index) => (
          <Elevators
            key={index}
            index={index}
            currentFloor={currentFloor}
            color={color}
            targetFloor={targetFloor}
          />
        ))}
      </div>
    </div>
  );
}
