import { NodeHint } from "n8n-workflow";

const customJsonNodeHint: NodeHint = {
    // The hint message. You can use HTML.
    message: `<p>
    <b>Custom API Call</b> operation requires specific format of data to be passed.<br>
    Request needs to be an <b>array of objects</b> of which each have to include following keys:<br>
    -&nbsp;<i>operation</i> (string): name of XML API command <br>
    -&nbsp;<i>resource</i> (string): name of XML API object
    <br><br>
    Other optional keys which are supported: <br>
    -&nbsp;<i>method</i> (string, default: 'All'): name of Read Method (not relevant for other methods) <br>
    -&nbsp;<i>enableCustom</i> (boolean, default: true): controls if custom fields will be included in response <br>
    -&nbsp;<i>limit</i> (int, default: 100): limits amount of response objects returned <br>
    -&nbsp;<i>data</i> (object, default: {}): resource's details. For Read request it acts like filter, for other methods specifies resource information to Add, Modify, etc. <br>
    </p>`,
    // Choose from: info, warning, danger. The default is 'info'.
    // Changes the color. info (grey), warning (yellow), danger (red)
    type: 'info',
    // Choose from: inputPane, outputPane, ndv. By default n8n displays the hint in both the input and output panels.
    location: 'outputPane',
    // Choose from: always, beforeExecution, afterExecution. The default is 'always'
    whenToDisplay: 'beforeExecution',
    // Optional. An expression. If it resolves to true, n8n displays the message. Defaults to true.
    displayCondition: '={{ $parameter["operation"] === "customApiCall" }}'
}

export const openAirHints: NodeHint[] = [
    customJsonNodeHint,
]