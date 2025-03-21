import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Details from './component/Adddetails';
import Visualize from './component/Fetchdata';
import Updater from './component/Edituser';
import Searcher from './component/Search';
import Chart from './component/Grantchart';
import Updater1 from './component/Edituser1';
import Navigation from './component/Navigation';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/details/:resoursename" element={<Details />} />
          <Route path="/show"  element={<Visualize />} />
          <Route path="/edituser/:resoursename" element={<Updater />} />
          <Route path="/serch"  element={<Searcher />} />     
          <Route path="/chart"  element={<Chart />} />
          <Route path="/edituser1/:resoursename"  element={<Updater1 />} />
          <Route path="/navigation"  element={<Navigation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
