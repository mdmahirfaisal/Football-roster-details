import React from 'react';
import { useSelector } from 'react-redux';

const PlayerDetailsCard = () => {

    const { formationSelectedData } = useSelector(state => state.roster);
    console.log(formationSelectedData)
    return (
        <div className='h-full p-5'>
            <div className=" font-bold absolute top-[7%] left-[7%] flex">
                <h2 className="text-5xl text-[#fea013]">{formationSelectedData[2]}</h2>
                <h2 className="text-8xl mt-[-30px] ml-[-20px] text-[#2e2c29]">1</h2>
            </div>

            <div className="relative h-[55%] ">
                <img src={formationSelectedData[1]} className="h-[95%] mx-auto" alt="PlayerImage" />
                <div className="w-full text-left absolute bottom-0 left-0 blur-sm h-24 bg-gradient-to-t from-[#222222] to-[#22222230]" />
                <div className="w-full text-left absolute bottom-5 left-0 ">
                    <h2 className="blur-none text-white text-2xl font-medium"> {formationSelectedData[0]}</h2>
                    <h3 className="blur-none text-lg text-[#fea013] font-medium">{formationSelectedData[3]}</h3>
                </div>

                <div className="shadow grid grid-cols-2 text-left mt-4">
                    <div className="grid grid-cols-2">
                        <div>
                            <p className="text-[13px] mb-1 text-[#cbcbcb]">Height</p>
                            <p className="text-white">{formationSelectedData[4]}</p>
                        </div>
                        <div >
                            <p className="text-[13px] mb-1 text-[#cbcbcb]">weight</p>
                            <p className="text-white">{formationSelectedData[5]}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-[13px] mb-1 text-[#cbcbcb]">Nationality</p>
                        <div className="flex items-center gap-2">
                            <img src={formationSelectedData[7]} className="h-5 w-5 rounded-[50%]" alt="" />
                            <p className="text-white">{formationSelectedData[6]}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* ------------------------- */}

            <div className="grid grid-cols-2 gap-3 text-left absolute top-[70%] w-full">
                <div className="">
                    <h2 className="text-2xl text-[#fea013] font-semibold">{formationSelectedData[9]}</h2>
                    <p className="text-[13px] mb-1 text-[#cbcbcb]">Appearances</p>
                </div>
                <div className="">
                    <h2 className="text-2xl text-[#fea013] font-semibold">{formationSelectedData[10]}</h2>
                    <p className="text-[13px] mb-1 text-[#cbcbcb]">Minutes Played</p>
                </div>
                <div className="">
                    <h2 className="text-2xl text-[#fea013] font-semibold">{formationSelectedData[13]}</h2>
                    <p className="text-[13px] mb-1 text-[#cbcbcb]">Clean sheets</p>
                </div>
                <div className="">
                    <h2 className="text-2xl text-[#fea013] font-semibold">{formationSelectedData[14]}</h2>
                    <p className="text-[13px] mb-1 text-[#cbcbcb]">Saves</p>
                </div>
            </div>
        </div>
    );
};

export default PlayerDetailsCard;