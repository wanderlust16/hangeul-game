import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import logo from './Logo.png';
import sejong from './Sejong.png';
import box from './HelpBox.png';
import scoreBox from './ScoreBox.png';
import playBox from './PlayBox.png';
import bubble from './WordBubble.png';
import './Room.css';

export default function Rank() {
    const [word, setWord] = useState(null);
    const onSend = (e) => {
        e.preventDefault();
        if (!word) {
            return alert('단어를 입력하세요.');
        }
    }

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