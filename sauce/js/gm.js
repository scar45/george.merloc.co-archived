// JS Coded by George Merlocco
//	 for http://george.merloc.co

// Javascript Open in New Window (validation workaround)
//

function externalLinks() {
    if (!document.getElementsByTagName) return;
    var anchors = document.getElementsByTagName("a");
    for (var i=0; i<anchors.length; i++) {
        var anchor = anchors[i];
        if (anchor.getAttribute("href") &&
            anchor.getAttribute("rel") == "external")
            anchor.target = "_blank";
    }
}


// Execute when the DOM is ready
//
$(document).ready(function() {
    externalLinks();
});