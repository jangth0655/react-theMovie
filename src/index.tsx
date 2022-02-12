import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import App from "./App";

import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";

const GlobalStyle = createGlobalStyle`
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
	--padding-size-main :  6em 3em 3em 3em;;
	--padding-size-small : 0.5em;
	--padding-size-meddle : 1em;
	--padding-size-large : 1.5em;

	/* margin */
	--margin-size-small : 0.5em;
	--margin-size-meddle : 1em;
	--margin-size-large : 1.5em;

	/* border-radius */
	--border-radius : 10px; 

	/* image-size */
	--image-width : 10em;
	--image-height : 15em;
}
`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
