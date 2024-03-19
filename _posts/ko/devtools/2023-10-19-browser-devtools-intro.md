---
layout: post
title:  "브라우저 개발자도구(devtools)가 무엇일까?"
permalink: /ko/:categories/intro
date:  2023-10-19 21:14:15
categories: devtools
excerpt: 이번 포스팅에서는 프론트엔드 개발의 필수인 브라우저 개발자도구(devtools) 를 소개하고 개발자도구(devtools)를 여는 방법에 대해 간단하게 소개합니다.
thumbnail: /devtools/Microsoft_Edge_Dev_Icon.png
---


## 개발자도구란?

개발자 도구는 브라우저에 의해 렌더링된 웹 페이지 옆에 보여지는 웹 개발에 필요한 도구들의 집합입니다.
개발자도구는 웹 어플리케이션 및 웹 페이지의 디버그 및 점검등의 강력한 기능을 제공합니다.

개발자 도구를 통해 다음을 수행할 수 있습니다.

* 시각적 인터페이스가 있는 라이브 도구를 사용하여 웹 페이지의 요소 스타일을 검사, 조정 및 변경합니다. 브라우저가 웹 페이지를 구성하기 위해 콘텐츠를 저장한 위치(예: .html, .css, .js 및 .png 파일 형식을 검사합니다.

* 웹 사이트가 다양한 장치에서 작동하는 방식을 에뮬레이션하고 다양한 네트워크 조건으로 완성된 모바일 환경을 시뮬레이션합니다. 네트워크 트래픽을 검사하고 문제의 위치를 확인합니다.

* 중단점 디버깅 및 라이브 콘솔을 사용하여 JavaScript를 디버그합니다. 웹앱에서 메모리 문제 및 렌더링 문제를 찾습니다.

* 제품에서 접근성, 성능, 호환성 및 보안 문제를 찾고 DevTools를 사용하여 발견된 접근성 문제를 해결합니다.

* 개발 환경을 사용하여 DevTools의 변경 사항을 파일 시스템 및 웹에서 동기화합니다.


## 개발자도구 열기

| Action   |      	Resulting tool      |
|----------|:-------------:|
| 웹 페이지 내의 이미지나 텍스트 등의 특정요소를 오른쪽 클릭 후 검사 및 Inspect 클릭 |  우클릭된 페이지 요소를 보여주기위한 확장된 DOM 트리 요소와 함께 요소툴이 열립니다. |
| Press Ctrl+Shift+I (Windows, Linux) or Command+Option+I (macOS). |    이전에 사용한 도구 또는 시작 도구.   |
| Press F12. | 	이전에 사용한 도구 또는 시작 도구. |


### 추가적 기능


| Action   |      	Resulting tool      |
|----------|:-------------:|
| On the Microsoft Edge toolbar, select Settings and more (The 'Settings and more' icon) > More tools > Developer tools. |  이전에 사용한 도구 또는 시작 도구. |
| Press Ctrl+Shift+J (Windows, Linux) or Command+Option+J (macOS). |    콘솔창   |
| Press Ctrl+Shift+C (Windows, Linux) or Command+Option+C (macOS). | 	<body> 요소를 표시하기 위해 확장된 DOM 트리가 있는 요소 도구. |
| Press Shift+F10 to open the right-click menu. To select the Inspect command, press Up Arrow and then Enter. | <html> 요소를 표시하기 위해 확장된 DOM 트리가 있는 요소 도구. |
| Press Tab or Shift+Tab to put focus on a page element. Then press Shift+F10 to open the right-click menu. To select the Inspect command, press Up Arrow and then Enter. | 포커스 되어진 페이지 요소를 보여주기위해 확장된 DOM 트리가 있는 요소 도구. |

<div class="divide-line"></div>

### 오른쪽 클릭으로 개발자 도구를 여는 방법


![Open Devtools used to right click!](/assets/img/devtools/open_devtools_rightclick1.png)

이 방법은 가장 간단하고 좋은 방법중 하나입니다.

![Open Devtools used to right click!](/assets/img/devtools/open_devtools_rightclick2.png)

DevTools가 열리며, Elements 도구의 DOM 트리에서 오른쪽 클릭된 요소가 강조 표시됩니다.

<div class="divide-line"></div>

### 브라우저 툴바를 사용하여 개발자 도구를 여는 방법

![Open Devtools used to right click!](/assets/img/devtools/open_devtools_browsertoolbar1.png)

브라우저 툴바에서 ... 버튼 (설정 및 기타) 을 클릭 > 기타도구 > 개발자 도구를 클릭합니다.