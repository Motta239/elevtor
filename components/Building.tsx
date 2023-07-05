import React, { useEffect } from "react";
import CallButton from "@/components/CallButton";
import FloorBox from "@/components/FloorBox";
import Elevators from "./Elevators";
import { findClosestFloor } from "@/actions/findClosestFloor";
import useStore from "@/app/store";

interface BuildingProps {
  floorsNum: number[];
  elevators: [];
  queue: number[];
}

export function Building({ floorsNum, elevators }: BuildingProps) {
  const queue = useStore((state) => state.queue); //the orderd elevators
  const setElevatorColor = useStore((state) => state.setElevatorColor);
  const setTargetElevator = useStore((state) => state.setTargetElevator);
  const setElevatorIsActive = useStore((state) => state.setElevatorIsActive); //sets the moving elevator to active
  const updateFloor = useStore((state) => state.updateFloor); //updates the floor that the elevator is at
  const removeFromQueue = useStore((state) => state.removeFromQueue); //removes the requested floor from the queue
  const availableElevatorsArray = useStore((state) =>
    state.elevatorsNum.map(
      (elevator: { elevatorIsActive: any; currentFloor: any }) =>
        elevator.elevatorIsActive ? NaN : elevator.currentFloor
    )
  ); //array of the available elevators
  //finds the closest non active elevator for the requested floor

  const handleFindClosestNotActiveElevator = (
    closestElevator: number,
    closestFloor: number,
    target: number
  ) => {
    if (closestElevator === -1) return;
    setElevatorIsActive(closestElevator, true);
    setElevatorColor(closestElevator, "red");
    removeFromQueue();
    setTargetElevator(closestElevator, target);
    const difference = target - closestFloor;
    const direction = difference > 0 ? 1 : -1; // Determine the direction of floor updates
    const updateCount = Math.abs(difference); // Use the absolute difference
    const elevatorSpeed = 500;
    const waitTimer = 2000;
    let currentUpdateCount = 0;
    const updateFloorInterval = setInterval(() => {
      if (currentUpdateCount > updateCount) {
        clearInterval(updateFloorInterval);
        setTargetElevator(closestElevator, false);
        setElevatorColor(closestElevator, "green");
        setTimeout(() => {
          setElevatorColor(closestElevator, "black");
          setElevatorIsActive(closestElevator, false);
        }, waitTimer);
        new Audio("/elevatorSound.mp3").play();
        return;
      }
      const updatedFloor = closestFloor + direction * currentUpdateCount;
      updateFloor(closestElevator, updatedFloor);
      currentUpdateCount++;
    }, elevatorSpeed);

    return () => {
      clearInterval(updateFloorInterval);
    };
  };

  useEffect(() => {
    if (queue.length > 0) {
      const { closestElevator, closestFloor, target } = findClosestFloor(
        queue[0],
        availableElevatorsArray
      );
      handleFindClosestNotActiveElevator(closestElevator, closestFloor, target);
    }
  }, [availableElevatorsArray, elevators]); //listen for changes to in elevators array to find a vacent elevator

  return (
    <div className="flex flex-col-reverse relative  overflow-scroll  overflow-x-auto  border-gray-950">
      {floorsNum.map((floorNumber, index) => (
        <div key={floorNumber} className=" flex bg-white">
          <FloorBox index={index} />
          {elevators.map(() => (
            <div className="  w-14 md:w-20 h-10   border-r-[1px] border-b-[1px]"></div>
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
