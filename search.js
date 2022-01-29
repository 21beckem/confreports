var toSearchHighlights = "";
var previousToSearchHighlights = toSearchHighlights;
var searchAfterTyping = null;

function search(str, timeout=1000) {
    clearTimeout(searchAfterTyping);
    toSearchHighlights = str.toLowerCase();
    searchAfterTyping = setTimeout(doSearch,timeout);
}

function doSearch() {
    if (thisConf==null) {
        searchAfterTyping = setTimeout(doSearch,500);
        return;
    }
    if (previousToSearchHighlights != toSearchHighlights) {
        resetHeighlights();
        heighlight(toSearchHighlights);
        previousToSearchHighlights = toSearchHighlights;
    }
}

function heighlight(str) {
    let searchTotalFoundWordsNumber = document.getElementById('searchTotalFoundWordsNumber');
    if (str == "") {
        generateScrollHelper();
        searchTotalFoundWordsNumber.classList.add("hidden");
        return;
    }
    let regexV = new RegExp(str, "ig");
    let talkBodies = document.querySelectorAll('div.body');
    let currentSessionEl, previousSessionEl;
    var foundSomethingInThisSession = false;
    let toRemove = Array();
    let totalFoundCount = 0;
    for (let i = 0; i < talkBodies.length; i++) {
        previousSessionEl = currentSessionEl;
        currentSessionEl = talkBodies[i].parentElement.parentElement;
        if (i != 0 && currentSessionEl != previousSessionEl) {
            //this is a new session
            if (!foundSomethingInThisSession) {
                toRemove.push(previousSessionEl);
            }
            //found nothing in last session
            foundSomethingInThisSession = false;
        }
        //console.log(foundSomethingInThisSession);
        let foundCount = talkBodies[i].innerHTML.toLowerCase().split(str).length - 1;
        let foundCountEl = talkBodies[i].parentElement.querySelector('.header').querySelector('.foundCount');

        if (foundCount > 0) {
            totalFoundCount += foundCount;
            foundSomethingInThisSession = true;
            foundCountEl.innerHTML = "Found: " + foundCount;
            foundCountEl.classList.remove('hidden');
            talkBodies[i].innerHTML = talkBodies[i].innerHTML.replace(regexV, '<a class="highlight">$&</a>');
        } else {
            talkBodies[i].parentElement.remove();
        }
    }
    generateScrollHelper();
    if (totalFoundCount > 0) {
        searchTotalFoundWordsNumber.classList.remove("hidden");
    }
    searchTotalFoundWordsNumber.innerHTML = " Found: " + totalFoundCount;
    if (!foundSomethingInThisSession) {
        toRemove.push(currentSessionEl);
    }
    toRemove.forEach(el => {
        el.remove();
    });
    if (!TalksContainer.firstChild) {
        TalksContainer.innerHTML = "<a>What you searched for isn't in this conference</a>"
    }
}

function resetHeighlights() {
    populatePageWithThisConf();
}

// get immidiate url search
if (window.location.search.includes("?search=")) {
    let searchTerm = decodeURIComponent(window.location.search.split("?search=")[1]);
    search(searchTerm, timeout=500);
    document.getElementById('searchBox').value = searchTerm;
}