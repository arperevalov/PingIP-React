
export enum APIRouterActions {
    getAuth,
    getServers,
    pingServer,
    getServerChildren
}

interface IParams {
    id?: number,
    login?: string,
    password?: string
}

export async function APIRouter(action: APIRouterActions, params:IParams) {

    let resp: Response

    switch (action) {
        case APIRouterActions.pingServer:

                resp = await fetch("https://example.com/auth/login", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                })
            })

            // TESTING PURPOSES
                const getRandom = () => {
                    return Math.random() > 0.5 ? true : false
                }
            // TESTING PURPOSES

            // let respObj = await resp.json();
            let respObj = {
                // "id": 1,
                "id": params.id,
                // "status": true,
                "status": getRandom(),
                "ip_address": "192.168.1.1",
                // "last_ping": "2022-04-09 22:43:03"
                "last_ping": new Date()
            }

            return respObj
            break;
        
        case APIRouterActions.getAuth:

            resp = await fetch("https://example.com/auth/login", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: params.login,
                    password: params.password
                    })
            })
            
            // let respObj = await resp.json();

            return {
                username: "admin",
                token: "sdfDF$sdfg$452gGSDf5svsfsds"
              }
            break;
        default:
            break;
    }
}