import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body, .root, .App {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
        background-color: #F3F4F6;
    }
`;

export default GlobalStyle;