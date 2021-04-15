//테스트 코드
var protectorLat = 37.526222;
var protectorLng = 127.024481;
var hospitalLat = 37.494739;
var hospitalLng = 126.911691;

// new_url = `/residence?protectorLat=${protectorLocation.lat}&protectorLng=${protectorLocation.lng}&hospitalLat=${hospitalLocation.lat}&hospitalLng=${hospitalLocation.lng}`;
    
// function getParameterByName(name) {
//     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//       results = regex.exec(location.search);
//     return results == null
//       ? ""
//       : decodeURIComponent(results[1].replace(/\+/g, " "));
// }

// var protectorLat = getParameterByName("protectorLat");
// var protectorLng = getParameterByName("protectorLng");
// var hospitalLat = getParameterByName("hospitalLat");
// var hospitalLng = getParameterByName("hospitalLng");

// console.log(protectorLat);
// console.log(protectorLng);
// console.log(hospitalLat);
// console.log(hospitalLng);

$.ajax({
	type: "GET", //요청 메소드 방식
	url:"/api/residence",
    data: {
        protectorLat : protectorLat,
        protectorLng : protectorLng,
        hospitalLat : hospitalLat,
        hospitalLng : hospitalLng
    },
	dataType : "json", //서버가 요청 URL을 통해서 응답하는 내용의 타입
	success : function(result){
		//서버의 응답데이터가 클라이언트에게 도착하면 자동으로 실행되는함수(콜백)
		//result - 응답데이터
		//$('#result').text(result);
		alert(result);
        console.log(result);
        var formattedData = formatting(result.result);
        var dataForMarker = formattingForMarker(formattedData);
        showMarker(dataForMarker);
	},
	error : function(a, b, c){
		//통신 실패시 발생하는 함수(콜백)
		alert(a + b + c);
	}
});

//result formating
var data = [];
var dataForMarker =[];
var filteredData = [];

function formatting(result){

    for (var i=0; i < result.length; i++){

        // 가격 단위 수정
        // 1.0 이면 1억이므로, * 10 해서 10천만원이 돼야 함.
        if (result[i].maxSalePrice == -1){
            var isSale = false;
            var minSalePrice = '';
            var maxSalePrice = '';
        } else {
            var isSale = true;
            var minSalePrice = result[i].minSalePrice*10;
            var maxSalePrice = result[i].maxSalePrice*10;
        }

        if (result[i].maxJeonsePrice == -1){
            var isJeonse = false;
            var minJeonsePrice = '';
            var maxJeonsePrice = '';
        } else {
            var isJeonse = true;
            var minJeonsePrice = result[i].minJeonsePrice*10;
            var maxJeonsePrice = result[i].maxJeonsePrice*10;
        }
        
        if (result[i].residType === "아파트"){
            result[i].residType = "apartment";
        }
        if (result[i].residType === "오피스텔"){
            result[i].residType = "officetel";
        }

        var formattedResult = {
            name : result[i].residName,
            address : result[i].residAddr,
            Lat : Math.floor(result[i].latitude*1000000)/1000000,
            Lng : Math.floor(result[i].longitude*1000000)/1000000,
            type : result[i].residType,  
            sale : isSale,        
            jeonse : isJeonse,   
            minSalePrice : minSalePrice,
            maxSalePrice : maxSalePrice,
            minJeonsePrice : minJeonsePrice,
            maxJeonsePrice : maxJeonsePrice,
            minArea : result[i].minArea,
            maxArea : result[i].maxArea
        };

        // console.log(formattedResult);
        data.push(formattedResult);
    }
    return data;
}

function formattingForMarker(data){
    var dataForMarker =[];
    for (var i=0; i < data.length; i++){
        var formattedResult = {
            title: data[i].name,
            latlng: new kakao.maps.LatLng(data[i].Lat, data[i].Lng),
            info: data[i]
        };
        dataForMarker.push(formattedResult);
    }
    return dataForMarker;
}

//filters
var typeFilter = {apartment: false, officetel: false};
var tradeFilter = {sale: false, jeonse: false};
var salePriceFilter = {minSalePrice: '', maxSalePrice: ''};
var jeonsePriceFilter = {minJeonsePrice: '', maxJeonsePrice: ''};
var areaFilter = {minArea:'', maxArea:''};

