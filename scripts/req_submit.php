<?php
// req_submit.php   post req to filepro. eric leese
// 	gets values from a POST

//system("echo \"req_submit.php\" | mutt -s req_submit.php ericl@borisch.com");

//var_dump($_POST);

$PID=getmypid();
$TMPFILE="/tmp/$PID.msmatreq_add.tmp"; // results from filePro
$PARAMFILE="/tmp/$PID.msparams.tmp";		// parameters passed

// turn POST data into a query string

$query_string="";
$qs=array();
foreach ($_POST as $key => $value)
{
	$qs[]="$key=$value";
}
$query_string=join("&",$qs);
//echo $query_string;

//write query string to file for filepro use

file_put_contents($PARAMFILE,$query_string);

system("/appl/fp/dreport msmatreq -fp addReq -sr 1 -u -r \"$TMPFILE\" -rw \"$PARAMFILE\" >> /dev/null");
system("cat $TMPFILE");
system("rm -f $TMPFILE");
system("rm -f $PARAMFILE");

?>
