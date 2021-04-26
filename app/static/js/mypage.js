// get 요청 => 해당 회원에 해당하는 정보들 가져오기
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
            var formattedData = formatting(residResult);
            var houses = formattingForMarker(formattedData);

            showLocationMarker(positions, positionImageSrc); // 기본 위치 마커 표시
            showMarker(houses, housesImageSrc); //저장 매물 위치 마커 표시
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

        data.push(formattedResult);
    }
    return data;
}

// 지도 생성
var mapContainer = document.getElementById('map'), 
mapOption = { 
    center: new kakao.maps.LatLng(37.526222, 127.024481),
    level: 3 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption);

// formattingForMarker => 마커 표시를 위한 데이터 변환 함수
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

// 마커 표시
var positionImageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";  // 마커 이미지의 이미지 주소입니다
var housesImageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'; 
bounds = new kakao.maps.LatLngBounds();

var markers = [];

function setMarkers(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }            
}

function removeMarkers(){
    setMarkers(null);
}

// showLocationMarker => 보호자 위치, 병원 위치 마커 표시 함수
function showLocationMarker(dataForMarker, markerImageSrc){

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

// showMarker => 저장한 매물 마커 표시 함수
function showMarker(dataForMarker, markerImageSrc){
    removeMarkers();
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

// 오버레이 창 생성 및 띄우기
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
            `               <div class="ellipsis">전용면적(m<sup>2</sup>):${minJeonsePrice}~${maxJeonsePrice}</div>`+
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