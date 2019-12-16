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

  const timer = (sec) => {
    let timer = document.getElementById("timer")
    timer.innerHTML = sec
    setInterval(() => {      
      timer.innerHTML -= 1;
    }, 1000)
  }

  const checkWord = (e) => {
    e.preventDefault(); 
    document.getElementById("wordBox").value = ""
    let inputConsonant = checkChosung(word);
    let consonant = document.getElementById('consonant').innerHTML
    if (inputConsonant === consonant) { // 자음이 일치하면, 사전등록단어인지 체크
      console.log("자음 일치!") 
      // CORS 해결 방법 변경
      axios.get('https://cors-anywhere.herokuapp.com/' + `https://krdict.korean.go.kr/api/search?certkey_no=1154&key=${APP_KEY}&type_search=search&method=WORD_INFO&part=word&q=${word}&sort=dict`, {
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
        if (response.channel.item) { // 사전 등재 단어라면
          console.log("PASS") // PASS
          if ((response.channel.item).length > 1) {
            if ((response.channel.item[0].sense).length > 1) {
              console.log(response.channel.item[0].sense[0].definition._text)
            }
            else {
              console.log(response.channel.item[0].sense.definition._text)
            }
          } else if ((response.channel.item).length === 1) {
              console.log(response.channel.item.sense.definition._text)
          } else {
              console.log("오, 이런 어려운 단어도 알다니! 아주 칭찬해~")
          }
        } else { // 사전 등재 단어가 아니라면
          console.log("WRONG")
        }
      })
    } else { // 자음이 일치하지 않는다면
      console.log("자음 불일치!") 
    }
  }

  const randomChosung = (n) => {
    let consonantList = ["ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ", "ㅅ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
    const shuffleConsonants = shuffle(consonantList);
    console.log(shuffleConsonants);
    // const rdm = Math.floor(Math.random() * shuffleConsonants.length)
    const consonants = shuffleConsonants.slice(0, n).join("")
    // console.log(consonants)
    document.getElementById('consonant').innerHTML = consonants
  }

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // useEffect 잘 모름
  useEffect(() => {
    console.log("set new chosung")
    randomChosung(2)  
    timer(60)
  }, [])

  const checkChosung = (str) => {
    let cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
    let result = "";
    for(let i=0; i<str.length; i++) {
      let code = str.charCodeAt(i)-44032;
      if(code>-1 && code<11172) result += cho[Math.floor(code/588)];
    }
    return result;
  }

  return (
    <div className="background">  
        <div> 
          <div className ="rank">
            <Link exact to="/Rank">
              <img src = {sejong} className="sejong" alt="명예의 전당"/>
            </Link>
          </div>
          <span id="consonant" style={{ border: "2px solid white", width: "500px", backgroundColor: "white" }}></span> 
          <span id="timer" style={{ border: "2px solid white", width: "500px", backgroundColor: "white" }}></span>
          <form onSubmit={checkWord}>
            <label style={{ color: "white" }}> 단어를 입력하세요: </label> 
              <input type="text" id="wordBox" onChange={(e) => {setWord(e.target.value)}} />
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