<?php
error_reporting(0);
    if (isset($_GET['searchType']) and isset($_GET['word']) and isset($_GET['sliderNum'])) {} else {
        $url = $_SERVER['REQUEST_URI'];
        $url = "/confreports/graph/";
        header('Location: '.$url);
        die("redirecting...");
    }
    $searchOneWord = ($_GET['searchType'] == 'word');
    $sliderNum = $_GET['sliderNum'];
    if (!$searchOneWord  and !(strpos($_GET['word'], " ") !== false)) {
        $searchOneWord = true;
    }
    if ($searchOneWord) {
        $word = explode(" ",strtolower($_GET['word']))[0];
    } else {
        $word = strtolower($_GET['word']);
    }
    $originalWord = $word;

    // get the path   <--
    //echo(realpath("output.php"));
    $dirs = array_filter(glob('/home/vol11_1/epizy.com/epiz_28823740/htdocs/confreports/*'), 'is_dir');
    sort($dirs);
    $dirs = array_reverse($dirs);
    unset($dirs[0]);
    unset($dirs[1]);  // unset each dir that I don't want to search
    unset($dirs[2]);
    $dirs = array_values($dirs);
    //echo('<pre>');
    //var_dump($dirs);
    //echo('</pre>');
    
    $usingWilds = false;
    if ($searchOneWord and isset($_GET['wildcardEnd'])) {
        $word = $word . '((?:[a-zA-Z]+)?)';
        $usingWilds = true;
    }
    $numToSearch = min($sliderNum, count($dirs));
    $dataPoints = array();
    $confPoints = array();
    $foundWords = array();
    
    if ($searchOneWord) {
        //                  ####################################  finding one word matches  ####################################
        for ($i = 0; $i < $numToSearch; $i++) {

            $thisTotal = 0;
            preg_match_all('/>'.$word.'<\/td><td>([\d]+)/',file_get_contents($dirs[$i].'/index.html'),$matches);

            //if ($i == 0) {
            //    var_dump($matches);
            //}


            if (!empty($matches[1])) {
                $in = count($matches) - 1;
                for ($ii = 0; $ii < count($matches[$in]); $ii++) {
                    $thisTotal += intval($matches[$in][$ii]);
                    if ($usingWilds) {
                        if (!in_array($matches[1][$ii], $foundWords)) {
                            array_push($foundWords, $matches[1][$ii]);
                        }
                    }
                }
                array_push($dataPoints, $thisTotal);
            } else {
                array_push($dataPoints, 0);
            }
            array_push($confPoints, basename($dirs[$i]));
        }
    }
    else
    {
        //                  ####################################  finding phrase matches  ####################################
        for ($i = 0; $i < $numToSearch; $i++) {
            $json = json_decode(file_get_contents($dirs[$i].'/data.json'), true);
            $wholeText = getWholeText($json);
            $thisTotal = substr_count(strtolower($wholeText), $word);
            array_push($dataPoints, $thisTotal);
            array_push($confPoints, basename($dirs[$i]));
        }
    }
    

    $dataPoints = array_reverse($dataPoints);
    $confPoints = array_reverse($confPoints);
    //echo(json_encode($dataPoints));
    //echo(json_encode($confPoints));
    //var_dump($foundWords);

    function getWholeText($thisConf) {
        //echo("<pre>");
        //var_dump($thisConf);
        //echo("<pre>");
        $wholeTxt = "";
        for ($i=0; $i < 4; $i++) {
            for ($ii=0; $ii < count($thisConf["sessions"][$i]["talks"]); $ii++) {
                $wholeTxt .= $thisConf["sessions"][$i]["talks"][$ii]["talkText"];
            }
        }
        return $wholeTxt;
    }
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <style>
    html, body {
        height: 100%;
    }
    #confsGraph {
        height: calc(100% - 56px);
    }
    .sidenav {
        width: 170px;
        position: fixed;
        z-index: 1;
        top: 150px;
        left: 10px;
        background: #eee;
        overflow-x: hidden;
        padding: 8px 0;
    }

    .sidenav span {
        padding: 6px 8px 6px 16px;
        text-decoration: none;
        font-size: 22px;
        color: #2196F3;
        display: block;
    }
    .sidenav a {
        padding: 6px 8px 6px 16px;
        text-decoration: none;
        font-size: 15px;
    }

    .sidenav a:hover {
        color: #064579;
    }

    .main {
        margin-left: 140px; /* Same width as the sidebar + left position in px */
        font-size: 28px; /* Increased text to enable scrolling */
        padding: 0px 10px;
    }

    @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
    }
    </style>
    <link rel="stylesheet" href="/css/leoScrollbar.css">
    <title>Found Words</title>
    <script src="../head.js"></script>
</head>
<body style="overflow:hidden;">
<script src="../header.js"></script><script>write("graph");</script>
<script src="../alert.js"></script><script>writeAlert("New Feature!", "Hold [Shift] and click on a point on the graph to take you to that conference!");</script>
<div class="sidenav" style="display:<?php echo($usingWilds ? 'block' : 'none') ?>">
    <span>Found Words</span>
    <?php
    foreach ($foundWords as &$value) {
        echo("<a>".$originalWord.$value."</a><br>");
    }
    ?>
</div>
<center>
<div id="wordReport" style="position:relative;top:-50px; height:100%">
<div id="confsGraph" style="width:90%;"></div>
<script src="plotly-latest.min.js"></script>
<script>
var bigBoyHeader = document.getElementById("bigBoyHeader");
var confsGraph = document.getElementById("confsGraph");
var screenH = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

confsGraph.style.height = String(screenH - getAbsoluteHeight(bigBoyHeader)) + "px";

function getAbsoluteHeight(el) {
  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginTop']) +
               parseFloat(styles['marginBottom']);

  return Math.ceil(el.offsetHeight + margin);
}
var trace1 = {
    type: 'line',
    x: <?php echo(json_encode($confPoints)); ?>,
    y: <?php echo(json_encode($dataPoints)); ?>,
    marker: {
        color: '#C8A2C8',
        line: {
            width: 5
        }
    },
    line: {
        color: 'rgb(55, 128, 191)',
        width: 5
    }
};

var data = [ trace1 ];

var layout = {
    title: {
        text: '<?php $dotdot = ""; if($usingWilds){$dotdot = "...";} echo('"'.$originalWord.$dotdot.'" Over the Past '.count($confPoints).' Conferences'); ?>',
        y: 0.94
    },
    font: {size: 18},
    paper_bgcolor: 'rgb(240,240,240)',
    plot_bgcolor: 'rgb(240,240,240)',
    xaxis: {
        zeroline: true,
        gridcolor: 'rgb(111,111,111)',
    },
    yaxis: {
        range: [0, <?php echo( max($dataPoints)>150 ? 375 : 175 ); ?>],
        gridcolor: 'rgb(111,111,111)',
    }
};

var config = {responsive: true}

function generateGraph() {
	Plotly.newPlot('confsGraph', data, layout, config );
}
generateGraph();

confsGraph.on('plotly_click',
    function(data){
        let linkConfName = trace1.x[data.points[0].pointIndex];
        let thisLink = '/confreports/' + linkConfName + '/full.html?search=' + encodeURIComponent('<?php echo($originalWord); ?>');
        //console.log(data);
        if (data.event.shiftKey) {
            window.location.href = thisLink;
        }
    });
</script>
</div>
<center>
</body>
</html>
