// import logo from './logo.svg';
// import './App.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Campaign from './Pages/Campaign';
import CreateGroup from './Pages/CreateGroup';
import Initiate_campaign from './Pages/Initiate-campaign';
import Idea from './Pages/idea';
import Vote from './Pages/votes';
// import SignUp from './Pages/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          {/* <Route path='/signup' element={<SignUp/>}></Route> */}
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/campaign' element={<Campaign/>}></Route>
          <Route path='/create-group' element={<CreateGroup/>}></Route>
          <Route path='/initiate-campaign' element={<Initiate_campaign/>}></Route>
          <Route path='/post-idea' element={<Idea/>}></Route>
          <Route path='/vote' element={<Vote/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
