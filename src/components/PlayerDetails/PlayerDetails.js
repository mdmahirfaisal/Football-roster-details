import React, { useEffect, useState } from 'react';
import './PlayerDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import PlayerPositionDetails from './PlayerPositionDetails';
import { handleFormationMissingData } from '../../redux/slices/rosterSlice';
import WarningModal from './DataWarningModal/WarningModal';
import PlayerDetailsCard from './PlayerDetailsCard/PlayerDetailsCard';


const PlayerDetails = ({ editableTeamNameControl }) => {
    const { importedCsvData, formationMissingData } = useSelector((state) => state.roster)
    const dispatch = useDispatch()

    // Warning modal control
    const [warningModalOpen, setWarningModalOpen] = useState(false)

    const handleWarningModalOpen = () => setWarningModalOpen(true)

    const handleWarningModalClose = () => setWarningModalOpen(false)

    // formation data filter 
    const goalkeeperData = importedCsvData?.filter(goal => (goal[3] === "Goalkeeper" && goal[8] === "Yes"))
    const defenderData = importedCsvData?.filter(goal => (goal[3] === "Defender" && goal[8] === "Yes"))
    const midFielderData = importedCsvData?.filter(goal => (goal[3] === "Midfielder" && goal[8] === "Yes"))
    const forwardData = importedCsvData?.filter(goal => (goal[3] === "Forward" && goal[8] === "Yes"))

    // formation data is filed check
    useEffect(() => {
        if (goalkeeperData.length > 0 && defenderData.length > 3 && midFielderData.length > 2 && forwardData.length > 2) {
            dispatch(handleFormationMissingData(false))
            // dispatch(handleFormationSelectedData(goalkeeperData[0]));
        }

    }, [dispatch, importedCsvData, goalkeeperData, defenderData, midFielderData, forwardData])

    // check formation data are field 4-3-3
    useEffect(() => {
        if (goalkeeperData.length < 1 || defenderData.length < 4 || midFielderData.length < 3 || forwardData.length < 3) {
            dispatch(handleFormationMissingData(true))
        }

    }, [dispatch, importedCsvData, goalkeeperData, defenderData, midFielderData, forwardData])

    // no data found message in formation view message
    useEffect(() => {
        if (!importedCsvData.length) {
            handleWarningModalOpen()
        }
    }, [importedCsvData])

    // required 4-3-3 data in formation view message
    useEffect(() => {
        if (importedCsvData.length && formationMissingData) {
            handleWarningModalOpen()
        }
    }, [importedCsvData.length, formationMissingData])

    // required 4-3-3 message close
    useEffect(() => {
        if (importedCsvData.length && !formationMissingData) {
            handleWarningModalClose()
        }
    }, [importedCsvData.length, formationMissingData])

    return (
        <div className='px-[2vw]'>
            <div className='mb-5 flex items-center justify-between pt-[2vw]'>
                <div className="text-left">
                    <p className='text-[#fea013] text-sm'>Formation Overview</p>
                    {editableTeamNameControl}
                </div>
            </div>

            <div className='bg-[#2d2d2d] text-[#cbcbcb] min-h-[85vh] rounded-lg flex  p-6' style={{ overflowX: "scroll" }}>
                <div id='footballGround' className="relative col-span-7 bg-green-500 w-[70%] min-w-[900px rounded-lg grid place-center p-5">
                    <div className="border border-gray-400 flex items-center justify-between">
                        {/* --- Left goal post --- */}
                        <div className="border border-gray-400 w-[20%] h-[80%] border-l-0 flex flex-col items-start justify-center">
                            <div className="border border-l-0 border-gray-400 w-[40%] h-[40%]"> </div>
                        </div>
                        {/* --- field center --- */}
                        <div className="border border-gray-400 w-[100px] md:w-[150px] lg:w-[180px] h-[100px] md:h-[150px] lg:h-[180px] rounded-[50%]"> </div>
                        <div className="absolute top-5 left-[50%] border-l border-gray-400  h-[94.5%]"> </div>

                        {/* --- right goal post --- */}
                        <div className="border border-gray-400 w-[20%] h-[80%] border-r-0 flex flex-col items-end justify-center">
                            <div className="border border-r-0 border-gray-400 w-[40%] h-[40%]"> </div>
                        </div>


                        {!formationMissingData && <>
                            {/* ----- Players info goalkeeper ----- */}
                            <div className="absolute top-[48%] bottom-[48%] left-[1%] ">
                                <PlayerPositionDetails playerData={goalkeeperData.slice(0, 1)} />
                            </div>
                            {/* ----- Players info defender ----- */}
                            <div className="absolute top-[7%] left-[20%] flex flex-col justify-between items-center h-[88%]">
                                <PlayerPositionDetails playerData={defenderData.slice(0, 4)} />
                            </div>
                            {/* ----- Players info midfielder ----- */}
                            <div className="absolute top-[14.7%] left-[40%] right-[40%] flex flex-col justify-between items-center h-[74%]">
                                <PlayerPositionDetails playerData={midFielderData.slice(0, 3)} />
                            </div>
                            {/* ----- Players info forward ----- */}
                            <div className="absolute top-[19%] right-[20%] flex flex-col justify-between items-center h-[67%]">
                                <PlayerPositionDetails playerData={forwardData.slice(0, 3)} />
                            </div>
                        </>}

                    </div>
                </div>

                {/* ----- Player details card -----  */}
                <div className="relative col-span-3 ml-6 bg-[#222222] w-[28%] min-w-[320px rounded-lg">
                    {/* --- border --- */}
                    <p className="w-[90%] left-[5%] right-[5%] absolute top-[65%] border-t-2 border-[#3f3f3f]"></p>
                    {!formationMissingData &&
                        <PlayerDetailsCard />
                    }
                </div>

                <WarningModal warningModalOpen={warningModalOpen} handleWarningModalClose={handleWarningModalClose} />
            </div>
        </div>
    );
};

export default PlayerDetails;