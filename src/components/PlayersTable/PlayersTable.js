import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import DataImportModal from './DataImportModal';
import { Paper, Popover } from '@mui/material';


const PlayersTable = () => {
  const [allRosterData, setAllRosterData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [importModalOpen, setImportModalOpen] = useState(false);
  const handleImportModal = () => setImportModalOpen(true);

  // action button popover control 
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenActionButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseActionButton = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



  console.log(allRosterData)
  // <GrFormClose className='absolute right-0 text-[#cbcbcb]'
  return (
    <div className='px-[2vw]'>
      <div className='mb-5 pt-[2vw] flex items-center justify-between'>
        <div className="text-left">
          <p className='text-[#fea013] text-sm'>Roster Details</p>
          <h2 className='text-white font-bold text-2xl'>My Team</h2>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="relative flex items-center gap-[2px] border border-[#3f3f3f] rounded-md p-2">
            <BiSearch className='text-gray-400 mt-[2px] text-xl' />
            <input type="text" placeholder='Find Player' onChange={(e) => setSearchText(e.target.value)} className='border-0 focus:outline-0 text-white bg-[#1c1c1c] text-gray-400 ' />
            {searchText && <p className='text-[#fea013] absolute right-2'>Search</p>}
          </div>

          {!allRosterData?.length ? <p onClick={handleImportModal} className="border border-[#3f3f3f] bg-[#fea013] text-white rounded-md p-2 cursor-pointer">Import Team</p>
            : <p onClick={handleImportModal} className="border border-[#3f3f3f] bg-[#1c1c1c] text-gray-400 rounded-md p-2 cursor-pointer">Re-Import Team</p>}

        </div>

      </div>

      <div className='bg-[#2d2d2d] text-[#cbcbcb] min-h-[85vh] rounded-lg'>
        {!allRosterData?.length && <>
          <div className="flex items-center justify-between text-center pt-3 px-5">
            <p className='text-[#cbcbcb] text-md'>Player Name</p>
            <p className='text-[#cbcbcb] text-md'>Jersey Number</p>
            <p className='text-[#cbcbcb] text-md'>Position</p>
            <p className='text-[#cbcbcb] text-md'>Height</p>
            <p className='text-[#cbcbcb] text-md'>Weight</p>
            <p className='text-[#cbcbcb] text-md'>Nationality</p>
          </div>

          <div className="min-h-[600px] grid grid-cols-1  content-center">
            <div className='self-center'>
              <p className='text-[#cbcbcb] text-md'> You do not have players on the roster</p>
              <p className='text-[#cbcbcb] text-md'> {allRosterData?.length}</p>
              <p onClick={handleImportModal} className='cursor-pointer text-[#fea013] text-md'>Import Team</p>
            </div>
          </div>
        </>}

        <div className="h-[83vh] pl-3" style={{ overflowY: 'scroll' }}>
          {allRosterData?.map((data, index) => <div key={index} className="grid grid-cols-9 gap-2 table-container pt-5">
            <div className="flex items-center gap-2">
              <img src={data[7]} className="w-6 h-6 rounded-[50%] flag-image" alt="" />
              <p className='text-sm'>{data[0]}</p>
            </div>
            <p className='text-sm'>{data[2]}</p>
            <p className='text-sm'>{data[8]}</p>
            <p className='text-sm'>{data[3]}</p>
            <p className='text-sm'>{data[4]}</p>
            <p className='text-sm'>{data[5]}</p>
            <p className='text-sm'>{data[6]}</p>
            <p className='text-sm'>{data[9]}</p>

            <div className="grid grid-cols-2 gap-2 action-container">
              <p className='text-sm'>{data[10]}</p>

              {/* --- Action button --- */}
              <p onClick={handleOpenActionButton} className='cursor-pointer  action-button'><BsThreeDots className='text-xl' /></p>
            </div>



          </div>)}
        </div>

      </div>

      {/* --- Modal ---  */}
      <DataImportModal importModalOpen={importModalOpen} setImportModalOpen={setImportModalOpen} setAllRosterData={setAllRosterData} />

      {/* --- action button popover ---  */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseActionButton}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className="m-0 p-0 shadow-0"
      >

        <div className='bg-[#2d2d2d] w-[300px] h-100% p-5 shadow-10'>
          <h2 className='text-white text-2xl font-bold'>Actions</h2>
          <h2>This is pop over</h2>
          <h2>This is pop over</h2>
        </div>

      </Popover>

    </div>
  );
};

export default PlayersTable;