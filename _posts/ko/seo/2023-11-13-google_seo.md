---
layout: post
title:  "구글 웹 마스터 도구 (Google Search Console) 에서 색인(Index) 삭제 하는 방법"
permalink: /ko/:categories/removal
date:  2023-11-13 21:14:15
categories: seo google
excerpt: 구글 웹 마스터 도구는 구글봇이 페이지를 색인할 수 있도록 도와주는 온라인 도구입니다. 원하는 페이지를 색인신청한다면 반대로 삭제도 할 수 있습니다. 웹 마스터 도구에서 색인을 삭제 하는 방법을 설명하겠습니다.
thumbnail: /seo/google-bot.png
image: /assets/img/seo/google-bot.png
author: tsukemendog
locale: ko_KR
tags: SEO,구글색인,googleindex,색인삭제
---

## 웹 마스터 도구 접속


구글 웹 마스터 도구 (Google Search Console)에서는 검색결과에서 URL을 삭제하고 Google에 해당 URL을 다시 색인화하도록 요청할 수 있습니다. 방법은 다음과 같습니다.

![Removal Button in Navbar Google Search Console](/assets/img/seo/removal-search-console-navbar.jpg)

1. 구글 웹 마스터 도구 (Google Search Console)에 로그인합니다.

2. 제거 및 재색인 생성을 요청하려는 속성(웹사이트)을 선택하세요.

3. 왼쪽 메뉴에서 'Removals'를 클릭하세요.


<div class="divide-line"></div>

## 삭제요청 버튼 클릭

![New Request Page Button](/assets/img/seo/request-button-removeurl.jpg)

1. 'Temporary Removals' 섹션에서 'New Request'을 클릭하세요.

<div class="divide-line"></div>

## 삭제하려는 URL 입력

![Enter Remove URL in modal](/assets/img/seo/removalurl-request_modal.jpg)

1.  검색결과에서 삭제하려는 페이지의 URL을 입력하고 'Next'를 클릭하세요.  (저는 특정 URI 뿐만 아닌 모든 URL 색인을 차단하도록 하겠습니다.)

2. 적절한 제거 방법을 선택하십시오: "Remove page from search results and cache" 또는 "Remove directory". 여러분의 필요에 맞는 옵션을 선택하고 "Next"를 클릭하십시오.

> Temporarily remove 는 6개월간 임시적으로 색인을 중지하는 요청일 뿐입니다. 구글 검색결과에 영원히 표시되지 않는건 아닙니다.
지속적으로 색인을 지우시고 싶으시면 robots.txt 나 서버에서 페이지 제거등으로 구글봇이 색인할 수 없도록 조치하는 것이 좋습니다.

<div class="divide-line"></div>

## 최종적으로 제출

![Enter Submit Request Button](/assets/img/seo/submit-request-popup.jpg)

최종적으로 "Submit Request" 버튼을 클릭합니다.

> 추가로 시간은 요청이 최종적으로 처리되기까지는 하루정도의 시간이 소요됩니다.

<div class="divide-line"></div>

## 구글검색결과에서 페이지 제거완료

![Complete Remove Page](/assets/img/seo/completed-remove-page.jpg)

![Complete Remove Page](/assets/img/seo/after-searchview-removetemporary-searchconsole.jpg)

최종적으로 구글 검색결과에서 삭제요청에 대한 모든 페이지 색인이 삭제된 것을 확인할 수 있습니다.


## 삭제된 색인을 다시 재색인 요청하는 방법

구글 웹 마스터도구 (Google Search Console) 에서 Removals 페이지에 들어가 삭제 요청을 다시 취소하시면 되겠습니다.

이것 역시 재색인이 되기까지 시간이 걸릴 것으로 추측됩니다.

<div class="divide-line"></div>

본 포스팅은 해당 [참조 문서](https://www.quora.com/If-I-request-to-remove-a-URL-in-the-Google-Search-console-can-I-ask-it-to-re-index-it-also-If-yes-then-how)를 참조 하였습니다.