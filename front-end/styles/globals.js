import { createGlobalStyle } from "styled-components";

const Globals = createGlobalStyle`
    :root {
        --color-primary: #f9f9f9;
        --color-secondary: #333;
        --color-tertiary: #f4f4f4;
        --color-quaternary: #333;
        --color-quinary: #f4f4f4;
        --color-error: #ff0000;
        --color-success: #008000;
        --color-warning: #ffa500;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: 'Inter', sans-serif;   
        background-color: var(--color-primary);
    }

    h1, h2, h3, h4, h5, h6 {
        color: var(--color-secondary);
    }

    p {
        color: var(--color-secondary);
    }

    a {
        color: var(--color-secondary);
        text-decoration: none;
    }   
`;

export default Globals;
