import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sejong from './Sejong.png';
import logo from './MainLogo.png';
import bottom from './Bottom.png';
import light from './Light.png';
import arrow from './Arrow.png';
import './Home.css';
import axios from 'axios' // npm install --save axios
// npm install --save xml-js

let APP_KEY = "80BDA3A34160D126F3FB4094CBE073EF"

export default function Home() {
  const [word, setWord] = useState(null)
  const convert = require('xml-js');

  const checkWord = (e) => {
    e.preventDefault(); 
    console.log(word)
    axios.get('https://cors-anywhere.herokuapp.com/' + `https://krdict.korean.go.kr/api/search?certkey_no=1154&key=80BDA3A34160D126F3FB4094CBE073EF&type_search=search&method=WORD_INFO&part=word&q=${word}&sort=dict`, {
      // function body 
    })
    .then(response => {
      // console.log(response.data)
      const result = convert.xml2json(response.data, {compact: true, spaces: 4}); // compact: bool
      return JSON.parse(result)
      // console.log(JSON.parse(result));
    })
    .then(response => {
      // console.log(response.channel.item)
      response.channel.item ? console.log("PASS") : console.log("WRONG")
    })
  }
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   var title = this.title;
  //   console.log(title);
  // }

  return (
    <div className="background">  
        <div> 
          <div className ="rank">
            <Link exact to="/Rank">
              <img src = {sejong} className="sejong" alt="명예의 전당"/>
            </Link>
          </div>
          <form onSubmit={checkWord}>
            <label style={{ color: "white" }}> 단어를 입력하세요: </label> 
              <input type="text" name="name" onChange={(e) => {setWord(e.target.value)}}/>
              <input type="submit" value="Submit" />
          </form>
          <div>
            <img src={logo} className="main-logo" alt="로고"/>
          </div>
          <div>
            <img src={bottom} className="bottom" alt="바닥"/>
          </div>
          <div>
            <img src={light} className="light1" alt="빛"/>
            <img src={light} className="light2" alt="빛"/>
            <img src={light} className="light3" alt="빛"/>
            <img src={light} className="light4" alt="빛"/>
            <img src={light} className="light5" alt="빛"/>
          </div>
          <div>
            <button className="start" alt="시작">
              <div className="button-text">
                동전 넣기
              </div>
              <img src={arrow} className="arrow" alt="화살표"/>
            </button>
          </div>
        </div>
    </div>
  );
}