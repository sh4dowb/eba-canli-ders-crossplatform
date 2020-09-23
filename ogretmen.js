$.ajax({
  url : "https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//studytime/getteacherstudytime",
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
  success : function(resp) {
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
    var ders = dersler[parseInt(selectedDers) - 1];
    $.ajax({
      url : "https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//livelesson/instudytime/start",
      method : "POST",
      headers : {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Accept" : "json"
      },
      data : {
        "studytimeid" : ders.id,
        "tokentype" : "zak",
        "platform": "",
      },
      withCredentials : true,
      crossDomain : true,
      xhrFields : {
        withCredentials : true
      },
      dataType : "json",
      success : function(resp2) {
        window.location = resp2.meeting.url + "?zak=" + resp2.meeting.token;
      }
    });
  }
});
