const arrBooks = ["Whole Book of Mormon", "1 Nephi", "2 Nephi", "Jacob", "Enos", "Jarom", "Omni", "Words of Mormon", "Mosiah", "Alma", "Helaman", "3 Nephi", "4 Nephi", "Mormon", "Ether", "Moroni", "1 Nephi 1", "1 Nephi 2", "1 Nephi 3", "1 Nephi 4", "1 Nephi 5", "1 Nephi 6", "1 Nephi 7", "1 Nephi 8", "1 Nephi 9", "1 Nephi 10", "1 Nephi 11", "1 Nephi 12", "1 Nephi 13", "1 Nephi 14", "1 Nephi 15", "1 Nephi 16", "1 Nephi 17", "1 Nephi 18", "1 Nephi 19", "1 Nephi 20", "1 Nephi 21", "1 Nephi 22", "2 Nephi 1", "2 Nephi 2", "2 Nephi 3", "2 Nephi 4", "2 Nephi 5", "2 Nephi 6", "2 Nephi 7", "2 Nephi 8", "2 Nephi 9", "2 Nephi 10", "2 Nephi 11", "2 Nephi 12", "2 Nephi 13", "2 Nephi 14", "2 Nephi 15", "2 Nephi 16", "2 Nephi 17", "2 Nephi 18", "2 Nephi 19", "2 Nephi 20", "2 Nephi 21", "2 Nephi 22", "2 Nephi 23", "2 Nephi 24", "2 Nephi 25", "2 Nephi 26", "2 Nephi 27", "2 Nephi 28", "2 Nephi 29", "2 Nephi 30", "2 Nephi 31", "2 Nephi 32", "2 Nephi 33", "Jacob 1", "Jacob 2", "Jacob 3", "Jacob 4", "Jacob 5", "Jacob 6", "Jacob 7", "Mosiah 1", "Mosiah 2", "Mosiah 3", "Mosiah 4", "Mosiah 5", "Mosiah 6", "Mosiah 7", "Mosiah 8", "Mosiah 9", "Mosiah 10", "Mosiah 11", "Mosiah 12", "Mosiah 13", "Mosiah 14", "Mosiah 15", "Mosiah 16", "Mosiah 17", "Mosiah 18", "Mosiah 19", "Mosiah 20", "Mosiah 21", "Mosiah 22", "Mosiah 23", "Mosiah 24", "Mosiah 25", "Mosiah 26", "Mosiah 27", "Mosiah 28", "Mosiah 29", "Alma 1", "Alma 2", "Alma 3", "Alma 4", "Alma 5", "Alma 6", "Alma 7", "Alma 8", "Alma 9", "Alma 10", "Alma 11", "Alma 12", "Alma 13", "Alma 14", "Alma 15", "Alma 16", "Alma 17", "Alma 18", "Alma 19", "Alma 20", "Alma 21", "Alma 22", "Alma 23", "Alma 24", "Alma 25", "Alma 26", "Alma 27", "Alma 28", "Alma 29", "Alma 30", "Alma 31", "Alma 32", "Alma 33", "Alma 34", "Alma 35", "Alma 36", "Alma 37", "Alma 38", "Alma 39", "Alma 40", "Alma 41", "Alma 42", "Alma 43", "Alma 44", "Alma 45", "Alma 46", "Alma 47", "Alma 48", "Alma 49", "Alma 50", "Alma 51", "Alma 52", "Alma 53", "Alma 54", "Alma 55", "Alma 56", "Alma 57", "Alma 58", "Alma 59", "Alma 60", "Alma 61", "Alma 62", "Alma 63", "Helaman 1", "Helaman 2", "Helaman 3", "Helaman 4", "Helaman 5", "Helaman 6", "Helaman 7", "Helaman 8", "Helaman 9", "Helaman 10", "Helaman 11", "Helaman 12", "Helaman 13", "Helaman 14", "Helaman 15", "Helaman 16", "3 Nephi 1", "3 Nephi 2", "3 Nephi 3", "3 Nephi 4", "3 Nephi 5", "3 Nephi 6", "3 Nephi 7", "3 Nephi 8", "3 Nephi 9", "3 Nephi 10", "3 Nephi 11", "3 Nephi 12", "3 Nephi 13", "3 Nephi 14", "3 Nephi 15", "3 Nephi 16", "3 Nephi 17", "3 Nephi 18", "3 Nephi 19", "3 Nephi 20", "3 Nephi 21", "3 Nephi 22", "3 Nephi 23", "3 Nephi 24", "3 Nephi 25", "3 Nephi 26", "3 Nephi 27", "3 Nephi 28", "3 Nephi 29", "3 Nephi 30", "Mormon 1", "Mormon 2", "Mormon 3", "Mormon 4", "Mormon 5", "Mormon 6", "Mormon 7", "Mormon 8", "Mormon 9", "Ether 1", "Ether 2", "Ether 3", "Ether 4", "Ether 5", "Ether 6", "Ether 7", "Ether 8", "Ether 9", "Ether 10", "Ether 11", "Ether 12", "Ether 13", "Ether 14", "Ether 15", "Moroni 1", "Moroni 2", "Moroni 3", "Moroni 4", "Moroni 5", "Moroni 6", "Moroni 7", "Moroni 8", "Moroni 9", "Moroni 10"]

const autoCompleteJS = new autoComplete({
    placeHolder: "Find a recource...",
    data: {
        src: arrBooks,
        cache: true,
    },
    resultItem: {
        highlight: true
    },
    events: {
        input: {
            selection: (event) => {
                const selection = event.detail.selection.value;
                setRecourceStatus(true);
                document.activeElement.blur();
                autoCompleteJS.input.value = selection;
            }
        }
    }
});
// end autocomplete stuff
function _(x) { return document.getElementById(x); }
var isRSet = false;
function setRecourceStatus(yaNo) {
	rinput = _('autoComplete');
	if (yaNo) {
        rinput.classList.add('recourceSelected');
    } else {
        rinput.classList.remove('recourceSelected')
    }
	isRSet = yaNo;
	updateCanISubmit();
}
function updateCanISubmit() {
		_('graphBtn').disabled = (!isRSet || _('del').value == '');
}
// end of boring search stuff
function fetchGraph() {
	//console.log('graphing!');
	
	//fetch the url
	// location
	// del
	// ctrlfmatch
	let u = 'https://mbgrapher.000webhostapp.com/graph.php?location=';
	u += encodeURI(_('autoComplete').value);
	u += '&del=';
	u += encodeURI(_('del').value);
	u += (_('descrete').checked) ? '' : '&ctrlfmatch=true';
	alert(u);
	_('outputGraph').parentElement.innerHTML = '<iframe id="outputGraph"></iframe>';
        _('outputGraph').src = u;
}
