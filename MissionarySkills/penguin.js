const penguinInputs = document.querySelectorAll("input[type=range]");
for (let i = 0; i < penguinInputs.length; i++) {
    penguinInputs[i].style.setProperty("--thumb-rotate", `0deg`);;
}

function sliderChange(thisEl) {
	for (let i=0; i<penguinInputs.length; i++) {
  	const value = Number(penguinInputs[i].value) / 100;
    penguinInputs[i].style.setProperty("--thumb-rotate", `${value * 720}deg`);
    penguinInputs[i].nextElementSibling.innerHTML = Math.round(value * 5);
  }
}