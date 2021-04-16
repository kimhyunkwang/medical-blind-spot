//테스트 코드
var pick_1 = 35727;
var pick_2 = 32850;
var pick_3 = 32855;

var protectorLat = 37.526222;
var protectorLng = 127.024481;
var hospitalLat = 37.494739;
var hospitalLng = 126.911691;

// function getParameterByName(name) {
//     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//       results = regex.exec(location.search);
//     return results == null
//       ? ""
//       : decodeURIComponent(results[1].replace(/\+/g, " "));
// }

// var pick_1 = getParameterByName("pick_1");
// var pick_2 = getParameterByName("pick_2");
// var pick_3 = getParameterByName("pick_3");
// var protectorLat = getParameterByName("protectorLat");
// var protectorLng = getParameterByName("protectorLng");
// var hospitalLat = getParameterByName("hospitalLat");
// var hospitalLng = getParameterByName("hospitalLng");


// console.log(pick_1);
// console.log(pick_2);
// console.log(pick_3);
// console.log(protectorLat);
// console.log(protectorLng);
// console.log(hospitalLat);
// console.log(hospitalLng);

$.ajax({
	type: "GET",
	url:"/api/compare",
    data: {
        pick_1 : pick_1,
        pick_2 : pick_2,
        pick_3 : pick_3
    },
	dataType : "json",
	success : function(result){
        console.log(result);
        var formattedData = formatting(result.result);
        var houses = formattingForHouseMarker(formattedData);
        showHouseInfo(formattedData);       
        showMarker(positions, positionImageSrc);
        showMarker(houses, housesImageSrc);
	},
	error : function(a, b, c){
		alert(a + b + c);
	}
});

var data = [];

//매물데이터를 형식에 맞게 변환
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
            id : result[i].id,
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


// 지도 관련
var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
mapOption = { 
    center: new kakao.maps.LatLng(37.526222, 127.024481), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 보호자 위치, 병원 위치 마커 표시
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

function formattingForHouseMarker(data){
    var houses = [
        {
            title: data[0].name,
            latlng: new kakao.maps.LatLng(data[0].Lat, data[0].Lng)
        },
        {
            title: data[1].name,
            latlng: new kakao.maps.LatLng(data[1].Lat, data[1].Lng)
        },
        {
            title: data[2].name,
            latlng: new kakao.maps.LatLng(data[2].Lat, data[2].Lng)
        }
    ];

    return houses;
}


// 마커 이미지의 이미지 주소입니다
var positionImageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
var housesImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'; 
bounds = new kakao.maps.LatLngBounds();

function showMarker(dataForMarker, markerImageSrc){

    console.log("showmarker");
    var dataImageSize = new kakao.maps.Size(24, 35); 
    var datamarkerImage = new kakao.maps.MarkerImage(markerImageSrc, dataImageSize); 

    for (var i = 0; i < dataForMarker.length; i ++) {
        var Marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: dataForMarker[i].latlng, // 마커를 표시할 위치
            title : dataForMarker[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : datamarkerImage // 마커 이미지 
        });

        //두 위치에 맞게 지도 영역 조절
        var placePosition = new kakao.maps.LatLng(dataForMarker[i].latlng.Ma,dataForMarker[i].latlng.La);
        bounds.extend(placePosition);
        map.setBounds(bounds);
    }
}

function showHouseInfo(houseData){
    
    houseData.map((data,index)=>{
        //정보 제공
        var houseInfo = document.createElement(`house_${index}`);
        houseInfo.id = "houseInfo_" + index;
        houseInfo.innerHTML = `
            <h2>${data.name}</h2>
            <p>주소: ${data.address}</p>
            <p>유형: ${data.type}</p>
            <p>매매가: ${data.minSalePrice}~${data.maxSalePrice}</p>
            <p>전세가: ${data.minJeonsePrice}~${data.maxJeonsePrice}</p>
            <p>전용 면적: ${data.minArea}~${data.maxArea}</p>
        `;

        document.getElementById("comparison").appendChild(houseInfo);
    })
}

// 저장하기 => post 요청
function saveHouses(){
    $.ajax({
        type: "POST",
        url:"/api/compare",
        data: {
            pick_1 : pick_1,
            pick_2 : pick_2,
            pick_3 : pick_3
        },
        dataType : "json",
        success : function(result){
            console.log(result);
            alert("저장이 완료되었습니다.");

        },
        error : function(a, b, c){
            console.log(a + b + c);
            location.href = "/login";
        }
    });

}