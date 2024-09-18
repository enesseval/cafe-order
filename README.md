# Café Order Application

## Proje Açıklaması

Café Order Application, bir kafe için siparişlerin yönetilmesini sağlayan modern bir web uygulamasıdır. Uygulama, garsonlar, mutfak personeli ve yöneticiler için çeşitli özellikler sunar ve kullanıcıların siparişleri kolayca oluşturup yönetmelerine olanak tanır. Ayrıca, uygulama responsive tasarımı ile farklı ekran boyutlarına uyum sağlar ve mobil cihazlarda da mükemmel bir kullanıcı deneyimi sunar.

## Özellikler

-  Menu Yönetimi: Menü öğeleri ekleme, düzenleme ve silme.
-  Sipariş Oluşturma: Müşteriler siparişlerini uygulama üzerinden kolayca oluşturabilir.
-  Sipariş İzleme: Mutfak personeli, gelen siparişleri görüntüleyebilir ve sipariş durumlarını güncelleyebilir.
-  Kullanıcı Yönetimi: Admin paneli aracılığıyla kullanıcı hesaplarını yönetme.
-  Ödeme Entegrasyonu: Iyzico ile ödeme entegrasyonu, ödemelerin güvenli bir şekilde işlenmesini sağlar.
-  Kullanıcı Kimlik Doğrulama: Clerk ile kullanıcı kimlik doğrulama ve yetkilendirme.

## Teknolojiler

-  Frontend: Next.js, TypeScript, React
-  Backend: GraphQL (Hasura), JavaScript
-  Ödeme: Iyzico
-  Kimlik Doğrulama: Clerk

# Kurulum

## Gereksinimler

-  Node.js
-  yarn yada npm

## Frontend

1. Bu repository'i klonlayın

```
git clone https://github.com/enesseval/cafe-order
```

2. Proje dizinine gidin:

```
cd cafe-order-application
```

3. Bağımlılıkları yükleyin:

```
yarn dev
# veya
npm run dev
```

## Backend

1. Proje dizinine gidin:

```
cd /api
```

2. Bağımlılıkları yükleyin:

```
yarn dev
# veya
npm run dev
```

3. Gerekli çevre değişkenlerini belirterek .env dosyasını oluşturun.

# Ekran Görüntüleri

## Menü

![Menü](https://github.com/enesseval/cafe-order/blob/master/public/screenshots/menu.png)

## Sepet

![Menü](https://github.com/enesseval/cafe-order/blob/master/public/screenshots/sepet.png)

## Ödeme

![Menü](https://github.com/enesseval/cafe-order/blob/master/public/screenshots/siparis.png)

## Mutfak

![Menü](https://github.com/enesseval/cafe-order/blob/master/public/screenshots/mutfak.png)

## Garson

![Menü](https://github.com/enesseval/cafe-order/blob/master/public/screenshots/garson.png)

## Admin

![Menü](https://github.com/enesseval/cafe-order/blob/master/public/screenshots/dashbooard.png)
