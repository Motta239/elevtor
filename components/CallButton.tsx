import React, { useState, useEffect } from "react";
import useStore from "../app/store";

interface CallButtonProps {
  index: number;
}

const CallButton: React.FC<CallButtonProps> = ({ index }) => {
  const buttonStyles = [
    {
      text: "Call",
      style:
        "bg-green-500 text-white h-8 w-16 text-xs hover:scale-95 rounded-md",
    },
    {
      text: "Waiting",
      style: "bg-red-600 text-white h-8 w-16 text-xs hover:scale-95 rounded-md",
    },
    {
      text: "Arrived",
      style:
        "bg-white border-2 border-green-800 h-8 w-16 text-xs hover:scale-95 rounded-md",
    },
  ];
  const [buttonState, setButtonState] = useState(buttonStyles[0]);
  const addToQueue = useStore((state) => state.addToQueue);
  const queue = useStore((state) => state.queue);
  const elevators = useStore((state) =>
    state.elevatorsNum
      .map((e: { targetFloor: any }) => e.targetFloor)
      .filter(Boolean)
  );

  const orderdElevators = [...queue, ...elevators];

  const handleButtonClick = (requestedFloor: number) => {
    addToQueue(requestedFloor); // Add the pressed floor index to the queue in the zustand store
    setButtonState(buttonStyles[1]); // Set button style to "Waiting"
  };

  const isInElevators = orderdElevators.includes(index);

  useEffect(() => {
    if (isInElevators) {
      setButtonState(buttonStyles[1]);
    } else {
      setButtonState(buttonStyles[2]); // Set button style to "Arrived" immediately
      const timeoutId = setTimeout(() => {
        setButtonState(buttonStyles[0]); // Switch back to "Call" after 2 seconds
      }, 2000);
      return () => clearTimeout(timeoutId); // Cleanup the timeout on unmount
    }
  }, [isInElevators]);

  return (
    <div className="flex flex-col-reverse items-center justify-center bg-gray-200">
      <button
        onClick={() => handleButtonClick(index)}
        className={buttonState.style}
        disabled={isInElevators}
        key={index}
      >
        {buttonState.text}
      </button>
    </div>
  );
};

export default CallButton;
