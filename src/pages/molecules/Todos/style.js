import styled from "styled-components";

export const ItemListContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;
export const SingleItem = styled.span`
    font-size: 20px;
    padding: 5px;
    margin: 10px 20px 10px 0px;
    width: 480px;
    height: 50px;
    text-decoration: ${(props) =>
        `${props.isCompleted ? "line-through" : null}`};
`;

export const SingleItemBtn = styled.button`
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
    width: 53px;
    margin: 10px 0px 10px 5px;
    padding: 10px 5px 10px 5px;
    font-size: 15px;
    &:hover {
        color: white;
        background-color: black;
    }
`;
