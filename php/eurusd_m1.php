<?php
    require_once('json_forex_data2.php');
    header("Content-Type: application/json");

    if (!isset($_POST['date']) ||
        !isset($_POST['time']) ||
        !isset($_POST['candles'])) {
		die('Need date and candles parameters');
	}

    $date = $_POST['date'];
    $time = $_POST['time'];
    $candles = $_POST['candles'];
        
    echo getCandles('EURUSD_h1',$date,$time,$candles);
//    echo 'EURUSD M1 '.$date.' - '.$candles.'<br/>';
?>