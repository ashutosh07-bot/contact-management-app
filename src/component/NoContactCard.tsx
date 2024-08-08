import React from 'react';


function NoContactCard() {
  return (
    <div className="w-80 text-center p-5 border border-gray-300 rounded-lg shadow">
      <div className="flex flex-col items-center">
       
        <h5 className="text-lg font-bold mb-2.5">No Contact Found</h5>
        <p className="mb-5">Please add contact from</p>
        <p className="mb-5">Create Contact</p>
      </div>
    </div>
  );
}

export default NoContactCard;
