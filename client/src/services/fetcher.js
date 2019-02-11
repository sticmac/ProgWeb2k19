const serverUrl = process.env.VUE_APP_SERVER_URL || "http://localhost:3000";

export default class Fetcher {

    static buildRequest(method, body, relativeURL){
        const myHeaders = new Headers();

        const contract = { 
            method: method,
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body : body
        };

        return new Request(serverUrl + relativeURL, contract);
    }

    static get(relativeURL, fetchCallback){
        const request = this.buildRequest('GET', null, relativeURL);
        this.fetchRequest(request, fetchCallback);
    }

    static post(relativeURL, body, fetchCallback){
        const request = this.buildRequest('POST', body, relativeURL);
        this.fetchRequest(request, fetchCallback);
    }

    static fetchRequest(request, fetchCallback){
        fetch(request)
        .then(
            (response) => {
                if (response.status != 200) {
                    // eslint-disable-next-line
                    console.warn('Looks like there was a problem. Status Code: ' + response.status);
                    fetchCallback(false, null);
                }

                response.json().then((data) => {
                    fetchCallback(true, data);

                }).catch(function(err) {
                    // eslint-disable-next-line
                    console.warn(err);
                    fetchCallback(false, null);
                });
            }
        )
        .catch(function(err) {
            // eslint-disable-next-line
            console.warn('Fetch Error :-S', err);
            fetchCallback(false, null);
        });
    }
}

