import React from 'react';
import * as H from 'history';
import { createBrowserHistory } from 'history';

let env = {
    baseUrl: '/',
    layout: null
}
export const Env = env;
export const history: H.History = createBrowserHistory();