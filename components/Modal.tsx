import useStore from "@/app/store";
import { useState, FormEvent } from "react";
import { MdClose } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  floorsNumber: string;
  elevatorsNumber: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  floorsNumber,
  elevatorsNumber,
}) => {
  const {
    increaseElevator,
    decreaseElevator,
    increaseFloors,
    decreaseFloors,
    increaseElevatorSpeed,
    decreaseElevatorSpeed,
    elevatorSpeed,
  } = useStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    closeModal();
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 backdrop-blur-2xl flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Elevator System Details</h2>

          <MdClose
            size={24}
            className="text-blue-500 hover:text-blue-600"
            onClick={closeModal}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="floors" className="block font-medium mb-1">
              Amount of Floors:
            </label>
            <div className="flex items-center">
              <button
                type="button"
                className="px-3 py-2 rounded-l-lg border border-gray-300"
                onClick={() => decreaseFloors()}
              >
                -
              </button>
              <div className="w-full px-3 py-2 border-t border-b border-gray-300 text-center">
                {floorsNumber}
              </div>
              <button
                type="button"
                className="px-3 py-2 rounded-r-lg border border-gray-300"
                onClick={() => increaseFloors()}
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="elevators" className="block font-medium mb-1">
              Amount of Elevators:
            </label>
            <div className="flex items-center">
              <button
                type="button"
                className="px-3 py-2 rounded-l-lg border border-gray-300"
                onClick={() => decreaseElevator()}
              >
                -
              </button>
              <div className="w-full px-3 py-2 border-t border-b border-gray-300 text-center">
                {elevatorsNumber}
              </div>

              <button
                type="button"
                className="px-3 py-2 rounded-r-lg border border-gray-300"
                onClick={() => increaseElevator()}
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="elevators" className="block font-medium mb-1">
              Elevator Speed :
            </label>
            <div className="flex items-center">
              <button
                type="button"
                className="px-3 py-2 rounded-l-lg border border-gray-300"
                onClick={() => decreaseElevatorSpeed()}
              >
                -
              </button>
              <div className="w-full flex items-center justify-center  px-3 py-2 border-t border-b border-gray-300 text-center">
                <p>{parseInt(elevatorSpeed.toString()[0])}</p>
              </div>

              <button
                type="button"
                className="px-3 py-2 rounded-r-lg border border-gray-300"
                onClick={() => increaseElevatorSpeed()}
              >
                +
              </button>
              <p className="text-xs absolute  bottom-[-20px]  ">In Secondes</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
