var typeFilter = { box1: false, box2: false, box3: false, box4: false, 
    box5: false, box6: false, box7: false, box8: false, box9: false, box10: false, box11: false};

function save() {	
	let checkbox1 = document.getElementById("box_1");
    let checkbox2 = document.getElementById("box_2");
    let checkbox3 = document.getElementById("box_3");
    let checkbox4 = document.getElementById("box_4");
    let checkbox5 = document.getElementById("box_5");
    let checkbox6 = document.getElementById("box_6");
    let checkbox7 = document.getElementById("box_7");
    let checkbox8 = document.getElementById("box_8");
    let checkbox9 = document.getElementById("box_9");
    let checkbox10 = document.getElementById("box_10");
    let checkbox11 = document.getElementById("box_11");

    if (checkbox1.checked == true) {
        typeFilter.box1 = true;
        
    } else {
        typeFilter.box1 = false;
    }

    if (checkbox2.checked == true) {
        typeFilter.box2 = true;
    } else {
        typeFilter.box2 = false;
    }

    if (checkbox3.checked == true) {
        typeFilter.box3 = true;
    } else {
        typeFilter.box3 = false;
    }

    if (checkbox4.checked == true) {
        typeFilter.box4 = true;
    } else {
        typeFilter.box4 = false;
    }

    if (checkbox5.checked == true) {
        typeFilter.box5 = true;
    } else {
        typeFilter.box5 = false;
    }
    
    if (checkbox6.checked == true) {
        typeFilter.box6 = true;
    } else {
        typeFilter.box6 = false;
    }
    
    if (checkbox7.checked == true) {
        typeFilter.box7 = true;
    } else {
        typeFilter.box7 = false;
    }

    if (checkbox8.checked == true) {
        typeFilter.box8 = true;
    } else {
        typeFilter.box8 = false;
    }

    if (checkbox9.checked == true) {
        typeFilter.box9 = true;
    } else {
        typeFilter.box9 = false;
    }

    if (checkbox10.checked == true) {
        typeFilter.box10 = true;
    } else {
        typeFilter.box10 = false;
    }

    if (checkbox11.checked == true) {
        typeFilter.box11 = true;
    } else {
        typeFilter.box11 = false;
    }
    
    console.log(typeFilter)
}