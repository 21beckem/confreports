const formJson = [
    {
        "label" : "First Name (not Elder or Sister)",
        "type" : "text",
        "conditional" : false
    },
    {
        "label" : "Last Name",
        "type" : "text",
        "conditional" : false
    },
    {
        "label" : "In what month and year did you start the MTC?",
        "type" : "text",
        "conditional" : false
    },
    {
        "label" : "Do you play a musical instrument at a level you would be comfortable performing in front of a large group of people?",
        "type" : "bool",
        "conditional" : false
    },
    {
        "label" : "If so, what instruments do you play? Please list them.",
        "type" : "text",
        "conditional" : true
    },
    {
        "label" : "How well do you play each of these intruments?",
        "type" : "text",
        "conditional" : true
    },
    {
        "label" : "Do you enjoy singing?",
        "type" : "bool",
        "conditional" : false
    },
    {
        "label" : "If so, are you willing to sing a solo?",
        "type" : "bool",
        "conditional" : true
    },
    {
        "label" : "Do you have experience with technical issues related to phones or computers?",
        "type" : "bool",
        "conditional" : false
    },
    {
        "label" : "x",
        "type" : "range",
        "conditional" : true
    },
    {
        "label" : "Do you have programming experience?",
        "type" : "bool",
        "conditional" : false
    },
    {
        "label" : "How would you rate your skills?",
        "type" : "range",
        "conditional" : true
    },
    {
        "label" : "Do you have experience with video production and/or editing?",
        "type" : "bool",
        "conditional" : false
    },
    {
        "label" : "How would you rate your skills?",
        "type" : "range",
        "conditional" : true
    },
    {
        "label" : "Are you interested in working in our social media district?",
        "type" : "bool",
        "conditional" : false
    },
    {
        "label" : "Do you have experience repairing bicycles?",
        "type" : "bool",
        "conditional" : false
    },
    {
        "label" : "How would you rate your skills?",
        "type" : "range",
        "conditional" : true
    },
    {
        "label" : "Do you have technical experience with audio visual technology?",
        "type" : "bool",
        "conditional" : false
    },
    {
        "label" : "How would you rate your skills?",
        "type" : "range",
        "conditional" : true
    },
    {
        "label" : "Any other comments you would like to make?",
        "type" : "text",
        "conditional" : false
    }
]

const penguin = true;

const _ = (x) => {return document.getElementById(x);}

function makeForm(pasteBoxId = "formBox") {
    pasteBox = _(pasteBoxId);

    let toWrite = "";
    for (let i = 0; i < formJson.length; i++) {
        const inputNum = "q" + i;
        const el = formJson[i];
        const condish = (el.conditional) ? " conditional_Q" : "";
        const required = (el.conditional) ? "" : " required";

        switch (el.type) {
            case "text":
                toWrite += `
<div id="` + inputNum + `_question" class="question` + condish + `">
    <label for="` + inputNum + `">` + el.label + `</label>
    <input type="text" name="` + inputNum + `" placeholder="type something..."` + required + ` class="required_toggle" autocomplete="off">
</div>`;
                break;
            case "bool":
                toWrite += `
<div id="` + inputNum + `_question" class="question` + condish + `">
    <label for="` + inputNum + `">` + el.label + `</label>
    <div class="bool_container">
        <label class="bool_option">
            <input id="` + inputNum + `_radio" type="radio" name="` + inputNum + `" value="yes" onclick="updateConditionals(this)" ` + required + ` class="required_toggle">
            <span class="bool_active">YES</span>
        </label>
        <label class="bool_option">
            <input type="radio" name="` + inputNum + `" value="no" onclick="updateConditionals(this)">
            <span class="bool_active">NO</span>
        </label>
    </div>
</div>`;
                break;
            case "range":
                if (!penguin) {
                    toWrite += `
<div id="` + inputNum + `_question" class="question` + condish + `">
    <label for="` + inputNum + `">` + el.label + `</label>
    <div class="bool_container">`
        let amount = 5;
        for (let ii = 1; ii <= amount; ii++) {
           toWrite += `<label class="bool_option" style="width:` + (100 / amount) + `%">
                <input id="` + inputNum + `_radio" type="radio" name="` + inputNum + `" value="` + ii + `" onclick="updateConditionals(this)" ` + required + ` class="required_toggle">
                <span class="bool_active">` + ii + `</span>
            </label>` 
        }
        
        toWrite += `    </div>
</div>`;
                } else {
                    toWrite += `
<div id="` + inputNum + `_question" class="question` + condish + `">
    <input id="slider" name="slider" type="range" value=0 oninput="sliderChange(this)">
    <div class="range_label" for="slider">0</div>
</div>`;
                }
                
            default:
                break;
        }
    }
    pasteBox.innerHTML = toWrite;

    //create conditional array
    conditionals = Array();
    for (let i = 0; i < formJson.length; i++) {
        const el = formJson[i];
        
        if (el.conditional) {
            const inputNum = "q" + i;

            //find last non-conditional element
            let prevNum;
            counter = 1;
            while (true) {
                const hoffer = formJson[i-counter];
                if (!hoffer.conditional) {
                    prevNum = "q" + (i - counter);
                    break;
                } else {
                    counter++;
                }
            }
            conditionals.push([_(prevNum+"_radio"), _(inputNum+"_question")]);
        }
    }
}

let conditionals = Array();

function updateConditionals(thisEl) {
    //show conditional questions
    for (let i = 0; i < conditionals.length; i++) {
        const q = conditionals[i];
        q[1].style.display = (q[0].checked) ? "block" : "";
        q[1].querySelector('.required_toggle').required = q[0].checked;

        // clear answer if conditional turned off
        if (!q[0].checked) {
            const clearThese = document.getElementsByName(q[1].querySelector('.required_toggle').name);
            for(var ii=0; ii < clearThese.length; ii++) {
                clearThese[ii].checked = false;
                clearThese[ii].parentNode.classList.remove('active_selection');
            }
        }
    }

    // highlight active radio buttons
    let allRadios = document.getElementsByName(thisEl.name);
    for (let i = 0; i < allRadios.length; i++) {
        const el = allRadios[i];
        el.parentNode.classList.remove('active_selection');
    }
    thisEl.parentNode.classList.add('active_selection');
}



window.addEventListener("load", function() {
    const form = document.getElementById('TheForm');
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        _('screenCover').style.display = "block";
        const data = new FormData(form);
        const action = e.target.action;
        fetch(action, {
            method: 'POST',
            body: data,
        })
        .then((response) => response.json())
        .then((data) => {
            _('screenCover').style.display = "none";
            if (data.result == "success") {
                alert("Success, your input has been saved")
            } else {
                alert("Oh no, there's been an error. Please try again later");
            }
        })
    });
});