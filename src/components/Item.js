import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  fetchDeleteItemData,
  fetchGetItemsData,
  fetchUpdateCompletedData,
} from '../redux/slices/apiSlice';

import { toast } from 'react-toastify';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { openModal } from '../redux/slices/ModalSlice';

const MAX_DESCRIPTION_LENGTH = 75;

const Item = ({ task }) => {
  const { _id, title, description, date, iscompleted, isimportant, userid } =
    task;
  // console.log(userid);
  const dispetch = useDispatch();

  const [isCompleted, setIsCompleted] = useState(iscompleted);

  const deleteItem = async () => {
    const confirm = window.confirm('아이템을 삭제하시겠습니까 ?');

    if (!confirm) return;

    if (!_id) {
      toast.error('잘못된 사용자 접근 입니다.');
      return;
    }

    try {
      await dispetch(fetchDeleteItemData(_id)).unwrap();
      toast.success('아이템이 삭제되었습니다.');
      await dispetch(fetchGetItemsData(userid)).unwrap();
    } catch (error) {
      toast.error('아이템 삭제에 실패했습니다.');
      console.error(error);
    }
  };

  const changeCompleted = async () => {
    // setIsCompleted(!isCompleted)을 호출하면 상태 업데이트가 비동기적으로 이루어지기 때문에, isCompleted의 값이 즉시 변경되지 않는다.
    // 따라서 updateCompletedData 객체를 생성할 때 isCompleted의 이전 값이 사용된다. 이로 인해 true/false가 한 단계씩 밀리게 된다.

    // 상태를 미리 업데이트 하여 반영된 값을 전달
    const newIsCompleted = !isCompleted;
    setIsCompleted(newIsCompleted);

    const updateCompletedData = {
      itemId: _id,
      isCompleted: newIsCompleted,
    };

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateCompletedData),
    };

    // console.log(options);
    await dispetch(fetchUpdateCompletedData(options)).unwrap();
    newIsCompleted
      ? toast.success('할일을 완료했습니다')
      : toast.success('할일을 완료하지 못했습니다.');
    await dispetch(fetchGetItemsData(userid)).unwrap();
  };

  const handleOpenModal = () => {
    dispetch(openModal({ modalType: 'update', task }));
  };

  const handleDetailModal = () =>
    dispetch(openModal({ modalType: 'detail', task }));

  const textCut = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="item xl:w-1/3 h-[25vh] p-1 md:w-1/2 sm:w-full w-full">
      <div className="w-full h-full border border-gay-500 rounded-md flex py-3 px-4 flex-col justify-between bg-neutral-950 overflow-hidden">
        <div className="upper overflow-auto w-full">
          <h2 className="text-xl font-bold mb-3 relative pb-2 flex justify-between">
            <span className="w-full h-[1px] bg-gray-300 absolute bottom-0"></span>

            {title}
            <span
              className="text-sm py-1 px-3 border border-gray-300 rounded-md hover:bg-gray-600 cursor-pointer"
              onClick={handleDetailModal}
            >
              자세히
            </span>
          </h2>
          <p
            style={{ whiteSpace: 'pre-wrap' }}
            className="overflow-hidden text-ellipsis max-w-[95%] flex-grow"
          >
            {/* {description} */}
            {textCut(description, MAX_DESCRIPTION_LENGTH)}
          </p>
        </div>

        <div className="lower">
          <p className="text-sm mb-1">{date}</p>
          <div className="item-footer flex justify-between">
            <div className="item-footer-left flex gap-x-2">
              {iscompleted ? (
                <button
                  className="block py-1 px-4 bg-green-500 text-sm rounded-md"
                  onClick={changeCompleted}
                >
                  Completed
                </button>
              ) : (
                <button
                  className="block py-1 px-4 bg-gray-400 text-sm rounded-md"
                  onClick={changeCompleted}
                >
                  InCompleted
                </button>
              )}

              {isimportant && (
                <button className="block py-1 px-4 bg-red-500 text-sm rounded-md">
                  Important
                </button>
              )}
            </div>

            <div className="item-footer-right flex gap-x-4 items-center">
              <button>
                <FaRegEdit className="w-6 h-6" onClick={handleOpenModal} />
              </button>
              <button>
                <RiDeleteBin5Line className="w-6 h-6" onClick={deleteItem} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
