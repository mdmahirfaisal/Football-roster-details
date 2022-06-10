import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import PlayersTable from './components/PlayersTable/PlayersTable';
import PlayerDetails from './components/PlayerDetails/PlayerDetails';
import { MdEdit } from 'react-icons/md';
import ContentEditable from 'react-contenteditable';

// Yellow = #fea013
// border = #3f3f3f
// table text= #cbcbcb
// table bg = #2d2d2d
// 
// #grad1 {
//   height: 370px;
//   width: 500px;
//   background-image: radial-gradient(rgb(57 168 75), #2c7e39,#287334);
// }
// <input type="file" accept=".js, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />

function App() {
  //// Team Name control //// 
  const [contentHtml, setContentHtml] = useState("My Team")
  const [isTeamNameEdited, setIsTeamNameEdited] = useState(false)
  const [isTeamNameHover, setIsTeamNameHover] = useState(false)

  useEffect(() => {
    if (contentHtml !== "My Team") {
      setIsTeamNameEdited(true)
    }
    else {
      setIsTeamNameEdited(false)
    }
  }, [contentHtml])

  const handleTeamNameMouseOver = (e) => {
    setIsTeamNameHover(true)
  }
  const handleTeamNameMouseOut = (e) => {
    setIsTeamNameHover(false)
  }

  const editableTeamNameControl = <div onMouseEnter={handleTeamNameMouseOver} onMouseOut={handleTeamNameMouseOut} className='editableTeamName flex items-center gap-3 text-white cursor-pointer'>
    <ContentEditable
      html={contentHtml} // innerHTML of the editable div
      disabled={false} // use true to disable edition
      onChange={(e) => setContentHtml(e.target.value)} // handle innerHTML change
    />
    {isTeamNameEdited ? null : <MdEdit className='text-2xl' />}
    {(isTeamNameEdited && isTeamNameHover) && <MdEdit className='text-2xl' />}
  </div>



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path='/table' element={<PlayersTable editableTeamNameControl={editableTeamNameControl} />} />
            <Route path='/roster' element={<PlayerDetails editableTeamNameControl={editableTeamNameControl} />} />
            <Route path='/' element={<PlayersTable editableTeamNameControl={editableTeamNameControl} />} />
          </Route>
          <Route exact path="/" element={<PlayersTable editableTeamNameControl={editableTeamNameControl} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
