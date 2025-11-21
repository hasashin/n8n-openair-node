import type {
    IAuthenticateGeneric,
    Icon,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class OpenAirBasicApi implements ICredentialType {
    name = 'openAirBasicApi';

    displayName = 'SuiteProjects Pro Basic API';

    icon: Icon = { light: 'file:../icons/openair.svg', dark: 'file:../icons/openair.dark.svg' };

    documentationUrl =
        'https://docs.oracle.com/en/cloud/saas/netsuite-suiteprojects-pro/online-help/article_5124033554.html#subsect_83154027669';

    properties: INodeProperties[] = [
        {
            displayName: 'Company ID',
            name: 'companyID',
            type: 'string',
            required: true,
            typeOptions: {},
            default: '',
        },
        {
            displayName: 'Username',
            name: 'username',
            type: 'string',
            required: true,
            typeOptions: { },
            default: '',
        },
        {
            displayName: 'Password',
            name: 'password',
            type: 'string',
            required: true,
            typeOptions: { password: true },
            default: '',
        },
        {
            displayName: 'Namespace',
            name: 'namespace',
            type: 'string',
            required: true,
            typeOptions: { },
            default: 'default',
        },
        {
            displayName: 'API key',
            name: 'apiKey',
            type: 'string',
            required: true,
            typeOptions: { password: true },
            default: '',
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            body: {
                username: '={{$credentials.username}}',
                password: '={{$credentials.password}}',
            },
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: '=https://{{$credentials?.companyID.toLowerCase().replace(" ","-").replace(".","")}}.app.netsuitesuiteprojectspro.com',
            url: '/api.pl',
            method: 'POST',
        },
    };
}