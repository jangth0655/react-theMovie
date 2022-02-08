import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import App from "./App";
import { lightTheme } from "./theme";
import { Provider } from "react-redux";
import { store } from "./store";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap');
/* variable */
#root {
	/* font-size */
	--font-size-micro : 0.875em;
	--font-size-small : 1em;
	--font-size-regular : 1.25em;
	--font-size-large : 2em;

	/* Icon-size */
	--icon-size-small:0.875em;
	--icon-size-middle:1.25em;
	--icon-size-large:1.75em;
	--icon-size-big:2.5em;

	/* padding */
	--padding-size-small : 0.5em;
	--padding-size-meddle : 1em;
	--padding-size-large : 1.5em;

	/* margin */
	--margin-size-small : 0.5em;
	--margin-size-meddle : 1em;
	--margin-size-large : 1.5em;

	/* border-radius */
	--border-radius : 10px; 
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
* { 
	box-sizing: border-box;
	line-height: 1.2;
}

body {
	
	font-family: 'Open Sans', sans-serif;
}

a {
	
	outline: 0;
	text-decoration: none;
}

ol, ul {
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
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
