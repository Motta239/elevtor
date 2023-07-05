interface FloorBoxProps {
  index: number;
}

const FloorBox: React.FC<FloorBoxProps> = ({ index }) => {
  const getFloorNumber = (index: number) => {
    if (index === 0) {
      return "Ground Floor";
    } else if (index === 1) {
      return "1st";
    } else if (index === 2) {
      return "2nd";
    } else if (index === 3) {
      return "3rd";
    } else {
      return `${index}th`;
    }
  };

  return (
    <div className="flex flex-col-reverse  ">
      <div
        className={`row-span-1 w-20 h-10  font-bold bg-gray-200 flex items-center justify-center text-xs `}
      >
        {getFloorNumber(index)}
      </div>
    </div>
  );
};

export default FloorBox;
