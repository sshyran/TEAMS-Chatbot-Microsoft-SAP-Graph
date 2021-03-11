// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

require('isomorphic-fetch');
const { Client } = require('@microsoft/microsoft-graph-client');

/**
 * This class is a wrapper for the Microsoft Graph API.
 * See: https://developer.microsoft.com/en-us/graph for more information.
 */
class SimpleGraphClient {
    constructor(token) {
        if (!token || !token.trim()) {
            throw new Error('SimpleGraphClient: Invalid token received.');
        }

        this._token = token;

        // Get an Authenticated Microsoft Graph client using the token issued to the user.
        this.graphClient = Client.init({
            authProvider: (done) => {
                done(null, this._token); // First parameter takes an error if you can't get an access token.
            }
        });
    }

    /**
     * Gets recent mail the user has received within the last hour and displays up to 5 of the emails in the bot.
     */
    async getRecentMail() {
        return await this.graphClient
            .api('/me/messages')
            .version('beta')
            .get().then((res) => {
                return res;
            });
    }

    /**
     * Collects information about the user in the bot.
     */
    async getMe() {
        return await this.graphClient
            .api('/me')
            .get().then((res) => {
                return res;
            });
    }
}

exports.SimpleGraphClient = SimpleGraphClient;
