import * as Styled from "./style";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotValidContent from "../../Atom/NotValidContent";
import { noTokenClient } from "../../../util/axios";

const Auth = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleShowButton = () => {
        setIsSignUp(!isSignUp);
        setEmail("");
        setPassword("");
        setIsValid(true);
    };
    useEffect(() => {
        const accessToken = localStorage.getItem("AccessToken");
        if (accessToken) navigate("/todos");
    }, []);

    const handleUserData = (event) => {
        if (event.target.id === "email") {
            setEmail(event.target.value);
            if (
                (event.target.value.includes("@") && password >= 8) ||
                (event.target.value.length === 0 && password.length === 0)
            ) {
                return setIsValid(true);
            } else {
                return setIsValid(false);
            }
        } else if (event.target.id === "password") {
            setPassword(event.target.value);
            if (
                (event.target.value.length >= 8 && email.includes("@")) ||
                (email.length === 0 && event.target.value.length === 0)
            ) {
                return setIsValid(true);
            } else {
                return setIsValid(false);
            }
        }
    };
    const handleFetchData = async (event) => {
        let endPoint = event.target.id;
        if (!email.includes("@") || password.length < 8)
            return alert("이메일과 8자리 이상의 비밀번호를 입력해주세요");
        try {
            await noTokenClient("post", `/auth/${endPoint}`, {
                data: {
                    email,
                    password,
                },
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    alert("로그인 되었습니다");
                    localStorage.setItem("AccessToken", res.data.access_token);
                    navigate("/todos");
                }
            });
        } catch (e) {
            if (e.response.status === 404) {
                alert("해당 사용자가 존재하지 않습니다");
            } else if (e.response.status === 401) {
                alert("정확한 아이디와 비밀번호를 입력해주세요");
            } else if (e.response.status === 400) {
                alert("동일한 이메일이 이미 존재합니다");
            } else {
                alert("잘못된 요청입니다");
            }
        }
    };

    return (
        <Styled.PageContainer>
            <Styled.PageTitle>회원정보를 입력해주세요</Styled.PageTitle>
            <Styled.UserData
                id="email"
                placeholder="email"
                onChange={handleUserData}
                isValid={isValid}
                value={email}
            />
            <div>
                {!isValid && (
                    <NotValidContent>
                        이메일 형식(@)의 아이디를 입력해주세요
                    </NotValidContent>
                )}
            </div>

            <Styled.UserData
                id="password"
                placeholder="password"
                onChange={handleUserData}
                isValid={isValid}
                value={password}
                type="password"
            />
            <div>
                {!isValid && (
                    <NotValidContent>
                        비밀번호는 8자리 이상 입력해주세요
                    </NotValidContent>
                )}
            </div>

            {isSignUp ? (
                <Styled.SignInBtn id="signin" onClick={handleFetchData}>
                    로그인
                </Styled.SignInBtn>
            ) : (
                <Styled.SignInBtn id="signup" onClick={handleFetchData}>
                    회원가입
                </Styled.SignInBtn>
            )}
            {isSignUp ? (
                <Styled.Link onClick={handleShowButton}>
                    회원가입 하기
                </Styled.Link>
            ) : (
                <Styled.Link onClick={handleShowButton}>
                    로그인 하기
                </Styled.Link>
            )}
        </Styled.PageContainer>
    );
};

export default Auth;
