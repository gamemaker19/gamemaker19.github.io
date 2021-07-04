var submitted = false;

function change_review_page(event,val)
{
    event.preventDefault();

    $("#submitted_page").val(val);
    $("#submitted_page").submit();

    form = $("#page_form").serialize();

    $.ajax({    
        url:'ajax/change_review_page.php?game=' + game_name,
        type: 'post',
        data: form,
        success: function(data) {

            console.log("review page changed");
            $("#reviews").html(data); 
            $('html, body').animate({scrollTop: $("#reviews").offset().top}, 10);
            return false;
        }
    });

    return false;
}

//Use AJAX to submit the review. Will only refresh the review div.
function submit_review()
{
	if(submitted == true) {
		return false;
	}

	submitted = true;

	form = $("#review_form").serialize();

	$.ajax({    
        url:'ajax/process_review.php?game=' + game_name,
        type: 'post',
        data: form,
        success: function(data) {

        	$("#error").html('');
        	$("#success").html('');

        	if(data=="0")
        	{
        		$("#error").html('<span class="error">Error: Please specify a rating</span>');
        	    $("#error").hide().fadeIn();
            }
        	else if(data=="1")
        	{
        		$("#success").html("Review successfully submitted\n");
                $("#submit").replaceWith('<button id="submit_done" onclick="submit_done">Submit Review</button>');
                $("#submit_done").bind("click", submit_done);
                $("#success").hide().fadeIn();
        	}
            else if(data=="2")
            {
                alert("You've already submitted a review.");
            }
        	else
        	{
        		$("#error").html(data);
        	}

        	submitted = false;
        }
    });

	return false;
}

function submit_done()
{
    //submit_review();
	alert("You've already submitted a review.");
}

$(document).ready( function() { 
	$("#submit").bind("click", submit_review);
    $("#submit_done").bind("click", submit_done);
} );