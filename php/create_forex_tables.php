<?php
$db_connection = mysqli_connect("localhost", "john", "forex", "forex");

// Evaluate the connection
if (mysqli_connect_errno()) {
	echo mysqli_connect_error();
	exit();
}

$query = mysqli_query($db_connection, "DROP TABLE EURUSD_M1");
if ($query === true) {
	echo "DROP EURUSD_M1 - TRUE<br>";
} else {
	echo "DROP EURUSD_M1 - FALSE<br>";
}

$tbl_EURUSD_M1 = 
	"CREATE TABLE IF NOT EXISTS EURUSD_M1 (
		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        date DATE NOT NULL,
        time TIME NOT NULL,
        open decimal(10,6) NOT NULL,
        high decimal(10,6) NOT NULL,
        low decimal(10,6) NOT NULL,
        close decimal(10,6) NOT NULL,
		PRIMARY KEY (id),
		UNIQUE KEY ix_datetime (date,time)
	)";

$query = mysqli_query($db_connection, $tbl_EURUSD_M1);
if ($query === true) {
	echo "CREATE EURUSD_M1 - TRUE<br>";
} else {
	echo "CREATE EURUSD_M1 - FALSE<br>";
}

//--------------------------------------------

//
//$query = mysqli_query($db_connection, "DROP TABLE queue");
//if ($query === true) {
//	echo "DROP queue - TRUE<br>";
//} else {
//	echo "DROP queue - FALSE<br>";
//}
//
//$query = mysqli_query($db_connection, "DROP TABLE tempevent");
//if ($query === true) {
//	echo "DROP tempevent - TRUE<br>";
//} else {
//	echo "DROP tempevent - FALSE<br>";
//}
//
//$query = mysqli_query($db_connection, "DROP TABLE doorevent");
//if ($query === true) {
//	echo "DROP doorevent - TRUE<br>";
//} else {
//	echo "DROP doorevent - FALSE<br>";
//}
//
//$query = mysqli_query($db_connection, "DROP TABLE patient");
//if ($query === true) {
//	echo "DROP patient - TRUE<br>";
//} else {
//	echo "DROP patient - FALSE<br>";
//}
//
//$query = mysqli_query($db_connection, "DROP TABLE room");
//if ($query === true) {
//	echo "DROP room - TRUE<br>";
//} else {
//	echo "DROP room - FALSE<br>";
//}
//
//$query = mysqli_query($db_connection, "DROP TABLE employee");
//if ($query === true) {
//	echo "DROP employee - TRUE<br>";
//} else {
//	echo "DROP employee - FALSE<br>";
//}
//
//$query = mysqli_query($db_connection, "DROP TABLE user");
//if ($query === true) {
//	echo "DROP user - TRUE<br>";
//} else {
//	echo "DROP user - FALSE<br>";
//}
//
// //user
//$tbl_user = 
//	"CREATE TABLE IF NOT EXISTS user (
//		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
//		username VARCHAR(16) NOT NULL,
//		password VARCHAR(255) NOT NULL,
//		userlevel ENUM('user', 'nurse', 'physician', 'administrator') NOT NULL DEFAULT 'user',
//		PRIMARY KEY (id),
//		UNIQUE KEY ix_username (username)
//	)";
//
//$query = mysqli_query($db_connection, $tbl_user);
//if ($query === true) {
//	echo "CREATE user - TRUE<br>";
//} else {
//	echo "CREATE user - FALSE<br>";
//}
//
//// employee
//$tbl_employee = 
//	"CREATE TABLE IF NOT EXISTS employee (
//		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
//		user_id INT UNSIGNED NULL,
//		emp_nr VARCHAR(32) NOT NULL,
//		role VARCHAR(16) NOT NULL,
//		gender ENUM('m', 'f') NOT NULL,
//		firstname VARCHAR(32) NOT NULL,
//		lastname VARCHAR(32) NOT NULL,
//		dob DATETIME NOT NULL,
//		photo VARCHAR(255) NULL,
//		PRIMARY KEY (id),
//		FOREIGN KEY (user_id) REFERENCES user(id),
//		UNIQUE KEY ix_employee (emp_nr)
//	)";
//	
//$query = mysqli_query($db_connection, $tbl_employee);
//if ($query === true) {
//	echo "CREATE employee - TRUE<br>";
//} else {
//	echo "CREATE employee - FALSE<br>";
//}
//	
//// room
//$tbl_room = 
//	"CREATE TABLE IF NOT EXISTS room (
//		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
//		room_nr VARCHAR(16) NOT NULL,
//		department VARCHAR(16) NOT NULL,
//		description VARCHAR(255) NULL,
//		PRIMARY KEY (id),
//		UNIQUE KEY ix_room (room_nr)
//	)";
//
//$query = mysqli_query($db_connection, $tbl_room);
//if ($query === true) {
//	echo "CREATE room - TRUE<br>";
//} else {
//	echo "CREATE room - FALSE<br>";
//}
//
////Geldige BSN nummers
////708215749
////206065553
////519009332
////861157679
////358932993
////690354861
////124321720
////276707278
////230482016
////925608051
//
//// patient 
//$tbl_patient =
//	"CREATE TABLE IF NOT EXISTS patient (
//		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
//		pat_nr VARCHAR(32) NOT NULL,
//		room_id INT UNSIGNED NULL,
//		physician_id INT UNSIGNED NULL,
//		nurse_id INT UNSIGNED NULL,
//		firstname VARCHAR(32) NOT NULL,
//		lastname VARCHAR(32) NOT NULL,
//		gender ENUM('m', 'f') NOT NULL,
//		dob DATETIME NOT NULL,
//		photo VARCHAR(255) NULL,
//		or_date DATETIME NULL,
//		quarantine TINYINT(1) UNSIGNED NOT NULL,
//		PRIMARY KEY (id),
//		FOREIGN KEY (room_id) REFERENCES room(id),
//		FOREIGN KEY (physician_id) REFERENCES employee(id),
//		FOREIGN KEY (nurse_id) REFERENCES employee(id),
//		UNIQUE KEY ix_mrn (pat_nr)
//	)";
//
//$query = mysqli_query($db_connection, $tbl_patient);
//if ($query === true) {
//	echo "CREATE patient - TRUE<br>";
//} else {
//	echo "CREATE patient - FALSE<br>";
//}
//
//// doorevent
//$tbl_doorevent = 
//	"CREATE TABLE IF NOT EXISTS doorevent (
//		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
//		room_id INT UNSIGNED NOT NULL,
//		state ENUM('open', 'closed') NOT NULL DEFAULT 'closed',
//		event DATETIME NOT NULL,
//		PRIMARY KEY (id),
//		FOREIGN KEY (room_id) REFERENCES room(id)
//	)";
//
//
//$query = mysqli_query($db_connection, $tbl_doorevent);
//if ($query === true) {
//	echo "CREATE doorevent - TRUE<br>";
//} else {
//	echo "CREATE doorevent - FALSE<br>";
//}
//
//// tempevent
//$tbl_tempevent = 
//	"CREATE TABLE IF NOT EXISTS tempevent (
//		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
//		pat_id INT UNSIGNED NOT NULL,
//		temperature DECIMAL(4,2) NOT NULL,
//		event DATETIME NOT NULL,
//		PRIMARY KEY (id),
//		FOREIGN KEY (pat_id) REFERENCES patient(id)
//	)";
//
//
//$query = mysqli_query($db_connection, $tbl_tempevent);
//if ($query === true) {
//	echo "CREATE tempevent - TRUE<br>";
//} else {
//	echo "CREATE tempevent - FALSE<br>";
//}
//
//// queue
//$tbl_queue = 
//	"CREATE TABLE IF NOT EXISTS queue (
//		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
//		name VARCHAR(32) NOT NULL,
//		payload TEXT NOT NULL,
//		PRIMARY KEY (id)
//	)";
//
//$query = mysqli_query($db_connection, $tbl_queue);
//if ($query === true) {
//	echo "CREATE queue - TRUE<br>";
//} else {
//	echo "CREATE queue - FALSE<br>";
//}

?>
