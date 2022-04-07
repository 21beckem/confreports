<?php

if (!isset($_GET['url'])) {
    //die("['urlNotSet']");
}
error_reporting(0);

$myURL = '\/study\/general-conference\/2022\/04\/58nelson';//$_GET['url'];

include("simple_html_dom.php");

getTalkItself($myURL);

function getTalkItself($thisUrl) {
    //echo($thisUrl . '<br>');
    $thisTalkPage = file_get_html('https://www.churchofjesuschrist.org' . html_entity_decode($thisUrl));

    $thisTalkText = $thisTalkPage->find('div[class="body-block"]')[0] . "";//->plaintext;
    // $thisTalkText = replace_between_and_including($thisTalkText, '<sup ', '</sup>', '');

    $thisTalkText = strip_tags(str_replace('<', ' <', $thisTalkText));

    $thisSpeaker = $thisTalkPage->find('p[class="author-name"]')[0] . "";
    $thisSpeaker = strip_tags($thisSpeaker);
    // echo('<pre>');
    // var_dump($thisSpeaker);
    // echo('</pre>');
    $output = array($thisSpeaker, $thisTalkText);

    // now i get to compensate for older conferences
    if ($output[0] == "") {
        $thisSpeaker = $thisTalkPage->find('p[id="p1"]')[0] . "";
        $thisSpeaker = strip_tags($thisSpeaker);
        $output[0] = $thisSpeaker;
    }
    
    $encoded = json_encode($output);

    echo($encoded);

}
function replace_between_and_including($str, $needle_start, $needle_end, $replacement) {
    $start = strpos($str, $needle_start);

    $end = strpos($str, $needle_end, $start) + strlen($needle_end);
 
    return substr_replace($str,$replacement,  $start, $end - $start);
}
?>
