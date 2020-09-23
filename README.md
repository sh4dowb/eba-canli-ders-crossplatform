# EBA canlı ders crossplatform (Linux & Mac) desteği
Bu script ile EBA canlı dersi Linux, Mac ve Zoom'un çalıştığı diğer işletim sistemleri üzerinde çalıştırabilirsiniz.

EBA, canlı dersleri için Zoom kullanıyor. Fakat dersleri kendi logosu olan uygulamasından başlatmak için, diğer işletim sistemlerinde kullanımı engelliyor. Bu script ile direk Zoom uygulamasını başlatabilirsiniz.

_Bu kod EBA'dan bağımsızdır, herhangi bir hak sahipliği yoktur, kendi sorumluluğunuzda kullanınız. Herhangi bir credit vermeden istediğiniz şekilde değiştirip kullanabilirsiniz._

# Nasıl Kullanılır?
- https://ders.eba.gov.tr/ders/ linkine giriş yapın, `Canlı Dersler` sekmesine gelin.
- `F12` tuşuna basın, `Console` sekmesine gelin
- Aşağıdan size uygun olan kodu yapıştırın:

**Öğrenciler:**
```
$.getScript("https://cdn.jsdelivr.net/gh/sh4dowb/eba-canli-ders-crossplatform/ogrenci.js");`
```

**Öğretmenler:**
```
$.getScript("https://cdn.jsdelivr.net/gh/sh4dowb/eba-canli-ders-crossplatform/ogretmen.js");`
```

# Uyarı ve notlar
**Öğretmen** scripti: **23.09.2020 itibariyle çalışıyor**
**Öğrenci** scripti: son güncellemeden sonra **test edilmedi**

**Chrome & Firefox eklentisi: yakında!**

Bu script eskiden bir gist idi. Bazı hataların çözümü için yorumları okumak isterseniz:
https://gist.github.com/sh4dowb/9ecdc521c7323411f3294d5126a2bfde

# İletişim
Issue açarak, ya da cagriari@pm.me veya https://t.me/ üzerinden benimle iletişime geçebilirsiniz.

