import React, { useEffect, useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import './PlayersTable.css';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { handleImportedCsvData, handleGetCsvData } from '../../redux/slices/rosterSlice';



const DataImportModal = ({ importModalOpen, setImportModalOpen }) => {
    const { getCsvData } = useSelector((state => state.roster))
    const { CSVReader } = useCSVReader();
    const dispatch = useDispatch();
    const handleImportModalClose = () => setImportModalOpen(false);

    // Modal display summary
    const [totalPlayersCount, setTotalPlayersCount] = useState(null);
    const [goalkeepersCount, setGoalkeepersCount] = useState(null);
    const [defendersCount, setDefendersCount] = useState(null);
    const [midfieldersCount, setMidfieldersCount] = useState(null);
    const [forwardsCount, setForwardsCount] = useState(null);

    useEffect(() => {
        if (getCsvData.length) {
            const player = getCsvData.filter(data => data[0] !== "Player Name")
            setTotalPlayersCount(player);

            const goal = getCsvData.filter(data => data[3] === "Goalkeeper")
            setGoalkeepersCount(goal);

            const defend = getCsvData.filter(data => data[3] === "Defender")
            setDefendersCount(defend);

            const mid = getCsvData.filter(data => data[3] === "Midfielder")
            setMidfieldersCount(mid);

            const forward = getCsvData.filter(data => data[3] === "Forward")
            setForwardsCount(forward);
        }
    }, [getCsvData])

    const handleLoadTableData = () => {
        dispatch(handleImportedCsvData(getCsvData))
        handleImportModalClose()
    }


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
                        <p className='text-white'>Roster File</p>

                        <CSVReader
                            onUploadAccepted={(results) => {
                                dispatch(handleGetCsvData(results.data))
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
                                    <div {...getRootProps()} className=" flex items-center justify-between w-[350px] border-2 rounded-md h-14 border-[#3f3f3f] mt-2 cursor-pointer">
                                        <p className='pl-2 text-gray-400'>{acceptedFile ? acceptedFile.name : "No file selected"}</p>

                                        <p className='text-gray-400 border-l-2 py-4 rounded-xl px-5 border-[#3f3f3f]'>Select File</p>
                                    </div>
                                    <p className="text-gray-400  cursor-default mt-2">File must be in .csv format</p>
                                    {/* <ProgressBar style={{ backgroundColor: 'green' }} /> */}
                                </>
                            )}
                        </CSVReader>

                        {getCsvData[0] && <div className='mt-6'>
                            <p className='text-white mb-4'>File Summary</p>
                            <div className="grid grid-cols-5 gap-2">
                                <div><p className="text-gray-400">Total Players</p>
                                    <p className="text-white font-bold">{totalPlayersCount?.length}</p> </div>

                                <div><p className="text-gray-400">Goalkeepers</p>
                                    <p className="text-white font-bold">{goalkeepersCount?.length}</p> </div>

                                <div><p className="text-gray-400">Defenders</p>
                                    <p className="text-white font-bold">{defendersCount?.length}</p> </div>

                                <div><p className="text-gray-400">Midfielders</p>
                                    <p className="text-white font-bold">{midfieldersCount?.length}</p> </div>

                                <div><p className="text-gray-400">Forwards</p>
                                    <p className="text-white font-bold">{forwardsCount?.length}</p> </div>
                            </div>
                        </div>}
                    </div>

                    {getCsvData.length ? <p onClick={handleLoadTableData} className="border border-[#3f3f3f] bg-[#fea013] text-white rounded-md py-2 px-5 cursor-pointer right-3 fixed right-5 bottom-5 hover:bg-red-500 transition-all duration-200">Import</p> : <p className="text-gray-400 cursor-default right-3 fixed right-5 bottom-5">Import</p>}
                </div>
            </Modal>
        </div>
    );
};

export default DataImportModal;