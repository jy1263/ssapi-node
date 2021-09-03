export = SSAPI;
declare class SSAPI {
    /**
     * Base URI for requests made using SSAPI.
     * @member {string} apiBase
     */
    apiBase: string;
    /**
     * API key for requests made using Connect API..
     * @member {string} apiBase
     */
    connectAppApiKey: any;
    /**
     * Explicitly set the API Base URI.
     * @param {string} newApiBase
     */
    setApiBase(newApiBase?: string): void;
    /**
     * Set the Connect API's key.
     * @param {string} newConnectAppApiKey
     */
    setConnectAppApiKey(newConnectAppApiKey: string): void;
    /**
     * Gets data from {apiBase}/{apiEndpoint}.
     * @param {string} apiEndpoint
     * @param {boolean} showResponseData
     * @returns {boolean|any}
     */
    getOpenData(apiEndpoint: string, showResponseData: boolean): boolean | any;
    /**
     * Posts data to {apiBase}/{apiEndpoint}.
     * @param {string} apiEndpoint
     * @param {Object|string} apiData
     * @param {boolean} showResponseData
     * @returns {boolean|any}
     */
    postOpenData(apiEndpoint: string, apiData: any | string, showResponseData: boolean): boolean | any;
    /**
     * Gets a connect token from a connect code.
     * @param {string} connectCode
     * @returns {string|boolean}
     */
    getConnectToken(connectCode: string): string | boolean;
    /**
     * Verifies a connect token's legitimacy.
     * @param {string} connectToken
     * @returns {boolean}
     */
    validateConnectToken(connectToken: string): boolean;
    getConnectData(endpoint: any, connectToken: any): Promise<any>;
    clearConnectNotification(connectToken: any, notificationID: any): Promise<any>;
    clearAllConnectNotifications(connectToken: any): Promise<any>;
}
