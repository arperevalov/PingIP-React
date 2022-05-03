// TESTING PURPOSES
const getRandom = () => {
    return Math.random() >= 0.5 ? true : false
}
// TESTING PURPOSES

export enum APIRouterActions {
    getAuth,
    getServers,
    pingServer,
    pingCamera,
    getServerChildren
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
        case APIRouterActions.pingServer:

                resp = await fetch(`https://example.com/node/${params.id}`, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                })
            })
            // let respObj = await resp.json();
            return {
                "id": params.id,
                "status": getRandom(),
                "ip_address": "192.168.1.1",
                "last_ping": new Date()
            }
            return resp
            break;

        case APIRouterActions.getServerChildren: 
            return [{
                    "id": params.id*2,
                    "name": "Camera 1 at "+params.id+' node',
                    "status": getRandom(),
                    "ip_address": "192.168.1.1",
                    "last_ping": new Date()
                },
                {
                    "id": params.id*2+1,
                    "name": "Camera 2 at "+params.id+' node',
                    "status": getRandom(),
                    "ip_address": "192.168.1.1",
                    "last_ping": new Date()
                }
            ]
            break;
        
        case APIRouterActions.pingCamera:

            resp = await fetch(`https://example.com/node/${params.parentID}/${params.id}`, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                })
            })
            return {
                "id": params.id,
                "status": getRandom(),
                "ip_address": "192.168.1.1",
                "last_ping": new Date()
            }
            break;

        case APIRouterActions.getAuth:
            resp = await fetch("http://62.113.108.174:3200/api/v1/auth/login", {
                method: "POST",
                // mode: "no-cors",
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
            return {
                ok: true,
                body: {
                    username: "admin",
                    token: "sdfDF$sdfg$452gGSDf5svsfsds"
                }
              }
            break;

        case APIRouterActions.getServers:
            fetch(`/api/nodes/`, {
                method: 'GET',
                // mode: 'no-cors',
                headers: new Headers({
                    "Authorization": "Bearer " + localStorage.getItem('Bearer').replace(/"/g, ''),
                    "Accept": "application/json",
                })
            })
            .then(r => {
                r.json()})
            .then(r => {
                return r})
            .catch(e => {
                return e
            })
            break;

        default:
            break;
    }
}