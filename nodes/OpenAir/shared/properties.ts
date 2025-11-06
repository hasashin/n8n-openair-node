import type { INodeProperties } from 'n8n-workflow';

const credTypeProperty: INodeProperties = {
    displayName: 'Authentication',
    name: 'authentication',
    type: 'options',
    default: 'basic',
    options: [
        { name: 'Basic', value: 'basic' },
        { name: 'OAuth2', value: 'oauth2' },
    ]
};

const operationProperty: INodeProperties = {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    default: 'read',
    noDataExpression: true,
    options: [
        {name: 'Modify', value: 'modify'},
        {name: 'Read', value: 'read'},
        {name: 'Custom API Call', value: 'customApiCall'}
    ]
};

const customJsonProperty: INodeProperties = {
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

const resourceProperty: INodeProperties = {
    displayName: 'Resource',
    name: 'resource',
    type: 'options',
    noDataExpression: true,
    default: 'accountingperiod',
    options: [
        { name: "AccountingPeriod",value: "accountingperiod" },
        { name: "Actualcost",value: "actualcost" },
        { name: "Address",value: "address" },
        { name: "Agreement",value: "agreement" },
        { name: "Agreement_to_project",value: "agreement_to_project" },
        { name: "ApprovalLine",value: "approvalline" },
        { name: "ApprovalProcess",value: "approvalprocess" },
        { name: "Attachment",value: "attachment" },
        { name: "Attribute",value: "attribute" },
        { name: "AttributeDescription",value: "attributedescription" },
        { name: "Attributeset",value: "attributeset" },
        { name: "BillingSplit",value: "billingsplit" },
        { name: "Booking",value: "booking" },
        { name: "Booking_request",value: "booking_request" },
        { name: "BookingByDay",value: "bookingbyday" },
        { name: "BookingType",value: "bookingtype" },
        { name: "Budget",value: "budget" },
        { name: "BudgetAllocation",value: "budgetallocation" },
        { name: "Category",value: "category" },
        { name: "Category_<N>",value: "category_<n>" },
        { name: "Ccrate",value: "ccrate" },
        { name: "Company",value: "company" },
        { name: "Contact",value: "contact" },
        { name: "Costcategory",value: "costcategory" },
        { name: "Costcenter",value: "costcenter" },
        { name: "Costtype",value: "costtype" },
        { name: "Currency",value: "currency" },
        { name: "Currencyrate",value: "currencyrate" },
        { name: "CustField",value: "custfield" },
        { name: "Customer",value: "customer" },
        { name: "CustomerLocation",value: "customerlocation" },
        { name: "Customerpo",value: "customerpo" },
        { name: "Customerpo_to_project",value: "customerpo_to_project" },
        { name: "CustomerProspect",value: "customerprospect" },
        { name: "Deal",value: "deal" },
        { name: "Dealcontact",value: "dealcontact" },
        { name: "Dealschedule",value: "dealschedule" },
        { name: "Department",value: "department" },
        { name: "Entitytag",value: "entitytag" },
        { name: "Envelope",value: "envelope" },
        { name: "Estimate",value: "estimate" },
        { name: "Estimateadjustment",value: "estimateadjustment" },
        { name: "Estimateexpense",value: "estimateexpense" },
        { name: "Estimatelabor",value: "estimatelabor" },
        { name: "Estimatemarkup",value: "estimatemarkup" },
        { name: "Estimatephase",value: "estimatephase" },
        { name: "Event",value: "event" },
        { name: "ExpensePolicy",value: "expensepolicy" },
        { name: "ExpensePolicyItem",value: "expensepolicyitem" },
        { name: "Filter",value: "filter" },
        { name: "Filterset",value: "filterset" },
        { name: "ForexInput",value: "forexinput" },
        { name: "Fulfillment",value: "fulfillment" },
        { name: "Hierarchy",value: "hierarchy" },
        { name: "HierarchyNode",value: "hierarchynode" },
        { name: "History",value: "history" },
        { name: "HistoryNotes",value: "historynotes" }, // eslint-disable-line n8n-nodes-base/node-param-resource-with-plural-option
        { name: "ImportExport",value: "importexport" },
        { name: "Invoice",value: "invoice" },
        { name: "InvoiceLayout",value: "invoicelayout" },
        { name: "Issue",value: "issue" },
        { name: "IssueCategory",value: "issuecategory" },
        { name: "IssueSeverity",value: "issueseverity" },
        { name: "IssueSource",value: "issuesource" },
        { name: "IssueStage",value: "issuestage" },
        { name: "IssueStatus",value: "issuestatus" },
        { name: "Item",value: "item" },
        { name: "ItemToUserLocation",value: "itemtouserlocation" },
        { name: "Jobcode",value: "jobcode" },
        { name: "JobCodeUsed",value: "jobcodeused" },
        { name: "Leave_accrual_rule",value: "leave_accrual_rule" },
        { name: "Leave_accrual_rule_to_user",value: "leave_accrual_rule_to_user" },
        { name: "Leave_accrual_transaction",value: "leave_accrual_transaction" },
        { name: "LoadedCost",value: "loadedcost" },
        { name: "Module",value: "module" },
        { name: "Newsfeed",value: "newsfeed" },
        { name: "NewsfeedMessage",value: "newsfeedmessage" },
        { name: "Payment",value: "payment" },
        { name: "Paymentterms",value: "paymentterms" },
        { name: "Paymenttype",value: "paymenttype" },
        { name: "Payrolltype",value: "payrolltype" },
        { name: "PendingBooking",value: "pendingbooking" },
        { name: "Preference",value: "preference" },
        { name: "Product",value: "product" },
        { name: "Project",value: "project" },
        { name: "Projectassign",value: "projectassign" },
        { name: "ProjectAssignmentProfile",value: "projectassignmentprofile" },
        { name: "Projectbillingrule",value: "projectbillingrule" },
        { name: "Projectbillingtransaction",value: "projectbillingtransaction" },
        { name: "ProjectBudgetGroup",value: "projectbudgetgroup" },
        { name: "ProjectBudgetRule",value: "projectbudgetrule" },
        { name: "ProjectBudgetTransaction",value: "projectbudgettransaction" },
        { name: "Projectgroup",value: "projectgroup" },
        { name: "Projectlocation",value: "projectlocation" },
        { name: "ProjectPricing",value: "projectpricing" },
        { name: "ProjectStage",value: "projectstage" },
        { name: "Projecttask",value: "projecttask" },
        { name: "Projecttask_type",value: "projecttask_type" },
        { name: "Projecttaskassign",value: "projecttaskassign" },
        { name: "ProjecttaskEstimate",value: "projecttaskestimate" },
        { name: "Proposal",value: "proposal" },
        { name: "Proposalblock",value: "proposalblock" },
        { name: "Proxy",value: "proxy" },
        { name: "Purchase_item",value: "purchase_item" },
        { name: "Purchaseorder",value: "purchaseorder" },
        { name: "Purchaser",value: "purchaser" },
        { name: "Purchaserequest",value: "purchaserequest" },
        { name: "Ratecard",value: "ratecard" },
        { name: "RateCardItem",value: "ratecarditem" },
        { name: "Reimbursement",value: "reimbursement" },
        { name: "Repeat",value: "repeat" },
        { name: "Report",value: "report" },
        { name: "Request_item",value: "request_item" },
        { name: "ResourceAttachment",value: "resourceattachment" },
        { name: "Resourceprofile",value: "resourceprofile" },
        { name: "Resourceprofile_type",value: "resourceprofile_type" },
        { name: "ResourceRequest",value: "resourcerequest" },
        { name: "ResourceRequestQueue",value: "resourcerequestqueue" },
        { name: "Resourcesearch",value: "resourcesearch" },
        { name: "Revenue_recognition_rule",value: "revenue_recognition_rule" },
        { name: "Revenue_recognition_rule_amount",value: "revenue_recognition_rule_amount" },
        { name: "Revenue_recognition_transaction",value: "revenue_recognition_transaction" },
        { name: "RevenueContainer",value: "revenuecontainer" },
        { name: "RevenueProjection",value: "revenueprojection" },
        { name: "RevenueStage",value: "revenuestage" },
        { name: "Role",value: "role" },
        { name: "Schedulebyday",value: "schedulebyday" },
        { name: "Scheduleexception",value: "scheduleexception" },
        { name: "Schedulerequest",value: "schedulerequest" },
        { name: "Schedulerequest_item",value: "schedulerequest_item" },
        { name: "Slip",value: "slip" },
        { name: "SlipProjection",value: "slipprojection" },
        { name: "Slipstage",value: "slipstage" },
        { name: "SummaryView",value: "summaryview" },
        { name: "TagGroup",value: "taggroup" },
        { name: "TagGroupAttribute",value: "taggroupattribute" },
        { name: "TargetUtilization",value: "targetutilization" },
        { name: "Task",value: "task" },
        { name: "TaskAdjustment",value: "taskadjustment" },
        { name: "TaskTimecard",value: "tasktimecard" },
        { name: "TaxLocation",value: "taxlocation" },
        { name: "TaxRate",value: "taxrate" },
        { name: "Term",value: "term" },
        { name: "ThreadedMessage",value: "threadedmessage" },
        { name: "Ticket",value: "ticket" },
        { name: "Timecard",value: "timecard" },
        { name: "Timesheet",value: "timesheet" },
        { name: "Timetype",value: "timetype" },
        { name: "Todo",value: "todo" },
        { name: "Uprate",value: "uprate" },
        { name: "User",value: "user" },
        { name: "UserLocation",value: "userlocation" },
        { name: "UserWorkschedule",value: "userworkschedule" },
        { name: "Vendor",value: "vendor" },
        { name: "Viewfilter",value: "viewfilter" },
        { name: "Viewfilterrule",value: "viewfilterrule" },
        { name: "WorkscheduleWorkhour",value: "workscheduleworkhour" },
        { name: "Workspace",value: "workspace" },
        { name: "Workspacelink",value: "workspacelink" },
        { name: "Workspaceuser",value: "workspaceuser" },
    ],
    displayOptions: {
        hide: {
            operation: ['customApiCall']
        }
    }
};

const enableCustomProperty: INodeProperties = {
    displayName: 'Enable Custom Fields',
    name: 'enableCustom',
    type: 'boolean',
    default: true,
    displayOptions: {
        hide: {
            operation: ['customApiCall']
        }
    }
};

const limitProperty: INodeProperties = {
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
        hide: {
            operation: ['customApiCall']
        }
    }
};

const methodProperty: INodeProperties = {
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
            operation: ['read']
        }
    }
};

const filterProperty: INodeProperties = {
    displayName: 'Filter',
    name: 'filter',
    type: 'json',
    default: '',
    displayOptions: {
        show: {
            operation: ['read'],
            method: ['equalTo', 'customEqualTo', 'notEqualTo']
        }
    }
};

export const openAirProperties: INodeProperties[] = [
    credTypeProperty,
    operationProperty,
    customJsonProperty,
    resourceProperty,
    enableCustomProperty,
    limitProperty,
    methodProperty,
    filterProperty,
];