function handleChangeTypeFilter() {
    var checkApartment = document.getElementById("checkApartment");
    var checkOfficetel = document.getElementById("checkOfficetel");

    console.log(typeFilter);

    if (checkApartment.checked == true){
        typeFilter.apartment = true;
    } else {
        typeFilter.apartment = false;
    }
    
    if (checkOfficetel.checked == true){
        typeFilter.officetel = true;
    } else {
        typeFilter.officetel = false;
    }
    console.log(typeFilter);
}

function handleChangeTradeFilter(){
    var checkSale = document.getElementById("checkSale");
    var checkJeonse = document.getElementById("checkJeonse");
    
    var salePriceDiv = document.getElementById("salePriceDiv");
    var jeonsePriceDiv = document.getElementById("jeonsePriceDiv");

    console.log(tradeFilter);

    if (checkSale.checked == true){
        salePriceDiv.style.display = "block";
        tradeFilter.sale = true;
    } else {
        salePriceDiv.style.display = "none";
        tradeFilter.sale = false;
        salePriceFilter.minSalePrice = '';
        salePriceFilter.maxSalePrice = '';

    }
    
    if (checkJeonse.checked == true){
        jeonsePriceDiv.style.display = "block";
        tradeFilter.jeonse = true;
    } else {
        jeonsePriceDiv.style.display = "none";
        tradeFilter.jeonse = false;
        jeonsePriceFilter.minJeonsePrice = '';
        jeonsePriceFilter.maxJeonsePrice = '';
    }
    console.log(tradeFilter);
}

function handleChangeSalePriceFilter(){
    var minSalePriceInput = document.getElementById("minSalePriceInput");
    var maxSalePriceInput = document.getElementById("maxSalePriceInput");

    console.log(salePriceFilter);

    if (minSalePriceInput.value){
        salePriceFilter.minSalePrice = minSalePriceInput.value;
    } else {
        salePriceFilter.minSalePrice = '';
    }

    if (maxSalePriceInput.value){
        salePriceFilter.maxSalePriceInput = maxSalePriceInput.value;
    } else {
        salePriceFilter.maxSalePriceInput = '';
    }

    console.log(salePriceFilter);
}

function handleChangeJeonsePriceFilter(){
    var minJeonsePriceInput = document.getElementById("minJeonsePriceInput");
    var maxJeonsePriceInput = document.getElementById("maxJeonsePriceInput");

    console.log(jeonsePriceFilter);

    if (minJeonsePriceInput.value){
        jeonsePriceFilter.minJeonsePrice = minJeonsePriceInput.value;
    } else {
        jeonsePriceFilter.minJeonsePrice = '';
    }

    if (maxJeonsePriceInput.value){
        jeonsePriceFilter.maxJeonsePrice = maxJeonsePriceInput.value;
    } else {
        jeonsePriceFilter.maxJeonsePrice = '';
    }

    console.log(jeonsePriceFilter);
} 

function handleChangeAreaFilter(){
    var minAreaInput = document.getElementById("minAreaInput");
    var maxAreaInput = document.getElementById("maxAreaInput");

    console.log(areaFilter);

    if (minAreaInput.value){
        areaFilter.minArea = minAreaInput.value;
    } else {
        areaFilter.minArea = '';
    }

    if (maxAreaInput.value){
        areaFilter.maxArea = maxAreaInput.value;
    } else {
        areaFilter.maxArea = '';
    }
    console.log(areaFilter);
} 


