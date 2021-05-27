import styled from 'styled-components';

const CadastroStyled = styled.div`
    .body {
        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;

        form {
            background-color: white;
            border-radius: 16px;
            padding: 16px;

            .btn {
            float: right;
            margin-right: 24px;
            }
        }

        .alert {
            bottom: 0px;
            right: 32px;
        }

        .row {
            width: 100%;
        }
    }
`;

export default CadastroStyled;