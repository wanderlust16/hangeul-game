import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import logo from './Logo.png';
import sejong from './Sejong.png';
import box from './HelpBox.png';
import scoreBox from './ScoreBox.png';
import playBox from './PlayBox.png';
import bubble from './WordBubble.png';
import axios from 'axios'
import './Room.css';

const APP_KEY = "80BDA3A34160D126F3FB4094CBE073EF"

export default function Rank() {

    const [word, setWord] = useState(null);
    const onSend = (e) => {
        e.preventDefault();
        if (!word) {
            return alert('단어를 입력하세요.');
        }
    }
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

          <span id="consonant" style={{ border: "2px solid white", width: "500px", backgroundColor: "white" }}></span> 
          <span id="timer" style={{ border: "2px solid white", width: "500px", backgroundColor: "white" }}></span>
          <form onSubmit={checkWord}>
            <label style={{ color: "white" }}> 단어를 입력하세요: </label> 
              <input type="text" id="wordBox" onChange={(e) => {setWord(e.target.value)}} />
              <input type="submit" value="Submit" />
          </form>

    return (
        <div className="background">  
          <div>
            <div className="king">
                <img src={sejong} className="king" alt="왕"/>
            </div>
            <img src={bubble} className="bubble" alt="말풍선"/>
            <div className="help">
                <img src={box} className="box" alt="설명"/>
            </div>
            <div className ="logo">
                <img src={logo} className="logo" alt="로고"/>
            </div>
            <img src={playBox} className="play-box" alt="게임판"/>
            <div className="consonant"></div>
            <form onSubmit={onSend}>
                        <input type="text" name="name" placeholder="단어 입력.." onChange={(e) => setWord(e.target.value)} className="send"/>
                    </form>
            <img src={scoreBox} className="score-box" alt="점수판"/>
            <div className="score-list">
                    뿌꾸뿌꾸: 2560점
            </div>
          </div>
      </div>
    )
}