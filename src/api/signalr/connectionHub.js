import * as signalR from '@microsoft/signalr';
import config from '~/config';

import { getTokenInCookies } from "~/utils/index"

const baseURL = config.apiBaseUrl;

const connectionHub = (hubName) => {
    return new signalR.HubConnectionBuilder()
        .withUrl(`${baseURL}${hubName}`, {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets,
            accessTokenFactory: () => getTokenInCookies(),
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();
};

export default connectionHub;
