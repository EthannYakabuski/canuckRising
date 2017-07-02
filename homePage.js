$(document).ready(function() {
	$("viewMembers").click(viewMembers); 
        $("viewAttacks").click(viewAttacks);
        $("feedbackSubmitButton").click(submitFeedback); 
  
}); 

function viewAttacks() {
  console.log("Going to view attacks"); 

  pug.render('attacks', {});  

}

function viewMembers() {


}

function submitFeedback() {

  

}
