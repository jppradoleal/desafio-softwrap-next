import React from 'react';
import styled from 'styled-components';

interface HeaderProps {
    title: string;
}

const Header = ({title}: HeaderProps) => {
    return (
        <HeaderStyle>
            <h1>{title}</h1>
        </HeaderStyle>
    );
}

const HeaderStyle = styled.header`
    height: 100px;
    padding-left: 150px;
    display: flex;
    align-items: center;
    box-shadow: 0 -6px 16px black;
    background-color: white;
`;

export default Header;