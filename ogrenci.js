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
                                url: "https://cagriari.com/eba_nonceproxy.php?nonce="+resp2.meeting.token,
                                success: function(resp3) {
                                    try{ ga('send', 'event', {
                                        eventCategory: "liveLesson",
                                        eventAction: "join",
                                        eventLabel: ""
                                    }); }catch(a){}
                                    window.location = resp2.meeting.url + "?tk=" + resp3.substring(1).split('|')[0];
                                }
                            });
                        }
                    });
                }
            }
        }
    });
} else {
    alert('Eklentiyi mavi arkaplanlı canlı ders sayfasında çalıştırınız.')
}
