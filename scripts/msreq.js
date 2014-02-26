// javascripts for machine shop req system

//get http object
function getHTTPObject()
{
	if (window.XMLHttpRequest)
	{
		// code for IE7+, Firefox, Chrome, Opera, Safari
   	xmlhttp=new XMLHttpRequest();
	}
	else
	{
		// code for code for IE6, IE5
   	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	return xmlhttp;
}

//get name associated with clock# on form
function getClockno()
{
	xmlhttp=getHTTPObject();

	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			document.getElementById("name").value=xmlhttp.responseText;
		}
	}

	if (document.getElementById("clk").value == "") return;

	var nocache=new Date().getTime();
	xmlhttp.open("GET","/msmatreq/scripts/getName.php?clk="+escape(document.getElementById("clk").value)+"&nocache="+nocache,true);
	xmlhttp.send();

}

// make sure required fields are filled in properly
function verify() 
{
//alert(inputForm.fill.checked);//just remembering how to check this field	

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
		req_submit();
	}
	else 
	{
		alert(themessage);
		return false;
  }
}

// submit req		
function req_submit()
{
	document.getElementById('submitbtn').disabled=true; //hide submit button to avoid doubleclick as it fades out

	xmlhttp=getHTTPObject();

	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			showResults(xmlhttp.responseText);
		}
	}

	var nocache=new Date().getTime();
	var vars="clk="+sanitize(inputForm.clk.value);
	vars=vars+"&trav="+sanitize(inputForm.trav.value);
	vars=vars+"&job="+sanitize(inputForm.job.value);
	vars=vars+"&part="+sanitize(inputForm.part.value);
	vars=vars+"&qty="+sanitize(inputForm.qty.value);
	vars=vars+"&fill="+sanitize(inputForm.fill.checked);
	vars=vars+"&desc="+sanitize(inputForm.desc.value);
	vars=vars+"&nocache="+nocache;

	xmlhttp.open("GET","/msmatreq/scripts/req_submit.php?"+vars,false);
	xmlhttp.send();
}

// TODO: (is it necessary to do this if i'm also sanitizing in the php?)
// strip unwanted values from input field before submitting to php
function sanitize(val)
{
	return escape(($.trim(val))); // still need to strip unwanted chars
}

// display http results with added text
// input is an array from xmlhttp.responseText
function showResults(val)
{
	//$("#container").hide();
	$("#header").fadeOut(2000);
	$("#inputForm").fadeOut(2000,function()
	{	
		var resptext = xmlhttp.responseText;
		if (resptext.indexOf("ERROR:") == -1) //no fp-generated error in response
		{
			resptext="Machine Shop Material Request # <b>"+ resptext + "</b> has been submitted!";
		}
	
		$("#container").html("<br><br>" + resptext + 
				"<br><br><a href='/msmatreq/'>Return to Material Request Entry Form</a>");
	});
} 
