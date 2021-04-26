// url 파라미터에서 위치 정보 가져오기
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results == null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var protectorLat = getParameterByName("protectorLat");
var protectorLng = getParameterByName("protectorLng");
var hospitalLat = getParameterByName("hospitalLat");
var hospitalLng = getParameterByName("hospitalLng");

// get 요청 => 보호자 위치와 병원 위치를 기반으로 한 매물 정보 가져오기
$.ajax({
	type: "GET",
	url:"/api/residence",
    data: {
        protectorLat : protectorLat,
        protectorLng : protectorLng,
        hospitalLat : hospitalLat,
        hospitalLng : hospitalLng
    },
	dataType : "json",
	success : function(result){
        var formattedData = formatting(result.result);
        var dataForMarker = formattingForMarker(formattedData);
        showMarker(dataForMarker);  //각 매물들을 마커로 표시
	},
	error : function(a, b, c){
		alert(a + b + c);
	}
});

var data = [];  //매물데이터를 형식에 맞게 변환한 데이터 (formatting 함수의 반환값)
var dataForMarker =[]; //마커 표시를 위해 형식에 맞게 변환한 데이터 (formattingForMarker 함수의 반환값)
var filteredData = []; //필터링 조건에 맞게 필터링 된 결과물 데이터 (applyFilter 함수의 반환값)

// formatting => 매물데이터를 형식에 맞게 변환하는 함수
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

// formattingForMarker => 마커 표시를 위해 형식에 맞게 변환하는 함수
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

//필터
var typeFilter = {apartment: false, officetel: false};
var tradeFilter = {sale: false, jeonse: false};
var salePriceFilter = {minSalePrice: '', maxSalePrice: ''};
var jeonsePriceFilter = {minJeonsePrice: '', maxJeonsePrice: ''};
var areaFilter = {minArea:'', maxArea:''};

//각 필터링 별 함수
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

// 지도 생성
var mapContainer = document.getElementById('map'),
mapOption = { 
    center: new kakao.maps.LatLng(37.526222, 127.024481),
    level: 3
};

var map = new kakao.maps.Map(mapContainer, mapOption);

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

var positionImageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
bounds = new kakao.maps.LatLngBounds();

for (var i = 0; i < positions.length; i ++) {

    var positionImageSize = new kakao.maps.Size(24, 35); 
    var positionMarkerImage = new kakao.maps.MarkerImage(positionImageSrc, positionImageSize); 
    
    // 마커 생성
    var positionMarker = new kakao.maps.Marker({
        map: map, 
        position: positions[i].latlng,
        title : positions[i].title, 
        image : positionMarkerImage
    });

    //두 위치에 맞게 지도 영역 조절
    var placePosition = new kakao.maps.LatLng(positions[i].latlng.Ma,positions[i].latlng.La);
    bounds.extend(placePosition);
    map.setBounds(bounds);
}

// 지도에 표시된 마커 객체를 가지고 있을 배열
var markers = [];

// 마커 지도에 표시
function setMarkers(map) {
    console.log("setMarkers");
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }            
}

// 지도에서 마커 제거
function removeMarkers(){
    console.log("remove");
    setMarkers(null);
}

// showMarker => 마커 생성해서 보여주는 함수
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
        })(houseMarker, dataForMarker[i]);

        markers.push(houseMarker);
    }
}

// 오버레이창
var customOverlay = null;

// displayOverlay => 오버레이창 띄우는 함수
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

    //오버레이창 콘텐츠
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
            '               <button type="button" class="select" onclick="pickHouse('+'\''+placeID+'\''+','+'\''+title+'\''+')">후보 매물로 지정</button>'+
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';

    //오버레이창 생성
    customOverlay = new kakao.maps.CustomOverlay({
        position: overlayPosition,
        content: content,
        xAnchor: 0.3,
        yAnchor: 0.91
    });

    customOverlay.setMap(map);
}

// closeOverlay => 오버레이 창 닫기
function closeOverlay(){
    console.log("closeOverlay!!");
    customOverlay.setMap(null);     
}

//후보 매물 지정
var pickedHouseTitle = [];
var pickedHouseID = [];

function pickHouse(placeID, title){
    console.log("pickedHouseTitle:", pickedHouseTitle);
    console.log("pickedHouseID:", pickedHouseID);
    if (pickedHouseTitle.includes(title) == true){
        alert("이미 등록된 매물입니다");
    } else {
        if(pickedHouseTitle.length < 3){
            pickedHouseTitle.push(title);
            pickedHouseID.push(placeID);

            var pickedHousediv = document.getElementById("showPickedHouse");
            var result = '<h1>후보 매물</h1><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            for(var i=0; i<pickedHouseTitle.length; i++){
                var title = pickedHouseTitle[i];
                var placeID = pickedHouseID[i];

                result += `<span id="${placeID}">${title}<button onclick="cancelPick(`+'\''+placeID+'\''+','+'\''+title+'\''+`)">취소</button></span>&nbsp;`;
            }
            pickedHousediv.innerHTML = result;

        } else {
            alert("후보 매물은 3개까지만 가능합니다");
        }
    }
}

// cancelPick => 후보 매물 취소 함수
function cancelPick(placeID, title){
    var a = document.getElementById(placeID);
    a.parentNode.removeChild(a);
    pickedHouseTitle = pickedHouseTitle.filter((element) => element != title);
    pickedHouseID = pickedHouseID.filter((element) => element != placeID);
}

// applyFilter => 데이터 필터링 함수
function applyFilter(data, typeFilter, tradeFilter, salePriceFilter, jeonsePriceFilter, areaFilter){
    var filteredData = [];

    data.map((data) => {
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

//필터링 적용한 검색
function search(){
    var filteredData = applyFilter(data, typeFilter, tradeFilter, salePriceFilter, jeonsePriceFilter, areaFilter);
    var dataForMarker = formattingForMarker(filteredData);
    showMarker(dataForMarker);
}

//페이지 넘기기
function nextPage(){
    if(pickedHouseID.length != 3){
        alert("후보 매물을 3개 골라주세요!!")
    } else {
        var now_url = new URL(location.href);
        var base_url = now_url.origin;

        new_url = `/compare?pick_1=${pickedHouseID[0]}&pick_2=${pickedHouseID[1]}&pick_3=${pickedHouseID[2]}&protectorLat=${protectorLat}&protectorLng=${protectorLng}&hospitalLat=${hospitalLat}&hospitalLng=${hospitalLng}`;
        window.location.href = base_url+new_url;
    }

}