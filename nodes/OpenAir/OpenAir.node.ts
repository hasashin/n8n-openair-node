import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { openAirProperties } from './shared/properties'
import { openAirCredentials } from './shared/credentials';
import { openAirHints } from './shared/hints';

export class OpenAir implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'SuiteProjects Pro',
    name: 'openAir',
    icon: { light: 'file:../../icons/openair.svg', dark: 'file:../../icons/openair.dark.svg' },
    group: [],
    description: 'Sends XML API request to SuiteProjects Pro',
    usableAsTool: true,
    version: 1,
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
      ...openAirProperties
    ]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    throw 'Node execution not implemented yet'
  };
}