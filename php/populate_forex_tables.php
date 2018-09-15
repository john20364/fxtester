<?php
try {
	$db = new PDO('mysql:host=localhost;dbname=forex', 'john', 'forex');
} catch (PDOException $e) {
	echo $e->getMessage().'<br>';
	die();
}

$sql = 'DELETE FROM EURUSD_M1';
$stmt = $db->prepare($sql);
$stmt->execute();

$sql = 'INSERT INTO EURUSD_M1 (date, time, open, high, low, close) VALUES (:date, :time, :open, :high, :low, :close)';

$stmt = $db->prepare($sql);

$stmt->bindParam(':date', $date);
$stmt->bindParam(':time', $time);
$stmt->bindParam(':open', $open);
$stmt->bindParam(':high', $high);
$stmt->bindParam(':low', $low);
$stmt->bindParam(':close', $close);

foreach (glob("*.csv") as $filename) {
    echo $filename . "<br/>";
    
    if (($handle = fopen($filename, "r")) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            if (count($data) == 7) {
                $date = $data[0];
                $time = $data[1];
                $open = $data[2];
                $high = $data[3];
                $low = $data[4];
                $close = $data[5];
            
                $stmt->execute();
            }
        }
        fclose($handle);
    }
    
}

echo 'Populate EURUSD_M1 OK<br>';
$db = null;
?>
