// DOM Elements
const circles = document.querySelectorAll(".circle"),
      progressBar = document.querySelector(".indicator"),
      buttons = document.querySelectorAll("button");

let currentStep = 1;

// Hide all pages except the first one on initial load
function initializePageVisibility() {
  document.querySelectorAll('fieldset').forEach((fieldset, index) => {
    fieldset.style.display = index === 0 ? 'block' : 'none';
  });
}

// Function that updates the current step and updates the DOM
function updateSteps(buttonClicked) {
  const nextStep = buttonClicked === "next" ? currentStep + 1 : currentStep - 1;

  // Ensure the current step is within the valid range
  currentStep = nextStep > 0 && nextStep <= circles.length ? nextStep : currentStep;

  // Update circles and progress bar
  circles.forEach((circle, index) => {
    circle.classList[index < currentStep ? "add" : "remove"]("active");
  });
  progressBar.style.width = `${((currentStep - 1) / (circles.length - 1)) * 100}%`;

  // Enable/disable buttons based on the current step
  buttons[0].disabled = currentStep === 1; // Previous button
  buttons[1].disabled = currentStep === circles.length; // Next button

  // Hide all fieldsets and only show the current one
  document.querySelectorAll('fieldset').forEach((fieldset, index) => {
    fieldset.style.display = index === currentStep - 1 ? 'block' : 'none';
  });
}

// Initialize page visibility on load
initializePageVisibility();

// Add click event listeners to the Next and Previous buttons
buttons.forEach((button) => {
  button.addEventListener("click", function() {
    updateSteps(this.id);
  });
});

// Variables for animations
var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating; //flag to prevent quick multi-click glitches

// Next button click action
$(".next").click(function() {
  if (animating) return false;
  animating = true;
  
  current_fs = $(this).parent();
  next_fs = $(this).parent().next();
  
  // Show the next fieldset and hide the current one with animation
  showFieldset(current_fs, next_fs, true);
});

// Previous button click action
$(".previous").click(function() {
  if (animating) return false;
  animating = true;
  
  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();
  
  // Show the previous fieldset and hide the current one with animation
  showFieldset(current_fs, previous_fs, false);
});

function showFieldset(from_fs, to_fs, goingForward) {
  // Update the progress bar if going forward
  if (goingForward) {
    $("#progressbar li").eq($("fieldset").index(to_fs)).addClass("active");
  } else {
    $("#progressbar li").eq($("fieldset").index(from_fs)).removeClass("active");
  }

  // Show the target fieldset and hide the current one with animation
  to_fs.show();
  from_fs.animate({ opacity: 0 }, {
    step: function(now, mx) {
      // Scale the from_fs fieldset and adjust the position and opacity
      scale = goingForward ? 1 - (1 - now) * 0.2 : 0.8 + (1 - now) * 0.2;
      left = now * 50 + "%";
      opacity = 1 - now;
      from_fs.css({ 'transform': 'scale(' + scale + ')' });
      to_fs.css({ 'left': left, 'opacity': opacity });
    },
    duration: 800,
    complete: function() {
      from_fs.hide();
      animating = false;
    },
    // Custom easing
    easing: 'easeInOutBack'
  });
};

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});


