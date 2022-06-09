import React from 'react';
import { useSelector } from 'react-redux';


const PlayerDetails = () => {
    const { editPlayerData, importedCsvData } = useSelector((state) => state.roster)
    console.log(importedCsvData)
    console.log(editPlayerData)
    return (
        <div className='px-[2vw]'>
            <div className='mb-5 flex items-center justify-between pt-[2vw]'>
                <div className="text-left">
                    <p className='text-[#fea013] text-sm'>Formation Overview</p>
                    <h2 className='text-white font-bold text-2xl'>My Team</h2>
                </div>
            </div>

            <div className='bg-[#2d2d2d] text-[#cbcbcb] min-h-[85vh] rounded-lg grid grid-cols-4 gap-5 p-5'>
                <h2 className="text-white text-3xl">{importedCsvData?.length}</h2>
            </div>
        </div>
    );
};

export default PlayerDetails;