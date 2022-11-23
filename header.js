/*console.log(`OPTIONS:
 "goBack"
 "goToFull"
 "trends"
 "search"`);*/
console.log(`OPTIONS:
 "full"
 "overview"
 "home"
 "graph"
 "http"`);

function write(page) {
    options = "";
    if (page.includes("full")) {
        options += "goBack search";
    }
    if (page.includes("overview")) {
        options += " goToFull";
    }
    if (page.includes("home")) {
        options += " trends";
    }
    if (page.includes("graph")) {
        options += " goBack";
    }
    if (page.includes("http")) {
        options += " forceHTTP";
    }
    createHeader(options);
}

function createHeader(option) {
    var toWrite = '';
    if (option.includes("search")) {
        toWrite += '<canvas id="scrollHelper"></canvas>';
    }
    toWrite += `<div style="position:sticky;z-index:10;top:30px;left:20px;transform:translateY(-20px); color:black;">`;
    
    if (option.includes("trends")) {
        toWrite += `<div style="
                position:absolute;
                right:30%;
                top:0px;
                margin:10px;
                padding:10px;
                cursor:pointer;
                border-radius:20px 7px;
                border:1px solid black;
            " onclick="window.location.href = '/graph/'">
            <i class="fa fa-line-chart" style="font-size:40px;vertical-align:middle;"></i>
            <a style="margin-left:10px;font-size:20px;">Visualize Trends</a>
        </div>`;
    } else if (option.includes("search")) {
        toWrite += `<div style="
                position:absolute;
                right:30%;
                top:0px;
                margin:10px;
                padding:10px;
                cursor:pointer;
                border-radius:20px 7px;
                border:1px solid black;
            ">
            <a style="margin-left:10px;font-size:20px;">Search</a>
            <input id="searchBox" type="text" oninput="search(this.value);" /><a id="searchTotalFoundWordsNumber" class="hidden"> Found: </a>
        </div>
        <script src="../search.js"></script>
        <script src="../scrollHelper.js"></script>`;
    }
    toWrite += `<div id="bigBoyHeader" style="
                    border-radius: 50px 15px;
                    background-color: rgb(170 217 255);
                    padding: 10px;
                    margin: -10px;
                    box-shadow: 1px 3px 5px rgba(34, 34, 34, 0.6);
                    padding-left:50px;
                    margin-bottom: 5px;
                ">
            <a onclick="window.location.href = '/'" style="cursor:pointer;font-size: 40px;text-decoration: none;font-family: 'Sansita Swashed', cursive;">
                <i style="
                    border-radius: 10px;
                    padding-top: 1px;
                    padding-bottom: 1px;
                    padding-left: 7px;
                    padding-right: 13px;
                    box-shadow: 2px 2px 4px #7e7e7e;
                " class="topHeader">ConferenceReports</i>
            </a>
                </div>
    `;

    if (option.includes("goBack")) {
        toWrite += `<a href="./" style="color:black;font-size: 25px;text-decoration: none;font-family: 'Roboto', sans-serif;">&#8594;Go Back</a>`;
    }
    if (option.includes("goToFull")) {
        toWrite += `<a href="full.html" style="color:black;font-size: 25px;text-decoration: none;font-family: 'Roboto', sans-serif;">&#8594;Full Text</a>`;
    }

    toWrite += `</div>`;
	if (option.includes("forceHTTP")) {
		toWrite += `<script>
		//alert(window.location.protocol);
		if (window.location.protocol !== 'http:') {
                        //alert('changing protocol');
			window.location.href = window.location.href.replace('https', 'http');
		}
		</script>`;
	} else {
		toWrite += `<script>
		//alert(window.location.protocol);
		if (window.location.protocol !== 'https:') {
			window.location.href = window.location.href.replace('http', 'https');
		}
		</script>`;
	}

    document.write(toWrite);
}


/*document.write(`
    <div style="top:10px;left:20px;">
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
        <a href="full.html" style="color: white;font-size: 25px;text-decoration: none;font-family: 'Roboto', sans-serif;">&#8594;Full Text</a>
    </div>
`);*/
