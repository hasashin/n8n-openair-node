import { INodeProperties } from "n8n-workflow";

export const methodProperty: INodeProperties = {
    displayName: 'Method',
    name: 'method',
    type: 'options',
    default: 'all',
    options: [
        {name: 'All', value: 'all'},
        {name: 'Custom Equal To', value: 'customEqualTo'},
        {name: 'Equal To', value: 'equalTo'},
        {name: 'Not Equal To', value: 'notEqualTo'},
        {name: 'Project', value: 'project'},
        {name: 'User', value: 'user'},
    ],
    displayOptions:{
        show: {
            operation: ['Read']
        }
    }
};

export const filterProperty: INodeProperties = {
    displayName: 'Filter',
    name: 'filter',
    type: 'json',
    default: '{}',
    displayOptions: {
        show: {
            operation: ['Read'],
            method: ['equalTo', 'customEqualTo', 'notEqualTo']
        }
    }
};

export const userIdProperty: INodeProperties = {
    displayName: 'User ID',
    name: 'userId',
    type: 'number',
    default: '',
    displayOptions: {
        show: {
            operation: ['Read'],
            method: ['user']
        }
    }
};

export const projectIdProperty: INodeProperties = {
    displayName: 'Project ID',
    name: 'projectId',
    type: 'number',
    default: '',
    displayOptions: {
        show: {
            operation: ['Read'],
            method: ['project']
        }
    }
};

export const limitProperty: INodeProperties = {
    displayName: 'Limit',
    description: 'Max number of results to return',
    name: 'limit',
    type: 'number',
    default: 100, // eslint-disable-line n8n-nodes-base/node-param-default-wrong-for-limit
    typeOptions: {
        minValue: 0, // eslint-disable-line n8n-nodes-base/node-param-min-value-wrong-for-limit
        maxValue: 1000
    },
    displayOptions: {
        show: {
            operation: ['Read']
        }
    }
};