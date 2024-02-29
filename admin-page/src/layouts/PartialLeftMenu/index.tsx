import * as React from 'react'
import './index.css';
import classnames from 'classnames'
// import * as _utils from '@dev/_utils'
// import * as Utils from '@dev/env';
// import { DEFAULT_QUERY, PATH } from '@dev/consts';
import { NavLink, useLocation } from 'react-router-dom';
// import { } from '@dev/consts'


interface IListMenu {
    name: string,
    link: string,
    icon?: React.ReactNode,
    activeIcon?: React.ReactNode,
    childs?: IListMenu[]
    rootLink?: string // to match the url
    param?: string

    isVisible: boolean
    break?: boolean
}

// const myTicketMenuList: IListMenu[] = [ //Phiếu của tôi
//     { name: IN_CHARGE_BY_ME, link: PATH.My_Form_InCharge, isVisible: true },
//     { name: DRAFT_FORM, link: PATH.My_Form_Draft, isVisible: true },
//     { name: WAITING_FORM, link: PATH.My_Form_Waiting, isVisible: true },
//     { name: CANCEL_FORM, link: PATH.My_Form_Cancel, isVisible: true },
// ]
// const handlingTicketMenuList: IListMenu[] = [ //Phiếu cần xử lý
//     { name: WAITING_CONFIRM_FORM, link: PATH.Handling_Form_Waiting_Confirm, isVisible: true },
//     { name: CONFIRMED_FORM, link: PATH.Handling_Form_Confirm, isVisible: true },
//     { name: REJECTED_FORM, link: PATH.Handling_Form_Reject, isVisible: true },
// ]

// const isShowCommonSettingMenu = DataSource_View || SettingRound_View || API_View
// const settingMenuList: IListMenu[] = [ //Thiết lập
//     { name: FLOW_GROUP_SETTING, link: PATH.Setting_FlowGroup, isVisible: FlowGroup_View },
//     { name: ASSIGNATION_SETTING, link: PATH.Setting_FormAssignation, isVisible: isAdmin },
//     // { name: GENERAL_SETTING, link: PATH.Setting, rootLink: PATH.Setting_Common, isVisible: isShowCommonSettingMenu },
//     { name: DATA_SOURCE_SETTING, link: PATH.Setting_DataSource, isVisible: isShowCommonSettingMenu },
//     { name: API_SETTING, link: PATH.Setting_Api, isVisible: isShowCommonSettingMenu },
//     { name: DEFAULT_SETTING, link: PATH.Setting_Default, isVisible: isShowCommonSettingMenu },
// ]

const menuList: IListMenu[] = [
    {
        name: 'DASH_BOARD',
        // icon: _utils.IconBPM.menuIconCreateForm().svg,
        icon: <img src="" alt="" />,
        activeIcon: <img src="" alt="" />,
        childs: [],
        link: '/',
        isVisible: true,
    },
    {
        name: 'MY_FORM',
        icon: <img src="" alt="" />,
        activeIcon: <img src="" alt="" />,
        childs: [],
        link: '/test',
        rootLink: '/',
        isVisible: true,
    },
]

export const PartialMenuLeft: React.FC<{}> = props => {
    const location = useLocation()
    const [expandIndexArr, setExpandIndexArr] = React.useState<number[]>([])

    React.useEffect(() => {
        if (location.pathname?.length > 0) {
            menuList.forEach((_, i) => {
                // const isMatchChildsUrl = _?.childs?.some(c => location.pathname.includes(c?.rootLink) || (c?.link === location.pathname))
                // if (isMatchChildsUrl) setExpandIndexArr([...expandIndexArr, i])
            })
        }
    }, [location.pathname])

    const toggleSubMenu = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, index: number) => {
        e.stopPropagation()
        e.preventDefault()
        const cloneArr = [...expandIndexArr]
        const isInArr = cloneArr?.includes(index)
        if (isInArr)
            setExpandIndexArr(cloneArr.filter(_ => _ !== index))
        else
            setExpandIndexArr([...cloneArr, index])
    }

    const renderMenuItem = (item: IListMenu, classCss?: string, index?: number) => {
        const { name, link, icon, childs, activeIcon, rootLink, isVisible } = item || {}

        if (!isVisible)
            return null


        const hasChild = childs?.length > 0
        const childRoutes = childs?.map(c => c?.link)
        const isInChildRoutes = location?.pathname?.includes(rootLink) || childRoutes?.includes(location?.pathname)
        const classNameNavLink = classnames('hrv-menu-item-link', {
            'is-active': isInChildRoutes,
            'is-expand': expandIndexArr.includes(index),
            [classCss]: !!classCss
        })

        return <NavLink
            // exact
            key={index}
            to={link}
            // activeClassName={hasChild ? '' : 'open'}
            className={classNameNavLink}
        // isActive={rootLink ? (m, l) => l.pathname.includes(rootLink) : undefined} // match sub route, only for childs have rootRoute
        >
            <div className="hrv-menu-item-icon_wrapper">
                <span className='icon normal-icon'>{icon}</span>
                <span className='icon active-icon'>{activeIcon}</span>
            </div>
            <span className='hrv-menu-item-text mr-auto'>{name}</span>
            <span className='arrow' onClick={(e) => toggleSubMenu(e, index)}>
                {/* {childs?.length > 0 && _utils.Icon.ISVGRCArrowSelection(16, '#4E5A73')} */}
            </span>
        </NavLink>
    }

    const renderMenu = () => {
        return menuList?.map((_, i) => {
            if (!_.isVisible)
                return null

            const isInArr = expandIndexArr.includes(i)
            return <div className='hrv-menu-item' key={i}>
                <div className="hrv-menu-item_root" onClick={() => !isInArr && setExpandIndexArr([...expandIndexArr, i])}>
                    {renderMenuItem(_, null, i)}
                </div>
                {_?.break && <hr />}
                {isInArr && _?.childs?.length > 0 && _?.childs.map((child, cI) => {
                    return renderMenuItem(child, 'is-child', cI)
                })}
            </div>
        })
    }

    const renderLogo = () => {
        // return <IconHarawork />
        return <></>
    }
    return <div className='hrv-menu-container'>
        {renderLogo()}
        <div className='hrv-menu scrollbar-menu'>
            <div className='hrv-menu-list'>
                {renderMenu()}
            </div>
            <div className='hrv-menu-left-flex-spacer'></div>
            <div className='hrv-menu-footer'>
            </div>
            <div className='hrv-menu-footer'>
                <div className='hrv-copyright-haravan'>Powered by Haravan</div>
            </div>
        </div>
    </div>
}
