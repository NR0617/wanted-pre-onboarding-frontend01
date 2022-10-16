import { useState } from "react";
import * as Styled from "./style";
import { TextInput } from "../../Atom/TextInput";
import { client } from "../../../util/axios";

const ItemsList = ({ item, setList }) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [todo, setTodo] = useState(item.todo);
    const [isCheck, setIsCheck] = useState(item.isCompleted);
    const onUpdate = () => {
        setIsUpdate((prev) => !prev);
    };
    const handleWriteTodo = (event) => {
        setTodo(event.target.value);
    };
    const handleCompleted = async (event) => {
        setIsCheck(event.target.checked);
        try {
            client("put", `/todos/${item.id}`, {
                data: { todo: todo, isCompleted: event.target.checked },
            }).then((res) => {
                if (res.status === 200)
                    setList((prev) => {
                        const arr = prev.map((el) => {
                            if (el.id === item.id) {
                                return res.data;
                            } else {
                                return el;
                            }
                        });
                        return [...arr];
                    });
            });
        } catch (e) {
            console.log(e.message);
            alert("잘못된 요청입니다");
        }
    };
    const handleDeleteTodo = async () => {
        try {
            await client("delete", `/todos/${item.id}}`).then((res) => {
                if (res.status === 204)
                    setList((prev) => {
                        const arr = prev.filter((el) => el.id !== item.id);
                        return [...arr];
                    });
            });
        } catch (e) {
            console.log(e.message);
            alert("잘못된 요청입니다");
        }
    };
    const handleUpdateTodo = async () => {
        try {
            await client("put", `/todos/${item.id}`, {
                data: { todo: todo, isCompleted: isCheck },
            }).then((res) => {
                if (res.status === 200)
                    setList((prev) => {
                        const arr = prev.map((el) => {
                            if (el.id === item.id) {
                                return res.data;
                            } else {
                                return el;
                            }
                        });
                        onUpdate();
                        return [...arr];
                    });
            });
        } catch (e) {
            console.log(e.message);
            alert("잘못된 요청입니다");
            setTodo(item.todo);
        }
    };
    return (
        <Styled.ItemListContainer>
            <div>
                {isUpdate ? (
                    <TextInput
                        isValid={true}
                        value={todo}
                        onChange={handleWriteTodo}
                    />
                ) : (
                    <>
                        <input
                            type="checkbox"
                            checked={isCheck}
                            onChange={handleCompleted}
                        />
                        <Styled.SingleItem isCompleted={item.isCompleted}>
                            {item.todo}
                        </Styled.SingleItem>
                    </>
                )}
            </div>
            <div>
                {isUpdate ? (
                    <>
                        <Styled.SingleItemBtn onClick={handleUpdateTodo}>
                            제출
                        </Styled.SingleItemBtn>
                        <Styled.SingleItemBtn onClick={onUpdate}>
                            취소
                        </Styled.SingleItemBtn>
                    </>
                ) : (
                    <>
                        <Styled.SingleItemBtn onClick={onUpdate}>
                            수정
                        </Styled.SingleItemBtn>
                        <Styled.SingleItemBtn onClick={handleDeleteTodo}>
                            삭제
                        </Styled.SingleItemBtn>
                    </>
                )}
            </div>
        </Styled.ItemListContainer>
    );
};
export default ItemsList;
