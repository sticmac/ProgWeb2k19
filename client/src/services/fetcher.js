const serverUrl = process.env.VUE_APP_SERVER_URL || "http://localhost:3000";

export default class Fetcher {

    static buildRequest(method, relativeURL){
        const myHeaders = new Headers();

        const contract = { method: method,
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default' };

        return new Request(serverUrl + relativeURL, contract);
    }

    static get(relativeURL, fetchCallback){
        const request = this.buildRequest('GET', relativeURL);
        this.fetchRequest(request, fetchCallback);
    }

    static post(relativeURL, fetchCallback){
        const request = this.buildRequest('POST', relativeURL);
        this.fetchRequest(request, fetchCallback);
    }

    static fetchRequest(request, fetchCallback){
        fetch(request)
        .then(
            (response) => {
                if (response.status != 200) {
                    // eslint-disable-next-line
                    console.error('Looks like there was a problem. Status Code: ' + response.status);
                    fetchCallback(false, null);
                }

                response.json().then((data) => {
                    fetchCallback(true, data);

                }).catch(function(err) {
                    // eslint-disable-next-line
                    console.error(err);
                    fetchCallback(false, null);
                });
            }
        )
        .catch(function(err) {
            // eslint-disable-next-line
            console.error('Fetch Error :-S', err);
            fetchCallback(false, null);
        });
    }
}

