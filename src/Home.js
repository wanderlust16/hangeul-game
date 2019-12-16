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

  const randomChosung = (n) => {
    let consonantList = ["ㄱ", "ㄴ","ㄷ","ㄹ","ㅁ","ㅂ", "ㅅ", "ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
    const shuffleConsonants = shuffle(consonantList);
    console.log(shuffleConsonants);
    // const rdm = Math.floor(Math.random() * shuffleConsonants.length)
    const consonants = shuffleConsonants.slice(0, 2)
    console.log(consonants)
    document.getElementById('consonant').innerHTML = consonants.join("")
  }

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  useEffect(() => {
    console.log("set new chosung")
    randomChosung(2)  
  }, [])

  return (
    <div className="background">  
        <div> 
          <div className ="rank">
            <Link exact to="/Rank">
              <img src = {sejong} className="sejong" alt="명예의 전당"/>
            </Link>
          </div>
          <span id="consonant" style={{ border: "2px solid white", width: "500px", backgroundColor: "white" }}>ㅎㅁㅈㅇ</span> 
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