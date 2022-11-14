<?php
    //error_reporting(0);
    if (isset($_GET['word']) and isset($_GET['sliderNum'])) {} else {
        die('["error"]');
    }

    $word = strtolower($_GET['word']);
    $originalWord = $word;

    // get the json with all the chapters and books
    
    
    $usingWilds = false;
    if ($searchOneWord and isset($_GET['wildcardEnd'])) {
        $word = $word . '((?:[a-zA-Z]+)?)';
        $usingWilds = true;
    }
    $numToSearch = min($sliderNum, count($dirs));
    $dataPoints = array();
    $confPoints = array();
    $foundWords = array();


    //                  ####################################  finding phrase matches  ####################################
    for ($i = 0; $i < $numToSearch; $i++) {
        $json = json_decode(file_get_contents($dirs[$i].'/data.json'), true);
        $wholeText = getWholeText($json);
        $thisTotal = substr_count(strtolower($wholeText), $word);
        array_push($dataPoints, $thisTotal);
        array_push($confPoints, basename($dirs[$i]));
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