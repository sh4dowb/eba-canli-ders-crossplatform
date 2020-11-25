# EBA canlı ders crossplatform (Linux & Mac) desteği
Bu script ile EBA canlı dersi Linux, Mac ve Zoom'un çalıştığı diğer işletim sistemleri üzerinde çalıştırabilirsiniz.

EBA, canlı dersleri için Zoom kullanıyor. Fakat dersleri kendi logosu olan uygulamasından başlatmak için, diğer işletim sistemlerinde kullanımı engelliyor. Bu script ile direk Zoom uygulamasını başlatabilirsiniz.

_Bu kod EBA'dan bağımsızdır, herhangi bir hak sahipliği yoktur, kendi sorumluluğunuzda kullanınız. GNU General Public License v2.0 altında kullanabilirsiniz._

# Nasıl Kullanılır?
## 1. yol: scripti konsoldan kullanın
- Zoom'u kurun.
- https://ders.eba.gov.tr/ders/ linkine giriş yapın, `Canlı Dersler` sekmesine gelin.
- `F12` tuşuna basın, `Console` sekmesine gelin
- Aşağıdan size uygun olan kodu yapıştırın:

**Öğrenciler:**
```
$.getScript("https://cagriari.com/eba-ogrenci.js");
```

**Öğretmenler:**
```
$.getScript("https://cagriari.com/eba-ogretmen.js");
```

## 2. yol: Firefox / Chrome'a eklenti kurun
Eklentiyi kurduktan sonra EBA'da canlı ders ekranında sağ üstten ikona tıklayarak kullanabilirsiniz.<br>
**Firefox** için https://cagriari.com/eba.xpi linkine tıklayınız.<br><br>
**Chrome** için https://cagriari.com/eba.crx linkinden indirin, Chrome'da Extensions sayfasına gelin, sağ üstten "Developer Mode"u açın, indirdiğiniz eba.crx'i sayfaya sürükleyin ve kurun.


# Uyarı, notlar ve yapılacaklar
**Öğretmen** scripti: **25.11.2020 itibariyle çalışıyor**<br>
**Öğrenci** scripti: **25.11.2020 itibariyle çalışıyor**<br>
**Firefox & Chrome** eklentisi v1.9: **25.11.2020 itibariyle çalışıyor**<br>

## Yapılacaklar:
- Öğretmen scripti eklentiye eklenecek
- Öğretmen için yoklama desteği eklenecek
- Eklentiye otomatik güncelleme ve versiyon uyarısı eklenecek
- ```fetch``` kullanılırsa daha düzgün olabilir kod
- encodeURIcomponent düzeltilecek (eklenti için)

EBA'ya her girişinizde kodu çalıştırmanız gerekli. Eklentiyi ise 1 kere kurmanız yetecektir.

[@bytescreator](https://github.com/bytescreator) başta olmak üzere yardımcı olan herkese çok teşekkürler!

Bu script eskiden bir gist idi. Bazı hataların çözümü için yorumları okumak isterseniz:<br>
https://gist.github.com/sh4dowb/9ecdc521c7323411f3294d5126a2bfde


# İletişim
Issue açarak, ya da cagriari@pm.me veya https://t.me/cagri üzerinden benimle iletişime geçebilirsiniz.
