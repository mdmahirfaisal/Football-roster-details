import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import DataImportModal from './DataImportModal';
import { Popover } from '@mui/material';
import EditPlayerModal from './EditPlayerModal';
import { useSelector } from 'react-redux';
import DeletePlayerModal from './DeletePlayerModal';


const PlayersTable = () => {
  const { importedCsvData } = useSelector((state) => state.roster)
  const [searchText, setSearchText] = useState("");
  // data import modal 
  const [importModalOpen, setImportModalOpen] = useState(false);
  const handleImportModal = () => setImportModalOpen(true);

  // action button popover control 
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenActionButton = (event, data) => {
    setAnchorEl(event.currentTarget);
    setSinglePlayerData(data)
  };

  const handleCloseActionButton = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // player edit modal 
  const [singlePlayerData, setSinglePlayerData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleEditModal = () => {
    setEditModalOpen(true)
    handleCloseActionButton()
  };

  // player delete modal 
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteModal = () => {
    setDeleteModalOpen(true)
    handleCloseActionButton()
  };


  return (
    <div className='px-[2vw]'>
      <div className='mb-5 pt-[2vw] flex items-center justify-between'>
        <div className="text-left">
          <p className='text-[#fea013] text-sm'>Roster Details</p>
          <h2 className='text-white font-bold text-2xl'>My Team</h2>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="relative flex items-center gap-[2px] border border-[#3f3f3f] rounded-md p-2 w-[250px]">
            <BiSearch className='text-gray-400 mt-[2px] text-xl' />
            <input type="text" placeholder='Find Player' onChange={(e) => setSearchText(e.target.value)} className='w-[150px] border-0 focus:outline-0 text-white bg-[#1c1c1c] text-gray-400 ' />
            {searchText && <p className='text-[#fea013] ml-2'>Search</p>}
          </div>

          {!importedCsvData?.length ? <p onClick={handleImportModal} className="border border-[#3f3f3f] bg-[#fea013] text-white rounded-md p-2 cursor-pointer">Import Team</p>
            : <p onClick={handleImportModal} className="border border-[#3f3f3f] bg-[#1c1c1c] text-gray-400 rounded-md p-2 cursor-pointer">Re-Import Team</p>}

        </div>

      </div>

      <div className='bg-[#2d2d2d] text-[#cbcbcb] min-h-[85vh] rounded-lg'>
        {!importedCsvData?.length && <>
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
              <p onClick={handleImportModal} className='cursor-pointer text-[#fea013] text-md'>Import Team</p>
            </div>
          </div>
        </>}

        <div className={importedCsvData.length ? "h-[83vh] pl-3" : "hidden"} style={{ overflowY: 'scroll' }}>
          {importedCsvData?.map((data, index) =>
            <div key={index} className="grid grid-cols-9 gap-2 table-container pt-5">
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
                <p onClick={(event) => handleOpenActionButton(event, data)} className='cursor-pointer  action-button'><BsThreeDots className='text-xl' /></p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* --- data import Modal ---  */}
      <DataImportModal importModalOpen={importModalOpen} setImportModalOpen={setImportModalOpen} />

      {/* --- Player Edit Modal ---  */}
      <EditPlayerModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} singlePlayer={singlePlayerData} />

      {/* --- Player Delete Modal ---  */}
      <DeletePlayerModal deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} singlePlayer={singlePlayerData} />

      {/* --- action button popover ---  */}
      <Popover
        id={id} open={open} anchorEl={anchorEl} onClose={handleCloseActionButton}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >

        <div className='bg-[#2d2d2d] w-[300px] h-100% px-5 py-3 shadow-16'>
          <div className="flex items-center justify-between">
            <h2 className='text-white text-2xl font-bold mb-5'>Actions</h2>
            <AiOutlineClose onClick={handleCloseActionButton} className='text-xl text-white cursor-pointer' />
          </div>

          <div onClick={handleEditModal} className="flex items-center gap-2 cursor-pointer">
            <MdEdit className='text-2xl text-[#cbcbcb]' />
            <h2 className='text-lg text-[#cbcbcb]'>Edit Player</h2>
          </div>
          <div onClick={handleDeleteModal} className="flex items-center gap-2 cursor-pointer mt-3">
            <MdDelete className='text-2xl text-[#cbcbcb]' />
            <h2 className='text-lg text-[#cbcbcb]'>Delete Player</h2>
          </div>
        </div>

      </Popover>

    </div>
  );
};

export default PlayersTable;