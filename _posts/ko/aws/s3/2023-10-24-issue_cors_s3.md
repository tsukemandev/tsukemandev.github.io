---
layout: post
title:  "AWS S3 CORS 문제로 인해 Cloud Front 리소스 차단문제 해결방법"
permalink: /ko/:categories/cors
date:  2023-10-24 22:31:15
categories: aws s3 cloudfront issue
excerpt: CORS(Cross-Origin Resource Sharing)는 다른 Origin에서 실행 중인 웹 애플리케이션이 현재 Origin의 리소스에 접근할 수 있도록 허용하는 메커니즘입니다. 웹은 기본적으로 '동일 출처 정책'(Same-Origin Policy)을 따르기 때문에, 다른 Origin의 리소스를 불러오는 것은 제한되어 있어요. S3에서 해당 정책을 변경해보겠습니다.
thumbnail: /aws/s3/amazon-s3-logo.svg
---


## Cloud Front 에서 CORS 문제

![Video JS Error Image](/assets/img/aws/s3/cors-error-videojs.jpg)

HLS 영상파일을 S3에 배포한 이후 Cloud Front 로 배포하고 Video.js 로 테스트 해보니 영상이 재생이 되질 않았습니다..

![Video JS Error Image](/assets/img/aws/s3/cors-error-videojs2.jpg)

브라우저 개발자 도구를 실행하여 console 을 확인해 본 결과 위와 같이 CORS 에러메시지가 나타났습니다.

> **CORS(Cross-Origin Resource Sharing**)는 다른 Origin에서 실행 중인 웹 애플리케이션이 현재 Origin의 리소스에 접근할 수 있도록 허용하는 메커니즘입니다. 웹은 기본적으로 '동일 출처 정책'(Same-Origin Policy)을 따르기 때문에, 다른 Origin의 리소스를 불러오는 것은 제한되어 있어요. 예를 들어, http://www.example.com에서 실행 중인 웹 애플리케이션이 http://www.another-site.com의 이미지나 API를 불러오려 할 때, 기본적으로 이는 허용되지 않습니다. 하지만, CORS 설정을 통해 http://www.another-site.com에서는 http://www.example.com의 요청을 받아들일 수 있도록 할 수 있어요.

<div class="divide-line"></div>

## CORS 문제 원인

브라우저는 기본적으로 **동일 출처 정책(Same-Origin Policy)** 정책으로 동일한 출처(origin) 만 허용하고 그 이외의 출처는 모두 차단합니다.

이를 해결하기 위해서는 리소스를 제공하는 서버에서 응답할 때 **Access-Control-Allow-Origin** 라는 특정 헤더를 포함해야합니다.

**Access-Control-Allow-Origin** 헤더는 리소스를 제공하는 서버가 어떤 **출처(origin)**에서 자신의 리소스에 접근할 수 있는지를 웹 브라우저에 알리는 데 사용되는 HTTP 헤더입니다

예를 들어, 서버가 http://example.com에서만 자신의 리소스에 접근할 수 있도록 허용하려면, Access-Control-Allow-Origin: http://example.com과 같이 설정합니다. 모든 출처에서의 접근을 허용하려면 

**Access-Control-Allow-Origin**: * 으로 설정합니다.

하지만 보안상의 이유로, 필요한 경우에만 특정 출처에 접근을 허용하고, 가능한 한 * 와일드카드의 사용을 피하는 것이 좋습니다.

<div class="divide-line"></div>

## Cloud Front CORS 문제 해결방법

Cloud Front 는 S3 버킷 저장소 내의 리소스를 배포하는 CDN서비스입니다.

결론적으로 Cloud Front 가 아닌 S3 의 CORS 정책을 수정해주면 됩니다.

<div class="divide-line"></div>

### S3 CORS 정책수정

![Edit CORS POLICY FOR S3](/assets/img/aws/s3/s3-permissions.jpg)

1. S3 들어가서 원본 리소스가 저장된 버킷을 클릭합니다.

2. Permissions 를 클릭합니다.

![Edit CORS POLICY FOR S3](/assets/img/aws/s3/s3-cors-editbutton.jpg)

밑으로 스크롤 해보시면 CORS 정책설정화면이 보일겁니다.

* **Edit** 버튼을 클릭합니다.

![Edit CORS POLICY FOR S3](/assets/img/aws/s3/s3-cors-edit.jpg)

1. 밑의 정책을 복사붙여넣기합니다.

2. 저장버튼을 클릭합니다.

```json

[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    },
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    },
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]

```

>  **위 예시는 테스트 버킷에 대한 정책이므로 permitAll 로 설정했을뿐 필요에 따른 정책을 설정하시길 바랍니다.**

위 예시는 [AWS CORS 문서](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/cors.html)를 참조했습니다.

S3의 CORS 정책허용설정을 해주시면 CORS 문제는 해결됩니다.
