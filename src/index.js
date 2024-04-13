import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import i18n from "i18next";
import { initReactI18next } from "react-i18next"
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        supportedLngs: ['en', 'no'],
        fallbackLng: "en",
        detection: {
            order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
            caches: ['cookie']
        },
        backend: {
            loadPath:'/assets/locales/{{lng}}/translation.json',
        },
    })

const loadingMarkup = (
    <div style={{display: "flex",
        justifyContent: "center", marginTop: 40}}>
        <h2> Loading... </h2>
    </div>
)

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Suspense fallback={loadingMarkup}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </Suspense>,
  document.getElementById('root')
);