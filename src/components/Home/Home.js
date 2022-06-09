import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoIosPeople } from 'react-icons/io';
import { Link, NavLink, Outlet } from 'react-router-dom';
import footballLogo from './football-removebg-preview-removebg-preview.png';

const Home = () => {


    return (
        <div className='grid grid-cols-12'>
            <div className="col-span-1 h-[100vh] bg-[#111111] text-white">
                <div className="flex items-center flex-col">
                    <div className="border-2 border-[#fea013] rounded-[50%] my-5">
                        <Link to="/">
                            <img className='w-6 md:h-[3vw] h-6 md:w-[3vw] ' src={footballLogo} alt="Football" />
                        </Link>

                    </div>

                    <NavLink
                        to="/table"
                        className={({ isActive }) =>
                            isActive ? "text-[#fea013]" : "text-[#6a573a]"
                        }
                    >
                        <AiOutlineMenu className=' text-xl md:text-[2vw] font-bold my-5' />
                    </NavLink>
                    <NavLink
                        to="/roster"
                        className={({ isActive }) =>
                            isActive ? "text-[#fea013]" : "text-[#6a573a]"
                        }
                    >
                        <IoIosPeople className=' text-xl md:text-[2vw] font-bold my-5' />
                    </NavLink>
                </div>
            </div>

            {/* ------- Main Container ------- */}

            <div className="col-span-11 min-h-[100vh] bg-[#1c1c1c]">
                <Outlet />
            </div>
        </div>
    );
};

export default Home;