import { NodeHint } from "n8n-workflow";

const customJsonNodeHint: NodeHint = {
    // The hint message. You can use HTML.
    message: `<p>
    <b>Custom API Call</b> operation requires specific format of data to be passed.<br>
    Request needs to be an <b>array of objects</b> of which each have to include following keys:
    <ul>
        <li>operation - name of XML API command </li>
        <li>resource - name of XML API object</li>
    </ul>
    </p>
    <p>
    Other optional keys which are supported:
    <ul>
        <li>method (default: 'All') - name of Read Method (not relevant for other methods)</li>
        <li>enableCustom (default: true) - controls if custom fields will be included in response</li>
        <li>data (default: '') - resource's details. For Read request it acts like filter, for other methods specifies resource information to Add, Modify, etc.</li>
    `,
    // Choose from: info, warning, danger. The default is 'info'.
    // Changes the color. info (grey), warning (yellow), danger (red)
    type: 'info',
    // Choose from: inputPane, outputPane, ndv. By default n8n displays the hint in both the input and output panels.
    location: 'outputPane',
    // Choose from: always, beforeExecution, afterExecution. The default is 'always'
    whenToDisplay: 'always',
    // Optional. An expression. If it resolves to true, n8n displays the message. Defaults to true.
    displayCondition: '={{ $parameter["operation"] === "customApiCall" }}'
}

export const openAirHints: NodeHint[] = [
    customJsonNodeHint,
]