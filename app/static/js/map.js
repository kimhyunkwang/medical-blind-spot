// 지도 나타내기
var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.5642135, 127.0016985),
    zoom: 10
});

// 지도 위에 마커 추가
var marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(37.5642135, 127.0016985),
    map: map
});
