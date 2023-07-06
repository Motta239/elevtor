"use client";

import useStore from "./store";

import { Building } from "@/components/Building";
import { useState } from "react";
import Modal from "@/components/Modal";

export default function Home() {
  const { elevatorsNum, floorsNum } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-10 justify-center min-h-screen p-4 bg-gray-200 items-center">
      <Building elevators={elevatorsNum} floorsNum={floorsNum} />
      <div>
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg"
        >
          Change Settings
        </button>
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          floorsNumber={floorsNum.length}
          elevatorsNumber={elevatorsNum.length}
        />
      </div>
    </div>
  );
}
