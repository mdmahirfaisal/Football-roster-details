import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import { FiChevronDown } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import CountriesList from './CountriesList';
import { useForm } from "react-hook-form";
import { handleEditPlayerData } from '../../redux/slices/rosterSlice'


// input field class name 
const inputFieldClassName = "text-[#cbcbcb] w-full bg-[#2d2d2d] border-2 rounded-lg px-2 py-3 mt-1 border-[#3f3f3f] focus:outline-none";
const inputLabelClassName = "text-white";
const selectFieldClassName = "relative form-select appearance-none w-full mt-1 px-2 py-3 text-base font-normal text-[#cbcbcb] bg-[#2d2d2d] bg-clip-padding bg-no-repeat border-2 border-[#3f3f3f] rounded-lg focus:outline-none";

const EditPlayerModal = ({ editModalOpen, setEditModalOpen, singlePlayer }) => {
    const handleEditModalClose = () => setEditModalOpen(false);
    const { register, handleSubmit, } = useForm();
    const dispatch = useDispatch()

    /// radio button  control
    const [radioCheckedValue, setRadioCheckedValue] = useState("No")
    const handleStarterRadio = e => {
        setRadioCheckedValue(e.target.value)
        console.log(e.target.name)
        console.log(e.target.value)
    }

    const onSubmit = data => {
        console.log(data)
        dispatch(handleEditPlayerData(data))
        setEditModalOpen(false);
    };

    let nationalityDefaultValue = singlePlayer[6];
    let positionDefaultValue = singlePlayer[3];

    return (
        <div>
            <Modal
                open={editModalOpen}
                onClose={handleEditModalClose}

            >
                <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] outline-none min-h-[70%] mx-auto min-w-[500px] md:min-w-[600px] md:min-h-[700px] bg-[#2d2d2d] rounded-lg shadow-5 p-5 '>
                    {/* --- Modal Header --- */}
                    <div className='flex items-center justify-between border-b-2 border-[#3f3f3f] pb-2 mb-3'>
                        <h2 className='text-xl md:text-2xl font-semibold text-white'>Edit Player</h2>
                        <h2 onClick={handleEditModalClose} className='hover:bg-gray-700 transition-all duration-400 cursor-pointer rounded-[50%] p-2'><AiOutlineClose className="text-white text-xl " /></h2>
                    </div>

                    {/* --- Modal Body --- */}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-5 gap-4 mb-4">
                            <div className='col-span-3'>
                                <p className={inputLabelClassName}>Player Name</p>
                                <input {...register("playerName")} className={inputFieldClassName} type="text" defaultValue={singlePlayer[0]} required />
                            </div>
                            <div className="col-span-2">
                                <p className={inputLabelClassName}>Jersey Number</p>
                                <input {...register("jerseyNumber")} className={inputFieldClassName} type="text" defaultValue={singlePlayer[2]} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className={inputLabelClassName}>Height</p>
                                <input {...register("height")} className={inputFieldClassName} type="text" defaultValue={singlePlayer[4]} required />
                            </div>
                            <div>
                                <p className={inputLabelClassName}>Weight</p>
                                <input {...register("weight")} className={inputFieldClassName} type="text" defaultValue={singlePlayer[5]} required />
                            </div>
                        </div>

                        <div className='mb-4 relative'>
                            <p className={inputLabelClassName}>Nationality</p>
                            <select {...register("nationality")} defaultValue={nationalityDefaultValue} className={selectFieldClassName} required>
                                <option selected>{singlePlayer[6]}</option>
                                {CountriesList.map((country, i) => <option key={i} value={country.name}>{country.name}</option>)}

                            </select>
                            <FiChevronDown className='text-[#cbcbcb] text-xl absolute right-5 top-12' />
                        </div>

                        <div className='mb-4 relative'>
                            <p className={inputLabelClassName}>Position</p>
                            <select {...register("position")} defaultValue={positionDefaultValue} className={selectFieldClassName} required>
                                <option value="Midfielder">Midfielder</option>
                                <option value="Forward">Forward</option>
                                <option value="Defender">Defender</option>
                                <option value="Goalkeeper">Goalkeeper</option>
                            </select>
                            <FiChevronDown className='text-[#cbcbcb] text-xl absolute right-5 top-12' />
                        </div>

                        <div className='w-[50%]'>
                            <p className="text-white text-lg">Starter</p>
                            <div className='flex items-center gap-10 mt-4'>
                                <div className="flex items-center">
                                    <input onChange={handleStarterRadio} defaultChecked id="default-radio-1" type="radio" value="No" name="Starter" className="" />
                                    <label htmlFor="default-radio-1" className="ml-2 font-medium text-lg text-[#cbcbcb] cursor-pointer p-2 w-[60px] text-left">No</label>
                                </div>
                                <div className="flex items-center">
                                    <input onChange={handleStarterRadio} id="default-radio-2" type="radio" value="Yes" name="Starter" className="" />
                                    <label htmlFor="default-radio-2" className="ml-2  font-medium text-lg text-[#cbcbcb] cursor-pointer p-2 w-[60px] text-left ">Yes</label>
                                </div>
                            </div>
                        </div>



                        {radioCheckedValue === "Yes" ? <button type='submit' className="border border-[#3f3f3f] bg-[#fea013] text-white rounded-md py-2 px-5 cursor-pointer right-3 fixed right-5 bottom-5 hover:bg-red-500 transition-all duration-200 ">Edit Player</button> :
                            <p className="text-gray-400 cursor-default right-3 fixed right-5 bottom-5">Edit Player</p>}
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default EditPlayerModal;