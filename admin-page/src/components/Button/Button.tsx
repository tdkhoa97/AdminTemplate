import * as React from 'react';
import { NavLink } from 'react-router-dom';
import * as classnames from 'classnames';
import './index.css';
export declare type IElementButtonType = 'submit' | 'button'
export declare type IButtonType = 'primary' | 'secondary' | 'default' | 'default-danger'
    | 'warning' | 'danger' | 'link' | 'link-danger' | 'link-no-pding' | 'link-danger-no-pding' | 'clean'
export declare type ITargetType = '_blank' | '_self' | '_parent' | '_top'

interface IButtonProps {
    id?: string,
    type?: IButtonType,
    elementType?: IElementButtonType,
    classNames?: string,
    href?: any,
    target?: ITargetType,
    disabled?: boolean,
    handleOnClick?: Function,
    handleOnMouseLeave?: Function,
    btnLoading?: boolean,
    isOG?: boolean
}

interface IButtonStates {
    disabled: boolean,
    asyncState: any,
    isUnmounted: boolean
}

export const Button = (props: IButtonProps) => {
    return (
        <div>ABC</div>
    )
}