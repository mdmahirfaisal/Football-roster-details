import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { IoIosWarning } from 'react-icons/io';
import { useSelector } from 'react-redux';

const WarningModal = ({ warningModalOpen, handleWarningModalClose }) => {
    const { importedCsvData, formationMissingData } = useSelector((state => state.roster))
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (!importedCsvData.length) {
            setMessage({ title: "No player data found", desc: "Please importer your roster first" })
        }
    }, [importedCsvData, formationMissingData])

    useEffect(() => {
        if (importedCsvData.length && formationMissingData) {
            setMessage({ title: "Not enough starters", desc: "Your team doesn't have enough starters for one or more of positions in the 4-3-3 formation" })
        }
    }, [importedCsvData, formationMissingData])

    return (
        <div>
            <Modal open={warningModalOpen} onClose={handleWarningModalClose}

            >
                <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] outline-none mx-auto min-w-[350px] max-w-[450px] bg-[#2d2d2d] rounded-lg shadow-5 p-5'>

                    {/* --- Title --- */}
                    <div className="flex items-center gap-2 text-xl text-white font-bold justify-center mb-3">
                        <IoIosWarning className="text-[#fea013] text-2xl" />
                        <h2>{message.title}</h2>
                    </div>

                    <p className="text-[#cbcbcb] text-center text-">{message.desc}</p>

                </div>
            </Modal>
        </div>
    );
};

export default WarningModal;