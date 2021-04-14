var mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10

};

var map = new naver.maps.Map('map', mapOptions);

const data = [
    {
        title: "용산역",
        address: "용산",
        lat: 37.53000095823676,
        lng: 126.9647696445236,
    },
    {
        title: "서울역",
        address: "서울",
        lat: 37.55676843496512,
        lng: 126.9723863076583,
    },
];

let markerList = [];
let infowindowList = [];

const getClickHandler = (i) => () => {
    const marker = markerList[i];
    const infowindow = infowindowList[i];
    if (infowindow.getMap()) {
        infowindow.close();
    }else{
        infowindow.open(map, marker);
    }
};

const getClickMap = (i) => () => {
    const infowindow = infowindowList[i];
    infowindow.close();
};

for (let i in data) {
    const target = data[i];
    const latlng = new naver.maps.LatLng(target.lat, target.lng);

    let marker = new naver.maps.Marker({
        map:map,
        position: latlng,
        icon: {
            content: `<div class = "marker"></div>`,
            anchor: new naver.maps.Point(7.5, 7.5),
        },
    });

    const content = `
        <div class = "infowindow_wrap">
            <div class = "infowindow_title">${target.title}</div>
            <div class = "infowindow_address">${target.address}</div>
        </div>
    `;

    const infowindow = new naver.maps.InfoWindow({
        content : content,
        backgroundColor : "#00ff0000",
        borderColor: "#00ff0000",
        anchorSize: new naver.maps.Size(0, 0),
    });

    markerList.push(marker);
    infowindowList.push(infowindow);
}

for (let i = 0, ii = markerList.length; i < ii; i++) {
    naver.maps.Event.addListener(markerList[i],"click",getClickHandler(i));
    naver.maps.Event.addListener(map,"click", getClickMap(i));
}

function getCheckboxData(){
 
    // name이 같은 체크박스의 값들을 배열에 담는다.
    var checkboxValues = [];
    $("input[name=hosp_div]:checked").each(function(i) {
        checkboxValues.push($(this).val());
    });
     
    // 체크박스 값들(배열)을 name/value 형태로 담는다.
    var allData = { "checkArray": checkboxValues };
     
    $.ajax({
        url:"/hospital",
        type:'GET',
        data: allData,
        dataType : "text",
        timeout : 3000,
        cache : true,
        success:function(data){
            console.log(data);
            // alert("완료!");
            // window.opener.location.reload();
            // self.close();
        },
        error:function(jqXHR, textStatus, errorThrown){
            console.log(data);
            // alert("에러가 발생했습니다. 다시 선택해주세요. \n" + textStatus + " : " + errorThrown);
            self.close();
        }
    });
}