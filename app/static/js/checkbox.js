function save() {	
	var checkbox = document.getElementById("checkbox4");
    localStorage.setItem("checkbox4", checkbox.checked);	
}

//for loading
var checked = JSON.parse(localStorage.getItem("checkbox4"));
    document.getElementById("checkbox4").checked = checked;
