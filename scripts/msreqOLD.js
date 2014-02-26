// javascripts for machine shop req system

var http = getHTTPObject(); 

//get name associated with clock# on form
function getClockno()
{
	http.open("GET","/getClock.php?param="+escape(document.getElementById("clk").value),true);
	http.onreadystatechange = handleHttpResponse;
	http.send(null);
}

function handleHttpResponse() 
{
  if (http.readyState == 4) 
	{
    // Split the comma delimited response into an array
    results = http.responseText.split(",");
    document.getElementById('name').value = results[0];
  }
}

function getHTTPObject() {
  var xmlhttp;
  /*@cc_on
  @if (@_jscript_version >= 5)
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (E) {
        xmlhttp = false;
      }
    }
  @else
  xmlhttp = false;
  @end @*/

  if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
    try {
      xmlhttp = new XMLHttpRequest();
    } catch (e) {
      xmlhttp = false;
    }
  }
  return xmlhttp;
}

function verify() 
{
alert(inputForm.fill.checked);	
return;

	var themessage = "You are required to complete the following fields:\n";
	if (inputForm.name.value=="" || inputForm.name.value=="?")
	{
		themessage = themessage + " -  Valid Clock #\n";
	}
	if (inputForm.qty.value=="" || /^\d+$/.test(inputForm.qty.value)==false || parseInt(inputForm.qty.value) <= 0)
	{
		themessage = themessage + " -  Valid Qty \n";
	}
	//alert if fields are empty and cancel form submit
	if (themessage == "You are required to complete the following fields:\n") 
	{
		inputForm.submit();
	}
	else 
	{
		alert(themessage);
		return false;
  }
}

