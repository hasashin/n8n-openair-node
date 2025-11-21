import { INodeProperties } from "n8n-workflow";

export const idProperty: INodeProperties = {
    displayName: 'Object ID',
    name: 'objectId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
        show: {
            operation: ['Delete']
        }
    }
}