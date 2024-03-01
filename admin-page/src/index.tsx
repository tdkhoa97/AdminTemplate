import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as RoutesModule from './routes';
import { AppContainer } from 'react-hot-loader';
import { Env } from './utils/env'
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from "./Contexts/ContextProvider";

let routes = RoutesModule.routes;

// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
// Env.baseUrl = baseUrl;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);

// function renderApp() {
//   ReactDOM.render(
//     // <StylesProvider injectFirst>
//     <AppContainer>
//       <BrowserRouter children={routes} basename={baseUrl} />
//     </AppContainer>
//     // </StylesProvider>,
//     // document.getElementById('react-app')
//     document.getElementById('root') as HTMLElement
//   );
// }

// renderApp();
// Allow Hot Module Replacement
// if (module.hot) {
//   module.hot.accept('./routes', () => {
//     routes = require<typeof RoutesModule>('./routes').routes;
//     renderApp();
//   });
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
