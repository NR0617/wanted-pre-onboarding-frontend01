import * as Styled from "./style";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemsList from "../../molecules/Todos/index";
import NotValidContent from "../../Atom/NotValidContent";
import { client } from "../../../util/axios";

const Todos = () => {
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [isValid, setIsValid] = useState(true);
    const [todo, setTodo] = useState("");
    const signout = () => {
        localStorage.removeItem("AccessToken");
        alert("이용해주셔서 감사합니다");
        navigate("/");
    };
    useEffect(() => {
        const accessToken = localStorage.getItem("AccessToken");
        if (!accessToken) navigate("/");
    }, []);
    useEffect(() => {
        client("get", "/todos").then((res) => {
            if (res.status === 200) setList(res.data);
        });
    }, []);

    const handleInput = (event) => {
        setTodo(event.target.value);
        if (event.target.value.length !== 0) setIsValid(true);
    };
    const handleCreateTodo = async () => {
        if (todo.length === 0) {
            return setIsValid(false);
        } else {
            try {
                await client("post", "/todos", {
                    data: {
                        todo,
                    },
                }).then((res) => {
                    if (res.status === 201)
                        setList((prev) => [...prev, res.data]);
                    setTodo("");
                });
            } catch (e) {
                console.log(e.message);
                alert("잘못된 요청입니다");
            }
            return setIsValid(true);
        }
    };
    return (
        <Styled.PageContaner>
            <Styled.ArrangeBtn>
                <Styled.AddItemBtn onClick={signout}>
                    로그아웃
                </Styled.AddItemBtn>

                <Styled.InputBtnBox>
                    <Styled.TodoInput
                        isValid={isValid}
                        onChange={handleInput}
                        value={todo}
                        placeholder="할일을 입력하세요"
                    />
                    <Styled.AddItemBtn onClick={handleCreateTodo}>
                        추가하기
                    </Styled.AddItemBtn>
                </Styled.InputBtnBox>

                {!isValid && (
                    <NotValidContent>내용을 입력해주세요</NotValidContent>
                )}

                {list?.map((el) => (
                    <ItemsList key={el.id} item={el} setList={setList} />
                ))}
            </Styled.ArrangeBtn>
        </Styled.PageContaner>
    );
};

export default Todos;
