import React, { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import { Router, Route } from 'react-router-dom';
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

const {
    Error, FallbackLoading,
    Transaction
} = lazily(() => import('@dev/pages'))

// export const routes = <Router history={history}>
//     <Layout routerHistory={history}>
//         <React.Suspense fallback={<FallbackLoading />}>
//             <Switch>
//                 <Route path={'/transaction'} element={<Transaction />} />


//                 {/* <Route render={(routeProps) => <Error {...routeProps} errorCode={ERROR_CODE.NOT_FOUND} />} /> */}
//             </Switch>
//         </React.Suspense>
//     </Layout>
// </Router>

export const routes: RouteObject[] = [
    {
        path: '/transaction',
        element: <Transaction />,
        //   children: [
        //     {
        //       path: '/',
        //       element: <Overview />
        //     },
        //     {
        //       path: 'overview',
        //       element: <Navigate to="/" replace />
        //     },
        //     {
        //       path: 'status',
        //       children: [
        //         {
        //           path: '',
        //           element: <Navigate to="404" replace />
        //         },
        //         {
        //           path: '404',
        //           element: <Status404 />
        //         },
        //         {
        //           path: '500',
        //           element: <Status500 />
        //         },
        //         {
        //           path: 'maintenance',
        //           element: <StatusMaintenance />
        //         },
        //         {
        //           path: 'coming-soon',
        //           element: <StatusComingSoon />
        //         }
        //       ]
        //     },
        //     {
        //       path: '*',
        //       element: <Status404 />
        //     }
        //   ]
    }
]