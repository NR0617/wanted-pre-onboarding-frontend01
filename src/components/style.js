import styled from "styled-components";
export const Header = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 140px;
    margin-bottom: 30px;
    background-color: black;
    color: white;
    @media (max-width: 576px) {
        width: 100%;
    }
`;

export const ApplicationTitle = styled.p`
    font-size: 12em;
`;
