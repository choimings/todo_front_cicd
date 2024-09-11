import React from 'react';
import Navbar from '../Navbar';
import ItemPanel from '../ItemPanel';

const index = () => {
  return (
    <div className="page-section">
      <Navbar menuIdx={2} />
      <ItemPanel pageTitle="InCompleted Items" filterCompleted={false} />
    </div>
  );
};

export default index;
