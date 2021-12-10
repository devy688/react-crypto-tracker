import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { lightTheme, darkTheme } from "./theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    line-height: 1.2;
    transition: all 0.25s linear;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button{
    cursor: pointer;
  }
  .toggltBtn {
    background-color: transparent;
    border: none;
    border-radius: 10px;
    display:flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    font-size: 25px;
    right: 25px;
    top: 25px;
    &.darkTheme {
      color: ${(props) => props.theme.textColor};
    }
    &.lightTheme {
      color: ${(props) => props.theme.textColor};
    }
    span{
      font-size: 10px;
      margin-top: 5px;
    }
  }
`;

interface IToggle {
  changeTheme: (event: React.MouseEvent<HTMLButtonElement>) => void;
  theme: string;
}

const modes = ["darkTheme", "lightTheme"];

const Toggle = ({ changeTheme, theme }: IToggle) => {
  const notSelected = modes.find((mode) => mode !== theme);
  const oppositeMode = notSelected === "lightTheme" ? "Light" : "Dark";

  return (
    <>
      <button className={`toggltBtn ${theme}`} onClick={changeTheme}>
        {theme === "darkTheme" ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
        <span>To {oppositeMode} mode</span>
      </button>
    </>
  );
};

function App() {
  const queryClient = new QueryClient();

  const localTheme = window.localStorage.getItem("theme");
  const initialState = localTheme ? localTheme : "darkTheme";
  const [theme, setTheme] = useState(initialState);

  const toggleTheme = () => {
    if (theme === "lightTheme") {
      setTheme("darkTheme");
      window.localStorage.setItem("theme", "darkTheme");
    } else {
      setTheme("lightTheme");
      window.localStorage.setItem("theme", "lightTheme");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme === "lightTheme" ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Toggle changeTheme={toggleTheme} theme={theme} />
        <Router />
        <ReactQueryDevtools />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
