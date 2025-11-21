import { INodeProperties } from "n8n-workflow";

export const customJsonProperty: INodeProperties = {
    displayName: 'Custom Request (JSON)',
    name: 'customRequestJson',
    type: 'json',
    default: '',
    required: true,
    hint: 'Please read the hint for required request format',
    displayOptions: {
        show: {
            operation: ['customApiCall']
        }
    }
}