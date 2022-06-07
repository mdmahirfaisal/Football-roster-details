import React, { useEffect, useState } from 'react';
import { handleLoadCSVData } from '../../redux/slices/footballTeam';
import { useCSVReader } from 'react-papaparse';
import './PlayersTable.css';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';



const DataImportModal = ({ importModalOpen, setImportModalOpen, setAllRosterData }) => {
    const dispatch = useDispatch();
    const handleImportModalClose = () => setImportModalOpen(false);
    const { CSVReader } = useCSVReader();

    return (
        <div>
            <Modal
                open={importModalOpen}
                onClose={handleImportModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] outline-none min-h-[80%] mx-auto min-w-[80%] md:min-w-[65vw] md:min-h-[700px] bg-[#2d2d2d] rounded-lg shadow-5 p-5 '>
                    {/* --- Modal Header --- */}
                    <div className='flex items-center justify-between border-b-2 border-[#3f3f3f] pb-2 mb-3'>
                        <h2 className='text-xl md:text-2xl font-semibold text-white'>Importer</h2>
                        <h2 onClick={handleImportModalClose} className='hover:bg-gray-700 transition-all duration-400 cursor-pointer rounded-[50%] p-2'><AiOutlineClose className="text-white text-xl " /></h2>
                    </div>

                    {/* --- Modal Body --- */}

                    <div className="">
                        <p className='text-white'>Roster</p>

                        <CSVReader
                            onUploadAccepted={(results) => {
                                dispatch(handleLoadCSVData(results.data))
                                // console.table(results.data);
                                setAllRosterData(results.data);

                            }}
                        >
                            {({
                                getRootProps,
                                acceptedFile,
                                ProgressBar,
                                getRemoveFileProps,
                            }) => (
                                <>
                                    {/* -------- Custom Uploader input style --------- */}
                                    <div className=" flex items-center justify-between w-[350px] border-2 rounded-md h-14 border-[#3f3f3f] mt-2">
                                        <p className='pl-2 text-gray-400 cursor-pointer'>{acceptedFile ? acceptedFile.name : "No file selected"}</p>

                                        <p {...getRootProps()} className='text-gray-400 cursor-pointer border-l-2 py-4 rounded-xl px-5 border-[#3f3f3f]'>Select File</p>
                                    </div>
                                    <ProgressBar style={{ backgroundColor: 'white' }} />
                                </>
                            )}
                        </CSVReader>


                    </div>

                    <p className="border border-[#3f3f3f] bg-[#fea013] text-white rounded-md py-2 px-5 cursor-pointer right-3 fixed right-5 bottom-5">Import</p>
                </div>
            </Modal>
        </div>
    );
};

export default DataImportModal;