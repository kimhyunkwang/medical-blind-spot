//보호자의 위치, 자주 가는 병원 위치
var protectorLocation = null;
var hospitalLocation = null;

// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();  

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// 키워드로 장소를 검색합니다
searchPlaces();

// kakao.maps.event.addListener(map, 'center_changed', function() {
//     closeOverlay();
//     alert('center changed!');
// });

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB); 
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    for ( var i=0; i<places.length; i++ ) {
        var placePositionLat = places[i].y;
        var placePositionLng = places[i].x;
        placePositionLat = Math.floor(placePositionLat*1000000)/1000000;
        placePositionLng = Math.floor(placePositionLng*1000000)/1000000;

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(placePositionLat, placePositionLng),
            marker = addMarker(placePosition, i), 
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다

        (function(marker, place) {
            var title = place.place_name;
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            kakao.maps.event.addListener(marker, 'click', function() {
                if(customOverlay != null){
                    closeOverlay();
                }
                
                var position = marker.getPosition();
                var positionLat = position.getLat();
                var positionLng = position.getLng();
                var placeName = place.place_name;
                positionLat = Math.floor(positionLat*1000000)/1000000;
                positionLng = Math.floor(positionLng*1000000)/1000000;
                console.log(positionLat);
                console.log(positionLng);
                console.log(placeName);

                map.setLevel(4);
                map.setCenter(new kakao.maps.LatLng(positionLat, positionLng));
                console.log(map.getCenter());
                displayOverlay(place, positionLat, positionLng);
                console.log(place);
            });

            itemEl.onclick =  function () {
                var position = marker.getPosition();
                var positionLat = position.getLat();
                var positionLng = position.getLng();
                positionLat = Math.floor(positionLat*1000000)/1000000;
                positionLng = Math.floor(positionLng*1000000)/1000000;
                console.log(positionLat);
                console.log(positionLng);

                map.setLevel(4);
                map.setCenter(new kakao.maps.LatLng(positionLat, positionLng));
                console.log(map.getCenter());
            };

        })(marker, places[i]);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

var customOverlay = null;

function displayOverlay(place, positionLat, positionLng) {
    var overlayPosition = new kakao.maps.LatLng(positionLat+0.0006, positionLng+0.0002);

    var positionTitle = place.place_name;
    var positionRoadAddress = place.road_address_name;
    var positionAddress = place.address_name;

    var content = '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + positionTitle + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">'+ positionRoadAddress +'</div>' + 
            '                <div class="jibun ellipsis">'+positionAddress+'</div>' + 
            '                <button type="button" class="select" onclick="setProtectorLocation('+'\''+positionTitle+'\''+','+'\''+positionRoadAddress+'\''+','+'\''+positionAddress+'\''+','+positionLat+','+positionLng+')">보호자 위치로 지정</button>'+
            '                <button type="button" class="select" onclick="setHospitalLocation('+'\''+positionTitle+'\''+','+'\''+positionRoadAddress+'\''+','+'\''+positionAddress+'\''+','+positionLat+','+positionLng+')">병원 위치로 지정</button>'+
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

var protectorLocationData = {title: '', roadAddress:'', address:''};
var hospitalLocationData = {title: '', roadAddress:'', address:''};

//선택 버튼 클릭 => 보호자 위치 지정
function setProtectorLocation(positionTitle, positionRoadAddress, positionAddress, positionLat, positionLng) {
    console.log(positionTitle);
    console.log(positionRoadAddress);
    console.log(positionAddress);

    protectorLocationData.title = positionTitle;
    protectorLocationData.roadAddress = positionRoadAddress;
    protectorLocationData.address = positionAddress;

    document.getElementById("showProtectorLocation").innerHTML = `
                                                                    ${protectorLocationData.title}${protectorLocationData.roadAddress}${protectorLocationData.address}
                                                                    `;

    protectorLocation = {};
    protectorLocation['lat'] = positionLat;
    protectorLocation['lng'] = positionLng;
    console.log(protectorLocation);
}

function setHospitalLocation(positionTitle, positionRoadAddress, positionAddress, positionLat, positionLng) {
    console.log(positionTitle);
    console.log(positionRoadAddress);
    console.log(positionAddress);

    hospitalLocationData.title = positionTitle;
    hospitalLocationData.roadAddress = positionRoadAddress;
    hospitalLocationData.address = positionAddress;

    document.getElementById("showHospitalLocation").innerHTML = `
                                                                    ${hospitalLocationData.title}${hospitalLocationData.roadAddress}${hospitalLocationData.address}
                                                                    `;
    hospitalLocation = {};
    hospitalLocation['lat'] = positionLat;
    hospitalLocation['lng'] = positionLng;
    console.log(hospitalLocation);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
                    
        itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

//
function nextPage() {
    if(protectorLocation && hospitalLocation){
        var now_url = new URL(location.href);
        var base_url = now_url.origin;
        new_url = `/residence?protectorLat=${protectorLocation.lat}&protectorLng=${protectorLocation.lng}&hospitalLat=${hospitalLocation.lat}&hospitalLng=${hospitalLocation.lng}`;
        window.location.href = base_url+new_url;
    } else {
        alert("보호자 위치와 병원 위치를 모두 지정해주세요!!")
    }
}