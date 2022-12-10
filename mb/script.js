//console.log(chapterLinks);
//console.log(fullList);
function _(x) {return document.getElementById(x);}
const audioPlayer = _('audioPlayer');
const books = Object.keys(chapterLinks);
const bookNames = ["Inledning","1 Nephi","2 Nephi","Jakob","Enos - Mormons ord","Mosiah","Alma","Helaman","3 Nephi","4 Nephi","Mormon"];
let helpObj = new Object();

let toWrite = '';
let counter = 0;
for (i=0; i<books.length; i++) {
  toWrite += '<button class="accordion" onclick="accordion(this)">' + bookNames[i] + '</button><div class="panel">';
  
  for (ii=0; ii<chapterLinks[books[i]].length; ii++) {
    const thisBok = chapterLinks[books[i]][ii];
    //console.log(thisBok);
    toWrite += '<button id="trackBtn' + String(counter) + '" onclick="selectTrack(this.id)">' + thisBok[0] + '</button>';
    
    //createHelpObject
    let thisHelper = {
      name: thisBok[0],
      link: fullList[counter][1],
      prevId: "trackBtn" + String(counter - 1),
      nextId: "trackBtn" + String(counter + 1)
    }
    helpObj['trackBtn' + String(counter)] = thisHelper;
    
    counter++;
  }
  
  toWrite += '</div>';
}
_("chapterAccordions").innerHTML = toWrite;
//console.log(helpObj);

function selectTrack(trackId) {
  audioPlayer.src = 'https://21beckem.github.io/MormonsBokAudio/' + helpObj[trackId]['link'];
  audioPlayer.play();
  //console.log(helpObj[trackId]);
}





//  all the accordion stuff :)
function accordion(el) {
  el.classList.toggle("active");
  closeAllExcept(el);
  let panel = el.nextElementSibling;
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
}
function closeAllExcept(el) {
  let allBtns = document.getElementsByClassName("accordion");
  for (i=0; i<allBtns.length; i++) {
    if (allBtns[i] == el)
      continue;
    allBtns[i].classList.remove("active");
    allBtns[i].nextElementSibling.style.maxHeight = null;
  }
}
