**ŞÜPHELİ İŞLEM VE SAHTE SATICI TESPİTİ PROJESİ**
 - Platformumuz, gelişmiş makine öğrenmesi algoritmaları ile online pazaryerlerini saniyeler içinde daha güvenli hale getirir.

  - Demo Web Sayfası: (FRAUD DEDECTOR) [https://frauddetectorv1.vercel.app/]
       
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
