import React, { useState, useEffect } from "react";
import useStore from "../app/store";
import { findClosestFloor } from "@/actions/findClosestFloor";

interface CallButtonProps {
  index: number;
}
const CallButton: React.FC<CallButtonProps> = ({ index }) => {
  const buttonStyles = [
    {
      text: "Call",
      style: "bg-green-500 text-white",
    },
    {
      text: "Waiting",
      style: "bg-red-600 text-white",
    },
    {
      text: "Arrived",
      style: "bg-white border-2 border-green-800",
    },
  ];
  const {
    removeFromQueue,
    updateFloor,
    setElevatorStatusAndTarget,
    queue,
    addToQueue,
    elevatorsNum,
    elevatorSpeed,
  } = useStore();
  const [buttonState, setButtonState] = useState(buttonStyles[0]);
  const availableElevatorsArray = elevatorsNum.map(
    (elevator: { elevatorIsActive: boolean; currentFloor: number }) =>
      elevator.elevatorIsActive ? NaN : elevator.currentFloor
  );
  const elevators = useStore((state) =>
    state.elevatorsNum
      .map((e: { targetFloor: any | number }) => e.targetFloor)
      .filter(Boolean)
  );

  const orderdElevators = [...queue, ...elevators];
  const isInElevators = orderdElevators.includes(index);

  // Check if the requested floor is in the elevators
  useEffect(() => {
    // This effect will be triggered whenever `isInElevators` changes

    // Check if the requested floor is in the elevators
    if (isInElevators) {
      setButtonState(buttonStyles[1]); // Set button style to "Waiting"

      // Set a timer to change the button style to `buttonStyles[2]` after 2 seconds
    } else {
      setButtonState(buttonStyles[2]); // Set button style to default
      const timer = setTimeout(() => {
        setButtonState(buttonStyles[0]); // Set button style to the desired state after 2 seconds
      }, 2000);

      // Clear the timer if the component unmounts or `isInElevators` changes
      return () => clearTimeout(timer);
    }
  }, [isInElevators]);
  const handleButtonClick = (requestedFloor: number) => {
    addToQueue(requestedFloor); // Add the pressed floor index to the queue in the zustand store
  };

  //array of the available elevators
  //finds the closest non active elevator for the requested floor

  const handleFindClosestNotActiveElevator = (
    closestElevator: number,
    closestFloor: number,
    target: number
  ) => {
    if (closestElevator === -1) return;
    setElevatorStatusAndTarget(closestElevator, "red", true, target);
    removeFromQueue();

    const difference = target - closestFloor;
    const direction = difference > 0 ? 1 : -1; // Determine the direction of floor updates
    const updateCount = Math.abs(difference); // Use the absolute difference
    const waitTimer = 2000;
    let currentUpdateCount = 0;
    const updateFloorInterval = setInterval(() => {
      if (currentUpdateCount > updateCount) {
        clearInterval(updateFloorInterval);
        setElevatorStatusAndTarget(closestElevator, "green", true, false);
        setTimeout(() => {
          new Audio("/elevatorSound.mp3").play();
          setElevatorStatusAndTarget(closestElevator, "black", false, false);
        }, waitTimer);
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

  if (queue.length > 0) {
    const { closestElevator, closestFloor, target } = findClosestFloor(
      queue[0],
      availableElevatorsArray
    );
    handleFindClosestNotActiveElevator(closestElevator, closestFloor, target);
  }

  return (
    <div className="flex flex-col-reverse items-center justify-center bg-gray-200">
      <button
        onClick={() => handleButtonClick(index)}
        className={`h-8 w-16 text-xs hover:scale-95 rounded-md
        ${buttonState.style}`}
        key={index}
      >
        {buttonState.text}
      </button>
    </div>
  );
};

export default CallButton;
