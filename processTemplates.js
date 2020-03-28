'use strict';

const fs = require('fs');
import cssFramework from './js/framework'; //This is possible with the ESM lib

function readInTemplate(fileName) {
    try {
        return fs.readFileSync(fileName, 'utf8');
    } catch (err) {
        console.error(err)
    }
}

//Process Variables
const variables = cssFramework.variables;
let variableTmpl = readInTemplate("./templates/_variables.scss.tmpl");
for (let [key, value] of Object.entries(variables)) {
    variableTmpl = variableTmpl.replace(`#(${key})`, value);
}
fs.writeFileSync('./scss/_variables.scss', variableTmpl);

//Process Breakpoints and Spacers
const spacers = cssFramework.spacers;
let breakPointTmpl = readInTemplate("./templates/_breakpoints.scss.tmpl");
for (let [key, value] of Object.entries(spacers)) {
    breakPointTmpl = breakPointTmpl.replace(`#(${key})`, value);
}
const gridBreakpoints = cssFramework.gridBreakpoints;
for (let [key, value] of Object.entries(gridBreakpoints)) {
    breakPointTmpl = breakPointTmpl.replace(`#(${key})`, value);
}
const gridBreakpointsMax = cssFramework.gridBreakpointsMax;
for (let [key, value] of Object.entries(gridBreakpointsMax)) {
    breakPointTmpl = breakPointTmpl.replace(`#(${key})`, value);
}
fs.writeFileSync('./scss/_breakpoints.scss', breakPointTmpl);



