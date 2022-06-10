import React, { useEffect, useState } from 'react';
import './PlayerDetails.css';
import { useSelector } from 'react-redux';



const PlayerDetails = ({ editableTeamNameControl }) => {
    const { editPlayerData, importedCsvData } = useSelector((state) => state.roster)


    return (
        <div className='px-[2vw]'>
            <div className='mb-5 flex items-center justify-between pt-[2vw]'>
                <div className="text-left">
                    <p className='text-[#fea013] text-sm'>Formation Overview</p>
                    {editableTeamNameControl}
                </div>
            </div>

            <div className='bg-[#2d2d2d] text-[#cbcbcb] min-h-[85vh] rounded-lg grid grid-cols-4 gap-5 p-5'>
                {/* <h2 className="text-white text-3xl">{importedCsvData.length && importedCsvData.length}</h2> */}
            </div>
        </div>
    );
};

export default PlayerDetails;