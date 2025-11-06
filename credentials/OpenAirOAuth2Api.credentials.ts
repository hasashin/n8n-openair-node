import type { Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class OpenAirOAuth2Api implements ICredentialType {
    name = 'openAirOAuth2Api';

    extends = ['oAuth2Api'];

    displayName = 'SuiteProjects Pro OAuth2 API';

    icon: Icon = { light: 'file:../icons/openair.svg', dark: 'file:../icons/openair.dark.svg' };

    documentationUrl = 'https://docs.oracle.com/en/cloud/saas/netsuite-suiteprojects-pro/online-help/article_5124033554.html#subsect_83154027669';

    properties: INodeProperties[] = [
        {
            displayName: 'Authorization URL',
            name: 'authUrl',
            type: 'string',
            default: 'https://<company-id>.app.netsuitesuiteprojectspro.com/login/oauth2/v1/authorize',
            required: true,
        },
        {
            displayName: 'Access Token URL',
            name: 'accessTokenUrl',
            type: 'string',
            default: 'https://<company-id>.app.netsuitesuiteprojectspro.com/login/oauth2/v1/token',
            required: true,
        },
        {
            displayName: 'Scope',
            name: 'scope',
            type: 'hidden',
            default: 'xml',
        },
        {
            displayName: 'Auth URI Query Parameters',
            name: 'authQueryParameters',
            type: 'hidden',
            default: 'response_type=code',
        },
        {
            displayName: 'namespace',
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
        {
            displayName: 'Authentication',
            name: 'authentication',
            type: 'hidden',
            default: 'qs',
        },
        {
            displayName: 'State',
            name: 'state',
            type: 'hidden',
            default: 'n8n-state-' + (new Date().toJSON()),
        },
    ];
}
