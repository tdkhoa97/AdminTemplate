import React from 'react';
import './index.css';
import { useStateContext } from '../../Contexts/ContextProvider';
import * as classnames from 'classnames';
import { NavLink } from 'react-router-dom';

export declare type IElementButtonType = 'submit' | 'button'
export declare type IButtonType = 'primary' | 'secondary' | 'default' | 'default-danger'
    | 'warning' | 'danger' | 'link' | 'link-danger' | 'link-no-pding' | 'link-danger-no-pding' | 'clean'
export declare type ITargetType = '_blank' | '_self' | '_parent' | '_top'

interface IProps {
    icon?: any
    type?: IButtonType,
    bgColor?: any
    color?: string
    bgHoverColor?: any
    size?: string
    text?: string
    borderRadius?: string
    width?: string,
    btnLoading?: boolean,
    classNames?: string
}

export const Button = (props: IProps) => {
    const { icon, type, bgColor, color, bgHoverColor, size, text, borderRadius, width, btnLoading, classNames } = props
    const { setIsClicked, initialState } = useStateContext();

    let classes = classnames.default({
        'btn btn-primary': type == 'primary',
        'btn btn-secondary': type == 'secondary',
        'btn btn-default': type == 'default',
        'btn btn-warning': type == 'warning',
        'btn btn-danger': type == 'danger',
        'btn btn-default-danger': type == 'default-danger',
        'btn btn-link': type == 'link',
        'btn btn-link btn-link-danger': type == 'link-danger',
        'btn btn-link btn-pd-none': type == 'link-no-pding',
        'btn btn-link btn-pd-none btn-link-danger': type == 'link-danger-no-pding',
        'btn-loading': btnLoading,
        [classNames]: classNames
    })

    return (
        <button
            type="button"
            onClick={() => setIsClicked(initialState)}
            style={{ backgroundColor: bgColor, color, borderRadius }}
            className={`${classes} text-${size} p-3 `}
        >
            <span>{text}</span>
            <span className='ml-3'>{icon}</span>
        </button>
    );
};