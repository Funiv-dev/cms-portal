'use client'; // 맨 위에 추가

import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

import TopLoader from '@/app/component/TopLoader';
import AxiosProdiver from './provider/AxiosProvider';

import './common/common.css';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    
    const onClickRememberMeHandler = () => {
        setRememberMe(!rememberMe);
    };

    // 액션 상태를 사용하여 로그인 처리
    const onSubmitLoginHandler = async () => {
        const instance = new AxiosProdiver().getAxiosInstance();
        const response = await instance.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/authenticate/`, { 
            userId: userId,
            userPassword: userPassword
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.data.result === true) {
            alert('로그인에 성공했습니다.');
            Router.push('/cms/dashboard');
        } else {
            alert('로그인에 실패했습니다. 아이디와 패스워드를 확인해주세요.');
        }
    };

    const onChangeUserIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setUserId(value);
    };

    const onChangeUserPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setUserPassword(value);
    };

    useEffect(() => {
        if(userId) {
            setUserId(userId);
        }
        console.log(userId);
    }, [userId]);

    useEffect(() => {
        if(userPassword) {
            setUserPassword(userPassword);
        }
        console.log(userPassword);
    }, [userPassword]);

    useEffect(() => {
        
        NProgress.start();

        setTimeout(() => {
            NProgress.done();

            setIsLoading(false);
        }, 1000);

    }, []);

    return (
    <div>
        <TopLoader />
        {isLoading && (
            <div className="loading-overlay">
                <div className="loading-spinner"></div>
            </div>
        )}

        <div className="flex flex-row h-screen">
            <div className="login-page bubble flex flex-60 flex-col justify-center item-center w-50 opacity-0 animate-[fadeInLeft_1s_ease-out_forwards]">
                <div className="bubble-item"></div>
                <div className="bubble-item"></div>
                <div className="bubble-item"></div>
                <div className="bubble-item"></div>
                <div className="bubble-item"></div>
                <div className="bubble-item"></div>
                <div className="bubble-item"></div>
                <div className="bubble-item"></div>

                <div className='text-center text-white' style={{ position: 'relative', zIndex: 10 }}>
                    <h1 className="text-5xl font-bold mb-4">Hannune Console</h1>
                </div>
            </div>

            <div className="flex flex-40 flex-col justify-center item-center m-10 opacity-0 animate-[fadeInRight_1s_ease-out_0.2s_forwards]">
                <div className='m-50'>
                    <div>
                        <h1 className="jetbrains-mono-semi-bold fs-30 text-center">로그인</h1>
                        <p className="jetbrains-mono-light text-center m-1">Hannune console에 오신 것을 환영합니다!</p>
                    </div>
                    <div className="jetbrains-mono-light mt-50">
                        <div>
                            <p className="inline-block w-100 fs-14">아이디</p>
                            <label>
                                <input type="text" name="userId" id="userId" className="border border-gray-300 rounded" onChange={onChangeUserIdHandler} value={userId} />
                            </label>
                        </div>
                    </div>

                    <div className="jetbrains-mono-light mt-1">
                        <div>
                            <p className="inline-block w-100 fs-14">패스워드</p>
                            <label><input type="password" name="userPassword" className="border border-gray-300 rounded" onChange={onChangeUserPasswordHandler} value={userPassword}  /></label>
                        </div>
                    </div>
                    <div className="flex mt-1">
                        <div className="flex flex-row" onClick={onClickRememberMeHandler}>
                            <label>
                                <input type="checkbox" name="remember-me" id="remember-me" className="" checked={rememberMe} />
                            </label>
                            <p className="flex align-center ml-02 fs-13">자동 로그인</p>
                        </div>
                    </div>
                    <div style={{ marginTop: "3rem" }} >
                        <button type="button" className="submit im-w-100per" onClick={onSubmitLoginHandler}>로그인</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
