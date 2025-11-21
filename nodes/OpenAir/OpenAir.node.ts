import {
  IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
  NodeApiError,
} from 'n8n-workflow';
import { allProperties } from './shared/properties'
import { openAirCredentials } from './shared/credentials';
import { openAirHints } from './shared/hints';
import { prepareCustomRequest } from './shared/methods';
import { customInputObject } from './shared/oaTypes';
import { oaCommand } from './shared/static';

// Helper functions for better code organization
function validateOperation(operationParam: string): oaCommand {
    const operation = Object.values(oaCommand).find(cmd => cmd === operationParam);
    if (!operation) {
        throw new Error(`Invalid operation: ${operationParam}. Supported operations: ${Object.values(oaCommand).join(', ')}`);
    }
    return operation;
}

function parseFilterParameter(node: IExecuteFunctions): object {
    try {
        const rawFilter = node.getNodeParameter('filter', 0, {});
        if (typeof rawFilter === 'string' && rawFilter.trim()) {
            return JSON.parse(rawFilter);
        } else if (typeof rawFilter === 'object' && rawFilter !== null) {
            return rawFilter;
        }
        return {};
    } catch (error) {
        throw new NodeApiError(node.getNode(), {
            message: `Invalid JSON in filter parameter: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
    }
}

function parseCustomRequestData(customRequestParam: unknown): customInputObject[] {
    if (typeof customRequestParam === 'string') {
        try {
            return JSON.parse(customRequestParam) as customInputObject[];
        } catch (error) {
            throw new Error(`Invalid JSON in custom request: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    } else if (Array.isArray(customRequestParam)) {
        return customRequestParam as customInputObject[];
    }
    throw new Error('Custom request must be a JSON string or array');
}

export class OpenAir implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'SuiteProjects Pro',
    name: 'openAir',
    icon: { light: 'file:../../icons/openair.svg', dark: 'file:../../icons/openair.dark.svg' },
    group: [],
    description: 'Sends XML API request to SuiteProjects Pro',
    usableAsTool: true,
    defaultVersion: 1,
    version: [1],
    inputs: ['main'],
    outputs: ['main'],
    defaults: {
      name: 'SuiteProjects Pro'
    },
    hints: [
      ...openAirHints
    ],
    credentials: [
      ...openAirCredentials
    ],
    properties: [
      ...allProperties
    ]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const operation = this.getNodeParameter('operation', 0) as string;
    const authenticationType = this.getNodeParameter('authentication', 0) as string;
    let credentials: IDataObject;
    let xmlRequest = '';
    
    // Get credentials with better error handling
    try {
      if (authenticationType === 'basic') {
        credentials = await this.getCredentials('openAirBasicApi') as IDataObject;
      } else if (authenticationType === 'oAuth2') {
        credentials = await this.getCredentials('openAirOAuth2Api') as IDataObject;
      } else {
        throw new NodeApiError(this.getNode(), {message: 'Incorrect credentials type selected'});
      }
    } catch (error) {
      throw new NodeApiError(this.getNode(), {
        message: `Failed to retrieve credentials: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
    
    // Prepare request with better error handling
    try {
      if (operation === "customApiCall") {
        const customRequestParam = this.getNodeParameter('customRequestJson', 0);
        const rawRequestData = parseCustomRequestData(customRequestParam);
        xmlRequest = prepareCustomRequest(rawRequestData, credentials);
      } else {
        const rawRequestData = parseRequestParameters(this, operation);
        xmlRequest = prepareCustomRequest([rawRequestData], credentials);
      }
    } catch (error) {
      throw new NodeApiError(this.getNode(), {
        message: `Failed to prepare request: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
    
    return [[{json: {output: xmlRequest}, pairedItem: 0}]];
  }
}

function parseRequestParameters(node: IExecuteFunctions, operationParam: string): customInputObject {
    const operation = validateOperation(operationParam);
    const resourceParam = node.getNodeParameter('resource', 0, '') as string;
    const methodParam = node.getNodeParameter('method', 0, '') as string;
    const limitParam = node.getNodeParameter('limit', 0, 100) as number;
    const requestAttributesParam = node.getNodeParameter('requestAttributes', 0, []) as string[];
    const filterParam = parseFilterParameter(node);

    return {
        operation,
        resource: resourceParam,
        method: methodParam,
        limit: limitParam,
        enableCustom: requestAttributesParam.includes('enableCustom'),
        excludeFlags: requestAttributesParam.includes('excludeFlags'),
        performLookup: requestAttributesParam.includes('lookup'),
        data: { ...filterParam }
    };
}