var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
mapOption = { 
    center: new kakao.maps.LatLng(37.526222, 127.024481), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


// 마커를 표시할 위치와 title 객체 배열
var positions = [
    {
        title: '보호자 위치', 
        latlng: new kakao.maps.LatLng(protectorLat, protectorLng)
    },
    {
        title: '병원 위치', 
        latlng: new kakao.maps.LatLng(hospitalLat, hospitalLng)
    }
];

// 지도에 표시된 마커 객체를 가지고 있을 배열입니다
var markers = [];
// 마커 이미지의 이미지 주소입니다
var positionImageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
bounds = new kakao.maps.LatLngBounds();

for (var i = 0; i < positions.length; i ++) {
    
    // 마커 이미지의 이미지 크기 입니다
    var positionImageSize = new kakao.maps.Size(24, 35); 
    
    // 마커 이미지를 생성합니다    
    var positionMarkerImage = new kakao.maps.MarkerImage(positionImageSrc, positionImageSize); 
    
    // 마커를 생성합니다
    var positionMarker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : positionMarkerImage // 마커 이미지 
    });

    //두 위치에 맞게 지도 영역 조절
    var placePosition = new kakao.maps.LatLng(positions[i].latlng.Ma,positions[i].latlng.La);
    bounds.extend(placePosition);
    map.setBounds(bounds);
}

function setMarkers(map) {
    console.log("setMarkers");
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }            
}

function removeMarkers(){
    console.log("remove");
    setMarkers(null);
}

function showMarker(dataForMarker){
    removeMarkers();
    var dataImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
    var dataImageSize = new kakao.maps.Size(24, 35); 
    var datamarkerImage = new kakao.maps.MarkerImage(dataImageSrc, dataImageSize); 

    for (var i = 0; i < dataForMarker.length; i ++) {
        var houseMarker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: dataForMarker[i].latlng, // 마커를 표시할 위치
            title : dataForMarker[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : positionMarkerImage // 마커 이미지 
        });

        markers.push(houseMarker);
    }
}

//데이터 필터링
function applyFilter(data, typeFilter, tradeFilter, salePriceFilter, jeonsePriceFilter, areaFilter){
    var filteredData = [];
    console.log(typeFilter);
    console.log(tradeFilter);
    console.log(salePriceFilter);
    console.log(jeonsePriceFilter);
    console.log(areaFilter);

    data.map((data) => {
        console.log(data);

        //아파트인지 오피스텔인지 필터링
        if (typeFilter.apartment == true && typeFilter.officetel == false){
            console.log("typefilter apartment On!!");
            if (data.type != "apartment") {
                console.log("not apartment!");
                return false
            }
        }

        if (typeFilter.apartment == false && typeFilter.officetel == true){
            console.log("typefilter officetel On!!");
            if (data.type != "officetel") {
                console.log("not officetel!");
                return false
            }
        }

        // 전세인지 매매인지 필터링
        // 전세가  매매가 필터에 따라 필터링
        if (tradeFilter.sale == true && data.sale == false) {
            console.log("not for sale!");
            return false
        }

        if (salePriceFilter.minSalePrice && salePriceFilter.minSalePrice > data.maxSalePrice){
            console.log("less than minSalePrice!!");
            console.log(data.maxSalePrice);
            console.log(salePriceFilter.minSalePrice);

            return false
        }

        if (salePriceFilter.maxSalePrice && salePriceFilter.maxSalePrice < data.minSalePrice){
            console.log("more than maxSalePrice!!");
            console.log(salePriceFilter.maxSalePrice);
            console.log(data.minSalePrice);
            return false
        }

        if (tradeFilter.jeonse == true && data.jeonse == false) {
            console.log("tradefilter jeonse On!!");
            return false
        }

        if (jeonsePriceFilter.minJeonsePrice && jeonsePriceFilter.minJeonsePrice > data.maxJeonsePrice){
            console.log("tradefilter minJeonsePrice On!!");
            return false
        }
        if (jeonsePriceFilter.maxJeonsePrice && jeonsePriceFilter.maxJeonsePrice < data.minJeonsePrice){
            console.log("tradefilter maxJeonsePrice On!!");
            return false
        }

        ///전용면적에 따라 필터링
        if (areaFilter.minArea && areaFilter.minArea > data.maxArea){
            console.log("areaFilter minArea On!!");
            return false
        }
        if (areaFilter.maxArea && areaFilter.maxArea < data.minArea){
            console.log("areaFilter maxArea On!!");
            return false
        }

        filteredData.push(data);
    });

    return filteredData
}

function search(){
    var filteredData = applyFilter(data, typeFilter, tradeFilter, salePriceFilter, jeonsePriceFilter, areaFilter);
    console.log(filteredData);
    var dataForMarker = formattingForMarker(filteredData);
    showMarker(dataForMarker);
}