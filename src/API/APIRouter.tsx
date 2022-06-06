export enum APIRouterActions {
    getAuth,
    getServers,
    pingAllServers,
    pingServer,
    getServerChildren,
    createServer,
    updateServer,
    deleteServer,
    pingCamera,
    pingAllCameras,
    createCamera,
    updateCamera,
    deleteCamera,
    getLogs,
    downloadFile
}

interface IParams {
    id?: number,
    login?: string,
    password?: string,
    parentID?: number,
    name?: string,
    ip_address?: string,
    description?: string
}

export async function APIRouter(action: APIRouterActions, params:IParams) {

    let resp: Response

    switch (action) {

        case APIRouterActions.getServers:
            return new Promise ((resolve, reject) => {
                fetch(process.env.REACT_APP_API+`/api/v1/nodes/`, {
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

        case APIRouterActions.pingAllServers:
            return new Promise ((resolve, reject) => {
                fetch(process.env.REACT_APP_API+`/api/v1/nodes/pingAll`, {
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
                fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.id}/clients`, {
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
            return new Promise ((resolve, reject) => {
            fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.id}/ping`, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
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

        case APIRouterActions.createServer:
            return new Promise ((resolve, reject) => {
                fetch(process.env.REACT_APP_API+`/api/v1/nodes/`, {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json',
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify({
                        name: params.name,
                        ip_address: params.ip_address,
                        description: params.description
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

        case APIRouterActions.updateServer:
            return new Promise ((resolve, reject) => {
                fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.id}`, {
                    method: 'PUT',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json',
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify({
                        name: params.name,
                        ip_address: params.ip_address,
                        description: params.description
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

        case APIRouterActions.deleteServer:
            return new Promise ((resolve, reject) => {
                fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.id}`, {
                    method: 'DELETE',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })
                .then(r => {
                    if (r.ok) resolve(r)})
                .catch(e => {
                    reject(e)
                })
            })
            break;

        case APIRouterActions.pingAllCameras:
            return new Promise ((resolve, reject) => {
                fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.id}/clients`, {
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
                fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.parentID}/clients/${params.id}/ping`, {
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

        case APIRouterActions.createCamera:
            return new Promise ((resolve, reject) => {
                fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.parentID}/clients/`, {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json',
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify({
                        name: params.name,
                        ip_address: params.ip_address,
                        description: params.description
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

        case APIRouterActions.updateCamera:
            return new Promise ((resolve, reject) => {
                fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.parentID}/clients/${params.id}/`, {
                    method: 'PUT',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json',
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify({
                        name: params.name,
                        ip_address: params.ip_address,
                        description: params.description
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

        case APIRouterActions.deleteCamera:
            return new Promise ((resolve, reject) => {
                fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.parentID}/clients/${params.id}`, {
                    method: 'DELETE',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })
                .then(r => {
                    if (r.ok) resolve(r)})
                .catch(e => {
                    reject(e)
                })
            })
            break;
            
        case APIRouterActions.getAuth:
            return new Promise ((resolve, reject) => {
                fetch(process.env.REACT_APP_API+"/api/v1/auth/login", {
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

                .then(r => {
                    return r.json()})
                .then(r => {
                    resolve(r)})
                .catch(e => {
                    reject(e)
                })
            })
            break;

        case APIRouterActions.getLogs:
            return new Promise ((resolve, reject) => {
                fetch(process.env.REACT_APP_API+`/api/v1/log/`, {
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

        case APIRouterActions.downloadFile:
            return new Promise ((resolve, reject) => {
                fetch(process.env.REACT_APP_API+`/api/v1/log/${params.id}/download`, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })
                .then((response) => response.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(
                    new Blob([blob]),
                    );
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute(
                    'download',
                    `${params.name}.csv`,
                    );
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                    resolve(blob)
                })
                .catch(e=>{
                    reject(e)
                });
            })
            break;

        default:
            break;
    }
}