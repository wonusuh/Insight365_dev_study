// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  // let post = `강남 우동 맛집`;
  let [a, b] = useState(`남자 코트 추천`);

  return (
    <div className="App">
      <div className="blackNav">
        <h4 style={{ color: 'red', fontSize: `16px` }}>블로그임</h4>
      </div>
      <div className='list'>
        <h4>글제목</h4>
        <p>2월 17일 발행</p>
      </div>
    </div>

  );
}

export default App;
