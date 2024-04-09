
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>

// <!---------------------FIRST FORM------------------------->
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const studentNo = document.getElementById("studentNo");
    const pupWebmail = document.getElementById("PUPwebmail");
    const campus = document.getElementById("campus");
    const program = document.getElementById("program");
    const section = document.getElementById("section");
    const nextButton = document.getElementById("next");

    // Function to check if all fields are filled
    function validateForm() {
        return firstName.value.trim() !== "" &&
               lastName.value.trim() !== "" &&
               studentNo.value.trim() !== "" &&
               pupWebmail.value.trim() !== "" &&
               campus.value.trim() !== "" &&
               program.value.trim() !== "" &&
               section.value.trim() !== "";
    }

    // Function to check the format of the section
    function validateSectionFormat() {
        // Regular expression for the format digit-hyphen-digit
        const sectionRegex = /^\d+-\d+$/;
        return sectionRegex.test(section.value);
    }

    // Function to handle the input event and prevent next if format is incorrect
    function handleInput() {
        if (!validateSectionFormat()) {
            nextButton.disabled = true;
        } else {
            toggleNextButton();
        }
    }

    // Function to enable/disable next button based on form validation
    function toggleNextButton() {
        if (validateForm() && validateSectionFormat()) {
            nextButton.removeAttribute("disabled");
        } else {
            nextButton.setAttribute("disabled", "disabled");
        }
    }

    // Initial setup
    toggleNextButton();

    // Event listeners for input fields
    firstName.addEventListener("input", toggleNextButton);
    lastName.addEventListener("input", toggleNextButton);
    studentNo.addEventListener("input", toggleNextButton);
    pupWebmail.addEventListener("input", toggleNextButton);
    campus.addEventListener("change", toggleNextButton);
    program.addEventListener("change", toggleNextButton);
    section.addEventListener("input", handleInput);
});

	
	
	
	