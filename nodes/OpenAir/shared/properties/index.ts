import { INodeProperties } from 'n8n-workflow';
import * as common from './commonProperties';
import * as read from './readProperties';
import * as custom from './customApiProperties';
import * as delet from './deleteProperties';

export const allProperties: INodeProperties[] = [
    common.credTypeProperty,
    common.operationProperty,
    common.resourceProperty,
    common.requestAttributesProperty,
    read.methodProperty,
    read.filterProperty,
    read.limitProperty,
    read.userIdProperty,
    read.projectIdProperty,
    delet.idProperty,
    common.dataProperty,
    common.returnProperty,
    custom.customJsonProperty,
];