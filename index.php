<?php
    $dirs = array_filter(glob('*'), 'is_dir');
    sort($dirs);
    $dirs = array_reverse($dirs);
    $toPasteAsTiles = '';
    foreach ($dirs as &$thisDir) {
        if(file_exists($thisDir.'/thumbnail.png') && file_exists($thisDir.'/name.txt')) {
            if (file_exists($thisDir.'/index.php') || file_exists($thisDir.'/index.html')) {
                $toPasteAsTiles .= "
                <a href=\"".$thisDir."/\"><div class=\"confTile\" style=\"background-image:linear-gradient(to bottom, rgba(255, 255, 255, .1), rgba(0, 0, 154, 0.5)),url('".$thisDir."/thumbnail.png');\">
                <div class=\"confTitle\">".file_get_contents($thisDir.'/name.txt', true)."</div>
                </div></a>";
            }
        }
    }
    //include($_SERVER['DOCUMENT_ROOT']."/views.php");
    //addView("/confreports/")
?>
<html>
    <head>
        <style>
            body {
                font-family: arial;
                background-repeat: no-repeat;
                background-attachment: fixed;
                background-color: rgb(0, 0, 145);
                background-image: radial-gradient( rgb(0, 108, 175), rgb(0, 0, 145));
                right: 20px;
                padding: 30px;
            }
            #loginForm {
                background-color: rgb(240,240,240);
                width: 85%;
                padding-top: 20px;
                padding-left: 60px;
                padding-right: 40px;
                padding-bottom: 40px;
                margin: auto;
                box-shadow: 1px 3px 5px rgba(34,34,34,0.6);
                text-align: left;

            }
            /*width */
            ::-webkit-scrollbar {
                width: 10px;
            }

            /* Track */
            ::-webkit-scrollbar-track {
                background: #ffffff1e;
                box-shadow: 2px 2px 2px rgba(34,34,34,0.6);
            }

            /* Handle */
            ::-webkit-scrollbar-thumb {
                background: rgba(70, 70, 70, 0.85);
                border-radius: 5px;
                transition: background 1s ease;
            }

            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
                background: rgb(54, 54, 54);
                box-shadow: 5px rgba(34,34,34,0.8);
            }
            .confTile {
                vertical-align: top;
                display: inline-block;
                clear: left;
                text-align: left;
                background:center;
                position: relative;
                margin: 10px;
                /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); */
                width: 300px;
                height: 250px;
                background-size: cover;
            }
            .confTitle {
                position: absolute;
                left: 0;
                bottom: 0;
                width: calc(100% - 20px);
                color: white;
                background-color: rgb(47,67,87);
                padding: 10px;
            }
            #confContainer {
                text-align: center;
                width: 100%;
            }
            .graphBox {
                position: absolute;
                left: 0px;
                top: 0px;
                margin:25px;
                padding:5px;
                box-shadow:5px 5px 20px black;
                cursor:pointer;
            }
        </style>
        <title>General Conference Reports</title>

        <link rel="stylesheet" href="reports.css">
        <!--<link href="https://fonts.googleapis.com/css2?family=Roboto&amp;display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Train+One&amp;display=swap" rel="stylesheet">-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body>
        <script src="header.js"></script><script>write("home");</script>
        <br><br>
        <div id="loginForm" style="position:relative;">
            <!--<div class="graphBox" onclick="window.location.href = 'graph/'">
                <i class="fa fa-line-chart" style="font-size:40px;color:black;vertical-align:middle;"></i>
                <a style="margin-left:10px;font-size:20px;">Visualize Trends</a>
            </div>-->
            <center><h2>Conference Reports by Michael Becker</h2><p>Click on a Conference to view the report</p></center>
            <div id="confContainer">
                
                <?php echo($toPasteAsTiles); ?>
        </div>
        </div>
    </body>
</html>
