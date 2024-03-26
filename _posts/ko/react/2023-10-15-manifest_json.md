---
layout: post
title:  "웹 앱 매니페스트란 무엇인가?"
permalink: /ko/:categories/manifestjson
date:  2023-10-15 21:14:15
categories: react
excerpt: 웹 매니페스트(manifest.json) 파일은 웹 애플리케이션이나 웹사이트를 사용자의 데스크탑이나 모바일 홈 화면에 "앱처럼" 추가할 수 있게 해주는 JSON 파일입니다. 이 파일은 웹 애플리케이션에 대한 메타데이터를 제공하며, 애플리케이션의 이름, 시작 URL, 아이콘, 배경 색상, 표시 방식 등을 정의할 수 있습니다. 이를 통해 웹 애플리케이션이 네이티브 앱처럼 보이고 느껴질 수 있게 도와줍니다.
thumbnail: /react/webmanifest_thumbnail.webp
image: /assets/img/react/webmanifest_thumbnail.webp
author: tsukemendog
locale: ko_KR
tags: React,manifestjson
---

## 개요

> 웹 매니페스트(manifest.json) 파일은 웹 애플리케이션이나 웹사이트를 사용자의 데스크탑이나 모바일 홈 화면에 "앱처럼" 추가할 수 있게 해주는 JSON 파일입니다. 이 파일은 웹 애플리케이션에 대한 메타데이터를 제공하며, 애플리케이션의 이름, 시작 URL, 아이콘, 배경 색상, 표시 방식 등을 정의할 수 있습니다. 이를 통해 웹 애플리케이션이 네이티브 앱처럼 보이고 느껴질 수 있게 도와줍니다.


## 주요 속성:

* name: 애플리케이션의 이름입니다.
* short_name: 홈 화면에 표시될 때 사용되는 애플리케이션의 짧은 이름입니다.
* start_url: 애플리케이션이 시작될 때 열리는 URL입니다. 이 URL은 애플리케이션의 진입점 역할을 합니다.
* display: 애플리케이션 화면이 어떻게 표시될지 결정합니다. 예를 들어, fullscreen, standalone, minimal-ui 등이 있습니다.
* background_color: 애플리케이션 시작 화면의 배경 색상입니다.
* description: 애플리케이션에 대한 설명입니다.
* icons: 다양한 크기의 애플리케이션 아이콘을 정의할 수 있습니다. 이 아이콘은 홈 화면에 추가될 때나 애플리케이션 스위처에서 사용됩니다.
* theme_color: 상태 바나 네비게이션 바의 색상을 지정합니다.


## 페이지에 웹 앱 매니페스트 추가

```html
<link rel="manifest" href="/manifest.json">
```

웹 매니페스트 파일은 웹 애플리케이션의 루트 디렉토리에 위치하며, HTML 문서의 <head> 섹션에 링크로 추가되어야 합니다.

브라우저는 이 파일을 읽고 애플리케이션을 사용자의 장치에 "앱처럼" 추가하는 데 필요한 정보를 얻을 수 있습니다. 이 기능은 특히 프로그레시브 웹 앱(PWA)을 구축할 때 중요합니다.


## 웹 앱 매니페스트의 작성예시


```json
{
  "name": "Example App",
  "short_name": "App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "description": "An example Progressive Web App",
  "icons": [
    {
      "src": "images/icon-48x48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "images/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "images/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "images/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "images/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "images/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#4A90E2"
}

```


### 설명:
* **name**: "Example App" - 애플리케이션의 전체 이름입니다.
* **short_name**: "App" - 홈 화면에 표시될 때 사용되는 애플리케이션의 짧은 이름입니다. 공간이 제한적인 경우 사용됩니다.
* **start_url**: "/" - 애플리케이션이 시작될 때 사용자를 이동시킬 웹 페이지의 경로입니다. 여기서는 루트 디렉토리를 가리킵니다.
* **display**: "standalone" - 애플리케이션이 스탠드얼론 모드로 실행될 것임을 의미합니다. 즉, 브라우저 UI 없이 전체 화면으로 앱이 실행됩니다.

  - **fullscreen** :	브라우저 UI 없이 웹 앱을 열고 사용 가능한 디스플레이 영역을 모두 차지합니다.
  - **standalone** :	웹 앱을 열어 독립형 앱처럼 보이도록 합니다. 앱은 브라우저와 분리된 자체 창에서 실행되며 주소 표시줄과 같은 표준 브라우저 UI 요소를 숨깁니다.
  - **minimal-ui** : 	이 모드는 standalone와 유사하지만 뒤로 및 새로고침 버튼과 같은 탐색을 제어하기 위한 최소한의 UI 요소 집합을 사용자에게 제공합니다.
  - **browser** : 표준 브라우저 환경입니다.

<br>

* **background_color**: "#ffffff" - 애플리케이션의 시작 화면에서 사용될 배경 색상입니다.
* **description**: "An example Progressive Web App" - 애플리케이션에 대한 간단한 설명입니다.
* **icons**: 다양한 크기의 애플리케이션 아이콘들의 배열입니다. 각 아이콘은 src로 경로, sizes로 크기, 그리고 type으로 MIME 타입을 지정합니다. (추후 밑에서 상세히 설명하겠습니다.)
* **theme_color**: "#4A90E2" - 애플리케이션의 테마 색상입니다. 이 색상은 브라우저의 주소창 등에서 사용될 수 있습니다.


