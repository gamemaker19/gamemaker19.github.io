

$.fn.hook_images = function(images,messages) {

	i = 0;
	refresh_image = refresh_image;
	context = this;

	refresh_image(context,images,messages);

	$(".rightarrow").click(function(){
	  i++; if(i >= images.length){ i=0; }
		refresh_image(context,images,messages);
		debug();
	});

	$(".leftarrow").click(function(){
		i--; if(i < 0){ i=images.length-1; }
		debug();
		refresh_image(context,images,messages);
	});

	function refresh_image(context,images,messages) {

		var jclass = "." + i.toString();

		if( $(jclass)[0] === undefined) {
			$("#floatingCirclesG").show();
			//Add image to DOM
			var str = "<img class='slide_image "+ i.toString() + "' src='"+ images[i] +"'>";
			console.log("APPENDING " + str);
			node = $(str).appendTo(context);
		
			node.load(function(){
				$("#floatingCirclesG").hide();
				$(".slide_image").removeClass("on_slide");
				$(jclass).addClass("on_slide");
				$("#current_message").html(messages[i]);
			});

		}

		else {
			$(".slide_image").removeClass("on_slide");
			$(jclass).addClass("on_slide");
			$("#current_message").html(messages[i]);
		}
	}

	function debug() {

		console.log("-------------------");
		console.log("i: " + i);
		console.log("-------------------");

	}

};
