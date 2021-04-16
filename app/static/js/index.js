function showMypage(){
    $.ajax({
        type: "GET",
        url:"/api/mypage",
        dataType : "json",
        success : function(result){
            if(result.result == "error"){
                alert("로그인이 필요한 서비스입니다.");
                location.href = "/login";
            } else {
                console.log(result);
                // var formattedData = formatting(result.result);
                // var houses = formattingForHouseMarker(formattedData);
                // showHouseInfo(formattedData);       
                // showMarker(positions, positionImageSrc);
                // showMarker(houses, housesImageSrc);
                location.href = "/mypage";
                result = result;
            }
        },
        error : function(a, b, c){
            alert(a + b + c);
        }
    });
}