function writeAlert(header, subText) {
    var toWrite = `<div style="z-index:9999;font-family: Arial, Helvetica, sans-serif;position:fixed;bottom:35px;right:20px;margin-left:20px;max-width:300px;"><div style="padding:25px 15px;background:#555;font-size:30px;color:white;">` + header + `</div><span style="position:absolute;top:5px;right:15px;color:white;font-size:30px;cursor:pointer;" onclick="this.parentElement.style.display='none';">×</span><div style="padding:15px;background-color:#ccc;color:black"><p>` + subText + `</p></div></div>`;
    document.write(toWrite);
}