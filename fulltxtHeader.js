// OPTIONS:
//  "goBack"
//  "goToFull"

function writeHeader(option) {
    var toWrite = `
        <div style="position:sticky;z-index:10;top:10px;left:20px;">
            <a href="/confreports/" style="color: white;font-size: 40px;text-decoration: none;font-family:'Train One',cursive;">
            <div style="
                border-radius: 50px 15px;
                background-color: rgba(0,0,0,0.3);
                border: solid;
                padding: 10px;
                margin: -10px;
            ">
            <i>ConferenceReports</i>
            </div>
            </a>
    `;

    if (option.includes("goBack") {
        toWrite += `<a href="./" style="color: white;font-size: 25px;text-decoration: none;font-family: 'Roboto', sans-serif;">&#8594;Go Back</a>`;
    }
    if (option.includes("goToFull") {
        toWrite += `<a href="full.html" style="color: white;font-size: 25px;text-decoration: none;font-family: 'Roboto', sans-serif;">&#8594;Full Text</a>`;
    }

    toWrite += `</div>`;

    document.write(toWrite);
}