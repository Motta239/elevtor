import create from "zustand";

const useStore = create((set) => {
  const floorsNum = Array.from({ length: 10 }, (_, index) => index);

  return {
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
    ],
    floorsNum: floorsNum,
    queue: [],

    addToQueue: (requestedFloor) => {
      set((state) => {
        if (!state.queue.includes(requestedFloor)) {
          return {
            queue: [...state.queue, requestedFloor],
          };
        }
        return state;
      });
    },

    removeFromQueue: () => {
      set((state) => ({
        queue: state.queue.slice(1),
      }));
    },

    updateFloor: (i, index) =>
      set((state) => {
        const updatedElevators = [...state.elevatorsNum];
        updatedElevators[i] = { ...updatedElevators[i], currentFloor: index };
        return { elevatorsNum: updatedElevators };
      }),

    setElevatorIsActive: (index, isActive) =>
      set((state) => {
        const updatedElevators = [...state.elevatorsNum];
        updatedElevators[index] = {
          ...updatedElevators[index],
          elevatorIsActive: isActive,
        };
        return { elevatorsNum: updatedElevators };
      }),
    setElevatorColor: (index, color) =>
      set((state) => {
        const updatedElevators = [...state.elevatorsNum];
        updatedElevators[index] = {
          ...updatedElevators[index],
          color: color,
        };
        return { elevatorsNum: updatedElevators };
      }),

    increaseElevator: () =>
      set((state) => ({
        elevatorsNum: [
          ...state.elevatorsNum,
          { currentFloor: 0, elevatorIsActive: false },
        ],
      })),

    decreaseElevator: () =>
      set((state) => ({
        elevatorsNum: state.elevatorsNum.slice(
          0,
          state.elevatorsNum.length - 1
        ),
      })),

    increaseFloors: () =>
      set((state) => {
        const newFloor = state.floorsNum.length;
        const updatedFloors = [...state.floorsNum, newFloor];
        return {
          floorsNum: updatedFloors,
        };
      }),

    decreaseFloors: () =>
      set((state) => {
        const updatedFloors = state.floorsNum.slice(
          0,
          state.floorsNum.length - 1
        );
        return {
          floorsNum: updatedFloors,
        };
      }),

    setTargetElevator: (index, target) =>
      set((state) => {
        const updatedElevators = [...state.elevatorsNum];
        updatedElevators[index] = {
          ...updatedElevators[index],
          targetFloor: target,
        };
        return { elevatorsNum: updatedElevators };
      }),
  };
});

export default useStore;
