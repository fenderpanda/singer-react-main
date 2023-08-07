import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import i18next from "i18next";
import {I18nextProvider} from "react-i18next";
import common_en from "./locales/en/common.json";
import common_ru from "./locales/ru/common.json";

i18next.init({
    interpolation: {escapeValue: false},
    lng: localStorage.getItem("i18nextLng") || "en",
    resources: {
        en: {
            common: common_en
        },
        ru: {
            common: common_ru
        }
    }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
          <I18nextProvider i18n={i18next}>
              <App />
          </I18nextProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
