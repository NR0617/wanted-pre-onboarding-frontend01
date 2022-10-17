import styled from "styled-components";

export const PageContaner = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
`;
export const ArrangeBtn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
`;
export const InputBtnBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
export const TodoInput = styled.input`
    border-radius: 5px;
    width: 500px;
    height: 45px;
    margin: 5px 20px 5px 0px;
    padding: 5px;
    font-size: 20px;
    &:focus {
        outline: none;
    }
    border-color: ${(props) => `${props.isValid ? null : "red"}`};
    box-shadow: ${(props) => `${props.isValid ? null : "0px 0px 2px 1px red"}`};
`;
export const AddItemBtn = styled.button`
    background-color: white;
    border-radius: 5px;
    margin: 5px 0px 5px 10px;
    padding: 5px 15px 5px 15px;
    font-size: 15px;
    width: 110px;
    overflow: hidden;
    &:hover {
        color: white;
        background-color: black;
    }
`;
