export enum APIRouterActions {
    getAuth,
    getServers,
    pingServer,
    pingCamera,
    getServerChildren,
    pingAllServers,
    pingAllCameras
}

interface IParams {
    id?: number,
    login?: string,
    password?: string,
    parentID?: number
}

export async function APIRouter(action: APIRouterActions, params:IParams) {

    let resp: Response

    switch (action) {

        case APIRouterActions.getServers:
            return new Promise ((resolve, reject) => {
                fetch(`http://62.113.108.174:3200/api/v1/nodes/`, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })
                .then(r => {
                    return r.json()})
                .then(r => {
                    debugger
                    resolve(r)})
                .catch(e => {
                    reject(e)
                })
            })
            break;

        case APIRouterActions.pingAllServers:
            return new Promise ((resolve, reject) => {
                fetch(`http://62.113.108.174:3200/api/v1/nodes/pingAll`, {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })
                .then(r => {
                    return r.json()})
                .then(r => {
                    resolve(r)})
                .catch(e => {
                    reject(e)
                })
            })
            break;

        case APIRouterActions.getServerChildren: 
            return new Promise ((resolve, reject) => {
                fetch(`http://62.113.108.174:3200/api/v1/nodes/${params.id}/clients`, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })
                .then(r => {
                    return r.json()})
                .then(r => {
                    resolve(r)})
                .catch(e => {
                    reject(e)
                })
            })
            break;

        case APIRouterActions.pingServer:

            resp = await fetch(`http://62.113.108.174:3200/api/v1/nodes/${params.id}/ping`, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                })
            })
            let respObj = await resp.json();
            return respObj
            break;

        case APIRouterActions.pingAllCameras:
            return new Promise ((resolve, reject) => {
                fetch(`http://62.113.108.174:3200/api/v1/nodes/${params.id}/clients`, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })
                .then(r => {
                    return r.json()})
                .then(r => {
                    resolve(r)})
                .catch(e => {
                    reject(e)
                })
            })
            break;
        
        case APIRouterActions.pingCamera:
            return new Promise ((resolve, reject) => {
                fetch(`http://62.113.108.174:3200/api/v1/nodes/${params.parentID}/clients/${params.id}/ping`, {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })
                .then(r => {
                    return r.json()})
                .then(r => {
                    resolve(r)})
                .catch(e => {
                    reject(e)
                })
            })
            break;

        case APIRouterActions.getAuth:
            resp = await fetch("http://62.113.108.174:3200/api/v1/auth/login", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }),
                body: JSON.stringify({
                    username: params.login,
                    password: params.password
                })
            })

            if (resp.ok) {
                return {
                    ok: true,
                    body: await resp.json()
                }
            } else {
                return {
                    ok: false
                }
            }
            break;

        default:
            break;
    }
}