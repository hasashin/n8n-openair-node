import { oaCommand } from './static';

export type oaAuthElement = {
    Login: {
        company : string,
        user :string,
        password : string,
    } | {
        access_token : string
    }
};

export type customInputObject = {
    operation: oaCommand,
    resource: string,
    method?: string,
    enableCustom?: boolean,
    excludeFlags?: boolean,
    performLookup?: boolean,
    limit: number,
    data: object,
};

export type oaDateObject = {
    Date: {
        year: number,
        month: number,
        day: number,
        hour: number,
        minute: number,
        second: number,
    }
}

export type oaFlagsObject = {
    flags: [
        Flag: {
            id?: number,
            name: string,
            setting: string
        }
    ]
}

export type oaAddrObject = {
    Address: {
        addr1?: string
        addr2?: string
        addr3?: string
        addr4?: string
        city?: string
        contact_id?: string
        country?: string
        customer_only?: string
        email?: string
        fax?: string
        first?: string
        id?: string
        last?: string
        middle?: string
        mobile?: string
        phone?: string
        salutation?: string
        state?: string
        zip?: string
    }
}

export type oaObject = {
    [property: string]: string | number | boolean | oaDateObject | oaFlagsObject | oaAddrObject;
}


export type oaGenericElement = {
    '$': {
        enable_custom?: string,
        exclude_flags?: string,
        lookup?: string
    }
} & {
    [genericParam: string]: oaObject | string
}

export type oaReadElement = oaGenericElement & {
    '$': {
        'type': string,
        'method': string,
        'limit': number
    },
};

export type oaCreateUserElement = {
    Company: {
        nickname: string
    }
    User: oaObject
}

// Type mapping for each operation
export type OperationDataMap = {
    [oaCommand.Read]: oaReadElement[];
    [oaCommand.Whoami]: string[];
    [oaCommand.Add]: oaGenericElement[];
    [oaCommand.Modify]: oaGenericElement[];
    [oaCommand.Delete]: oaGenericElement[];
    [oaCommand.CreateUser]: oaCreateUserElement[];
    [oaCommand.Approve]: oaGenericElement[];
    [oaCommand.Reject]: oaGenericElement[];
    [oaCommand.Submit]: oaGenericElement[];
    [oaCommand.Unapprove]: oaGenericElement[];
    [oaCommand.Report]: oaGenericElement[];
    [oaCommand.Time]: oaGenericElement[];
    [oaCommand.Version]: string[];
    [oaCommand.MakeURL]: oaGenericElement[];
    [oaCommand.ModifyOnCondition]: oaGenericElement[];
};

// Type helper for safe access to operations
export type RequestOperations = {
    [K in oaCommand]?: OperationDataMap[K];
};

// Improved oaJsonRequest type
export type UniversalJsonRequest = {
    '$': {
        API_version: "1.0", 
        client: string,
        client_ver: string,
        namespace: string,
        key: string
    },
    request: {
        Auth: oaAuthElement;
    } & RequestOperations;
};