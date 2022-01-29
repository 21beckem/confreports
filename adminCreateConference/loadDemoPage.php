<?php
    if (isset($_POST['report']) and isset($_POST['full']) and isset($_POST['name']) and isset($_POST['month']) and isset($_POST['year']) and isset($_POST['thumbnail'])) {} else {
        die('ERROR on the server. please go back to the <a href="/confreports/adminCreateConference/">generating page</a> and try again.');
    }
    $oldimage = $_POST['thumbnail'];
    $skipCheck = ($oldimage=="skip");
    if (!$skipCheck) {
        $oldimage = str_replace('data:image/png;base64,', '', $oldimage);
        $oldimage = str_replace(' ', '+', $oldimage);
        $image = base64_decode($oldimage);
        file_put_contents("temp/tempnail.png", $image);
    }
    if ($_POST['month'] == "10") {
        $mon = "October ";
    } else {
        $mon = "April ";
    }
    file_put_contents("temp/tempname.txt", $mon.$_POST['year']);
    if ($_POST['month'] == "10") {
        $monShort = "oct";
    } else {
        $monShort = "april";
    }
    file_put_contents("temp/folderName.txt", $_POST['year'].$monShort);
    file_put_contents("temp/report.html", $_POST['report']);
    // $toMakeFull = '<h2>'.$mon.' '.$_POST['year'].' Full Text</h2>';
    // $toMakeFull .= $_POST['full'];
    // file_put_contents("temp/full.html", $toMakeFull);
    file_put_contents("temp/fulldata.json", $_POST['full']);

    if ($skipCheck) {
        header('Location: finalizeConfReport.php?sure=2');
    }
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>October 2020 Conference Report</title>
    <script src="../head.js"></script>
</head>
<body>
    <script src="../header.js"></script><script>write("goToFull");</script>
    <script src="../openMain.js"></script>
    <?php
    echo($_POST['report']);
    //echo(get_img_extention($_POST['imgLink']));
    ?>
    <a href="finalizeConfReport.php" style="box-shadow: 2px 5px 4px 3px #1d1d1d;background-color:rgb(76,175,80);padding:10px;border:none;color:black;cursor:pointer;border-radius:5px;margin-bottom:10px;">Yep! It all looks good! Generate this website! =D</a>
    <script>
        alert("This is a demo of the final page.");
        alert("TAKE A LOOK AROUND AND MAKE SURE EVERYTHING'S IN IT'S RIGHT PLACE");
        alert("there's a button at the very bottom of the page that you can click to generate this webpage for all to see. If something's wrong, close this tab and go back to the generator");
    </script>
<script src="../closeMain.js"></script>
</body>
</html>