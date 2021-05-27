import styled from 'styled-components';

const HomeStyle = styled.div`
    height: 100vh;
    width: 100vw;
    .body {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        background-color: white;
        box-shadow: 0px 0px 16px -6px black;
        border-radius: 10px;
        width: 70%;
        padding: 5px 16px;
        table {
            color: #6B7280;
        }

        .flex-div {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            margin: 8px auto;
            p {
                line-height: 100%;
                margin: 0;
            }

            button {
                border: 1px solid #D1D5DB;
            }
        }
    }
`;

export default HomeStyle;