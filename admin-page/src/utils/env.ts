import React from 'react';
import * as H from 'history';
import { createBrowserHistory } from 'history';

let env = {
    baseUrl: '/',
    layout: null
}
export const Env = env;
export const history: H.History = createBrowserHistory();

export enum StatusCode {
    Success = 200,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    RequestUriTooLong = 414,
    InternalServerError = 500,
    ServiceUnavailable = 503
}

export const api_call_get = (apiId: string, path: string, errorSystem: string = '', errorMessageByCode?: Map<StatusCode, string>, headers: any[] = []): Promise<any> => {
    return api_call('GET', null, apiId, path, errorSystem, headers, errorMessageByCode);
}

export const api_call_post = (apiId: string, path: string, errorSystem: string, body: any, headers: any[] = []): Promise<any> => {
    return api_call('POST', body, apiId, path, errorSystem, headers);
}

export const api_call_put = (apiId: string, path: string, errorSystem: string, body: any, headers: any[] = []): Promise<any> => {
    return api_call('PUT', body, apiId, path, errorSystem, headers);
}

export const api_call_delete = (apiId: string, path: string, errorSystem: string = '', headers: any[] = []): Promise<any> => {
    return api_call('DELETE', null, apiId, path, errorSystem, headers);
}

const api_call = async (method: string, body: any, apiId: string, path: string, errorSystem: string, headers: any[] = [], errorMessageByCode?: Map<StatusCode, string>): Promise<any> => {
    let url = `${Env.baseUrl}call/${apiId}${path}`;

    // const webRequestUrl = _utils.upsertApiParams(baseUrl, 'clientType', ERquestClientType.WebClient)
    // const url = _utils.upsertApiParams(webRequestUrl, '_hid', document['requestKey'])

    let _headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    if (headers.length > 0) {
        headers.map(header => {
            _headers[header.name] = header.value
        });
    }

    // debugger

    try {
        let rp = await fetch(url, {
            method: method,
            body: body ? JSON.stringify(body) : null,
            credentials: 'include',
            headers: _headers
        });
        if (rp.status == 401) {
            if (env.layout) {
                env.layout.openPopupAuthorizeException();
                // await checkRefreshSessionFinish();
                return await api_call(method, body, apiId, path, errorSystem, headers, errorMessageByCode);
            }
        } else if (rp.status == 403) {
            if (env.layout)
                env.layout.redirectPagePermission(null)
        } else if (rp.status == StatusCode.RequestUriTooLong) {
            const message = errorMessageByCode?.get(StatusCode.RequestUriTooLong) || 'Không thể thực hiện do yêu cầu quá dài. Vui lòng thử lại sau.'
            // _utils.ShowError(message)
        } else if (rp.status == 200 || rp.status == 201 || rp.status == 304) {
            if (rp.headers.get("X-Haraworks-RequestData") && rp.headers.get("X-Haraworks-RequestData") != `${document["user"].OrgId}:${document["user"].Id}`) {
                if (env.layout)
                    env.layout.redirectPagePermission(rp.headers.get("X-Haraworks-RequestKey"))
                return { data: { data: [], length: 0 }, errors: true, totalCount: 0, message: "Bạn không có quyền để thực hiện thao tác này!" }
            }
            return await rp.json();
        } else {
            if (errorSystem) {
                // _utils.ShowError(errorSystem)
            }
        }
    }
    catch (e) {
        // _utils.ShowError('Xin lỗi, đã có lỗi khi thực hiện')

        throw e;
    }
    finally {

    }
}

export const api_upload_file = (blob: Blob, fileName: string): Promise<any> => {
    let url = `${Env.baseUrl}file/upload`;
    let input = new FormData();
    input.append('file', blob, fileName);

    return fetch(url, {
        method: 'POST',
        body: input,
        credentials: 'include'
    }).then(rsp => rsp != null ? rsp.json() : null)
}