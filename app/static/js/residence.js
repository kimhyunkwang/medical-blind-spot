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

// getHouses();
// function getHouses() {
//     var url = "/residence";
//     fetch(url, {
//          protectorLat : protectorLat,
//          protectorLng : protectorLng,
//          hospitalLat : hospitalLat,
//          hospitalLng : hospitalLng
//         })
//         .then(function (type) {
//             return type.json();
//         })
//         .then(function (result) {
//             console.log(result);
//         });
// }

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
	},
	error : function(a, b, c){
		//통신 실패시 발생하는 함수(콜백)
		alert(a + b + c);
	}
});

//result formating

// 가격 단위 수정
// result.maxSalePrice 가 1.0 이면 1억이므로, * 10 해서 10천만원이 돼야 함.

// if (result.maxJeonsePrice == -1.0){
//     var isJeonse = false;
//     var minJeonsePrice = '';
//     var maxJeonsePrice = '';
// } else {
//     var isJeonse = true;
//     var minJeonsePrice = result.minJeonsePrice;
//     var maxJeonsePrice = result.maxJeonsePrice;
// }

// var data = {
//     name : result.residName,
//     address : result.residAddr,
//     Lat : result.latitude,
//     Lng : result.longitude,
//     type : "apartment",   //result.residType
//     sale : true,        //result.maxSalePrice result.minSalePrice
//     jeonse : isJeonse,      //result.maxJeonsePrice result.minJeonsePrice
//     minSalePrice : '',
//     maxSalePrice : '',
//     minJeonsePrice : minJeonsePrice,
//     maxJeonsePrice : maxJeonsePrice,
//     minArea : result.minArea,
//     maxArea : result.maxArea
// };

//filters
// var typeFilter = {apartment: false, officetel: false};
// var tradeFilter = {sale: false, jeonse: false};
// var salePriceFilter = {minSalePrice: '', maxSalePrice: ''};
// var jeonsePriceFilter = {minJeonsePrice: '', maxJeonsePrice: ''};
// var areaFilter = {minArea:'', maxArea:''};

// function handleChangeTypeFilter() {
//     var checkApartment = document.getElementById("checkApartment");
//     var checkOfficetel = document.getElementById("checkOfficetel");

//     console.log(typeFilter);

//     if (checkApartment.checked == true){
//         typeFilter.sale = true;
//     } else {
//         typeFilter.sale = false;
//     }
    
//     if (checkOfficetel.checked == true){
//         typeFilter.sale = true;
//     } else {
//         typeFilter.sale = false;
//     }
//     console.log(typeFilter);
// }

// function handleChangeTradeFilter(){
//     var checkSale = document.getElementById("checkSale");
//     var checkJeonse = document.getElementById("checkJeonse");
    
//     var salePriceDiv = document.getElementById("salePriceDiv");
//     var jeonsePriceDiv = document.getElementById("jeonsePriceDiv");

//     console.log(tradeFilter);

//     if (checkSale.checked == true){
//         salePriceDiv.style.display = "block";
//         tradeFilter.sale = true;
//     } else {
//         salePriceDiv.style.display = "none";
//         tradeFilter.sale = false;
//     }
    
//     if (checkJeonse.checked == true){
//         jeonsePriceDiv.style.display = "block";
//         tradeFilter.jeonse = true;
//     } else {
//         jeonsePriceDiv.style.display = "none";
//         tradeFilter.jeonse = false;
//     }
//     console.log(tradeFilter);
// }

// function handleChangeSalePriceFilter(){
//     var minSalePriceInput = document.getElementById("minSalePriceInput");
//     var maxSalePriceInput = document.getElementById("maxSalePriceInput");

//     console.log(salePriceFilter);

//     if (minSalePriceInput.value){
//         salePriceFilter.minSalePrice = minSalePriceInput.value;
//     } else {
//         salePriceFilter.minSalePrice = '';
//     }

//     if (maxSalePriceInput.value){
//         salePriceFilter.maxSalePriceInput = maxSalePriceInput.value;
//     } else {
//         salePriceFilter.maxSalePriceInput = '';
//     }

//     console.log(salePriceFilter);
// }

// function handleChangeJeonsePriceFilter(){
//     var minJeonsePriceInput = document.getElementById("minJeonsePriceInput");
//     var maxJeonsePriceInput = document.getElementById("maxJeonsePriceInput");

//     console.log(jeonsePriceFilter);

//     if (minJeonsePriceInput.value){
//         jeonsePriceFilter.minJeonsePrice = minJeonsePriceInput.value;
//     } else {
//         jeonsePriceFilter.minJeonsePrice = '';
//     }

//     if (maxJeonsePriceInput.value){
//         jeonsePriceFilter.maxJeonsePrice = maxJeonsePriceInput.value;
//     } else {
//         jeonsePriceFilter.maxJeonsePrice = '';
//     }

