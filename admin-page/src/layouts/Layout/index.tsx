import * as Components from '@dev/components';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import { PartialMenuLeft } from '../PartialMenuLeft';
// import { PATH } from '@dev/consts';
// import * as Utils from '@dev/env';
// import * as _utils from '@dev/_utils';
// import * as HrwComponents from '@haravan/hrw-react-components';
// import * as Sentry from "@sentry/react";
import * as classnames from 'classnames';
import * as H from 'history';
// import { observer } from 'mobx-react';
import './index.css';


interface ILayoutProps {
    routerHistory: H.History
}

interface AuthStates {
    loading: boolean,
    showMenu: boolean,
    id: number,
    name: string,
    username: string,
    avatar: string,
    orgId: number,
    orgName: string,
    showPopupAuthorizeException: boolean,
    openNotify: boolean,
    typeNotify: string,
    messageNotify: any,
    isMobileDevice: boolean,
    isClickMenuMobile: boolean
}

class Layout extends React.Component<ILayoutProps, AuthStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            showMenu: false,
            id: 0,
            name: '',
            username: '',
            avatar: '',
            orgId: 0,
            orgName: '',
            showPopupAuthorizeException: false,
            openNotify: false,
            typeNotify: '',
            messageNotify: '',
            isMobileDevice: false,
            isClickMenuMobile: false
        }
    }

    componentDidMount(this) {
        Utils.setLayout(this);

        let user = document['user'];

        this.setState({
            id: user.Id,
            name: user.Name,
            username: user.Email,
            avatar: user.Picture,
            orgId: user.OrgId,
            orgName: user.OrgName
        });

        checkIsMobileDevide(this)

    }

    componentWillUnmount(): void { }

    static childContextTypes = {
        ID: PropTypes.number,
        Name: PropTypes.string,
        Username: PropTypes.string,
        Avatar: PropTypes.string,
        OrgId: PropTypes.number,
        OrgName: PropTypes.string,
        ShowMessage: PropTypes.func,
        ClosePartialMenuLeft: PropTypes.func,
        RefMenu: PropTypes.any
    }

    getChildContext() {
        return {
            ID: this.state.id,
            Name: this.state.name,
            Username: this.state.username,
            Avatar: this.state.avatar,
            OrgId: this.state.orgId,
            OrgName: this.state.orgName,
            ShowMessage: this.ShowMessage.bind(this),
            ClosePartialMenuLeft: this.handleClickCloseMenu.bind(this),
        }
    }


    private ShowMessage(this, type: string, content?: any, duration?: number, isBottomMessage?: boolean, timeout?: number, callBack?: Function) {
        if (isBottomMessage) {
            let self = this;
            if (timeout == null) timeout = 3000;
            this.setState({
                isOpenNotify: true,
                typeNotify: type,
                contentNotify: content
            }, () => {
                setTimeout(function () {

                    self.setState({
                        isOpenNotify: false
                    }, () => { callBack && callBack() })
                }, timeout);
            });
        }
        else {
            this.setState(
                { contentNotify: content },
                () => {
                    if (type == 'success')
                        HrwComponents.Notification.success({
                            message: content,
                            duration: duration ? duration : 5,
                            placement: 'topRight',
                        })
                    else if (type == 'error')
                        HrwComponents.Notification.error({
                            message: content,
                            duration: duration ? duration : 5,
                            placement: 'topRight',
                        })
                })
        }
    }

    closeMessage() {
        this.setState({
            openNotify: false,
            messageNotify: <div></div>
        })
    }

    handleClickShowMenu() {
        this.setState({ showMenu: !this.state.showMenu });
    }

    handleClickCloseMenu() {
        this.setState({ showMenu: false });
    }

    public redirectPagePermission(reqKey: string) {
        if (reqKey)
            this.props.routerHistory.push(`${PATH.ERR_Permission}?requestKey=${reqKey}`)
        else
            this.props.routerHistory.push(PATH.ERR_Permission)
    }

    // openPopupAuthorizeException() {
    //     this.setState({ showPopupAuthorizeException: true });
    //     localStorage.setItem(Utils.KEY_STORAGE_OUT_SESSION, "1")
    // }

    // closePopupAuthorizeException() {
    //     Utils.createLinkBlank(window.location.origin + '/Account/Login?ReturnUrl=/sessionclose')
    //     this.setState({ showPopupAuthorizeException: false })
    // }

    // renderPopupAuthorizeException() {
    //     return this.state.showPopupAuthorizeException &&
    //         <Components.Modal
    //             isOpen={true}
    //             iconClose={false}
    //             backdrop='static'
    //             headerTitle='Thông báo'
    //             className='authorize-exception--popup'
    //             bodyContent={
    //                 <div className='authorize-exception'>
    //                     <div className='authorize-exception__icon'>{_utils.Icon.warning(46)}</div>
    //                     <div>Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.</div>
    //                 </div>
    //             }
    //             footerDisabledCloseModal={true}
    //             isBtnClose={false}
    //             footerContent={<div className='authorize-exception__footer'>
    //                 <HrwComponents.Button status='primary'
    //                     onClick={() => this.closePopupAuthorizeException()}
    //                     className='authorize-exception__footer__btn'>
    //                     <span className=''>{_utils.Icon.checkBlock(16, '#fff')}</span>
    //                     <div>Xác nhận</div>
    //                 </HrwComponents.Button>

    //             </div>}
    //         />
    // }

    public render() {
        let { isMobileDevice, isClickMenuMobile } = this.state

        if (this.state.loading)
            return <div>Loading</div>;

        // _utils.handleProjStatus()

        return <div className='ui-body'>
            <div className={classnames({
                'ui-wrapper': true,
                'eform-ui-mobile': isMobileDevice,
                'is-show-menu-mobile': isClickMenuMobile
            })}>
                {/* <HeaderOSC onClickMenu={handleClickMenuMobile(this)} isShowMenu={isClickMenuMobile} /> */}
                <React.Fragment>
                    <PartialMenuLeft />
                    {isClickMenuMobile && <div className='hrv-btn-close-mobile--eform' onClick={handleClickMenuMobile(this)}>
                        <button className='hrv-btn hrv-btn-default hrv-btn-close' type='button'>
                            {/* <HrwComponents.Icon type='times' theme='regular' /> */}
                        </button>
                    </div>}
                </React.Fragment>
                <main className='ui-main'>
                    <Components.Notification openNotify={this.state.openNotify}
                        typeNotify={this.state.typeNotify}
                        messageNotify={this.state.messageNotify}
                        handleCloseNotify={() => this.closeMessage()} />
                    {this.props.children}
                </main>
                {isClickMenuMobile && <div className='hrv-layout-backdrop' onClick={handleClickMenuMobile(this)}></div>}
            </div>
            <div className="ui-backdrop" onClick={() => this.handleClickShowMenu()}></div>
            {/* {this.renderPopupAuthorizeException()} */}
        </div>
    }

}

export default Sentry.withProfiler(observer(Layout))

const checkIsMobileDevide = (component: Layout) => {
    if (window.innerWidth < 500) {
        component.setState({ isMobileDevice: true })
    }
}

const handleClickMenuMobile = (component: Layout) => event => {
    component.setState({ isClickMenuMobile: !component.state.isClickMenuMobile })
}