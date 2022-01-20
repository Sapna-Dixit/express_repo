import './App.css';
import Registration from './Registration';
import ShowData from './ShowData';
import Navigation from './Navigation';
import {Routes, Route} from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <div className="App">
      
      <Navigation />
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path ="/register" element={<Registration />}></Route>
          <Route path = "/showdata" element={<ShowData />}></Route>
        </Routes>
    </div>
  );
}

export default App;