이 예시는 매우 기본적인 형태의 매니페스트 파일입니다. 필요에 따라 다양한 속성을 추가하거나 조정할 수 있으며, 이를 통해 웹 애플리케이션의 "앱처럼" 보이는 정도를 세밀하게 조정할 수 있습니다.


#### icons 속성의 주요 구성 요소

> icons 속성은 웹 매니페스트 파일(manifest.json)에서 중요한 역할을 합니다. 이 속성은 웹 애플리케이션의 아이콘들을 정의하는데 사용되며, 다양한 상황과 환경에서 애플리케이션을 대표하는 그래픽을 제공합니다. 아이콘들은 사용자의 홈 화면, 작업 관리자, 알림, 애플리케이션 설정 등 다양한 곳에서 사용됩니다.


* **src** : 아이콘의 파일 경로를 나타냅니다. 상대 경로 또는 절대 경로가 될 수 있습니다.
* **sizes** : 아이콘의 크기를 나타냅니다. 여기서 크기는 너비와 높이를 '너비x높이' 형식으로 표현하며, 단위는 픽셀입니다. 하나의 아이콘에 여러 크기를 정의할 수 있으며, 각 크기는 공백으로 구분됩니다.
* **type** : 아이콘 파일의 MIME 타입을 나타냅니다. 예를 들어, PNG 이미지의 경우 image/png가 됩니다. 이 정보는 브라우저가 아이콘 파일을 올바르게 처리하는 데 도움을 줍니다.


```json
"icons": [
  {
    "src": "icon/lowres.webp",
    "sizes": "48x48",
    "type": "image/webp"
  },
  {
    "src": "icon/hd_highres.png",
    "sizes": "72x72 96x96 128x128 256x256",
    "type": "image/png"
  },
  {
    "src": "icon/hd_highres.webp",
    "sizes": "72x72 96x96 128x128 256x256",
    "type": "image/webp"
  }
]


```

이 예시에서는 세 가지 아이콘을 정의하고 있습니다. 첫 번째는 48x48 크기의 웹피(WebP) 이미지, 두 번째와 세 번째는 다양한 크기를 지원하는 PNG와 WebP 이미지입니다. 이렇게 다양한 크기와 형식의 아이콘을 제공함으로써, 애플리케이션이 다양한 장치와 상황에서 최적의 아이콘을 사용할 수 있게 됩니다.


##### 중요한 고려 사항:

* **크기 다양성** : 다양한 화면 해상도와 장치를 고려하여 여러 크기의 아이콘을 제공하는 것이 좋습니다.
* **플랫폼 지원**: 사용자의 운영 체제나 브라우저에 따라 특정 형식이나 크기의 아이콘이 더 잘 지원될 수 있습니다. 따라서, 광범위한 호환성을 위해 다양한 형식과 크기를 포함하는 것이 유용합니다.
* **품질과 최적화**: 아이콘 이미지는 고품질이면서도 파일 크기는 최소화되어야 합니다. 이는 로딩 시간에 영향을 미칠 수 있기 때문입니다.

**icons** 속성을 효과적으로 사용하면 사용자 경험을 향상시키고, 애플리케이션의 브랜딩과 인지도를 높이는 데 기여할 수 있습니다.

<div class="divide-line"></div>

## 매니페스트 테스트

> 브라우저에서 F12 버튼을 클릭하여 개발자도구를 열고 Application 패널을 클릭하시면 하위메뉴에 Manifest 탭이 있습니다. 

![HLS Thumbnail Image](/assets/img/react/manifest_json_test.jpg)

이 창에서는 많은 매니페스트 속성의 사람이 읽을 수 있는 버전을 제공하며 이를 통해 모든 이미지가 제대로 로드되고 있는지 확인할 수 있습니다.


<div class="divide-line"></div>

## 스플래시 화면

앱이 모바일에서 처음 실행되면 브라우저가 시작되고 초기 콘텐츠가 렌더링을 시작하는 데 잠시 시간이 걸릴 수 있습니다. 사용자가 앱이 작동하지 않는다고 생각할 수 있는 흰색 화면을 표시하는 대신 브라우저에서 첫 번째 페인트까지 스플래시 화면을 표시합니다.

Chrome은 매니페스트에 지정된 name, background_color, icons에서 자동으로 스플래시 화면을 만듭니다. 스플래시 화면에서 앱으로 원활하게 전환하려면 로드 페이지와 동일한 색상을 background_color로 지정합니다.

Chrome은 스플래시 화면의 기기 해상도와 가장 근접하게 일치하는 아이콘을 선택합니다. 대부분의 경우 192px 및 512px 아이콘을 제공하는 것으로 충분하지만 더 정확하게 일치시키기 위해 추가 아이콘을 제공할 수도 있습니다.


참조문서 : [web.dev 문서](https://web.dev/articles/add-manifest?hl=ko)