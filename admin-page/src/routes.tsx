import React, { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import { Router, Route, Switch } from 'react-router-dom';
import Layout from './layouts/Layout';
import { history } from '@dev/utils/env';

// import SidebarLayout from 'src/layouts/SidebarLayout';
// import BaseLayout from 'src/layouts/BaseLayout';

// import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
(
    <Suspense fallback={<div>Loaing ...</div>}>
        <Component {...props} />
    </Suspense>
);

// function này được lấy từ lib react-lazily
const lazily = <T extends {}, U extends keyof T>(loader: (x?: string) => Promise<T>) => new Proxy(({} as unknown) as T, {
    get: (target, componentName: string | symbol) => {
        if (typeof componentName === 'string') {
            return React.lazy(() => loader(componentName).then((x) => ({ default: (x[componentName as U] as any) as React.ComponentType<any>, })))
        }
    },
})

// React.lazy chỉ nhận default exports
// sử dụng function lazily để parse các named exports => default exports
// các component dùng named exports đều phải thông qua function lazily để parse.
// còn component nào sử dụng default exports thì chỉ cần: const [nameFile] = React.lazy(() => import([path-file]))
// luôn luôn define component bên dưới function lazily
// luôn luôn khai báo kiểu destructuring: const {[name]} =lazily(() => import('@dev/components')) để load được page

// Pages

const {
    Error, FallbackLoading,
    Transaction
} = lazily(() => import('@dev/pages'))
// const Overview = Loader(lazy(() => import('src/content/overview')));

// // Dashboards

// const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// // Applications

// const Messenger = Loader(
//   lazy(() => import('src/content/applications/Messenger'))
// );
// const Transactions = Loader(
//   lazy(() => import('src/content/applications/Transactions'))
// );
// const UserProfile = Loader(
//   lazy(() => import('src/content/applications/Users/profile'))
// );
// const UserSettings = Loader(
//   lazy(() => import('src/content/applications/Users/settings'))
// );

// // Components

// const Buttons = Loader(
//   lazy(() => import('src/content/pages/Components/Buttons'))
// );
// const Modals = Loader(
//   lazy(() => import('src/content/pages/Components/Modals'))
// );
// const Accordions = Loader(
//   lazy(() => import('src/content/pages/Components/Accordions'))
// );
// const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
// const Badges = Loader(
//   lazy(() => import('src/content/pages/Components/Badges'))
// );
// const Tooltips = Loader(
//   lazy(() => import('src/content/pages/Components/Tooltips'))
// );
// const Avatars = Loader(
//   lazy(() => import('src/content/pages/Components/Avatars'))
// );
// const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
// const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// // Status

// const Status404 = Loader(
//   lazy(() => import('src/content/pages/Status/Status404'))
// );
// const Status500 = Loader(
//   lazy(() => import('src/content/pages/Status/Status500'))
// );
// const StatusComingSoon = Loader(
//   lazy(() => import('src/content/pages/Status/ComingSoon'))
// );
// const StatusMaintenance = Loader(
//   lazy(() => import('src/content/pages/Status/Maintenance'))
// );

export const routes = <Router history={history}>
    <Layout routerHistory={history}>
        <React.Suspense fallback={<FallbackLoading />}>
            <Switch>
                <Route path={'/transaction'} element={<Transaction />} />


                {/* <Route render={(routeProps) => <Error {...routeProps} errorCode={ERROR_CODE.NOT_FOUND} />} /> */}
            </Switch>
        </React.Suspense>
    </Layout>
</Router>
