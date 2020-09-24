function doStart(resp,middleWare) {
  if(!middleWare){
    var result = resp.studyTimeList;
    var dersler = [];
    var dersText = "";
    var id = 1;
    for (var i in result) {
      if ((new Date).getTime() + 18000000 > result[i].startdate) {
        dersler.push(result[i]);
        dersText = dersText + (id.toString() + ") " + result[i].title + " (" + result[i].classroom + ")\n");
        id = id + 1;
      }
    }
    if (dersler.length == 0) {
      alert("aktif ders yok");
      return;
    }
    var selectedDers = prompt("Seçim yapınız (sadece rakam girin):\n\n" + dersText);
    var ders = dersler[parseInt(selectedDers) - 1].id;
  } else {
    if(!confirm("Ara Ekrandaki derse girmek ister misiniz ? " + dersText)) throw Error('İptal Edildi.');
    var ders = resp.liveLessonInfo.studyTime.studyTimeId;
  }
  $.ajax({
    url : middleWare ? "https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//livelesson/inpage/start" : 
    "https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//livelesson/instudytime/start",
    method : "POST",
    headers : {
      "Content-Type" : "application/x-www-form-urlencoded",
      "Accept" : "json"
    },
    data : {
      "studytimeid" : ders,
      "tokentype" : "asd",
      "platform": "",
    },
    withCredentials : true,
    crossDomain : true,
    xhrFields : {
      withCredentials : true
    },
    dataType : "json",
    success : function(resp2) {
      if(resp2.operationMessage != 'studytimenotstarted') window.location = resp2.meeting.url + "?tk=" + resp2.meeting.token;
      else alert('Dersiniz daha başlamamış.');
    }
  });
}

$.ajax({
  url : "https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//studytime/getstudentstudytime",
  method : "POST",
  headers : {
    "Content-Type" : "application/x-www-form-urlencoded",
    "Accept" : "json"
  },
  data : "status=1&type=2&pagesize=25&pagenumber=0",
  withCredentials : true,
  crossDomain : true,
  xhrFields : {
    withCredentials : true
  },
  dataType : "json",
  success : (resp) => doStart(resp,false),
  error: (e) => {
    $.ajax({
      url : 'https://ders.eba.gov.tr/ders/getlivelessoninfo',
      method : 'GET',
      withCredentials : true,
      crossDomain : true,
      xhrFields : {
        withCredentials : true
      },
      dataType : 'json',
      success : (resp) => doStart(resp,true)
    });
  }
});
