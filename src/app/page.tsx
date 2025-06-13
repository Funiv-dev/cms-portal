'use client'; // 맨 위에 추가

import React from 'react';
import './common/common.css';

export default function Home() {
    // 액션 상태를 사용하여 로그인 처리
    async function onSubmitLoginHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const userId = form.userId.value; // Access the input field by its name
        const userPassword = form.userPassword.value;
        
        console.log(userId);
        console.log(userPassword);

        
    }

    return (
    <div>
        <div className="login m-3 p-3" style={{ height: "900px" }}>
            <div id="login-container" className="flex flex-col justify-center">
                <form id="login-form" className="m-3 p-3" method="post" onSubmit={onSubmitLoginHandler} >
                    <div>
                        <div>
                            <h1 className="jetbrains-mono-semi-bold fs-30 text-center">로그인</h1>
                            <p className="jetbrains-mono-light text-center m-1">관리자 페이지에 오신 것을 환영합니다!</p>
                        </div>
                        <div className="jetbrains-mono-light mt-50">
                            <div>
                                <p className="inline-block w-100 fs-14">아이디</p>
                                <label>
                                    <input type="text" name="userId" id="userId" className="common-input" />
                                </label>
                            </div>
                        </div>

                        <div className="jetbrains-mono-light mt-1">
                            <div>
                                <p className="inline-block w-100 fs-14">패스워드</p>
                                <label><input type="password" name="userPassword" className="common-input" /></label>
                            </div>
                        </div>
                        <div className="flex mt-1">
                            <label>
                                <input type="checkbox" name="remember-me" id="remember-me" className="" />
                            </label>
                            <p className="flex align-center ml-02 fs-13">자동 로그인</p>
                        </div>
                    </div>
                    <div style={{ marginTop: "3rem" }} >
                        <button type="submit" className="submit im-w-100per">로그인</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}
