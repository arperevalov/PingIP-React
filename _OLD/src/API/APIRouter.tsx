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
    mac_address?: string,
    description?: string
}

async function handleRequest (response: Response) {
    try {
        const data = await response.json();
        if (response.ok) return data
        throw data.errors

    } catch (e) {
        debugger
        throw e
    }
}

async function handleRequestLinks (response: Response, name: string|undefined) {
    try {
        const data = await response.blob();
        const url = window.URL.createObjectURL(
            new Blob([data]),
            );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download',
            `${name}.csv`,
            );
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);

        if (response.ok) return data
        const dataJSON = await response.json();
        throw JSON.stringify(dataJSON.errors)

    } catch (e) {
        throw e
    }
}

export async function APIRouter(action: APIRouterActions, params:IParams) {

    let response;

    switch (action) {

        case APIRouterActions.getServers:
            response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer')?.replace(/"/g, ''),
                    'Accept': 'application/json'
                })
            })

            return handleRequest(response)
            break;

        case APIRouterActions.pingAllServers:
            response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/pingAll`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer')?.replace(/"/g, ''),
                    'Accept': 'application/json'
                })
            })

            return handleRequest(response)
            break;

        case APIRouterActions.getServerChildren: 
            response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.id}/clients`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer')?.replace(/"/g, ''),
                    'Accept': 'application/json'
                })
            })

            return handleRequest(response)
            break;

        case APIRouterActions.pingServer:
            response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.id}/ping`, {
                method: "POST",
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer')?.replace(/"/g, ''),
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                })
            })

            return handleRequest(response)
            break;

        case APIRouterActions.createServer:
            response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer')?.replace(/"/g, ''),
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({
                    name: params.name,
                    ip_address: params.ip_address,
                    mac_address: params.mac_address,
                    description: params.description
                })
            })

            return handleRequest(response)
            break;

        case APIRouterActions.updateServer:
            response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.id}`, {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer')?.replace(/"/g, ''),
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({
                    name: params.name,
                    ip_address: params.ip_address,
                    mac_address: params.mac_address,
                    description: params.description
                })
            })

            return handleRequest(response)
            break;

        case APIRouterActions.deleteServer:
            response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer')?.replace(/"/g, ''),
                    'Accept': 'application/json'
                })
            })
            return handleRequest(response)
            break;

        case APIRouterActions.pingAllCameras:
            response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.id}/clients/pingall`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer')?.replace(/"/g, ''),
                    'Accept': 'application/json'
                })
            })

            return handleRequest(response)
            break;
        
        case APIRouterActions.pingCamera:
            response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.parentID}/clients/${params.id}/ping`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer')?.replace(/"/g, ''),
                    'Accept': 'application/json'
                })
            })

            return handleRequest(response)
            break;

        case APIRouterActions.createCamera:
            response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.parentID}/clients/`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer')?.replace(/"/g, ''),
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({
                    name: params.name,
                    ip_address: params.ip_address,
                    mac_address: params.mac_address,
                    description: params.description
                })
            })

            return handleRequest(response)
            break;

        case APIRouterActions.updateCamera:
            response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.parentID}/clients/${params.id}/`, {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer')?.replace(/"/g, ''),
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({
                    name: params.name,
                    ip_address: params.ip_address,
                    mac_address: params.mac_address,
                    description: params.description
                })
            })

            return handleRequest(response)
            break;

        case APIRouterActions.deleteCamera:
            response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.parentID}/clients/${params.id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer')?.replace(/"/g, ''),
                    'Accept': 'application/json'
                })
            })

            return handleRequest(response)
            break;
            
        case APIRouterActions.getAuth:
            response = await fetch(process.env.REACT_APP_API+"/api/v1/auth/login", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }),
                body: JSON.stringify({
                    username: params.login,
                    password: params.password
                })
            });

            return handleRequest(response)
            break;

        case APIRouterActions.getLogs:
            response = await fetch(process.env.REACT_APP_API+`/api/v1/log/`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer')?.replace(/"/g, ''),
                    'Accept': 'application/json'
                })
            })

            return handleRequest(response)
            break;

        case APIRouterActions.downloadFile:
            response = await fetch(process.env.REACT_APP_API+`/api/v1/log/${params.id}/download`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem('Bearer')?.replace(/"/g, ''),
                    'Accept': 'application/json'
                })
            })

            return handleRequestLinks(response, params.name)
            break;

        default:
            break;
    }
}