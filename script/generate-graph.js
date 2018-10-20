/**
 * This file will parse all the text in the page
 * in order to build a plantuml graph with the classes
 */
var browser = browser || chrome;
var text = document.body.innerText;
var lines = text.split("\n");
var graph = "@startuml\nskinparam monochrome true\n";

lines.forEach( (lineText) => {
    /**
     * This regexp will match the course SIG and find his depedency
     * Example lineText: PHY332	Électricité et magnétisme (4 cr.) (ING150)
     * match[1] = PHY332
     * match[2] = ING150
     * 
     * The other regexp will only match the first part
     */
    var courseAndPrerequisites = /(\w{3}\s*\d{3}).*\(((\w{3}\s*\d{3}).*)\).*/gi;
    var courseWithoutPrerequisites = /(\w{3}\s*\d{3}).*/gi;
    var course = courseAndPrerequisites.exec(lineText) || courseWithoutPrerequisites.exec(lineText);

    if( course && course[2] ) {
        course[2].replace("ou", ',').split(',').forEach( (sig) => {
            graph += `[${course[1].replace(/\s*/g,'')}]<--[${sig.replace(/\s*/g,'')}]\n`;
        });    
    } else if(course) {
        graph += `[${course[1].replace(/\s*/g,'')}]\n`;
    }
});

browser.storage.local.set({
    url: getGraphUrl(graph),
    title: document.title.replace(/.*:\s(.*)/, '$1')
});