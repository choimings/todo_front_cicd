import React from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/slices/ModalSlice';

const AddItem = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: 'create', task: null }));
  };

  return (
    <div className="add-card w-full xl:w-1/3 md:w-1/2 sm:w-full h-[25vh] p-1">
      <div className="w-full h-full border border-gay-500 rounded-md flex items-center justify-center">
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-x-2 group cursor-pointer"
        >
          <FiPlusSquare className="w-9 h-9 text-gray-400 font-light group-hover:text-white" />
          <span className="font-customFontKr text-gray-400 group-hover:text-white">
            할일 추가하기
          </span>
        </button>
      </div>
    </div>
  );
};

export default AddItem;
