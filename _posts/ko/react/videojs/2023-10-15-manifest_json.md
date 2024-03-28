---
layout: post
title:  "VideoJS에서 Uncaught ReferenceError: X is not defined 에러메시지 발생"
permalink: /ko/:categories/videojs/reference-error
date:  2024-03-27 20:14:15
categories: react
excerpt: videojs 에서 Uncaught ReferenceError X is not defined 라는 로그가 나타나면서 영상이 재생이 되지않는 문제의 해결법입니다..
thumbnail: /react/videojs/videojs-logo.jpg
image: /assets/img/react/videojs/videojs-logo.jpg
author: tsukemendog
locale: ko_KR
tags: React,Videojs,ReferenceError
---

## 문제의 원인

![Uncaught ReferenceError: X is not defined Error Logs](/assets/img/react/videojs/noreferrer.jpg)

local 개발환경에서는 원격 CloudFront 서버에서 호스팅되는 스트리밍 영상이 잘 재생되지만

EC2 배포환경에서는 갑자기 재생이 안되었습니다.

개발자도구를 열어 로그메시지를 확인해보니 **Uncaught ReferenceError: _ is not defined Error Logs** 관련 메시지가 나타나면서 재생이 되지 않았습니다.

혹시나 CORS 문제인가 다시 점검도 해보았지만 다른 온라인 스트리밍 테스트사이트에서는 재생이 잘 되는걸보아 CORS 문제는 아니었고..

애시당초 CORS 문제였으면 콘솔창에서도 CORS 메시지가 나타나야 헀습니다..

<div class="divide-line"></div>

## 문제의 해결

![Resolution Uncaught ReferenceError: X is not defined Error](/assets/img/react/videojs/resolution-noreferrer.jpg)

열심히 구글링해서 알아보니 해당 **[Videojs Issue 페이지](https://github.com/videojs/video.js/issues/8170)** 에서 위와같은 답변을 얻게되었습니다.

해당 질문자분은 **Videojs 8** 버전을 사용하고 있었고 저 역시 8버전을 사용하고 있었습니다.


![solving playing hls video](/assets/img/react/videojs/solve-videojs-hls.jpg)

가장 심플한 해결책으로써 **버전을 바꾸었다**. 라고 해결책을 말해주었는데 그 말대로 7버전으로 내렸더니 실제로 동작이 잘됩니다.

로컬환경에서는 재생이 되고 배포환경에서는 위와 같은 에러로 동작하지 않는 원인은 아직까지 밝혀지진 않았지만 버그일 가능성이 크다봅니다.

video.js 도 오픈소스이고 계속해서 발전중이니만큼.. 오픈소스를 이용하려면 그에 따른 버전별 버그의 문제점을 간파하는 것도 중요하단걸 깨달았던 하루였습니다..

<br>
<div class="divide-line"></div>





