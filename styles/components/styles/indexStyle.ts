import { Container } from 'react-bootstrap';
import styled from 'styled-components';

export default styled(Container)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;

    .toast {
        position: absolute;
        top: 16px;
        right: 8px;
    }

    .container {
        width: 50%;

        form {
            width: 100%;
            .form-footer {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
    }
`;