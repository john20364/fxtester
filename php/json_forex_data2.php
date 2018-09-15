<?php
//    header("Content-Type: application/json");
//    function dbConnect() {
//        try {
//            $db = new PDO('mysql:host=localhost;dbname=forex', 'john', 'forex');
//        } catch (PDOException $e) {
//            $db = null;
//        }
//        return $db;
//    }
//
//    function getJSONCandleData($db, $sql) {
//        $result = '{"candles":[';
//
//        foreach($db->query($sql) as $row) {
//            $result = $result.'{
//            "id":"'.$row["id"].'",
//            "date":"'.$row["date"].'",
//            "time":"'.$row["time"].'",
//            "open":"'.$row["open"].'",
//            "high":"'.$row["high"].'",
//            "low":"'.$row["low"].'",
//            "close":"'.$row["close"].'"
//            },';
//        }
//        
//        $result = chop($result, ',');
//        $result = $result.']}';
//
//        return $result;
//    }

//    function getCandles($table,$date,$time,$candles) {
//        $db = dbConnect();
//
//        $result = '';
//        $sql = '';
//
//        if ($db != null) {
//            $sql = $sql.'SELECT 
//                id, date, time, open, high, low, close 
//                FROM '.$table.' 
//                WHERE date >= "'.$date.'" 
//                AND time >= "'.$time.'" 
//                ORDER BY date asc, time asc 
//                LIMIT '.$candles;
//
//            $result = getJSONCandleData($db, $sql);
//            
//            $db = null;
//        }
//
//        echo $result;
//    }

    function getCandles($table,$date,$time,$candles) {
        $conn = mysqli_connect("localhost", "john", "forex", "forex");
        
        $result = mysqli_query($conn, 'SELECT * FROM '.$table.' LIMIT '.$candles);
        
        $data = array();
        
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
        
        echo json_encode($data);
        
        mysqli_close($conn);
    }

?>