//     console.log(jeonsePriceFilter);
// } 

// function handleChangeAreaFilter(){
//     var minAreaInput = document.getElementById("minAreaInput");
//     var maxAreaInput = document.getElementById("maxAreaInput");

//     console.log(areaFilter);

//     if (minAreaInput.value){
//         areaFilter.minArea = minAreaInput.value;
//     } else {
//         areaFilter.minArea = '';
//     }

//     if (maxAreaInput.value){
//         areaFilter.maxArea = maxAreaInput.value;
//     } else {
//         areaFilter.maxArea = '';
//     }
//     console.log(areaFilter);
// } 




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


// 마커 이미지의 이미지 주소입니다
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
bounds = new kakao.maps.LatLngBounds();

for (var i = 0; i < positions.length; i ++) {
    
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
    
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });

    //두 위치에 맞게 지도 영역 조절
    var placePosition = new kakao.maps.LatLng(positions[i].latlng.Ma,positions[i].latlng.La);
    console.log(placePosition);
    bounds.extend(placePosition);
    map.setBounds(bounds);
}


//데이터 필터링
//     var data = {
//         name : '',
//         address : '',
//         Lat : '',
//         Lng : '',
//         type : "apartment",
//         sale : true,
//         jeonse : true,
//         minSalePrice : '',
//         maxSalePrice : '',
//         minJeonsePrice : '',
//         maxJeonsePrice : '',
//         minArea : '',
//         maxArea : ''
//     };

// function applyFilter(){
       
// //for i in data[i] 로 for문 돌면서 

//     console.log(typeFilter);
//     console.log(tradeFilter);
//     console.log(salePriceFilter);
//     console.log(jeonsePriceFilter);
//     console.log(areaFilter);

//     if (typeFilter.apartment === true && typeFilter.officetel === false){
//         if (data.type !== apartment) {
//             return false
//         }
//     }
//     if (typeFilter.apartment === false && typeFilter.officetel === true){
//         if (data.type !== officetel) {
//             return false
//         }
//     }

//     ///

//     if (tradeFilter.sale === true && data.sale !== false) {
//         return false
//     }

//     if (salePriceFilter.minSalePrice && salePriceFilter.minSalePrice > data.maxSalePrice){
//         return false
//     }

//     if (salePriceFilter.maxSalePrice && salePriceFilter.maxSalePrice < data.minSalePrice){
//         return false
//     }

//     if (tradeFilter.jeonse === true && data.jeonse !== false) {
//         return false
//     }

//     if (jeonsePriceFilter.minJeonsePrice && jeonsePriceFilter.minJeonsePrice > data.maxJeonsePrice){
//         return false
//     }
//     if (jeonsePriceFilter.maxJeonsePrice && jeonsePriceFilter.maxJeonsePrice < data.minJeonsePrice){
//         return false
//     }

//     ///

//     if (AreaFilter.minArea && AreaFilter.minArea > data.maxArea){
//         return false
//     }
//     if (AreaFilter.maxArea && AreaFilter.maxArea > data.minArea){
//         return false
//     }

//     var formatedData = {
//         title : '',
//         latlng : new kakao.maps.LatLng(data.Lat, data.Lng),
//         info : data
//     }

//     filteredData.append(formatedData);

//     return filteredData
// }

// function search(){

//     var filteredData = applyFilter(data, typeFilter, tradeFilter, salePriceFilter, jeonsePriceFilter, areaFilter);

//     var filteredData = [
//         {
//             title: '매물 1', 
//             latlng: new kakao.maps.LatLng(37.492597, 126.958883)
//         },
//         {
//             title: '매물 2', 
//             latlng: new kakao.maps.LatLng(37.526222, 127.024481)
//         },
//     ];

//     var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
//     bounds = new kakao.maps.LatLngBounds();

//     for (var i = 0; i < filteredData.length; i ++) {
    
//         // 마커 이미지의 이미지 크기 입니다
//         var imageSize = new kakao.maps.Size(24, 35); 
        
//         // 마커 이미지를 생성합니다    
//         var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        
//         // 마커를 생성합니다
//         var marker = new kakao.maps.Marker({
//             map: map, // 마커를 표시할 지도
//             position: filteredData[i].latlng, // 마커를 표시할 위치
//             title : filteredData[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
//             image : markerImage // 마커 이미지 
//         });
    
//         //두 위치에 맞게 지도 영역 조절
//         var placePosition = new kakao.maps.LatLng(filteredData[i].latlng.Ma,filteredData[i].latlng.La);
//         console.log(placePosition);
//         bounds.extend(placePosition);
//         map.setBounds(bounds);
//     }
// }