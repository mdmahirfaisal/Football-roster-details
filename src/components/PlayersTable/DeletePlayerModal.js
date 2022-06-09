import React from 'react';
import { Modal } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { handleImportedCsvData } from '../../redux/slices/rosterSlice';

const DeletePlayerModal = ({ deleteModalOpen, setDeleteModalOpen, singlePlayer }) => {
    const handleDeleteModalClose = () => setDeleteModalOpen(false);
    const { importedCsvData } = useSelector((state) => state.roster)
    const dispatch = useDispatch()

    const handleDeletePlayer = () => {
        const deletedPlayer = importedCsvData?.filter(player => player[0] !== singlePlayer[0]);
        dispatch(handleImportedCsvData(deletedPlayer));
        handleDeleteModalClose()
    }
    return (
        <Modal
            open={deleteModalOpen}
            onClose={handleDeleteModalClose}
        >
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] outline-none min-h-[150px] mx-auto min-w-[250px] md:min-w-[400px] md:min-h-[220px] bg-[#2d2d2d] rounded-lg shadow-5 p-5 '>
                {/* --- Modal Header --- */}
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-xl md:text-2xl font-semibold text-white'>Are you sure</h2>
                    <h2 onClick={handleDeleteModalClose} className='hover:bg-gray-700 transition-all duration-400 cursor-pointer rounded-[50%] p-2'><AiOutlineClose className="text-white text-xl " /></h2>
                </div>

                {/* --- Modal Body --- */}
                <h2 className="text-[#cbcbcb] text-lg">This action cannot be undone</h2>

                <div className="flex items-center justify-end mt-12 gap-5">
                    <button onClick={handleDeleteModalClose} className='text-[#cbcbcb] hover:text-white text-lg bg-[#2d2d2d] py-3 px-5 border border-[#3f3f3f] rounded-lg'>Cancel</button>

                    <button onClick={handleDeletePlayer} className='text-white text-lg bg-[#2d2d2d] py-3 px-5 border border-[#3f3f3f] bg-red-500 hover:bg-red-400 rounded-lg'>Delete</button>
                </div>
            </div>
        </Modal>
    );
};

export default DeletePlayerModal;