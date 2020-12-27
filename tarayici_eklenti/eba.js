function startEba() {
    if (confirm('ÖĞRENCİ için TAMAM\nÖĞRETMEN için İPTAL\n\ntuşuna basınız')) {
        if (window.location.toString().includes("liveMiddleware")) {
            $.ajax({
                url: "https://ders.eba.gov.tr/ders/getlivelessoninfo",
                method: "GET",
                headers: {
                    "Accept": "json"
                },
                withCredentials: true,
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                dataType: "json",
                success: function(resp) {
                    if (resp.liveLessonInfo.studyTime == null)
                        alert('aktif canlı ders yok');
                    else {
                        if(resp.liveLessonInfo.studyTime.registrantJoinUrl){
                            window.location = resp.liveLessonInfo.studyTime.registrantJoinUrl;
                        } else {
                            $.ajax({
                                url: "https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService/livelesson/inpage/instudytime/join",
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "Accept": "json"
                                },
                                data: "studytimeid=" + resp.liveLessonInfo.studyTime.studyTimeId + "&tokentype=nonce&platform=windows",
                                withCredentials: true,
                                crossDomain: true,
                                xhrFields: {
                                    withCredentials: true
                                },
                                dataType: "json",
                                success: function(resp2) {
                                    if (resp2.success == false) {
                                        alert("bir hata oluştu: " + resp2.operationMessage.replace('studytimenotstarted', 'ders daha başlamadı.'));
                                        return;
                                    }

                                    $.ajax({
                                        url: "https://uygulama-ebaders.eba.gov.tr/FrontEndService/livelesson/nonce/"+encodeURIComponent(resp2.meeting.token),
                                        success: function(resp3) {
                                            try{ ga('send', 'event', {
                                                eventCategory: "liveLesson",
                                                eventAction: "join",
                                                eventLabel: ""
                                            }); }catch(a){}
                                            window.location = encodeURI(resp2.meeting.url) + "?tk=" + encodeURIComponent(resp3.replace('"','').split('|')[0]).replace('%26pwd%3D','&pwd=');
                                        },
                                        error: function(resp){
                                            $.ajax({
                                                url: "https://cagriari.com/eba_nonceproxy.php?nonce="+encodeURIComponent(resp2.meeting.token),
                                                success: function(resp3) {
                                                    try{ ga('send', 'event', {
                                                        eventCategory: "liveLesson",
                                                        eventAction: "join",
                                                        eventLabel: ""
                                                    }); }catch(a){}
                                                    window.location = encodeURI(resp2.meeting.url) + "?tk=" + encodeURIComponent(resp3.replace('"','').split('|')[0]).replace('%26pwd%3D','&pwd=');
                                                },
                                                error: function(resp){
                                                    alert("Token bilgilerini alırken bir hata oluştu.");
                                                    console.error("https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService/livelesson/inpage/instudytime/join erişiminde hata oluştu.",resp);
                                                }
                                            });
                                        }
                                    });
                                },
                                error: function(resp){
                                    alert("Giriş bilgilerini alırken bir hata oluştu.");
                                    console.error("https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService/livelesson/inpage/instudytime/join erişiminde hata oluştu.",resp);
                                }
                            });
                        }
                    }
                },
                error: function(resp){
                    alert("Ders bilgilerini alırken bir hata oluştu.");
                    console.error("https://ders.eba.gov.tr/ders/getlivelessoninfo erişiminde hata oluştu.",resp);
                }
            });
        } else {
            $.ajax({
                url: "https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//studytime/getstudentstudytime",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "json"
                },
                data: "status=1&type=2&pagesize=25&pagenumber=0",
                withCredentials: true,
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                dataType: "json",
                success: function(resp) {
                    var result = resp.studyTimeList;
                    var dersler = [];
                    var dersText = "";
                    var id = 1;
                    for (var i in result) {
                        if ((new Date).getTime() + 18000000 > result[i].startdate) {
                            dersler.push(result[i]);
                            dersText = dersText + (id.toString() + ") " + result[i].title + " (" + result[i].ownerName + " " + result[i].ownerSurname + ")\n");
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
                        url: "https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//livelesson/instudytime/join",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Accept": "json"
                        },
                        data: "studytimeid=" + ders.id + "&tokentype=nonce&platform=windows",
                        withCredentials: true,
                        crossDomain: true,
                        xhrFields: {
                            withCredentials: true
                        },
                        dataType: "json",
                        success: function(resp2) {
                            if (resp2.success == false) {
                                alert("bir hata oluştu: " + resp2.operationMessage.replace('studytimenotstarted', 'ders daha başlamadı.'));
                                return;
                            }

                            $.ajax({
                                url: "https://uygulama-ebaders.eba.gov.tr/FrontEndService/livelesson/nonce/"+resp2.meeting.token,
                                success: function(resp3) {
                                    try{ ga('send', 'event', {
                                        eventCategory: "liveLesson",
                                        eventAction: "join",
                                        eventLabel: ""
                                    }); }catch(a){}
                                    window.location = encodeURI(resp2.meeting.url) + "?tk=" + encodeURIComponent(resp3.replace('"','').split('|')[0]).replace('%26pwd%3D','&pwd=');
                                },
                                error: function(resp){
                                    $.ajax({
                                        url: "https://cagriari.com/eba_nonceproxy.php?nonce="+encodeURIComponent(resp2.meeting.token),
                                        success: function(resp3) {
                                            try{ ga('send', 'event', {
                                                eventCategory: "liveLesson",
                                                eventAction: "join",
                                                eventLabel: ""
                                            }); }catch(a){}
                                            window.location = encodeURI(resp2.meeting.url) + "?tk=" + encodeURIComponent(resp3.replace('"','').split('|')[0]).replace('%26pwd%3D','&pwd=');
                                        },
                                        error: function(resp){
                                            alert("Token bilgilerini alırken bir hata oluştu.");
                                            console.error("https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService/livelesson/inpage/instudytime/join erişiminde hata oluştu.",resp);
                                        }
                                    });
                                }
                            });
                        },
                        error: function(resp){
                            alert("Giriş bilgilerini alırken bir hata oluştu.");
                            console.error("https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//livelesson/instudytime/join erişiminde hata oluştu.",resp);
                        }
                    });
                },
                error: function(resp){
                    alert("Ders bilgilerini alırken bir hata oluştu.");
                    console.error("https://ders.eba.gov.tr/ders/getlivelessoninfo erişiminde hata oluştu.",resp);
                }
            });
        }
    } else {
        $.ajax({
            url: "https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//studytime/getteacherstudytime",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "json"
            },
            data: "status=1&type=2&pagesize=25&pagenumber=0",
            withCredentials: true,
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            dataType: "json",
            success: function(resp) {
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
                    url: "https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//livelesson/instudytime/start",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept": "json"
                    },
                    data: {
                        "studytimeid": ders.id,
                        "tokentype": "nonce",
                        "platform": "windows",
                    },
                    withCredentials: true,
                    crossDomain: true,
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "json",
                    success: function(resp2){
                        if (resp2.success == false) {
                            alert("bir hata oluştu: " + resp2.operationMessage.replace('studytimenotstarted', 'ders daha başlamadı.'));
                            return;
                        }
                        $.ajax({
                            url: "https://uygulama-ebaders.eba.gov.tr/FrontEndService/livelesson/nonce/"+resp2.meeting.token,
                            success: function(resp3) {
                                try{ ga('send', 'event', {
                                    eventCategory: "liveLesson",
                                    eventAction: "join",
                                    eventLabel: ""
                                }); }catch(a){}
                                window.location = encodeURI(resp2.meeting.url) + "?zak=" + encodeURIComponent(resp3.replace('"','').split('|')[6]).replace('%26pwd%3D','&pwd=');
                            },
                            error: function(resp){
                                $.ajax({
                                    url: "https://cagriari.com/eba_nonceproxy.php?nonce="+encodeURIComponent(resp2.meeting.token),
                                    success: function(resp3) {
                                        try{ ga('send', 'event', {
                                            eventCategory: "liveLesson",
                                            eventAction: "join",
                                            eventLabel: ""
                                        }); }catch(a){}
                                        window.location = encodeURI(resp2.meeting.url) + "?zak=" + encodeURIComponent(resp3.replace('"','').split('|')[6]).replace('%26pwd%3D','&pwd=');
                                    },
                                    error: function(resp){
                                        alert("Token bilgilerini alırken bir hata oluştu.");
                                        console.error("https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService/livelesson/inpage/instudytime/join erişiminde hata oluştu.",resp);
                                    }
                                });
                            }
                        });
                    },
                    error: function(resp){
                        alert("Giriş bilgilerini alırken bir hata oluştu.");
                        console.error("https://uygulama-ebaders.eba.gov.tr/ders/FrontEndService//livelesson/instudytime/join erişiminde hata oluştu.",resp);
                    }
                });
            },
            error: function(resp){
                alert("Ders bilgilerini alırken bir hata oluştu.");
                console.error("https://ders.eba.gov.tr/ders/getlivelessoninfo erişiminde hata oluştu.",resp);
            }
        });
    }
}
