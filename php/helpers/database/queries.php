<?php

/*
Latrinalia DataBase Queries
*/
class Queries{
	/**
	USER QUERIES
	**/
	public static function getuser($sessionkey){
		$u = DBConfig::$tables["users"];
		$s = DBConfig::$tables["sessions"];
		return
		"SELECT id, email, username, joindate, lastaction, status
		FROM `$u`, `$s`
		WHERE
		`$s`.`authkey` = \"$sessionkey\"
		AND `$u`.id = `$s`.userid";
	}
	public static function verify($key){
		$u = DBConfig::$tables["users"];
		$newKey = uniqid();
		$query=
		"UPDATE `$u`
		SET status = ".DBConfig::$userStatus["default"].",
		sessionkey = '$newKey'
		WHERE sessionkey='$key'";
		return $query;
	}
	public static function updateverificationkey($userid, $key){
		$u = DBConfig::$tables["users"];
		$query =
		"UPDATE `$u`
		SET sessionkey = '$key',
		status = ".DBConfig::$userStatus["newUser"]."
		WHERE `$u`.id = $userid";
		return $query;
	}
	public static function registerdummy($id){
		$u = DBConfig::$tables["users"];
		$query=
		"UPDATE `$u`
		SET status = ".DBConfig::$userStatus["newUser"]."
		WHERE id='$id'";
		return $query;
	}
	public static function getuserbykey($key){
		return
		"SELECT id, email, username, joindate, lastaction, status
		FROM `".DBConfig::$tables["users"]."` WHERE `sessionkey` = \"$key\"";
	}
	public static function getuserbyid($id){
		return
		"SELECT id, email, username, joindate, lastaction, status
		FROM `".DBConfig::$tables["users"]."` WHERE `id` = \"$id\"";
	}
	public static function updateuserstatus($userid, $status){
		$u = DBConfig::$tables["users"];
		$query = 
		"UPDATE `$u`
		SET status = $status
		WHERE id = $userid";
		return $query;
	}
	public static function update($key){
		$u = DBConfig::$tables["users"];
		$s = DBConfig::$tables["sessions"];
		$date = date( 'Y-m-d H:i:s', time());
		return "UPDATE $u as u
		JOIN `$s` as s
		ON u.id = s.userid
		SET u.lastaction='$date'
		WHERE s.authkey='$key'";
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
	public static function createuser($key, $mail, $name, $pwd, $status){
		$u = DBConfig::$tables["users"];
		return "INSERT INTO $u
		(email, username, joindate, lastaction, status, sessionkey, password)
		VALUES
		('$mail','$name', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,$status,'$key','$pwd')";
	}
	public static function deleteuser($userid){
		$name = 'User'.$id.uniqid();
		$mail = $name."@latrinalia.de";
		$password = md5(uniqid());
		$key = md5($mail).uniqid();
		$u = DBConfig::$tables["users"];
		return "UPDATE `$u`
		SET sessionkey='$key',
		status = ".DBConfig::$userStatus["deleted"].",
		username = '$name',
		email = '$mail',
		password = '$password'
		WHERE `$u`.id='$userid'";
	}
	public static function getuserbyname($uname, $password){
		$and = "";
		if(isset($password)){
			$and = "AND `password` = '$password'";
		}
		return
		"SELECT id, email, username, joindate, lastaction, status
		FROM `".DBConfig::$tables["users"]."`
		WHERE (`username` = '$uname'
		 OR `email` = '$uname') $and";
	}
	public static function getuserfollows($id){
		$u = DBConfig::$tables["users"];
		$f = DBConfig::$tables["follows"];
		$query =
		"SELECT followerid, followername, targetid, targetname, a.date FROM(
			SELECT
			`$u`.id AS followerid,
			`$u`.username AS followername,
			`$f`.date AS date
			FROM `$u`, `$f`
			WHERE `$u`.id = `$f`.follower
			AND (`$f`.follower = $id
				OR `$f`.target = $id)
		)a

		JOIN(
			SELECT
			`$u`.id AS targetid,
			`$u`.username AS targetname,
			`$f`.date AS date
			FROM `$u`, `$f`
			WHERE `$u`.id = `$f`.target
			AND (`$f`.follower = $id
				OR `$f`.target = $id)
		)b

		ON a.date = b.date

		ORDER BY a.date";
		return $query;
	}
	public static function getuserstats($id){
		$e = DBConfig::$tables["entries"];
		$c = DBConfig::$tables["comments"];
		$r = DBConfig::$tables["ratings"];
		$f = DBConfig::$tables["follows"];
		$info = DBConfig::$tables["information"];
		$query = "SELECT
		SUM(entries) AS entries,
		SUM(comments) AS comments,
		SUM(ratings) AS ratings,
		SUM(transcriptions) AS transcriptions,
		(1+AVG(meta))/2 AS meta,
		SUM(follows) AS followers

		FROM(

		SELECT
		$id AS userid,
		COUNT(*) AS entries,
		NULL AS comments,
		NULL AS ratings,
		NULL AS transcriptions,
		NULL AS meta,
		NULL AS follows
		FROM $e
		WHERE $e.userid = $id

		UNION
		SELECT
		$id AS userid,
		NULL AS entries,
		COUNT(*) AS comments,
		NULL AS ratings,
		NULL AS transcriptions,
		NULL AS meta,
		NULL AS follows
		FROM $c
		WHERE $c.userid = $id

		UNION
		SELECT
		$id AS userid,
		NULL AS entries,
		NULL AS comments,
		NULL AS ratings,
		NULL AS transcriptions,
		AVG(`$r`.rating) AS meta,
		NULL AS follows
		FROM $e, $r
		WHERE $e.userid = $id
		AND $e.id = $r.entryid

		UNION
		SELECT
		$id AS userid,
		NULL AS entries,
		NULL AS comments,
		NULL AS ratings,
		NULL AS transcriptions,
		NULL AS meta,
		COUNT(*) AS follows
		FROM $f
		WHERE $f.target = $id

		UNION
		SELECT
		$id AS userid,
		NULL AS entries,
		NULL AS comments,
		NULL AS ratings,
		COUNT(*) AS transcriptions,
		NULL AS meta,
		NULL AS follows
		FROM $info
		WHERE $info.transcriberid = $id
		AND NOT LENGTH($info.transcription)=0

		UNION
		SELECT
		$id AS userid,
		NULL AS entries,
		NULL AS comments,
		COUNT(*) AS ratings,
		NULL AS transcriptions,
		NULL AS meta,
		NULL AS follows
		FROM $r
		WHERE $r.userid = $id
		 ) a

		GROUP BY userid";
		return $query;
	}
	public static function login($userid, $authkey, $ip){
		$s = DBConfig::$tables["sessions"];
		$date = date( 'Y-m-d H:i:s', time());
		$query =
		"INSERT INTO $s
		(userid, authkey, login, ip)
		VALUES
		($userid, '$authkey', '$date', '$ip')
		ON DUPLICATE KEY UPDATE
		login = '$date',
		authkey = '$authkey'";
		return $query;
	}
	public static function logout($authkey){
		$s = DBConfig::$tables["sessions"];
		return "DELETE FROM $s
		WHERE authkey='$authkey'";
	}
	public static function logoutuser($userid){
		$s = DBConfig::$tables["sessions"];
		return "DELETE FROM $s
		WHERE userid=$userid";
	}
	public static function harddeleteuser($id){
		$u = DBConfig::$tables["users"];
		$query =
		"DELETE FROM `$u` WHERE id=$id";
		return $query;
	}
	public static function getallusers(){
		$u = DBConfig::$tables["users"];
		$query =
		"SELECT * FROM `$u`";
		return $query;
	}
	public static function followuser($targetid, $followerid){
		$f = DBConfig::$tables["follows"];
		$query =
		"INSERT INTO `$f`
		(follower, target)
		VALUES
		($followerid, $targetid)";
		return $query;
	}
	public static function unfollowuser($targetid, $followerid){
		$f = DBConfig::$tables["follows"];
		$query =
		"DELETE FROM `$f`
		WHERE
		follower = $followerid
		AND
		target = $targetid";
		return $query;
	}
	// unused
	public static function removefollows($userid){
		$f = DBConfig::$tables["follows"];
		$query =
		"DELETE FROM `$f`
		WHERE
		follower = $userid
		OR
		target = $userid";
		return $query;
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
		`$u`.username AS 'username',
		`$u`.status AS 'userstatus'
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
	public static function updateentry($entryid, $typeid, $title, $sex){
		$e = DBConfig::$tables["entries"];
		$query =
		"UPDATE `$e`
		SET
		typeid = $typeid,
		title = '$title',
		sex = '$sex'
		WHERE `$e`.id = $entryid";
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
			`$u`.status AS userstatus,
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
		$r = DBConfig::$tables["entryratings"];
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
			`$u`.status AS userstatus,
			`$t`.id AS typeid,
			`$t`.name AS typename,
			`$t`.description AS typedescription,
			`$r`.ratings AS ratings,
			`$r`.ratingcount AS ratingcount

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
			ratings DESC, ratingcount DESC
			LIMIT $start, $limit";
		return $query;
	}
	public static function getentriesbylocation($start, $limit, $orderby,  $where){
		$e = DBConfig::$tables["entries"];
		$info = DBConfig::$tables["information"];
		$r = DBConfig::$tables["ratings"];
		if(!isset($where)){
			$where = "";
		}else{
			$where = " AND (".$where.")";
		}
		$query = 
			"SELECT
			`$info`.entryid as id,
			location,
			`$e`.date as date,
			AVG(`$r`.rating) as rating
			FROM `$e`, `$info`, `$r`
			WHERE (`$e`.id = `$info`.entryid) 
			AND (`$info`.entryid = `$r`.entryid)
			$where
			GROUP BY `$info`.entryid
			ORDER BY $orderby DESC
			LIMIT $start, $limit";
		return $query;
	}
	public static function getallentries($start, $limit, $order, $where){
		if(!isset($order)){
			$order = "date";
		}
		if($limit == -1){
			$lim = "";
		}else{
			$lim = "LIMIT $start, $limit";
		}
		return Queries::getentry(false, $where)." ORDER BY ".$order." DESC ".$lim;
	}
	public static function deleteentry($id){
		$e = DBConfig::$tables["entries"];
		$query =
		"DELETE FROM `$e`
		WHERE `$e`.id = $id";
		return $query;
	}
	public static function mergeuserentries($oldId, $newId){
		$e = DBConfig::$tables["entries"];
		$query =
		"UPDATE `$e`
		SET `$e`.userid = $newId
		WHERE `$e`.userid = $oldId";
		return $query;
	}
	public static function mergeuserfollows($oldId, $newId){
		$f = DBConfig::$tables["follows"];
		$query =
		"UPDATE `$f`
		SET `$f`.follower = $newId
		WHERE `$f`.follower = $oldId";
		return $query;
	}
	public static function mergeuserfollowers($oldId, $newId){
		$f = DBConfig::$tables["follows"];
		$query =
		"UPDATE `$f`
		SET `$f`.target = $newId
		WHERE `$f`.target = $oldId";
		return $query;
	}
	/**
	INFORMATION QUERIES
	*/
	public static function getinformation($entryid){
		$i = DBConfig::$tables["information"];
		$u = DBConfig::$tables["users"];
		if(isset($entryid)){
			$id = "AND `$i`.entryid = $entryid";
		}else{
			$id = "";
		}
		$query = 
			"SELECT
			`$i`.entryid AS entryid,
			`$i`.artist AS artist,
			`$i`.transcription AS transcription,
			`$i`.transcriberid AS userid,
			`$u`.username AS username,
			`$i`.location AS location,
			`$i`.longitude AS longitude,
			`$i`.latitude AS latitude
			FROM $i, $u
			WHERE `$i`.transcriberid = `$u`.id
			$id";
		return $query;
	}
	public static function removeinformation($entryid){
		$i = DBConfig::$tables["information"];
		$query = 
		"DELETE FROM `$i`
		WHERE `$i`.entryid = $entryid";
		return $query;
	}
	public static function addinformation($entryid, $artist, $transcription, $location, $lat, $long, $userid){
		$i = DBConfig::$tables["information"];
		if(!isset($lat))$lat = -1;
		if(!isset($long))$long = -1;
		$query =
		"INSERT INTO `$i`
		(entryid, artist, transcription, transcriberid, location, latitude, longitude)
		VALUES
		($entryid, '$artist', '$transcription', $userid, '$location', $lat, $long)";
		return $query;
	}
	public static function mergeuserinformation($oldId, $newId){
		$i = DBConfig::$tables["information"];
		$query=
		"UPDATE `$i`
		SET `$i`.transcriberid = $newId
		WHERE `$i`.transcriberid = $oldId";
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
		$u = DBConfig::$tables["usertags"];
		$query = 
		"SELECT
		`$t`.tagid as tagid,
		`$t`.tag as tag,
		`$t`.status as status,
		COUNT(`$u`.entryid) as count
		FROM `$t`
		LEFT OUTER JOIN
		`$u`
		ON `$t`.tagid = `$u`.tagid
		WHERE `$t`.status = $status
		GROUP BY `$t`.tagid
		ORDER BY count DESC";
		return $query;
	}
	public static function getalltags(){
		$t = DBConfig::$tables["tags"];
		$u = DBConfig::$tables["usertags"];
		$query = 
		"SELECT
		`$t`.tagid as tagid,
		`$t`.tag as tag,
		`$t`.status as status,
		COUNT(`$u`.entryid) as count
		FROM `$t`
		LEFT OUTER JOIN
		`$u`
		ON `$t`.tagid = `$u`.tagid
		GROUP BY `$t`.tagid
		ORDER BY count DESC";
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
	public static function updatetag($id, $status){
		$t = DBConfig::$tables["tags"];
		$query =
		"UPDATE `$t`
		SET `$t`.status = $status
		WHERE `$t`.tagid = $id";
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
		GROUP BY `$e`.id
		ORDER BY `count` ASC
		LIMIT 0,100";
		return $query;
	}
	public static function getrandomuntranscribedids(){
		$i = DBConfig::$tables["information"];
		$e = DBConfig::$tables["entries"];
		$query =
		"SELECT 
		`$i`.entryid as id
		FROM `$i`
		WHERE LENGTH(`$i`.transcription)=0
		ORDER BY `changed` DESC";
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
		    GROUP BY `$e`.id
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
	public static function mergeuserrating($oldId, $newId){
		$r = DBConfig::$tables["ratings"];
		$query =
		"UPDATE `$r`
		SET `$r`.userid = $newId
		WHERE `$r`.userid = $oldId";
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

		FROM `$u`,`$e`,`$r`
		LEFT OUTER JOIN `$c`
		ON `$r`.commentid = `$c`.id

		WHERE `$r`.userid = `$u`.id
		AND `$r`.entryid = `$e`.id ";
		if(isset($reportid))$query .= "AND `$r`.id = $reportid ";
		$query .= "ORDER BY reportdate";
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
	public static function mergeuserreports($oldId, $newId){
		$r = DBConfig::$tables["reports"];
		$query =
		"UPDATE `$r`
		SET `$r`.userid = $newId
		WHERE `$r`.userid = $oldId";
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
	public static function search($words, $start, $limit){
		if(is_array($words)){
			if(count($words>1)){
				$word = "`index`.`word` LIKE '%".$words[0]."%'";
				for($i=1; $i<count($words);$i++){
					$word .= " OR `index`.`word` LIKE '%".$words[$i]."%'";
				}
			}else{
				$word = "`index`.`word` LIKE '%".$words[0]."%'";
			}
		}else{
			$word = "`index`.`word` LIKE '%$words%'";
		}
		$i = DBConfig::$tables["index"];
		$query =
		"SELECT
		`index`.`entryid` AS id,
		(SUM(`titleoccurence`)+SUM(`transcriptionoccurence`))/a.occurence AS relevancy
		FROM
		`index`,
		(
		    SELECT `index`.`entryid`, SUM(`titleoccurence`)+SUM(`transcriptionoccurence`) AS occurence
		    FROM `index` GROUP BY `entryid`
		) AS a
		WHERE `index`.`entryid` = a.entryid
		AND ($word)
		GROUP BY `index`.`entryid`
		ORDER BY relevancy DESC
		LIMIT $start, $limit";
		return $query;
	}
	/**
	TIMELINE QUERIES
	*/
	public static function gettimeline($userid, $start, $limit){
		$u = DBConfig::$tables["users"];
		$e = DBConfig::$tables["entries"];
		$c = DBConfig::$tables["comments"];
		$i = DBConfig::$tables["images"];
		$f = DBConfig::$tables["follows"];
		$info = DBConfig::$tables["information"];
		$r = DBConfig::$tables["ratings"];
		$query =
		"SELECT DISTINCT
		`$u`.`id` AS userid,
		`$u`.`username` AS username,
		`$e`.`id` AS entryid,
		`$e`.`title` AS title,
		`$e`.`sex` AS sex,
		`$e`.`date` AS date,
		`$i`.`path` AS path,
		NULL AS comment,
		NULL AS rating,
		NULL AS transcription

		FROM
		`$u`, `$i`, `$e`, `$f`

		WHERE `$i`.`entryid` = `$e`.`id`
		AND `$e`.`userid` = `$u`.`id`
		AND (`$e`.`userid` = $userid
			OR (`$e`.`userid` = `$f`.target
				AND `$f`.follower = $userid)
		)

		UNION
		SELECT DISTINCT
		`$u`.`id` AS userid,
		`$u`.`username` AS username,
		`$e`.`id` AS entryid,
		`$e`.`title` AS title,
		`$e`.`sex` AS sex,
		`$c`.`timestamp` AS date,
		`$i`.`path` AS path,
		`$c`.`comment` AS comment,
		NULL AS rating,
		NULL AS transcription

		FROM
		`$c`, `$u`, `$e`, `$i`

		WHERE
		`$c`.`entryid` = `$e`.`id`
		AND `$i`.`entryid` = `$e`.`id`
		AND LENGTH(`$c`.`comment`)>0
		AND `$u`.`id` = `$c`.`userid`
		AND (`$e`.`userid` = $userid
		     OR `$c`.`userid` = $userid)

		UNION
		SELECT DISTINCT
		`$u`.`id` AS userid,
		`$u`.`username` AS username,
		`$e`.`id` AS entryid,
		`$e`.`title` AS title,
		`$e`.`sex` AS sex,
		`$info`.`changed` AS date,
		`$i`.`path` AS path,
		NULL AS comment,
		NULL AS rating,
		`$info`.transcription AS transcription

		FROM
		`$c`, `$u`, `$e`, `$i`, `$info`

		WHERE
		`$info`.`entryid` = `$e`.`id`
		AND `$i`.`entryid` = `$e`.`id`
		AND LENGTH(`$info`.`transcription`)>0
		AND `$u`.`id` = `$info`.`transcriberid`
		AND (`$e`.`userid` = $userid
		     OR `$info`.`transcriberid` = $userid)
		AND NOT `$e`.userid = `$info`.`transcriberid`

		UNION
		SELECT DISTINCT
		`$u`.`id` AS userid,
		`$u`.`username` AS username,
		`$e`.`id` AS entryid,
		`$e`.`title` AS title,
		`$e`.`sex` AS sex,
		`$r`.`date` AS date,
		`$i`.`path` AS path,
		NULL AS comment,
		`$r`.rating AS rating,
		NULL AS transcription

		FROM
		`$u`, `$e`, `$i`, `$r`

		WHERE
		`$i`.`entryid` = `$e`.`id`
		AND `$r`.`entryid` = `$e`.`id`
		AND `$r`.`userid` = $userid
		AND `$r`.`userid` = `$u`.id
		    
		UNION
		SELECT DISTINCT
		`$u`.`id` AS userid,
		`$u`.`username` AS username,
		`$f`.target AS entryid,
		NULL AS title,
		NULL AS sex,
		`$f`.`date` AS date,
		NULL AS path,
		NULL AS comment,
		NULL AS rating,
		NULL AS transcription

		FROM `$f`, `$u`
		WHERE
		(`$f`.follower = $userid AND `$u`.id = `$f`.target)
		OR
		(`$f`.target = $userid AND `$u`.id = `$f`.follower)

		ORDER BY date DESC

		LIMIT $start, $limit";
		return $query;
	}
	/**
	LOCATION QUERIES
	*/
	public static function getalllocations($lat, $long){
		$l = DBConfig::$tables["locations"];
		if(!isset($lat)||!isset($long)){
			$where = "";
		}else{
			$where = 
			"WHERE

			(`$l`.fromlatitude <= $lat
			AND `$l`.tolatitude >= $lat)
			OR
			(`$l`.fromlatitude >= $lat
			AND `$l`.tolatitude <= $lat)

			AND 

			(`$l`.fromlongitude <= $long
			AND `$l`.tolongitude >= $long)
			OR
			(`$l`.fromlongitude >= $long
			AND `$l`.tolongitude <= $long)";
		}
		$query =
		"SELECT * FROM `$l` $where";
		return $query;
	}
	public static function getusedlocations(){
		$e = DBConfig::$tables["entries"];
		$info = DBConfig::$tables["information"];
		$query = 
		"SELECT 
		location, 
		COUNT(entryid) AS count 
		FROM 
		`$info`, 
		`$e`
		WHERE `$info`.entryid = `$e`.id 
		GROUP BY location 
		ORDER BY count DESC";
		return $query;
	}
	public static function deletelocation($id){
		$l = DBConfig::$tables["locations"];
		$query =
		"DELETE FROM `$l`
		WHERE `$l`.id = $id";
		return $query;
	}
	public static function updatelocation($id, $locations, $flat, $flong, $tlat, $tlong){
		$l = DBConfig::$tables["locations"];
		$query =
		"UPDATE `$l`
		SET 
		`$l`.locations = '$locations',
		`$l`.fromlatitude = $flat,
		`$l`.fromlongitude = $flong,
		`$l`.tolatitude = $tlat,
		`$l`.tolongitude = $tlong
		WHERE `$l`.id = $id";
		return $query;
	}
	public static function createlocation($locations, $flat, $flong, $tlat, $tlong){
		$l = DBConfig::$tables["locations"];
		$query =
		"INSERT INTO `$l`
		(`$l`.locations, `$l`.fromlatitude, `$l`.fromlongitude, `$l`.tolatitude, `$l`.tolongitude)
		VALUES
		('$locations', $flat, $flong, $tlat, $tlong)";
		return $query;
	}
	/**
	STATISTIC QUERIES
	*/
	public static function getuploads(){
		$e = DBConfig::$tables["entries"];
		$query = 
		"SELECT COUNT( * ) AS entries,
		DATE_FORMAT(date,'%Y-%m-%d') AS day
		FROM `$e`

		GROUP BY day
		ORDER BY day DESC";
		return $query;
	}
	public static function getjoins(){
		$u = DBConfig::$tables["users"];
		$query = 
		"SELECT COUNT( * ) AS users,
		DATE_FORMAT(joindate,'%Y-%m-%d') AS day
		FROM `$u`
		WHERE `$u`.status != ".DBConfig::$userStatus["unregistered"]."
		GROUP BY day
		ORDER BY day DESC";
		return $query;
	}
	public static function getsexcounts(){
		$e = DBConfig::$tables["entries"];
		$query =
		"SELECT
		SUM(CASE WHEN sex='m' OR sex='M' THEN 1 ELSE 0 END)AS male,
		SUM(CASE WHEN sex='w' OR sex='W' THEN 1 ELSE 0 END)AS female,
		SUM(CASE WHEN sex<>'m' AND sex<>'M' AND sex<>'w' AND sex<>'W' THEN 1 ELSE 0 END)AS unisex
		FROM `$e`";
		return $query;
	}
	/**
	CLEANUP
	*/
	public static function cleanupsession($date){
		$s = DBConfig::$tables["sessions"];
		$query=
		"DELETE FROM `$s`
		WHERE `$s`.login <= '$date'";
		return $query;
	}
	public static function cleanupreports($date){
		$r = DBConfig::$tables["reports"];
		$query=
		"DELETE FROM `$r`
		WHERE `$r`.reportdate <= '$date'";
		return $query;
	}
	public static function getinactiveusers($date){
		$u = DBConfig::$tables["users"];
		$query=
		"SELECT * FROM `$u`
		WHERE `$u`.lastaction <= '$date'";
		return $query;
	}
}

?>