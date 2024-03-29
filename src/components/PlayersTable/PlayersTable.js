import React, { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import DataImportModal from './DataImportModal';
import { Popover } from '@mui/material';
import EditPlayerModal from './EditPlayerModal';
import { useSelector, useDispatch } from 'react-redux';
import DeletePlayerModal from './DeletePlayerModal';
import { handleSearchByPlayerName, handleRemoveSearch, handleGetCsvData } from '../../redux/slices/rosterSlice';


const PlayersTable = ({ editableTeamNameControl }) => {
  const { importedCsvData, searchResultData } = useSelector((state) => state.roster)
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState("");

  // data import modal 
  const [importModalOpen, setImportModalOpen] = useState(false);
  const handleImportModal = () => setImportModalOpen(true);
  // re import modal
  const handleReImportModal = () => {
    dispatch(handleGetCsvData([]))
    setImportModalOpen(true)
  };

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

  /// Handle search filter name or position
  const handlePlayerSearch = (e) => {
    e.preventDefault();
    if (searchText === "") dispatch(handleRemoveSearch())
    else { dispatch(handleSearchByPlayerName(searchText)) }
  }

  /// handle remove search filter
  const escFunction = (event) => {
    if (event.key === "Escape") {
      dispatch(handleRemoveSearch())
    }
  }
  useEffect(() => {
    if (searchResultData.length) {
      document.addEventListener("keydown", escFunction, false);
    }
  }, [searchResultData.length])

  const handleRemoveSearchResult = e => {
    dispatch(handleRemoveSearch())
  }

  // handle display data;
  const [displayData, setDisplayData] = useState([]);
  useEffect(() => {
    if (!searchResultData.length) {
      setDisplayData(importedCsvData);
    }
    else {
      setDisplayData(searchResultData);
    }
  }, [importedCsvData, searchResultData])


  return (
    <div className='px-[2vw]'>
      <div className='mb-5 pt-[2vw] flex items-center justify-between'>
        <div className="text-left">
          <p className='text-[#fea013] text-sm'>Roster Details</p>
          {editableTeamNameControl}
        </div>
        {/* ---- Search Field ---- */}
        <div className="flex items-center justify-center gap-2">
          <form onSubmit={handlePlayerSearch} className="relative flex items-center gap-[2px] border border-[#3f3f3f] rounded-md p-2 w-[250px]">
            <BiSearch className='text-gray-400 mt-[2px] text-xl' />
            <input type="text" placeholder='Find Player' onChange={(e) => setSearchText(e.target.value)} className='w-[150px] border-0 focus:outline-0 text-white bg-[#222] text-gray-400 ' />
            {(searchText && importedCsvData?.length && !searchResultData.length) ? <button type="submit" className='text-[#fea013] ml-2 cursor-pointer'>Search</button> : searchResultData.length ? <AiOutlineClose onClick={handleRemoveSearchResult} className='text-[#cbcbcb] ml-auto mr-1 text-lg cursor-pointer' /> : null}
          </form>

          {!importedCsvData?.length ? <p onClick={handleImportModal} className="border border-[#3f3f3f] bg-[#fea013] hover:bg-red-500 transition-all duration-200 text-white rounded-md p-2 cursor-pointer">Import Team</p>
            : <p onClick={handleReImportModal} className="border border-[#3f3f3f] bg-[#222] text-gray-400 rounded-md p-2 cursor-pointer">Re-Import Team</p>}

        </div>
      </div>
      {/* ----- Table Header ----- */}
      <div className='bg-[#2d2d2d] text-[#cbcbcb] min-h-[85vh] rounded-lg'>
        <div className={importedCsvData[0] ? "grid grid-cols-9 gap-2 table-container pt-5 pb-2" : "flex items-center justify-evenly pt-5 "}>
          <p className='text-[#cbcbcb] text-md'>Player Name</p>
          <p className='text-[#cbcbcb] text-md'>Jersey Number</p>
          <p className='text-[#cbcbcb] text-md'>Starter</p>
          <p className='text-[#cbcbcb] text-md'>Position</p>
          <p className='text-[#cbcbcb] text-md'>Height</p>
          <p className='text-[#cbcbcb] text-md'>Weight</p>
          <p className='text-[#cbcbcb] text-md'>Nationality</p>
          {importedCsvData[0] && <>
            <p className='text-[#cbcbcb] text-md'>Appearances</p>
            <p className='text-[#cbcbcb] text-md'>Minutes Played</p>
          </>}
        </div>

        {/* ---- display center import button ---- */}
        {!importedCsvData?.length && <>
          <div className="min-h-[600px] grid grid-cols-1  content-center">
            <div className='self-center'>
              <p className='text-[#cbcbcb] text-md'> You do not have players on the roster</p>
              <p onClick={handleImportModal} className='cursor-pointer text-[#fea013] text-md'>Import Team</p>
            </div>
          </div>
        </>}
        {/* ----- Display table data ------ */}
        <div className={importedCsvData.length ? "h-[79vh] pl-3" : "hidden"} style={{ overflowY: 'scroll' }}>
          {displayData?.map((data, index) =>
            <div key={index} className="grid grid-cols-9 gap-2 pt-5">
              <div className="flex items-center gap-2">
                <img src={data[7]} className="w-6 h-6 rounded-[50%]" alt="" />
                <p className='text-sm'>{data[0]}</p>
              </div>
              <p className='text-sm'>{data[2]}</p>
              <p className='text-sm'>{data[8]}</p>
              <p className='text-sm'>{data[3]}</p>
              <p className='text-sm'>{data[4]}</p>
              <p className='text-sm'>{data[5]}</p>
              <p className='text-sm'>{data[6]}</p>
              <p className='text-sm'>{data[9]}</p>

              <div className="grid grid-cols-2 gap-2 ">
                <p className='text-sm'>{data[10]}</p>

                {/* --- Action button --- */}
                <p onClick={(event) => handleOpenActionButton(event, data)} className='cursor-pointer'><BsThreeDots className='text-xl' /></p>
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