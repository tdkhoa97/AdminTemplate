import * as React from 'react';

export const FallbackLoading: React.FC<{}> = (props) => {
    React.useEffect(() => {
        // HrwComponents.ShowWait.onConfig({ showSpinner: true })
        // HrwComponents.ShowWait.onStart()
        // return () => {
        //     HrwComponents.ShowWait.onEnd()
        // }
    }, [])

    return <div className=""></div>
}
