document.title = "General Conference Reports"

var thisConf = null;
fetch("data.json")
    .then(response => response.json())
    .then(json => {
        thisConf = json;
        populatePageWithThisConf();
        generateScrollHelper();
    });

let TalksContainer = document.getElementById("TalksContainer");
function populatePageWithThisConf() {
    document.getElementById("confName").innerHTML = thisConf.name;
    let towrite = "";

    for (let i=0; i < thisConf.sessions.length; i++) {
        towrite += '<div class="sessionContainer"><a class="sessionTitle">' + ConfTools.makeTitleCase(thisConf.sessions[i].name) + "</a>";
        for (let ii=0; ii < thisConf.sessions[i].talks.length; ii++) {
            towrite += '<div class="talk"><div class="header">' + ConfTools.makeTitleCase(thisConf.sessions[i].talks[ii].speaker) + '<a class="foundCount hidden">Found: 10</a></div><div class="body">';
            towrite += thisConf.sessions[i].talks[ii].talkText + '</div></div>';
        }
        towrite += '</div>';
    }
    TalksContainer.innerHTML = towrite;
    document.getElementById('loading').style.display = 'none';
    document.title = ConfTools.makeTitleCase(thisConf.name) + " Full Text";
}