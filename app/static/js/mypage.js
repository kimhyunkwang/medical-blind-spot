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

            var residResult = result.result.resid_result;
            var userResult = result.result.user_result[0];
            var positions = [
                {
                    title: '보호자 위치', 
                    latlng: new kakao.maps.LatLng(userResult.protectorLat, userResult.protectorLng)
                },
                {
                    title: '병원 위치', 
                    latlng: new kakao.maps.LatLng(userResult.hospitalLat, userResult.hospitalLng)
                }
            ];
            console.log(positions);
            var formattedData = formatting(residResult);
            var houses = formattingForMarker(formattedData);
            console.log(formattedData);
            console.log(houses);
            // showHouseInfo(formattedData);       
            showLocationMarker(positions, positionImageSrc);
            showMarker(houses, housesImageSrc);
        }
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
// 마커 이미지의 이미지 주소입니다
var positionImageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
var housesImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'; 
bounds = new kakao.maps.LatLngBounds();


// 지도에 표시된 마커 객체를 가지고 있을 배열입니다
var markers = [];

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


function showLocationMarker(dataForMarker, markerImageSrc){

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

function showMarker(dataForMarker, markerImageSrc){
    removeMarkers();
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

        (function(marker, dataForMarker) {
            kakao.maps.event.addListener(marker, 'click', function() {
                if(customOverlay != null){
                    closeOverlay();
                }

                var positionLat = dataForMarker.latlng.Ma;
                var positionLng = dataForMarker.latlng.La;
                var placeName = dataForMarker.title;

                map.setLevel(4);
                map.setCenter(new kakao.maps.LatLng(positionLat, positionLng));
                displayOverlay(dataForMarker, positionLat, positionLng);
            });
        })(Marker, dataForMarker[i]);

        markers.push(Marker);

        //두 위치에 맞게 지도 영역 조절
        var placePosition = new kakao.maps.LatLng(dataForMarker[i].latlng.Ma,dataForMarker[i].latlng.La);
        bounds.extend(placePosition);
        map.setBounds(bounds);
    }
}


var customOverlay = null;

function displayOverlay(place, positionLat, positionLng) {
    var overlayPosition = new kakao.maps.LatLng(positionLat+0.0006, positionLng+0.0002);

    var placeID = place.info.id;
    var title = place.title;
    var minSalePrice= place.info.minSalePrice;
    var maxSalePrice= place.info.maxSalePrice;
    var minJeonsePrice= place.info.minJeonsePrice;
    var maxJeonsePrice= place.info.maxJeonsePrice;
    var minArea = place.info.minArea;
    var maxArea = place.info.maxArea;

    var content = '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + title + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="desc">' + 
            `               <div class="ellipsis">매매가(천만원):${minSalePrice}~${maxSalePrice}</div>`+
            `               <div class="ellipsis">전세가(천만원):${minJeonsePrice}~${maxJeonsePrice}</div>`+
            `               <div class="ellipsis">평수(평):${minJeonsePrice}~${maxJeonsePrice}</div>`+
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';

    customOverlay = new kakao.maps.CustomOverlay({
        position: overlayPosition,
        content: content,
        xAnchor: 0.3,
        yAnchor: 0.91
    });

    customOverlay.setMap(map);
}

function closeOverlay(){
    console.log("closeOverlay!!");
    customOverlay.setMap(null);     
}


// function showHouseInfo(houseData){
    
//     houseData.map((data,index)=>{
//         //정보 제공
//         var houseInfo = document.createElement(`house_${index}`);
//         houseInfo.id = "houseInfo_" + index;
//         houseInfo.innerHTML = `
//             <h2>${data.name}</h2>
//             <p>주소: ${data.address}</p>
//             <p>유형: ${data.type}</p>
//             <p>매매가(천만원): ${data.minSalePrice}~${data.maxSalePrice}</p>
//             <p>전세가(천만원): ${data.minJeonsePrice}~${data.maxJeonsePrice}</p>
//             <p>전용 면적(평): ${data.minArea}~${data.maxArea}</p>
//         `;

//         document.getElementById("comparison").appendChild(houseInfo);
//     })
// }
