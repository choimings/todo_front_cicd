import { MdHome } from 'react-icons/md';
import { RiCheckboxMultipleFill } from 'react-icons/ri';
import { BsStopwatchFill } from 'react-icons/bs';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

export const navMenus = [
  { label: 'Home', to: '/', icon: <MdHome className="w-5 h-5" />, idx: 0 },
  {
    label: 'Completed',
    to: '/completed',
    icon: <RiCheckboxMultipleFill className="w-5 h-5" />,
    idx: 1,
  },
  {
    label: 'Proceeding',
    to: '/proceeding',
    icon: <BsStopwatchFill className="w-5 h-5" />,
    idx: 2,
  },
  {
    label: 'Important',
    to: '/important',
    icon: <BsFillExclamationTriangleFill className="w-5 h-5" />,
    idx: 3,
  },
];
