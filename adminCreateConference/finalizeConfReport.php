<?php
    session_start();
	//error_reporting(0);
	$link = mysqli_connect("sql211.epizy.com", "epiz_28823740", "vaeodqFlC6BU", "epiz_28823740_leohome");
	mysqli_select_db($link, "loginin");
	if(isset($_SESSION['login'])) {
		$signedIn = 1;
		$user = $_SESSION['user'];
		$result = mysqli_query($link, "select * from loginin where username = '{$user}'")
						or die("Failed to query database ".mysqli_error($link));
		$row = mysqli_fetch_array($result);
		$admin = $row['admin'];
	}
    
    if ($admin != 1) {
        $url = $_SERVER['REQUEST_URI'];
        $url = "/signIn.php?error=notAdmin&url={$url}";
        header('Location: '.$url);
        die("redirecting...");
    }

    /*if ( file_exists("temp/thumbExtention.txt") ) {
        $thumbExten = file_get_contents("temp/thumbExtention.txt");
    } else {
        die("insufficient amount of files");
    }*/
    $thumbExten = 'png';
    if ( file_exists("temp/tempnail.".$thumbExten) && file_exists("temp/tempname.txt") && file_exists("temp/report.html") && file_exists("temp/fulldata.json") ) {} else {
        die("insufficient amount of files");
    }


    function folder_exist($thisFolder)
    {
        // Get canonicalized absolute pathname
        $path = realpath($thisFolder);
        //echo("path->".$path."<br>");

        // If it exist, check if it's a directory
        return ($path !== false AND is_dir($path));
    }
    $folder = "/home/vol11_1/epizy.com/epiz_28823740/htdocs/confreports/".file_get_contents("temp/folderName.txt");
    //echo("folder->".$folder."<br>");
    $fast = false;
    if (folder_exist($folder)) {
        if (!isset($_GET['sure'])) {
            die('A folder with this same conference name already exists. Are you completely sure you want to do this?<br><br> <a href="finalizeConfReport.php?sure=1">Yes. Yes I am</a>');
        } else {
            $fast = ($_GET['sure'] == intval(2));
        }
    } else {
        mkdir($folder);
    }

    //thumbnail
    if (!$fast) {
        copy("temp/tempnail.".$thumbExten, $folder."/thumbnail.".$thumbExten);
    }
    
    //name.txt
    copy("temp/tempname.txt", $folder."/name.txt");

    //fulldata.json
    copy("temp/fulldata.json", $folder."/data.json");

    //full.html
    $toWriteFull = '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <script src="../head.js"></script>
    <script src="../fulltalkscss.js"></script>
    <script src="../loadingcss.js"></script>
    <script src="../conference.js"></script>
</head>
<body>
    <script src="../header.js"></script><script>write("full");</script>
    <script src="../fulltxtOpenMain.js"></script>

    <h3 id="confName"></h3>
    <div id="loading"><script src="../loadinghtml.js"></script></div>
    <div id="TalksContainer"></div>
    <script src="../loadfulldatajson.js"></script>

    <script src="../closeMain.js"></script>
</body>
</html>';
    file_put_contents($folder."/full.html", $toWriteFull);

    //index.html
    $toWriteReport = '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>'.file_get_contents('temp/tempname.txt').' Conference Report</title>
    <script src="../head.js"></script>
</head>
<body>
    <script src="../header.js"></script><script>write("overview");</script>
    <script src="../openMain.js"></script>';
    $toWriteReport .= file_get_contents("temp/report.html");
    $toWriteReport .= '<script src="../closeMain.js"></script>
</body>
</html>';
    file_put_contents($folder."/index.html", $toWriteReport);
    if ($fast) {
        echo('<script>window.close();</script>');
    } else {
        echo('<script>
        var timer = setTimeout(function() {
            window.location.href="/confreports/";
        }, 1500);
    </script><h3>Done!</h3><br> Redirecting...');
    }

?>