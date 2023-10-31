import './App.css';
import Navbar from './component/Navbar';
import GetRequest from './component/GetRequest';
import { PostRequest } from './component/Postrequest';

function App() {
  return (
    <>
    <Navbar />
    <PostRequest />
    <GetRequest />
    </>
  );
}

export default App;
