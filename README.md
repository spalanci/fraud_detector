**ŞÜPHELİ İŞLEM VE SAHTE SATICI TESPİTİ PROJESİ**
 - Platformumuz, gelişmiş makine öğrenmesi algoritmaları ile online pazaryerlerini saniyeler içinde daha güvenli hale getirir.
 - 4.3.1 maddesinde modelin eğitim sürecinin detaylarına bakabilirsiniz.

  - Demo Web Sayfası: (FRAUD DEDECTOR) [https://frauddetectorv1.vercel.app/]
  
[![FRAUD DEDECTOR - ŞÜPHELİ İŞLEM VE SAHTE SATICI TESPİTİ](https://github.com/spalanci/fraud_detector/blob/main/images/background.png)](https://www.youtube.com/watch?v=Hc79sDi3f0U)

Videolu anlatım için görsele tıklayınız.
       
**1\. AMAÇ**

Projenin temel amacı; e-ticaret platformundaki **satıcı yorumlarını, satıcı performans metriklerini (iade oranı, şikâyet sayısı vb.) ve ödeme işlemi verilerini** yapay zekâ ve makine öğrenmesi teknikleriyle analiz ederek:

- **Gerçek zamanlı dolandırıcılık risk skoru** oluşturmak,
- **Sahte, küfürlü yorumları ve bot aktivitelerini** tespit etmek,
- **Alışveriş yapan müşterilere** anlık uyarılar (ör. “Bu satıcı şüpheli”) göndermek,
- **E-ticaret yöneticilerine** otomatik alarmlar üretmek ve belirlenen eşik değerleri aşan satıcıları **geçici olarak pasif hale getirme** aksiyonunu önermek/uygulamaktır.

Böylece platformun güvenilirliğini artırmak, müşteri mağduriyetlerini azaltmak ve dolandırıcılık kaynaklı finansal kayıpların önüne geçmek hedeflenmektedir.

**2\. KAPSAM**

**2.1 Kapsama Dahil Olanlar**

- **Veri Kaynakları:**
    - E-ticaret platformundaki satıcı yorumları
    - Satıcı bazlı iade oranları, şikâyet sayıları, ortalama müşteri puanı
    - Stripe Radar veya benzer ödeme sistemlerinden gelen anlık risk ve fraud sinyalleri
    - Ödeme işlemlerine ait temel metadata (tutar, zaman damgası, başarısız işlem sayısı vb.).
- **Yapay Zekâ Bileşenleri:**
    - Fine-tune edilmiş DistilBERT modeli ile metin sınıflandırma (sahte yorum / gerçek yorum),
    - Gemini API ile bağlamsal anormallik tespiti (bot yorum, aşırı tekrar vb.),
    - Satıcı risk puanını hesaplayan formül (RAG + Stripe risk skoru + iade/şikâyet metrikleri).
- **Çıktılar ve Aksiyonlar:**
    - Müşteri alışveriş sepeti arayüzünde uyarı mesajları,
    - Müşteri chatbot’u üzerinden “Bu satıcıya güvenmeli miyim?” sorgularının yanıtlanması,
    - Yönetici panelinde risk skoru> 65 olan satıcıların listelenmesi ve pasifleştirme butonu.

**2.2 Kapsam Dışında Olanlar**

- Gerçek banka hesaplarına veya canlı müşteri verilerine erişim (yalnızca sandbox/test ortamları kullanılacaktır).
- Yüksek ölçekli (milyonlarca işlem) performans optimizasyonu.
- Yasal uyumluluk raporlamaları (KVKK, GDPR gibi regülasyonlar proje kapsamında değerlendirilmemiştir, yalnızca demo senaryolarında anonim veri kullanılacaktır).
- Satıcıların itiraz süreçlerini yöneten tam otomatik bir sistem

**3\. HEDEFLER**

Proje başarısını ölçmek için aşağıdaki somut hedefler belirlenmiştir:

1.  **Doğruluk Hedefleri:**
    - Sahte yorum tespitinde **en az %85 doğruluk** 
    - Satıcı risk skorunun, manuel olarak etiketlenmiş 50 örnek satıcı üzerinde **%80 üzerinde tutarlılık** göstermesi.
2.  **Yanıt Süresi Hedefleri:**
    - Bir yorumun analiz edilip risk skoruna katkı sağlaması **< 2 saniye** 
    - Müşteri chatbot sorgularına ortalama **< 1.5 saniye** yanıt süresi.
3.  **İşlevsel Hedefler:**
    - Risk skoru 70’in üzerindeki satıcılar için yönetici paneline **otomatik alarm** üretilmesi.
    - Müşteri sepetinde, yüksek riskli satıcıya ait ürün varken **uyarı balonu** gösterilmesi.
    - Chatbot’un “Bu satıcı güvenilir mi?” sorusuna **doğru ve bağlamsal yanıt** vermesi (en az 3 farklı demo senaryoda başarılı).
4.  **Kullanıcı Kabul Testi:**
    - Demo ortamında 5 farklı kullanıcının (2 müşteri, 3 yönetici) senaryoları başarıyla tamamlaması.
    - Yöneticilerin pasifleştirme aksiyonunu **tek tıkla** gerçekleştirebilmesi.

**4\. MİNİMUM GEREKSİNİMLER**

Projenin başarıyla tamamlanabilmesi için asgari düzeyde sağlanması gereken teknik ve işletimsel unsurlar:

**4.1 Donanım & Yazılım**

- **Geliştirme Ortamı:** Python 3.9+; RAM ≥ 8 GB (yerel veya bulut).
- **Veritabanı:** SQLite (MVP için) veya PostgreSQL (opsiyonel).
- **Vektör Veritabanı:** Chroma veya FAISS (satıcı geçmişi için RAG katmanı).
- **API Anahtarları:**
    - Gemini API (Google AI Studio veya Vertex AI) – en az **lite** model için kullanım kotası.
    - Stripe Radar sandbox hesabı (test modu).
    - İsteğe bağlı: Trustpilot veya Shopify sandbox.

**4.2 Veri Gereksinimleri**

- En az **200 adet sahte ve gerçek yorum** karışık olarak (DistilBERT fine-tune için).
- En az **30 adet farklı satıcıya ait** iade oranı, şikâyet sayısı, ortalama puan bilgisi (mock veya sentetik veri yeterlidir).
- Stripe test anahtarları ile oluşturulmuş **50 adet demo ödeme işlemi** (başarılı, başarısız, chargeback senaryoları).

**4.3 Model ve API Gereksinimleri**

- Hugging Face’den alınan **distilbert-base-uncased** modelinin ince ayarı (fine-tune) için en az 2 saat süre.
- Gemini API kullanımı için **rate limit** aşılmamalı; 10’ar yorumluk batch’ler halinde gönderim.
- Stripe Radar’ın **risk_score** alanına erişim izni (sandbox’ta varsayılan olarak gelir).

**4.3.1 Model Eğitim Kılavuzu (Model Training Guide)**

Fraud Detector projesinin arkasında çalışan yapay zeka modelinin (Gemini API entegrasyonu, makine öğrenmesi veya ince ayar/fine-tuning süreçleri için) hangi adımlarla eğitileceği ve bu süreçte ihtiyaç duyulan veri setlerinin yapısı maddeler halinde açıklanmıştır.

**1. Model Eğitiminde İzlenecek Yöntemin Adımları**

Yapay zeka modelinin %92 doğruluk payı ve <2sn analiz süresi hedeflerine ulaşabilmesi için aşağıdaki aşamalı eğitim mimarisi izlenir:

* **Adım 1: Veri Toplama ve Çeşitlendirme (Data Sourcing):** Gerçek dünya senaryolarını yansıtan e-ticaret kullanıcı mesajları, satıcı profilleri, şüpheli IBAN/hesap hareketleri ve manipülatif diyaloglar güvenli kaynaklardan (anonimleştirilmiş olarak) toplanır.
* **Adım 2: Veri Ön İşleme ve Etiketleme (Data Preprocessing & Labeling):**
    * Metinlerdeki gürültüler (HTML etiketleri, alakasız emojiler, özel karakterler) temizlenir.
    * Veriler; `Güvenli İşlem`, `Sahte Satıcı/Bot Yorumu`, `Platform Dışına Yönlendirme`, `Hakaret/Tehdit` ve `Finansal Risk (Şüpheli IBAN)` şeklinde etiketlenir (Annotation).
* **Adım 3: Feature Engineering (Özellik Çıkarımı):** Metin tabanlı veriler yapay zekanın anlayacağı vektör formatına (Embedding) dönüştürülür. Kullanıcıların yazışma sıklığı, yanıt süreleri ve şüpheli kelime yoğunlukları gibi metrikler birer "öznitelik" olarak modele beslenir.
* **Adım 4: Model Mimarisi Seçimi ve Temel Eğitim (Training):** * Doğal Dil İşleme (NLP) yetenekleri için hibrit bir mimari kullanılır: Derin öğrenme tabanlı sınıflandırıcılar (Transformer mimarileri) kural tabanlı regex filtreleriyle desteklenir.
    * Büyük dil modellerinin (LLM/Gemini API) sistemle uyumlu çalışması için uygun istem şablonları (Prompt Engineering) ve Few-Shot Learning (örneklerle öğrenme) optimizasyonları yapılır.
* **Adım 5: Rol Simülasyonu ve Adversarial (Yıpratma) Testleri:** Sistem, "Rol Simülasyonu" modülü üzerinden yapay zeka tarafından üretilen agresif sahte alıcı ve dolandırıcı bot senaryolarına maruz bırakılarak test edilir ve açıkları kapatılır.
* **Adım 6: Değerlendirme ve Optimizasyon (Evaluation):** Modelin başarısı *F1-Score*, *Precision* (Kesinlik) ve *Recall* (Duyarlılık) metrikleri üzerinden ölçülür. %92 doğruluk kriterini sağlamayan alt modeller yeniden optimize edilir.

---

**2. Eğitim İçin Lazım Olabilecek Veri Setleri (Data Requirements)**

Modelin e-ticaret yönetiminin elini güçlendirecek seviyede keskin kararlar verebilmesi için aşağıdaki veri tiplerine ihtiyaç vardır:

#### A. NLP ve Metin Analizi Veri Setleri (Yazışma ve Yorumlar)
* **Müşteri - Satıcı Sohbet Geçmişleri:** E-ticaret platformlarındaki canlı destek veya sipariş içi mesajlaşma logları (Kişisel verilerden arındırılmış / KVKK uyumlu).
* **Yönlendirme ve Manipülasyon Örnekleri:** Satıcıların komisyon ödememek için müşteriyi platform dışına çekmeye çalıştığı mesaj kalıpları (Örn: *"Bize WhatsApp'tan yazın", "Parayı sahibinden.com dışından EFT yapın"*).
* **Sahte Yorum ve Bot Verileri:** Ürün puanlarını manipüle etmek amacıyla botlar veya organize gruplar tarafından atılan, birbirini tekrar eden veya aşırı yapay övgü/yergi içeren yorum veri setleri.
* **Hakaret ve Toksik Dil Kütüphanesi:** Alıcı veya satıcıların birbirlerine yönelik kullandığı argo, hakaret, tehdit veya psikolojik manipülasyon (gaslighting) içeren Türkçe metin verileri.

#### B. Davranışsal ve Analitik Veri Setleri (Alışkanlık Takibi)
* **Kullanıcı Davranış Metrikleri:** Bir hesaba ait giriş IP lokasyonları, cihaz değişiklik sıklığı, alışılmadık saatlerde yapılan toplu işlemler ve normal kullanıcı hızının üzerindeki (bot şüphesi doğuran) tıklama/mesajlaşma hızları.
* **Hesap Yaşı ve Güven Skoru Korelasyonu:** Yeni açılan ve açılır açılmaz çok yüksek tutarlı ilanlar yükleyen şüpheli satıcı profillerine ait geçmiş veriler.

#### C. Finansal Risk Veri Setleri (Otomatik Blok İçin)
* **Şüpheli IBAN ve Hesap Hesapları Kara Listesi:** Daha önce dolandırıcılık vakalarına karışmış, uyuşmazlık rapor edilmiş anonimleştirilmiş IBAN formatları ve hesap yapıları.
* **Fiyat Manipülasyonu Verileri:** Piyasa değerinin aşırı altında veya üstünde girilerek sahte nitelik taşıyan ilanların fiyat değişim trendi verileri.

---

**🛠️ Eğitim Verisi Yapı Örneği (JSON Format)**

Modelin girdi-çıktı senaryolarını anlamlandırması için kullanılacak örnek bir eğitim veri formatı:

```json
[
  {
    "context": "Müşteri ve Satıcı Sipariş Sohbeti",
    "message_history": [
      {"sender": "buyer", "message": "Ürünün faturası mevcut mu?"},
      {"sender": "seller", "message": "Evet mevcut ama buradan komisyon çok kesiliyor. we-transfer-guvenli-odeme.com üzerinden öderseniz %10 indirim yaparım."}
    ],
    "labels": {
      "is_fraud": true,
      "risk_type": "Platform Dışı Yönlendirme / Sahte Link",
      "confidence_score": 0.98,
      "action_required": "Otomatik Blok & Yöneticiye Bildir"
    }
  }
]
```

**4.4 Kullanıcı Arayüzleri**

- **Müşteri kanalı:** En basit haliyle bir HTML/Streamlit formu (alışveriş sepeti simülasyonu) ve yanında chatbot penceresi.
- **Yönetici kanalı:** Flask-Admin veya basit bir tablo arayüzü; satıcıları listeleme ve “Pasif Et” butonu içermeli.

**5\. RİSKLER**

Olası riskler ve bunlara karşı alınacak önlemler aşağıda sıralanmıştır:

| **No** | **Risk Açıklaması** | **Etki** | **Azaltma Stratejisi** |
| --- | --- | --- | --- |
| **1** | Gemini API’nin kotasının aşılması veya gecikmeli yanıt vermesi. | Yüksek | Yerel fallback olarak DistilBERT + kural tabanlı sistem devreye alınacak. Batch boyutu 10 yorum, exponential backoff ile yeniden deneme. |
| **2** | Fine-tune edilmiş DistilBERT modelinin sahte yorumları yeterince iyi ayırt edememesi (doğruluk <%75). | Yüksek | Hibrit yaklaşım: Gemini ile ikinci bir kontrol katmanı eklenir. Ayrıca veri artırma (data augmentation) ile eğitim seti zenginleştirilir. |
| **3** | Stripe Radar sandbox’ının risk skoru üretmemesi veya tutarsız değerler vermesi. | Orta | Alternatif olarak mock risk skoru üreten bir modül yazılır veya işlem bazlı basit kurallar (yüksek tutar, sık iptal) kullanılır. |
| **4** | 5 gün içinde tüm entegrasyonların tamamlanamaması (zaman baskısı). | Yüksek | MVP kapsamında gemini-distilbert birlikteliği sadece yorum tespitinde kullanılır; RAG katmanı ikinci plana alınıp basit bir SQL sorgusu ile değiştirilebilir. |
| **5** | Gemini API’nin prompt çıktısının istenen JSON formatından sapması. | Orta | Yanıt doğrulama (validation) yapılır, hatalı formatta cevaplar tekrar istenir (max 2 deneme). Ayrıca response_mime_type="application/json" parametresi kullanılır. |
| **6** | Kullanıcı testlerinde chatbot’un yanlış veya zararlı tavsiye vermesi. | Yüksek | Tüm chatbot yanıtları bir “insan onaylı” bilgi tabanıyla çapraz kontrol edilir; yalnızca düşük güvenli cevaplar gösterilir. |
| **7** | Satıcı pasifleştirme işleminin yanlışlıkla güvenilir bir satıcıya uygulanması. | Yüksek | Yönetici panelinde “Pasif Et” butonuna ek olarak “İncele” modu getirilir; skor >85 ise otomatik pasif, 65-85 arası ise manuel onay istenir. |

**Sonuç ve Değerlendirme**

- **Müşteri Deneyimi:** Alışveriş anında uyarı almak, dolandırıcılık mağduriyetini ciddi oranda azaltır. Chatbot desteği ise güven sorunlarını anlık çözerek sepette terk oranını düşürebilir.
- **Yönetici Verimliliği:** Otomatik risk skorlaması ve alarmlar sayesinde e-ticaret ekibi, binlerce satıcı arasından şüphelileri dakikalar içinde tespit edebilir. Pasifleştirme aksiyonunun tek tıkla yapılması operasyonel yükü hafifletir.
- **Finansal Kazanım:** Sahte satıcı ve dolandırıcılık işlemlerinin erken engellenmesi, platformun chargeback oranını düşürecek ve ödeme servis sağlayıcılarıyla ilişkileri iyileştirecektir.

**Geliştirme Sonrası Değerlendirme Metrikleri**

Proje tamamlandığında aşağıdaki başarı kriterleri kontrol edilmelidir:

| **Metrik** | **Hedef** |
| --- | --- |
| Sahte yorum F1 skoru | ≥ 0.85 |
| Ortalama yorum analiz süresi (ms) | < 2000 ms |
| Chatbot yanıt doğruluğu (manuel test) | ≥ %90 |
| Yönetici panelinde aksiyon süresi (tıklama → pasif) | < 5 sn |
| Hiçbir temiz satıcının yanlışlıkla pasif edilmemesi | 0 hata |

  
Bu metriklerin test senaryoları ile ölçülerek raporlanması, projenin başarısını somut olarak ortaya koyacaktır.

**Genel Değerlendirme Puanı: 8.5/10**

- **Artıları:** Hızlı kazanım, düşük maliyetli API’ler, sağlam hibrit mimari, net hedefler.
- **Eksileri:** Gerçek zamanlı büyük veri işleme için tasarlanmamıştır; RAG katmanı düşük veri için sınırlıdır; Stripe Radar sandbox’ın risk skoru üretmesi bazen tutarsız olabilir.
- **Öneri:** Üretime alınmadan önce gerçek bir e-ticaret platformundan anonimleştirilmiş 1 haftalık veri ile test yapılması ve Stripe canlı moda geçilmeden önce yasal uyumluluk (GDPR/KVKK) gözden geçirilmesi önerilir.

**Sonuç olarak,** bu proje dokümanında belirtilen amaç, kapsam ve hedefler doğrultusunda geliştirilecek düşük çaplı veride e-ticaret platformları için **yüksek etkili, uygulanabilir ve ölçülebilir** bir dolandırıcılık önleme çözümü sunacaktır.
