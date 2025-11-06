import { INodeCredentialDescription } from "n8n-workflow";

const basicOACredential: INodeCredentialDescription = {
    name: 'openAirBasicApi',
    required: true,
    displayOptions: {
        show: {
            authentication: ['basic'],
        },
    },
};

const oAuth2OACredential: INodeCredentialDescription = {
    name: 'openAirOAuth2Api',
    required: true,
    displayOptions: {
        show: {
            authentication: ['oauth2'],
        },
    },
};

export const openAirCredentials: INodeCredentialDescription[] = [
    basicOACredential,
    oAuth2OACredential,
];