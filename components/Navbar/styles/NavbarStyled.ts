import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const NavBarStyled = styled(Navbar)`

    a {
        border-radius: 10px;
        padding: 5px 15px;
       
        &:hover {
            background-color: #111827;
        }
        
        &:nth-child(2) {
            margin-left: 16px;
        }
    }
`;

export default NavBarStyled;