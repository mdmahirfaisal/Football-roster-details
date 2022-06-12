import React, { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import ContentEditable from 'react-contenteditable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import PlayersTable from './components/PlayersTable/PlayersTable';
import PlayerDetails from './components/PlayerDetails/PlayerDetails';
// Yellow = #fea013
// border = #3f3f3f
// table text= #cbcbcb
// table bg = #2d2d2d
// 

function App() {

  //// editable Team Name control //// 
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
