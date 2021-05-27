import React from 'react';

import HeaderStyle from './styles/HeaderStyled';

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

export default Header;