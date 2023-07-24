// import logo from './logo.svg';
// import './App.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Campaign from './Pages/Campaign';
import CreateGroup from './Pages/CreateGroup';
import Initiate_campaign from './Pages/Initiate-campaign';
import Mnidea from './Pages/mnidea';
import Idea from './Pages/idea';
import Vote from './Pages/votes';
import Manage from './Pages/Manage';
import IdeaDetails from './Pages/IdeaDetails';
import Ideation from './Pages/Ideation';
import Voting from './Pages/Voting';
import Management from './Pages/Management';
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
          <Route path='/management' element={<Manage/>}></Route>
          <Route path="/idea-content/:ideaId" element={<IdeaDetails/>}></Route>
          <Route path='/ideation' element={<Ideation/>}></Route>
          <Route path='/voting' element={<Voting/>}></Route>
          <Route path='/manage' element={<Management/>}></Route>
          <Route path='/all-ideas' element={<Mnidea/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
