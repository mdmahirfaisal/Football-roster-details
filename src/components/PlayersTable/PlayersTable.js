import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { GrFormClose } from 'react-icons/gr';

const PlayersTable = () => {
    const [searchText, setSearchText] = useState("");

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
                    {/* <p className="border border-[#3f3f3f] bg-[#fea013] text-white rounded-md p-2">Import Team</p> */}
                    <p className="border border-[#3f3f3f] bg-[#1c1c1c] text-gray-400 rounded-md p-2">Re-Import Team</p>

                </div>

            </div>

            <div className='bg-[#2d2d2d] text-[#cbcbcb] min-h-[85vh] rounded-lg'>
                <h2 className='text-white text-4xl'>This is players table</h2>
            </div>
        </div>
    );
};

export default PlayersTable;