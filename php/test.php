<?php
//function getcurrency($filename) {
//    $arr = explode('.',$filename);
//    if (count($arr) > 0) {
//        $arr = explode('_',$arr[0]);
//        if (count($arr) > 3) {
//            return $arr[2];
//        }
//    }
//}

//foreach (glob("*.csv") as $filename) {
//    echo $filename . "<br/>";
//    echo getcurrency($filename)."<br/<";
//}
?>

<?php
$row = 1;
if (($handle = fopen("DAT_MT_EURUSD_M1_201807.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);
        echo "<p> $num fields in line $row: <br /></p>\n";
        $row++;
        for ($c=0; $c < $num; $c++) {
            echo $data[$c] . "<br />\n";
        }
    }
    fclose($handle);
}
?>




<?php
//    echo 'Hello FOREX Tester';
?>

