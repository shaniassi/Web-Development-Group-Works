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

// <!---------------------SECOND FORM------------------------->
const conferenceYes = document.getElementById('conferenceYes');
const hackathonYes = document.getElementById('hackathonYes');
const nextBtnStep2 = document.getElementById('nextStep2'); // Corrected ID
const prevBtnStep2 = document.getElementById('prevStep2'); // Added ID
const techConferenceField = document.getElementById('tech-conferences');
const hackathonsField = document.getElementById('hackathons');
const languagesField = document.getElementById('languages');

// Function to check if all required fields in step 2 are filled
function checkAllFieldsFilledStep2() {
    const conferenceChecked = conferenceYes.checked;
    const hackathonChecked = hackathonYes.checked;
    
    const techConferenceFilled = !conferenceChecked || (conferenceChecked && techConferenceField.value.trim() !== '');
    const hackathonsFilled = !hackathonChecked || (hackathonChecked && hackathonsField.value.trim() !== '');
    const languagesFilled = languagesField.value.trim() !== '';
    
    const atLeastOneRadioChecked = conferenceChecked || hackathonChecked;
    const allFieldsFilled = (conferenceChecked || hackathonChecked) && techConferenceFilled && hackathonsFilled && languagesFilled;
    
    return atLeastOneRadioChecked && (allFieldsFilled || (!techConferenceFilled && !hackathonsFilled && !languagesFilled));
}

// Function to enable or disable next button based on field conditions in step 2
function toggleNextButtonStep2() {
    nextBtnStep2.disabled = !checkAllFieldsFilledStep2();
}

// Initial state of the "Next" button in step 2
toggleNextButtonStep2();

// Event listeners for radio buttons and text fields in step 2
conferenceYes.addEventListener('change', toggleNextButtonStep2);
hackathonYes.addEventListener('change', toggleNextButtonStep2);
techConferenceField.addEventListener('input', toggleNextButtonStep2);
hackathonsField.addEventListener('input', toggleNextButtonStep2);
languagesField.addEventListener('input', toggleNextButtonStep2);

// Event listener for next button in step 2
nextBtnStep2.addEventListener('click', function() {
    if (checkAllFieldsFilledStep2()) {
        // Proceed to the next step (Step 3) if all conditions are met
        document.querySelector('fieldset:nth-of-type(2)').style.display = 'none'; // Hide step 2
        document.querySelector('fieldset:nth-of-type(3)').style.display = 'block'; // Show step 3
        
        // Hide the first step if it's still visible
        document.querySelector('fieldset:nth-of-type(1)').style.display = 'none';
    }
});

// Event listener for previous button in step 2
prevBtnStep2.addEventListener('click', function() {
    // Navigate back to the first form section
    document.querySelector('fieldset:nth-of-type(2)').style.display = 'none'; // Hide step 2
    document.querySelector('fieldset:nth-of-type(1)').style.display = 'block'; // Show step 1
    
    // Hide the third step if it's still visible
    document.querySelector('fieldset:nth-of-type(3)').style.display = 'none';
});
});