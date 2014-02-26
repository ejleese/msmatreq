<?php
// req_submit.php   post req to filepro. eric leese

//debug testing of values passed
/*
$CLK=sanitize($_GET["clk"]);
$TRAV=sanitize($_GET["trav"]);
$JOB=sanitize($_GET["job"]);
$PART=sanitize($_GET["part"]);
$QTY=sanitize($_GET["qty"]);
$FILL=sanitize($_GET["fill"]);
$DESC=sanitize($_GET["desc"]);

echo "You have chosen....wisely.<br>",
"Clock #: $CLK <br>",
"Trav # : $TRAV <br>", 
"Job #  : $JOB <br>",
"Part # : $PART <br>",
"Qty    : $QTY <br>",
"Fill?  : $FILL <br>",
"Desc.  : $DESC <br>";
*/

$PID=getmypid();
$TMPFILE="/tmp/$PID.msmatreq_add.tmp"; // results from filePro
$PARAMFILE="/tmp/$PID.msparams.tmp";		// parameters passed
$QS=sanitize($_SERVER['QUERY_STRING']);

system("echo \"$QS\" > $PARAMFILE");

//system("echo \"$CLK $TRAV $JOB $PART $QTY $FILL $DESC\" | mutt -s req_submit.php ericl@borisch.com");

system("/appl/fp/dreport msmatreq -fp addReq -sr 1 -u -r \"$TMPFILE\" -rw \"$PARAMFILE\" >> /dev/null");
system("cat $TMPFILE");
//system("rm -f $TMPFILE");
system("rm -f $PARAMFILE");

// TODO: Can I do this directly on QUERY_STRING ?
// strip unwanted characters in case user directly accesses this page with parameters
// this same stuff is already done in the javascript, but if someone tries to
// directly access this page with manual parameters, i still want to strip it out.
// TODO: Do we have to worry about parameters entered as %3C (<) or %3E (>) etc?? seems ok as long as escape'd
function sanitize($var)
{
	return strip_tags(trim($var)); 
}

?>
