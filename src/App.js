import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import PlayersTable from './components/PlayersTable/PlayersTable';
import PlayerDetails from './components/PlayerDetails/PlayerDetails';

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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path='/table' element={<PlayersTable />} />
          <Route path='/roster' element={<PlayerDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
