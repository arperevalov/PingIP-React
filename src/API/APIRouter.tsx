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

    switch (action) {

        case APIRouterActions.getServers:
            try {
                const response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/`, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })

                const data = await response.json();
                if (response.ok) return data
                throw data.errors

            } catch (e) {
                throw e
            }
            break;

        case APIRouterActions.pingAllServers:
            try {
                const response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/pingAll`, {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })

                const data = await response.json();
                if (response.ok) return data
                throw data.errors
            } catch (e) {
                throw e
            }
            break;

        case APIRouterActions.getServerChildren: 
            try {
                const response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.id}/clients`, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })

                const data = await response.json();
                if (response.ok) return data
                throw data.errors
            } catch (e) {
                throw e
            }
            break;

        case APIRouterActions.pingServer:
            try {
                const response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.id}/ping`, {
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    })
                })

                const data = await response.json();
                if (response.ok) return data
                throw data.errors
            } catch (e) {
                throw e
            }
            break;

        case APIRouterActions.createServer:
            try {
                const response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/`, {
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

                const data = await response.json();
                if (response.ok) return data
                throw data.errors
            } catch (e) {
                throw e
            }
            break;

        case APIRouterActions.updateServer:
            try {
                const response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.id}`, {
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

                const data = await response.json();
                if (response.ok) return data
                throw data.errors
            } catch (e) {
                throw e
            }
            break;

        case APIRouterActions.deleteServer:
            try {
                const response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.id}`, {
                    method: 'DELETE',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })

                const data = await response.json()

                if (response.ok) return response
                throw data.errors
            } catch (e) {
                throw e
            }
            break;

        case APIRouterActions.pingAllCameras:
            try {
                const response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.id}/clients/pingall`, {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })
                const data = await response.json();
                if (response.ok) return data
                throw data.errors
            } catch (e) {
                throw e
            }
            break;
        
        case APIRouterActions.pingCamera:
            try {
                const response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.parentID}/clients/${params.id}/ping`, {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })

                const data = await response.json();
                if (response.ok) return data
                throw data.errors
            } catch (e) {
                throw e
            }
            break;

        case APIRouterActions.createCamera:
            try {
                const response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.parentID}/clients/`, {
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

                const data = await response.json();
                if (response.ok) return data
                throw data.errors
            } catch (e) {
                throw e
            }
            break;

        case APIRouterActions.updateCamera:
            try {
                const response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.parentID}/clients/${params.id}/`, {
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

                const data = await response.json();
                if (response.ok) return data
                throw data.errors
            } catch (e) {
                throw e
            }
            break;

        case APIRouterActions.deleteCamera:
            try {
                const response = await fetch(process.env.REACT_APP_API+`/api/v1/nodes/${params.parentID}/clients/${params.id}`, {
                    method: 'DELETE',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })

                const data = await response.json()

                if (response.ok) return response
                throw data.errors
            } catch (e) {
                throw e
            }
            break;
            
        case APIRouterActions.getAuth:
            try {
                const response = await fetch(process.env.REACT_APP_API+"/api/v1/auth/login", {
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

                const data = await response.json();
                if (response.ok) return data
                throw data.errors
            } catch (e) {
                throw e
            }
            break;

        case APIRouterActions.getLogs:
            try {
                const response = await fetch(process.env.REACT_APP_API+`/api/v1/log/`, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })

                const data = await response.json();
                if (response.ok) return data
                throw data.errors

            } catch (e) {
                throw e
            }
            break;

        case APIRouterActions.downloadFile:
            try {
                const response = await fetch(process.env.REACT_APP_API+`/api/v1/log/${params.id}/download`, {
                    method: 'GET',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + localStorage.getItem('Bearer').replace(/"/g, ''),
                        'Accept': 'application/json'
                    })
                })

                const data = await response.blob();
                const dataJSON = await response.json();

                const url = window.URL.createObjectURL(
                    new Blob([data]),
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

                if (response.ok) return data
                throw JSON.stringify(dataJSON.errors)
            } catch (e) {
                throw e
            }
            break;

        default:
            break;
    }
}