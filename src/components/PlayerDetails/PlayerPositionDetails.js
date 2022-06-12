import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleFormationSelectedData } from '../../redux/slices/rosterSlice';

const PlayerPositionDetails = ({ playerData }) => {
    const { formationSelectedData } = useSelector(state => state.roster);
    const dispatch = useDispatch()

    /// Set Default active player
    useEffect(() => {
        for (let active of playerData) {
            if (active[3] === "Goalkeeper") {
                dispatch(handleFormationSelectedData(active))
                break
            }
        }
    }, [])

    ///  Set Active player
    const handleActiveStyle = (data) => {
        dispatch(handleFormationSelectedData(data));
    }

    return (<>
        {playerData?.map((data, i) => <div onClick={() => handleActiveStyle(data)} key={i}>
            <p className={formationSelectedData[0] === data[0] ? 'border-2 border-[#fea013] rounded-[50%] mx-auto bg-[#fea013] text-white w-9 h-9 font-bold pt-1' : 'border-2 border-gray-400 rounded-[50%] mx-auto bg-[#222222] w-9 h-9 font-bold pt-1 cursor-pointer'}>{data[2]}</p>
            <p className='text-white cursor-pointer'>{data[0]}</p>
        </div>)}
    </>)
};

export default PlayerPositionDetails;