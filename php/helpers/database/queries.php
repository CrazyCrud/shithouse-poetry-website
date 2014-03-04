<?php

/*
Latrinalia DataBase Queries
*/
class Queries{
	/**
	USER QUERIES
	**/
	public static function getuser($sessionkey){
		return
		"SELECT id, email, username, joindate, lastaction, status
		FROM `".DBConfig::$tables["users"]."` WHERE `sessionkey` = \"$sessionkey\"";
	}
	public static function getuserbyid($id){
		return
		"SELECT id, email, username, joindate, lastaction, status
		FROM `".DBConfig::$tables["users"]."` WHERE `id` = \"$id\"";
	}
	public static function update($key){
		$u = DBConfig::$tables["users"];
		$date = date( 'Y-m-d H:i:s', time());
		return "UPDATE $u
		SET lastaction='$date'
		WHERE sessionkey='$key'";
	}
	public static function updateuserwithoutpassword($userid, $mail, $name){
		return "UPDATE $u
		SET email='$mail',
		username='$name'
		WHERE id=$userid";
	}
	public static function updateuser($userid, $mail, $name, $pwd){
		$u = DBConfig::$tables["users"];
		return "UPDATE $u
		SET email='$mail',
		username='$name',
		password='$pwd'
		WHERE id=$userid";
	}
	public static function createuser($key, $mail, $name, $pwd){
		$u = DBConfig::$tables["users"];
		return "INSERT INTO $u
		(email, username, joindate, lastaction, status, sessionkey, password)
		VALUES
		('$mail','$name', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,".DBConfig::$userStatus["newUser"].",'$key','$pwd')";
	}
	public static function deleteuser($authkey){
		$u = DBConfig::$tables["users"];
		return "UPDATE $u
		SET sessionkey='".uniqid()."',
		status = ".DBConfig::$userStatus["deleted"]."
		WHERE sessionkey='$authkey'";
	}
	public static function getuserbyname($uname, $password){
		if(isset($password)){
			$and = "AND `password` = '$password'";
		}
		return
		"SELECT id, email, username, joindate, lastaction, status
		FROM `".DBConfig::$tables["users"]."`
		WHERE (`username` = '$uname'
		 OR `email` = '$uname') $and";
	}
	public static function login($userid, $authkey){
		$u = DBConfig::$tables["users"];
		return "UPDATE $u
		SET sessionkey='$authkey'
		WHERE id = $userid";
	}
	public static function logout($authkey){
		$u = DBConfig::$tables["users"];
		return "UPDATE $u
		SET sessionkey='".uniqid()."'
		WHERE sessionkey='$authkey'";
	}
	/**
	COMMENT QUERIES
	**/
	public static function getcomments($entryid, $commentid, $num){
		$u = DBConfig::$tables["users"];
		$c = DBConfig::$tables["comments"];
		return "SELECT 
		`$c`.id AS 'commentid',
		`$c`.comment AS 'comment',
		`$c`.timestamp AS 'time',
		`$u`.id AS 'userid',
		`$u`.username AS 'username'
		FROM `$c`, `$u`
		WHERE `$u`.id = `$c`.userid
		AND `comment`.id<$commentid
		AND `$c`.entryid = $entryid
		ORDER BY `$c`.timestamp DESC
		LIMIT 0,$num";
	}
	public static function addcomment($entryid, $comment, $userid){
		$c = DBConfig::$tables["comments"];
		$date = date( 'Y-m-d H:i:s', time());
		return "INSERT INTO $c
		(entryid, userid, comment, timestamp)
		VALUES
		($entryid, $userid, '$comment', '$date')";
	}
	public static function getcomment($commentid){
		$c = DBConfig::$tables["comments"];
		return "SELECT * FROM $c
		WHERE id = $commentid";
	}
	public static function deletecomment($commentid, $uid){
		$c = DBConfig::$tables["comments"];
		return "UPDATE $c
		SET comment=''
		WHERE id=$commentid
		AND userid=$uid";
	}
	public static function removecomments($entryid){
		$c = DBConfig::$tables["comments"];
		$query = 
		"DELETE FROM `$c`
		WHERE `$c`.entryid = $entryid";
		return $query;
	}
	/**
	ENTRY QUERIES
	**/
	public static function createentry($userid, $typeid, $title, $sex){
		$e = DBConfig::$tables["entries"];
		$query =
		"INSERT INTO `$e`
		(userid, typeid, title, date, sex)
		VALUES
		($userid, $typeid, '$title', CURRENT_TIMESTAMP, '$sex')";
		return $query;
	}
	public static function getentry($entryid, $where){
		$e = DBConfig::$tables["entries"];
		$u = DBConfig::$tables["users"];
		$t = DBConfig::$tables["types"];
		$tags = DBConfig::$tables["tags"];
		$usertags = DBConfig::$tables["usertags"];
		if(!isset($where)){
			$where = "";
		}else{
			$where = " AND (".$where.")";
		}
		if(isset($entryid) && $entryid!=false){
			$id = "`$e`.id = $entryid AND";
		}else{
			$id = "";
		}
		$query = 
			"SELECT
			`$e`.id AS id,
			`$e`.title AS title,
			`$e`.date AS date,
			`$e`.sex AS sex,
			`$e`.userid AS userid,
			`$u`.username AS username,
			`$t`.id AS typeid,
			`$t`.name AS typename,
			`$t`.description AS typedescription

			FROM
			`$e`, `$u`, `$t`, `$tags`, `$usertags`

			WHERE
			$id
			`$e`.userid = `$u`.id
			AND
			(`$e`.typeid = `$t`.id
			OR `$e`.typeid = -1)
			$where

			GROUP BY
			`$e`.id";
		return $query;
	}
	public static function getentriesbyrating($start, $limit, $where, $userid){
		$e = DBConfig::$tables["entries"];
		$u = DBConfig::$tables["users"];
		$t = DBConfig::$tables["types"];
		$tags = DBConfig::$tables["tags"];
		$usertags = DBConfig::$tables["usertags"];
		$r = DBConfig::$tables["ratings"];
		if(!isset($where)){
			$where = "";
		}else{
			$where = " AND (".$where.")";
		}
		$query = 
			"SELECT
			`$e`.id AS id,
			`$e`.title AS title,
			`$e`.date AS date,
			`$e`.sex AS sex,
			`$e`.userid AS userid,
			`$u`.username AS username,
			`$t`.id AS typeid,
			`$t`.name AS typename,
			`$t`.description AS typedescription,
			AVG(`$r`.rating) AS ratings

			FROM
			`$e`, `$u`, `$t`, `$r`, `$tags`, `$usertags`

			WHERE
			`$e`.userid = `$u`.id
			AND
			(`$e`.typeid = `$t`.id
			OR `$e`.typeid = -1)
			AND
			`$e`.id = `$r`.entryid
			$where

			GROUP BY
			`$r`.entryid
			ORDER BY
			ratings DESC
			LIMIT $start, $limit";
		return $query;
	}
	public static function getallentries($start, $limit, $order, $where){
		if(!isset($order)){
			$order = "date";
		}
		return Queries::getentry(false, $where)." ORDER BY ".$order." DESC LIMIT $start, $limit";
	}
	public static function deleteentry($id){
		$e = DBConfig::$tables["entries"];
		$query =
		"DELETE FROM `$e`
		WHERE `$e`.id = $id";
		return $query;
	}
	/**
	INFORMATION QUERIES
	*/
	public static function getinformation($entryid){
		$i = DBConfig::$tables["information"];
		if(isset($entryid)){
			$id = "`$i`.entryid = $entryid";
		}else{
			$id = "1";
		}
		$query = 
			"SELECT
			`$i`.entryid AS entryid,
			`$i`.artist AS artist,
			`$i`.transcription AS transcription,
			`$i`.location AS location,
			`$i`.longitude AS longitude,
			`$i`.latitude AS latitude
			FROM $i
			WHERE $id";
		return $query;
	}
	public static function removeinformation($entryid){
		$i = DBConfig::$tables["information"];
		$query = 
		"DELETE FROM `$i`
		WHERE `$i`.entryid = $entryid";
		return $query;
	}
	public static function addinformation($entryid, $artist, $transcription, $location, $lat, $long){
		$i = DBConfig::$tables["information"];
		$query =
		"INSERT INTO `$i`
		(entryid, artist, transcription, location, latitude, longitude)
		VALUES
		($entryid, '$artist', '$transcription', '$location', $lat, $long)";
		return $query;
	}
	/**
	IMAGE QUERIES
	*/
	public static function saveimage($entryid, $path, $x, $y, $w, $h){
		$i = DBConfig::$tables["images"];
		$query = 
		"INSERT INTO `$i`
		(entryid, path, xposition, yposition, width, height)
		VALUES
		($entryid, '$path', $x, $y, $w, $h)
		";
		return $query;
	}
	/**
	TAG QUERIES
	*/
	public static function gettagbyid($tagid){
		$t = DBConfig::$tables["tags"];
		$status = DBConfig::$tagStatus["usercreated"];
		$query = "SELECT * FROM `$t` WHERE `$t`.tagid = $tagid";
		return $query;
	}
	public static function gettagbyname($tag){
		$t = DBConfig::$tables["tags"];
		$status = DBConfig::$tagStatus["usercreated"];
		$query = "SELECT * FROM `$t` WHERE `$t`.tag = '$tag'";
		return $query;
	}
	public static function createtag($tag){
		$t = DBConfig::$tables["tags"];
		$status = DBConfig::$tagStatus["usercreated"];
		$query =
		"INSERT INTO `$t`
		(tag, status)
		VALUES
		('$tag', $status)";
		return $query;
	}
	public static function getalltagsbystatus($status){
		$t = DBConfig::$tables["tags"];
		$query = "SELECT * FROM `$t` WHERE `$t`.status = $status";
		return $query;
	}
	public static function getalltags(){
		$t = DBConfig::$tables["tags"];
		$query = "SELECT * FROM `$t`";
		return $query;
	}
	public static function deletetag($id){
		$t = DBConfig::$tables["tags"];
		$query = 
		"DELETE FROM `$t`
		WHERE `$t`.tagid=$id";
		return $query;
	}
	public static function removetag($id){
		$u = DBConfig::$tables["usertags"];
		$query = 
		"DELETE FROM `$u`
		WHERE `$u`.tagid=$id;";
		return $query;
	}
	public static function addtag($tagid, $entryid){
		$t = DBConfig::$tables["usertags"];
		$query =
		"INSERT INTO `$t`
		(entryid, tagid)
		VALUES
		($entryid, $tagid)
		ON DUPLICATE KEY UPDATE tagid=tagid";
		return $query;
	}
	public static function getusertags($entryid){
		$u = DBConfig::$tables["usertags"];
		$t = DBConfig::$tables["tags"];
		if(isset($entryid)){
			$id = "`$u`.entryid = $entryid AND";
		}else{
			$id = "";
		}
		$query = "SELECT 
			`$t`.tagid, `$t`.tag
			FROM `$t`, `$u`
			WHERE $id
			`$u`.tagid = `$t`.tagid";
		return $query;
	}
	public static function removetags($entryid){
		$u = DBConfig::$tables["usertags"];
		$query = 
		"DELETE FROM `$u`
		WHERE `$u`.entryid = $entryid";
		return $query;
	}
	/**
	RATING QUERIES
	*/
	public static function getratings($entryid, $userid){
		$r = DBConfig::$tables["ratings"];
		if(isset($entryid)){
			$id = "`$r`.entryid = $entryid";
		}else{
			$id = "1";
		}
		if(isset($userid)){
			$rated = ",SUM(CASE WHEN `$r`.userid=$userid THEN `$r`.rating ELSE 0 END) AS ratedbyme";
		}else{
			$rated = "";
		}
		$query = 
			"SELECT
			`$r`.entryid AS entryid,
			AVG(`$r`.rating) AS rating,
			COUNT(`$r`.rating) AS ratingcount
			$rated
			FROM $r
			WHERE $id";
		return $query;
	}
	public static function getrandomratings(){
		$r = DBConfig::$tables["ratings"];
		$e = DBConfig::$tables["entries"];
		$query =
		"SELECT 
		`$e`.id, COUNT(`$r`.entryid) as 'count' 
		FROM `$e`
		LEFT OUTER JOIN `$r`
		ON `$e`.id = `$r`.entryid
		GROUP BY `$r`.entryid
		ORDER BY `count` ASC
		LIMIT 0,100";
		return $query;
	}
	public static function getrandomratingsforuser($userid){
		if(!isset($userid)){
			return Queries::getrandomratings();
		}
		$r = DBConfig::$tables["ratings"];
		$e = DBConfig::$tables["entries"];
		$query =
		"SELECT `id`, `count`
		FROM(
		    SELECT
		    `$e`.id,
		    COUNT(`$r`.entryid) as 'count',
		    sum(case when `$r`.userid=$userid THEN 1 ELSE 0 END) as 'rated'
		    
		    FROM (`$e`
		    LEFT OUTER JOIN `$r`
		    ON `$e`.id = `$r`.entryid)
		    GROUP BY `$r`.entryid
		) a
		    
		WHERE `rated` = 0

		ORDER BY `count` ASC

		LIMIT 0,100";
		return $query;
	}
	public static function deleterating($entryid, $userid){
		$r = DBConfig::$tables["ratings"];
		$query = 
		"DELETE FROM `$r`
		WHERE `$r`.userid = $userid
		AND `$r`.entryid = $entryid";
		return $query;
	}
	public static function addrating($entryid, $userid, $rating){
		$r = DBConfig::$tables["ratings"];
		$query =
		"INSERT INTO `$r`
		(entryid, userid, rating, date)
		VALUES
		($entryid, $userid, $rating, CURRENT_TIMESTAMP)
		ON DUPLICATE KEY UPDATE
		`$r`.rating = $rating,
		`$r`.date = CURRENT_TIMESTAMP";
		return $query;
	}
	public static function removeratings($entryid){
		$r = DBConfig::$tables["ratings"];
		$query =
		"DELETE FROM `$r`
		WHERE `$r`.entryid = $entryid";
		return $query;
	}
	/**
	TYPE QUERIES
	*/
	public static function gettypebyname($name){
		$t = DBConfig::$tables["types"];
		$query=
		"SELECT * FROM `$t` WHERE `$t`.name = '$name'";
		return $query;
	}
	public static function gettypebyid($id){
		$t = DBConfig::$tables["types"];
		$query=
		"SELECT * FROM `$t` WHERE `$t`.id = $id";
		return $query;
	}
	public static function createtype($name, $desc){
		$t = DBConfig::$tables["types"];
		$query=
		"INSERT INTO `$t`
		(`name`, `description`)
		VALUES
		('$name', '$desc')";
		return $query;
	}
	public static function updatetype($id, $name, $desc){
		$t = DBConfig::$tables["types"];
		$query=
		"UPDATE `$t`
		SET
		`$t`.name = '$name',
		`$t`.description = '$desc'
		WHERE
		`$t`.id = $id";
		return $query;
	}
	public static function deletetype($id){
		$t = DBConfig::$tables["types"];
		$query=
		"DELETE FROM `$t`
		WHERE `$t`.id = $id";
		return $query;
	}
	public static function getalltypes(){
		$t = DBConfig::$tables["types"];
		$query=
		"SELECT * FROM `$t` WHERE 1";
		return $query;
	}
	public static function removetypefromentries($id){
		$e = DBConfig::$tables["entries"];
		$query =
		"UPDATE `$e`
		SET
		`$e`.typeid = -1
		WHERE `$e`.typeid = $id";
		return $query;
	}
	/**
	REPORT QUERIES
	*/
	public static function addreport($entryid, $userid, $status, $commentid, $reportdescription){
		$r = DBConfig::$tables["reports"];
		$query =
		"INSERT INTO `$r`
		(entryid, userid, status, commentid, reportdescription, reportdate)
		VALUES
		($entryid, $userid, $status, $commentid, '$reportdescription', CURRENT_TIMESTAMP)
		ON DUPLICATE KEY UPDATE
		status = $status,
		reportdescription = '$reportdescription'";
		return $query;
	}
	public static function getreport($reportid){
		$r = DBConfig::$tables["reports"];
		$u = DBConfig::$tables["users"];
		$e = DBConfig::$tables["entries"];
		$c = DBConfig::$tables["comments"];
		$query = 
		"SELECT
		`$r`.id AS reportid,
		`$r`.status as status,
		`$r`.commentid as commentid,
		`$c`.comment as comment,
		`$r`.reportdescription as reportdescription,
		`$r`.reportdate as reportdate,
		`$e`.id as entryid,
		`$e`.title as entrytitle,
		`$e`.sex as entrysex,
		`$u`.id as userid,
		`$u`.username as username,
		`$u`.lastaction as lastaction

		FROM `$r`,`$u`,`$e`,`$c`

		WHERE (`$r`.userid = `$u`.id OR `$r`.userid = -1)
		AND (`$r`.commentid = `$c`.id OR `$r`.commentid = -1)
		AND `$r`.entryid = `$e`.id
		AND `$r`.id = $reportid";
		return $query;
	}
	public static function getreportofuser($entryid, $userid){
		$r = DBConfig::$tables["reports"];
		$u = DBConfig::$tables["users"];
		$e = DBConfig::$tables["entries"];
		$c = DBConfig::$tables["comments"];
		$query = 
		"SELECT
		`$r`.id AS reportid,
		`$r`.status as status,
		`$r`.commentid as commentid,
		`$c`.comment as comment,
		`$r`.reportdescription as reportdescription,
		`$r`.reportdate as reportdate,
		`$e`.id as entryid,
		`$e`.title as entrytitle,
		`$e`.sex as entrysex,
		`$u`.id as userid,
		`$u`.username as username,
		`$u`.lastaction as lastaction

		FROM `$r`,`$u`,`$e`,`$c`

		WHERE `$r`.userid = `$u`.id
		AND (`$r`.commentid = `$c`.id OR `$r`.commentid = -1)
		AND `$u`.id = $userid
		AND `$r`.entryid = `$e`.id
		AND `$e`.id = $entryid";
		return $query;
	}
	public static function updatereportstatus($reportid, $status){
		$r = DBConfig::$tables["reports"];
		$query =
		"UPDATE `$r`
		SET `$r`.status = $status
		WHERE `$r`.id = $reportid";
		return $query;
	}
	public static function removereports($entryid){
		$r = DBConfig::$tables["reports"];
		$query = 
		"DELETE FROM `$r`
		WHERE `$r`.entryid = $entryid";
		return $query;
	}
	/**
	IMAGE QUERIES
	*/
	public static function getimage($id){
		$i = DBConfig::$tables["images"];
		$u = DBConfig::$tables["users"];
		$e = DBConfig::$tables["entries"];
		$query = 
		"SELECT
		`$i`.id AS id,
		`$i`.path AS path,
		`$i`.xposition AS xposition,
		`$i`.yposition AS yposition,
		`$i`.width AS width,
		`$i`.height AS height,
		`$i`.entryid AS entryid,
		`$e`.title AS title,
		`$e`.sex AS sex,
		`$u`.id AS userid,
		`$u`.username AS username,
		`$u`.email AS email
		FROM
		`$i`, `$e`, `$u`
		WHERE
		`$i`.id = $id
		AND `$i`.entryid = `$e`.id
		AND `$e`.userid = `$u`.id";
		return $query;
	}
	public static function updateimage($id, $x, $y, $w, $h){
		$i = DBConfig::$tables["images"];
		$query =
		"UPDATE `$i`
		SET xposition=$x,
		yposition=$y,
		width=$w,
		height=$h
		WHERE id = $id";
		return $query;
	}
	public static function removeimages($entryid){
		$i = DBConfig::$tables["images"];
		$query =
		"DELETE FROM `$i`
		WHERE `$i`.entryid = $entryid";
		return $query;
	}
	public static function getimages($entryid){
		$img = DBConfig::$tables["images"];
		$query =
			"SELECT id, path, xposition, yposition, width, height
			FROM `$img`
			WHERE `$img`.entryid=".$entryid;
		return $query;
	}
	/**
	INDEX QUERIES
	*/
	public static function removeindex($entryid){
		$i = DBConfig::$tables["index"];
		$query = 
		"DELETE FROM `$i`
		WHERE `$i`.entryid = $entryid";
		return $query;
	}
	public static function index($word, $entryid, $titleoccurence, $transcriptionoccurence){
		$i = DBConfig::$tables["index"];
		$query =
		"INSERT INTO `$i`
		(word, entryid, titleoccurence, transcriptionoccurence)
		VALUES
		('$word', $entryid, $titleoccurence, $transcriptionoccurence)";
		return $query;
	}
}

?>