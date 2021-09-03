const axios = require('axios');

class SSAPI {
    /** 
     * Base URI for requests made using SSAPI.
     * @member {string} apiBase 
     */
    apiBase = "https://spinsha.re/api/";
	
    /** 
     * API key for requests made using Connect API..
     * @member {string} apiBase 
     */
    connectAppApiKey;

    /**
     * Explicitly set the API Base URI.
     * @param {string} newApiBase
     */
	setApiBase(newApiBase = "http://localhost/www/spinshare/server/public/api/") {
		this.apiBase = newApiBase;
	}
	
    /**
     * Set the Connect API's key.
     * @param {string} newConnectAppApiKey 
     */
	setConnectAppApiKey(newConnectAppApiKey) {
		this.connectAppApiKey = newConnectAppApiKey;
	}

    /**
     * Gets data from {apiBase}/{apiEndpoint}.
     * @param {string} apiEndpoint 
     * @param {boolean} showResponseData 
     * @returns {boolean|any}
     */
    async getOpenData(apiEndpoint, showResponseData) {
        let apiPath = this.apiBase + apiEndpoint;

        return axios.get(apiPath)
            .then(function(response) {
                if(showResponseData) {
                    return response.data;
                } else {
                    return response.data.data;
                }
            }).catch(function(error) {
                console.error(error);
                return false;
            });
    }

    /**
     * Posts data to {apiBase}/{apiEndpoint}.
     * @param {string} apiEndpoint 
     * @param {Object|string} apiData 
     * @param {boolean} showResponseData 
     * @returns {boolean|any}
     */
    async postOpenData(apiEndpoint, apiData, showResponseData) {
        let apiPath = this.apiBase + apiEndpoint;

        return axios.post(apiPath, JSON.stringify(apiData))
            .then(function(response) {
                if(showResponseData) {
                    return response.data;
                } else {
                    return response.data.data;
                }
            }).catch(function(error) {
                console.error(error);
                return false;
            });
    }

    /**
     * Gets a connect token from a connect code.
     * @param {string} connectCode 
     * @returns {string|boolean}
     */
    async getConnectToken(connectCode) {
        let apiPath = this.apiBase + "connect/getToken?connectCode=" + connectCode + "&connectAppApiKey=" + this.connectAppApiKey;

        console.log("[API] Get Token");

        return axios.get(apiPath)
        .then(function(response) {
            switch(response.data.status) {
                case 200:
                    return response.data;
                case 403:
                    return false;
                case 500:
                    return false;
            }
        }).catch(function(error) {
            console.error(error);
            return false;
        });
    }

    /**
     * Verifies a connect token's legitimacy.
     * @param {string} connectToken 
     * @returns {boolean}
     */
    async validateConnectToken(connectToken) {
        let apiPath = this.apiBase + "connect/validateToken/?connectToken=" + connectToken;

        console.log("[API] Validate Token");

        return axios.get(apiPath)
        .then(function(response) {
            switch(response.data.status) {
                case 200:
                    return true;
                case 403:
                    return false;
                case 500:
                    return false;
            }
        }).catch(function(error) {
            console.error(error);
            return false;
        });
    }

    async getConnectData(endpoint, connectToken) {
        return this.getOpenData("connect/" + endpoint + "/?connectToken=" + connectToken, false);
    }

    async clearConnectNotification(connectToken, notificationID) {
        return this.getOpenData("connect/clearNotification/?connectToken=" + connectToken + "&notificationID=" + notificationID, false);
    }

    async clearAllConnectNotifications(connectToken) {
        return this.getOpenData("connect/clearAllNotifications/?connectToken=" + connectToken, false);
    }
}

module.exports = SSAPI;