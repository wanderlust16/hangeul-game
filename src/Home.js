import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import sejong from './Sejong.png';
import logo from './MainLogo.png';
import bottom from './Bottom.png';
import light from './Light.png';
import arrow from './Arrow.png';
import './Home.css';

import { firestore } from "./Firebase";

export default function Home() {
    const [name, setName] = useState(null);
    const login = localStorage.getItem('uid') ? 1:0;
    const onStart = (e) => {
        e.preventDefault();
        document.getElementById('start').style.display = "none";
        document.getElementsByClassName('login-field')[0].style.display = "block";
    };
    const onPlay = (e) => {
        e.preventDefault();
    }
    const onLogin = (e) => {
        e.preventDefault();
        if (!name) {
          return alert('별명을 입력하세요.');
        }
        firestore.collection('users').add({user:name})
            .then(res=>{
                localStorage.setItem('uid', res.id);
                firestore.collection('users').get()
                    .then(docs => {
                        docs.forEach(doc => {
                            if(doc.id === res.id) localStorage.setItem('userName', doc.data().user);
                        })
                    })
            })
    }
    return (
        <div className="background">  
            <div>
            <div className ="rank">
                <Link exact to="/Rank">
                <img src = {sejong} className="sejong" alt="명예의 전당"/>
                </Link>
            </div>
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
                
                {login === 0 &&
                    <button id="start" alt="시작" onClick={onStart}>
                        <div className="button-text">
                            놀이 시작
                        </div>
                        <img src={arrow} className="arrow" alt="화살표"/>
                    </button>
                }
                {login === 0 &&
                <button className="login-field">
                    <form onSubmit={onLogin}>
                        <input type="text" name="name" placeholder="별명 입력.." onChange={(e) => setName(e.target.value)} className="login"/>
                        <input type="image" src={arrow} alt="로그인" className="arrow"/>
                    </form>
                </button>
                }
                {login > 0 &&
                    <button className="play" alt="시작" onClick={onPlay}>
                        <div className="button-text">
                            동전 넣기
                        </div>
                        <img src={arrow} className="arrow" alt="화살표"/>
                    </button>
                }
            </div>
            </div>
        </div>
    );
}