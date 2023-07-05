import useStore from '@/app/store'

export function findClosestFloor(target, numbers) {
  let closestIndex = -1 // Initialize the index of the closest number
  let minDifference = Infinity
  let closestNumber = null // Initialize the closest number

  for (let i = 0; i < numbers.length; i++) {
    const difference = Math.abs(target - numbers[i])

    if (difference < minDifference) {
      minDifference = difference
      closestIndex = i // Update the closestIndex when a closer number is found
      closestNumber = numbers[i] // Update the closestNumber
    }
  }

  // const setElevatorIsActive = useStore((state) => state.setElevatorIsActive)
  // const updateFloor = useStore((state) => state.updateFloor)
  // setElevatorIsActive(closestNumber, true)
  // updateFloor(closestNumber, target)

  return {
    closestElevator: closestIndex,
    closestFloor: closestNumber,
    target: target,
  }
}

//  const elevatorsCurrentFloorStatus = useStore((state) =>
//     state.elevatorsNum.map((elevator) => elevator.currentFloor)
//   );
//   const elevatorsCurrentActiveStatus = useStore((state) =>
//     state.elevatorsNum.map((elevator) => elevator.elevatorIsActive)
//   );
//   const elevators = useStore((state) => state.elevatorsNum);
//   const updateFloor = useStore((state) => state.updateFloor);
//   const removeFromQueue = useStore((state) => state.removeFromQueue);
//   const setElevatorIsActive = useStore((state) => state.setElevatorIsActive);
//   const queue = useStore((state) => state.queue);

//   const [closestElevatorToRequestedFloor, setClosestElevatorToRequestedFloor] =
//     useState(null);

//   console.log(elevatorsCurrentActiveStatus, queue);
//   const handleClick = (closestElevator) => {
//     if (closestElevator !== index) return;

//     setElevatorIsActive(closestElevator, true);
//     const difference = Math.abs(
//       queue[0] - elevators[closestElevator].currentFloor
//     );
//     const transitionDuration = difference * 1;
//     const translateYValue = queue[0] * -40;

//     setElevatorStyle({
//       transform: `translateY(${translateYValue}px)`,
//       transition: `transform ${transitionDuration}s cubic-bezier(0, 0, 0.9, 1.1)`,
//       color: "red",
//     });

//     updateFloor(closestElevator, queue[0]);

//     const elevatorFinishTimeout = setTimeout(() => {
//       toast.success(`Elevator ${closestElevator} Arrived To Floor ${queue[0]}`);
//       setElevatorIsActive(closestElevator, false);
//       setElevatorStyle({
//         transform: `translateY(${translateYValue}px)`,
//         transition: `transform ${transitionDuration}s cubic-bezier(0, 0, 0.9, 1.1)`,
//         color: "green",
//       });
//       removeFromQueue();
//     }, transitionDuration * 1000 + 2000);

//     return () => {
//       clearTimeout(elevatorFinishTimeout);
//     };
//   };

//   useEffect(() => {
//     setClosestElevatorToRequestedFloor(
//       findClosestFloor(queue[0], elevatorsCurrentFloorStatus)
//     );
//   }, [queue, elevatorsCurrentFloorStatus]);

//   useEffect(() => {
//     if (queue.length > 0 && closestElevatorToRequestedFloor !== null) {
//       handleClick(closestElevatorToRequestedFloor);
//     }
//   }, [queue, closestElevatorToRequestedFloor])
