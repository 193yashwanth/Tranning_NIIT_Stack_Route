import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [myData,setMyData] = useState([]);
  return (
    useEffect(() =>{
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => setMyData(res.data));
    })
  );
  return (
    <>
    <h1>axios start</h1>
    {myData.map((post)=> {
      const {id,name} = post;
      return (
        <div className='card' key={id} >
          <h1>{name}</h1>
        </div>
      )
    })}
    </>
  )
}

export default App;
