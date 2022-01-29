<?php

if (!isset($_GET['url'])) {
    die("['urlNotSet']");
}

$myURL = $_GET['url'];

include("simple_html_dom.php");

$html = file_get_html($myURL);

//$html->find('section tile-wrapper layout--3 lumen-layout__item', 0);

$sessions = $html->find('nav[class="manifest"]',0)->children(0);

/*
foreach ($html->find('div[id="map1"]') as $postDIV) {

    foreach ($postDIV->find('div[class="lumen-tile lumen-tile--horizontal lumen-tile--list"]') as $thisDiv) {
        $thisA = $thisDiv->find('a',0);
        array_push($urls, $thisA->attr['href'] . "");
    }
}
*/
/*
for ($x = 2; $x <= count($sessions[0]->children)+1; $x++) {
    $el = $html->find('ul[id="map'.$x.'"]');
    foreach ($el[0]->children as $thisDiv) {
        $thisA = $thisDiv->find('a',0);
        array_push($urls, $thisA->attr['href'] . "");
    }
}
*/
$urls = array();
foreach($html->find('a[class="sc-omeqik-0 bjUamY list-tile listTile-3yP_N"]') as $a) {
    //if (strpos($a->href, 'session') !== false) {
    //    $urls[] = $a->href;
    //} else {
        $urls[] = $a->href;
    //}
}
array_push($urls, "null-session");
echo(json_encode($urls));
?>
