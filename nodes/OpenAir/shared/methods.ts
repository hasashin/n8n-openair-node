import type { 
    oaAuthElement,
    UniversalJsonRequest,
    customInputObject,
    oaReadElement, 
    oaGenericElement,
    oaObject
} from './oaTypes';
import { IDataObject } from 'n8n-workflow';
import { Builder/*, Parser*/ } from 'xml2js';
import { oaCommand } from './static';
import { name as moduleName, version as moduleVersion} from '../../../package.json';

function prepareRequest(rawRequestData: object): string {
    const builder = new Builder();
    return builder.buildObject(rawRequestData);
}

function generateAuthObject(credentials: IDataObject): oaAuthElement{
    let oaCredentials: oaAuthElement;
    if (!credentials.accessToken){ 
        if (!credentials.companyID || !credentials.username || !credentials.password){
            throw Error('No valid credentials data was not found!'); 
        }
        oaCredentials = {
            Login: {
                company: credentials.companyID as string, 
                user: credentials.username as string,
                password: credentials.password as string,
            }
        };
    }
    else {
        oaCredentials = {
            Login: {
                access_token: credentials.accessToken as string,
            }
        };
    }
    return oaCredentials;
}

export function prepareCustomRequest(rawRequestData: customInputObject[], credentials: IDataObject): string {
    const jsonRequest = createUniversalRequest(credentials);
    
    // Function map of handlers for operations requiring special logic
    const operationHandlers: Record<string, (action: customInputObject, request: UniversalJsonRequest) => void> = {
        [oaCommand.Read]: (action: customInputObject, request: UniversalJsonRequest) => {
            addReadOperation(request, action);
        },
        
        [oaCommand.Whoami]: (action: customInputObject, request: UniversalJsonRequest) => {
            addOperationElement(request, oaCommand.Whoami, '');
        },
        
        [oaCommand.Version]: (action: customInputObject, request: UniversalJsonRequest) => {
            addOperationElement(request, oaCommand.Version, '');
        }
    };
    
    // Generic function for other operations - uses new utility functions
    const handleGenericOperation = (action: customInputObject, request: UniversalJsonRequest) => {
        addGenericOperation(request, action);
    };
    
    // Processing each operation
    for (const [, op] of rawRequestData.entries()) {
        
        try {
            const handler = operationHandlers[op.operation];
            if (handler) {
                handler(op, jsonRequest);
            } else {
                handleGenericOperation(op, jsonRequest);
            }
        } catch (error) {
            throw new Error(`Failed to process operation ${op.operation}: ${error}`);
        }
    }
    
    return prepareRequest(jsonRequest);
}

// Additional utility functions for easier API usage
export function hasOperation(request: UniversalJsonRequest, operation: oaCommand): boolean {
    const requestObj = request.request as unknown as Record<string, unknown>;
    return !!requestObj[operation] && Array.isArray(requestObj[operation]) && (requestObj[operation] as unknown[]).length > 0;
}

export function getOperationData<T = unknown[]>(request: UniversalJsonRequest, operation: oaCommand): T | undefined {
    const requestObj = request.request as unknown as Record<string, T>;
    return requestObj[operation];
}

export function addOperationElement(request: UniversalJsonRequest, operation: oaCommand, element: oaGenericElement | oaReadElement | string): void {
    const requestObj = request.request as unknown as Record<string, unknown[]>;
    if (!requestObj[operation]) {
        requestObj[operation] = [];
    }
    (requestObj[operation] as (oaGenericElement | oaReadElement | string)[]).push(element);
}

// Function to create an empty UniversalJsonRequest
export function createUniversalRequest(credentials: IDataObject): UniversalJsonRequest {
    return {
        $: {
            API_version: '1.0',
            client: moduleName,
            client_ver: moduleVersion,
            namespace: credentials.namespace as string,
            key: credentials.apiKey as string
        },
        request: {
            Auth: generateAuthObject(credentials)
        }
    };
}

// Type-safe functions for specific operations
export function addReadOperation(request: UniversalJsonRequest, action: customInputObject): void {
    const readElement: oaReadElement = {
        '$': { 
            method: action.method || 'All', 
            type: action.resource, 
            limit: action.limit 
        }
    };
    if(action.enableCustom){ readElement.$.enable_custom = '1' }
    if(action.excludeFlags){ readElement.$.exclude_flags = '1' }
    if(action.performLookup){ readElement.$.lookup = '1' }
    readElement[action.resource] = { ...action.data } as oaObject;
    addOperationElement(request, oaCommand.Read, readElement);
}

export function addGenericOperation(request: UniversalJsonRequest, action: customInputObject): void {
    const element: oaGenericElement = { '$': {}, [action.resource]: action.data as oaObject };
    if(action.enableCustom){ element.$.enable_custom = '1' }
    if(action.excludeFlags){ element.$.exclude_flags = '1' }
    if(action.performLookup){ element.$.lookup = '1' }
    addOperationElement(request, action.operation, element);
}