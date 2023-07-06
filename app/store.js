import create from "zustand";

const useStore = create((set) => {
  const floorsNum = Array.from({ length: 10 }, (_, index) => index);

  return {
    // State variables:
    elevatorsNum: [
      {
        currentFloor: 0,
        elevatorIsActive: false,
        color: "",
        targetFloor: false,
      },
      {
        currentFloor: 0,
        elevatorIsActive: false,
        color: "",
        targetFloor: false,
      },
      {
        currentFloor: 0,
        elevatorIsActive: false,
        color: "",
        targetFloor: false,
      },
      {
        currentFloor: 0,
        elevatorIsActive: false,
        color: "",
        targetFloor: false,
      },
      {
        currentFloor: 0,
        elevatorIsActive: false,
        color: "",
        targetFloor: false,
      },
    ], // elevatorsNum: An array of elevator objects, each containing properties such as currentFloor, elevatorIsActive, color, and targetFloor.
    floorsNum: floorsNum, // floorsNum: An array representing the floors in the building.
    queue: [], // queue: An array representing the queue of requested floors.
    elevatorSpeed: 2000,
    speedLimits: [1000, 4000],
    // Functions:
    addToQueue: (requestedFloor) => {
      set((state) => {
        if (!state.queue.includes(requestedFloor)) {
          return {
            queue: [...state.queue, requestedFloor],
          };
        }
        return state;
      });
    }, // addToQueue: Adds a requested floor to the queue if it doesn't already exist.

    removeFromQueue: () => {
      set((state) => ({
        queue: state.queue.slice(1),
      }));
    }, // removeFromQueue: Removes the first element from the queue.

    updateFloor: (i, index) =>
      set((state) => {
        const updatedElevators = [...state.elevatorsNum];
        updatedElevators[i] = { ...updatedElevators[i], currentFloor: index };
        return { elevatorsNum: updatedElevators };
      }), // updateFloor: Updates the current floor of a specific elevator.

    increaseElevator: () =>
      set((state) => ({
        elevatorsNum: [
          ...state.elevatorsNum,
          { currentFloor: 0, elevatorIsActive: false },
        ],
      })),
    // increaseElevator: Adds a new elevator to the elevatorsNum array.

    decreaseElevator: () =>
      set((state) => ({
        elevatorsNum: state.elevatorsNum.slice(
          0,
          state.elevatorsNum.length - 1
        ),
      })), // decreaseElevator: Removes the last elevator from the elevatorsNum array.

    increaseFloors: () =>
      set((state) => {
        const newFloor = state.floorsNum.length;
        const updatedFloors = [...state.floorsNum, newFloor];
        return {
          floorsNum: updatedFloors,
        };
      }), // increaseFloors: Adds a new floor to the floorsNum array.

    decreaseFloors: () =>
      set((state) => {
        const updatedFloors = state.floorsNum.slice(
          0,
          state.floorsNum.length - 1
        );
        return {
          floorsNum: updatedFloors,
        };
      }), // decreaseFloors: Removes the last floor from the floorsNum array.

    setElevatorStatusAndTarget: (index, color, isActive, target) =>
      set((state) => {
        const updatedElevators = [...state.elevatorsNum];
        updatedElevators[index] = {
          ...updatedElevators[index],
          color: color,
          elevatorIsActive: isActive,
          targetFloor: target,
        };
        return { elevatorsNum: updatedElevators };
      }),
    // setElevatorStatusAndTarget: Updates the status and target floor of a specific elevator.
    increaseElevatorSpeed: () => {
      set((state) => {
        const { elevatorSpeed, speedLimits } = state;
        const increasedSpeed = elevatorSpeed + 500;

        if (increasedSpeed > speedLimits[1]) {
          // Reached the maximum allowed elevator speed
          return {
            elevatorSpeed: speedLimits[1],
          };
        }

        return {
          elevatorSpeed: increasedSpeed,
        };
      });
    },

    decreaseElevatorSpeed: () => {
      set((state) => {
        const { elevatorSpeed, speedLimits } = state;
        const decreasedSpeed = elevatorSpeed - 500;

        if (decreasedSpeed < speedLimits[0]) {
          // Reached the minimum allowed elevator speed
          return {
            elevatorSpeed: speedLimits[0],
          };
        }

        return {
          elevatorSpeed: decreasedSpeed,
        };
      });
    },
  };
});

export default useStore;
