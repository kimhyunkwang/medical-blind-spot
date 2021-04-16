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

console.log(protectorLat);
console.log(protectorLng);
console.log(hospitalLat);
console.log(hospitalLng);

getHouses();
function getHouses() {
    var url = "/api/residence";
    fetch(url, {
         protectorLat : protectorLat,
         protectorLng : protectorLng,
         hospitalLat : hospitalLat,
         hospitalLng : hospitalLng
        })
        .then(function (type) {
            return type.json();
        })
        .then(function (result) {
            console.log(result);
        });
}



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

// var typeFilter = {apartment: false, officetel: false};
// var tradeFilter = {sale: false, jeonse: false};
// var salePriceFilter = {minSalePrice: '', maxSalePrice: ''};
// var jeonsePriceFilter = {minJeonsePrice: '', maxJeonsePrice: ''};
// var areaFilter = {minArea:'', maxArea:''};

// //데이터 필터링
// function applyFilter(){

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
