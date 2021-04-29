function save() {	
    localStorage.setItem('selectedRegion', document.getElementById('region_selection').value - 1);
}
//for loading
if (localStorage.getItem('selectedRegion')) {
    document.getElementById('region_selection').options[localStorage.getItem('selectedRegion')].selected = true;
    };
    $("input[name=hosp_div]:checked").each(function() {
        var test = $(this).val(); 
      
        alert("벨류값확인 : " + test);
      
      
      }
    );
