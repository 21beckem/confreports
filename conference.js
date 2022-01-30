class ConferenceTalk {
    constructor(talkText, speaker) {
        this.speaker = speaker;
        this.talkText = talkText;
    }
}

class Session {
    constructor(name="null") {
        this.name = name;
        this.talks = new Array();
    }
    setTalks(thesetalks) {
        if (this.talks.length != 0) {
            console.error("there are already talks in this session. To change the talks, make a new session and overwrite this one.");
            return;
        }
        var allGood = true;
        for (let i=0; i<thesetalks.length; i++) {
            if (!(thesetalks[i] instanceof ConferenceTalk)) {
                allGood = false;
                break;
            }
        }
        if (allGood) {
            this.talks = thesetalks;
        } else {
            console.error("all talks in the session must be of the 'ConferenceTalk' class");
        }
    }
}

class Conference {
    constructor(date, name) {
        this.date = date;
        this.name = name;
        this.sessions = new Array();
    }
    addSession(thisSession) {
        console.log(thisSession);
        if (thisSession instanceof Session) {
            if (thisSession.name != "null" && thisSession.talks.length > 0) {
                this.sessions.push(thisSession);
            } else {
                console.error("must set a session name and talks");
            }
        } else {
            console.error("must be a session object");
        }
    }
}

class ConfTools {
    // ###################################################  conference functions
    static getWholeText(thisConf) {
        var wholeTxt = "";
        for (let i=0; i < thisConf.sessions.length; i++) {
            for (let ii=0; ii < thisConf.sessions[i].talks.length; ii++) {
                wholeTxt += thisConf.sessions[i].talks[ii].talkText;
            }
        }
        return wholeTxt;
    }
    static makeTitleCase(str, replaceDash=true) {
        if (replaceDash) {
            str = str.replaceAll("-", " ");
        }
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }
    static toJSON(thisConf) {
        return JSON.stringify(thisConf);
    }
    static sessionNames = ['saturday-morning-session', 'saturday-afternoon-session', 'saturday-evening-session', 'sunday-morning-session', 'sunday-afternoon-session'];
    // ###################################################  session functions
    
    // ###################################################  talk functions
    static printTalk(thisTalk, included='raw') {
        var toOutput = "";
        if (included.includes('speaker')) {
            if (included.includes('speaker-header')) {
                if (included.includes('speaker-header-style')) {
                    toOutput += '<div style="font-size:20px; text-align:center;">' + ConfTools.makeTitleCase(thisTalk.speaker) + '</div>';
                } else {
                    toOutput += '<div class="speaker">' + ConfTools.makeTitleCase(thisTalk.speaker) + '</div>';
                }
            } else {
                toOutput += ConfTools.makeTitleCase(thisTalk.speaker);
            }
        }
        if (included.includes('raw')) {
            toOutput += thisTalk.talkText;
        }
        if (included.includes('break')) {
            toOutput += '<hr>';
        }
        if (toOutput=="") {
            console.error(
`'included' must include at least one of these options:
"speaker" OR "speaker-header"
"raw"
"break"`
);
            return;
        }
        return toOutput;
    }
}