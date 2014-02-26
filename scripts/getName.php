<?php
// getName.php -- Eric Leese  
// get name from person file, for this clock#
// replaces need for a cgi-bin script

// sanitize user-entered clock# in case user accesses this
// php code directly and bypasses form entry

//only works in PHP 5.2+
//$CLK=filter_var($_GET["clk"],FILTER_SANITIZE_NUMBER_INT);

$CLK= sanitize($_GET["clk"]);
$PID=getmypid();

system("/appl/fp/dreport msmatreq -fp getClock -u -sr 1 -r $PID -rx $CLK >> /dev/null");
system("cat /appl/fpmerge/$PID.getClock.pout");
system("rm -f /appl/fpmerge/$PID.getClock.pout");

//not working yet
function sanitize($val)
{
	if (preg_match('/[^0-9]/',$val))	//found a non-digit character
		return "?"; // will cause form to flag clk# as invalid
	else
		return $val;
}

?>

