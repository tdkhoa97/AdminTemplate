import React, { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import { Router, Route, Routes } from 'react-router-dom';
// import Layout from './layouts/Layout';
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

// const {
//     Error, FallbackLoading,
//     Transaction
// } = lazily(() => import('@dev/pages'))

// const Transactions = Loader(
//     lazy(() => import('./src/pages/Transaction'))
// )
// export const routes = <Router history={history}>
{/* <Layout routerHistory={history}> */ }

export const routes = <></>
//  <React.Suspense fallback={<FallbackLoading />}>
//     <Routes>
//         <Route path={'/transaction'} element={<Transaction />} />
//         {/* <Route render={(routeProps) => <Error {...routeProps} errorCode={ERROR_CODE.NOT_FOUND} />} /> */}
//     </Routes>
// </React.Suspense>
{/* </Layout> */ }
// </Router>