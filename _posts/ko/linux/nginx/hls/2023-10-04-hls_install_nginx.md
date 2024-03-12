---
layout: post
title:  "HLS 스트리밍을 위한 Nginx 컴파일 설치하기"
permalink: /ko/:categories/install-nginx-compile
date:  2023-11-15 22:04:15
categories: linux nginx hls
excerpt:  Nginx를 컴파일 설치하는 과정을 설명하며, HLS 스트리밍을 위해 필요한 nginx-rtmp-module 확장 모듈을 추가하는 방법을 제공합니다. 필요한 종속성 설치부터 Nginx 및 모듈의 컴파일과 설치까지의 단계를 상세히 다룹니다.
thumbnail: /linux/nginx/hls/hls_thumbnail_01.jpg
---


![HLS Thumbnail Image](/assets/img/linux/nginx/hls/hls_thumbnail_01.jpg)

## 왜 Nginx 를 일반설치가 아닌 컴파일 설치를 하여야 하는가?

Nginx 에서 HLS 스트리밍을 하기 위해서는 **nginx-rtmp-module** 이라는 확장모듈이 필요합니다.

Nginx 는 크게 유료버젼인 Nginx+ 와 무료버젼인 Nginx 로 나뉩니다. 유료버젼 사용자는 확장모듈 설치가 아주 간편합니다.

반면 Nginx의 무료 버전 사용자가 nginx-rtmp-module과 같은 확장 모듈을 사용하려면, 일반적인 패키지 관리자를 통한 설치가 아닌, Nginx를 소스 코드로부터 직접 컴파일하는 과정을 거쳐야 합니다. 

이 과정은 모듈을 Nginx에 통합하고 필요한 설정을 할 수 있게 해줍니다.


1. **필요한 종속성 설치**: Nginx와 RTMP 모듈을 컴파일하기 위해 필요한 라이브러리와 도구들을 설치합니다.
2. **Nginx 소스 코드 다운로드**: Nginx의 공식 웹사이트나 소스 저장소에서 소스 코드를 다운로드합니다.
3. **nginx-rtmp-module 다운로드**: RTMP 모듈의 소스 코드도 마찬가지로 다운로드합니다.
4. **Nginx 컴파일**: 다운로드한 Nginx 소스 코드를 압축 해제한 후, ./configure 스크립트를 실행하면서 --add-module 옵션을 사용해 RTMP 모듈의 경로를 지정합니다. 그 후, make 및 make install 명령어를 사용하여 Nginx를 컴파일하고 설치합니다.

<br>


이 과정은 시스템마다 다소 차이가 있을 수 있으며, 정확한 명령어나 단계는 사용하고 있는 운영 체제, Nginx의 버전, 그리고 필요한 기능에 따라 달라질 수 있습니다. 따라서 Nginx와 [nginx-rtmp-module의 공식 문서](https://github.com/arut/nginx-rtmp-module)를 참고하는 것이 좋습니다.

<div class="divide-line"></div>

## Nginx 컴파일 설치하기

우선 설치전에 필요한 사전 준비작업이 필요합니다
컴파일 설치란 말 그대로 소스코드를 컴파일해서 설치하는 것이기 때문에 빌드 도구가 필요합니다.

```bash
$ sudo apt install build-essential
```

nginx 소스코드를 컴파일하기 위해 필요한 gcc 나 gnu 필수 빌드도구들을
모두 **build-essential** 을 통해 모두 설치할 수 있습니다.

### Nginx 소스코드를 컴파일하기 위해 필요한 필수 라이브러리

<br>

Nginx 소스코드를 컴파일하기 위해서는 밑의 3가지 라이브러리가 필수적으로 설치되어져 있어야 합니다.

1. PCRE
2. Zlib
3. OpenSSL

```bash
$ mkdir ~/hls-nginx
$ cd ~hls-nginx
```
우선 라이브러리 및 모듈을 한 곳에 모아둘 디렉토리를 생성합니다.


#### PCRE 설치

```bash
$ wget github.com/PCRE2Project/pcre2/releases/download/pcre2-10.42/pcre2-10.42.tar.gz
$ tar -zxf pcre2-10.42.tar.gz
$ cd pcre2-10.42
$ ./configure
$ make
$ sudo make install
```

#### Zlib 설치

```bash
$ wget http://zlib.net/zlib-1.3.tar.gz
$ tar -zxf zlib-1.3.tar.gz
$ cd zlib-1.3
$ ./configure
$ make
$ sudo make install
```

#### OpenSSL 설치

```bash
$ wget http://www.openssl.org/source/openssl-1.1.1v.tar.gz
$ tar -zxf openssl-1.1.1v.tar.gz
$ cd openssl-1.1.1v
$ ./Configure linux-x86_64 --prefix=/usr 
$ make
$ sudo make install
```

#### 에러메시지 발생시

```bash
$ ./Configure LIST | grep linux  //에러메시지가 나타날 경우에만
```

만일 위의 ./Configure 명령어를 실행할 때 에러메시지가 출력한다면 해당 명령어를 입력하여

자신의 운영체제가 맞는 설정을 확인해봅니다.

<div class="divide-line"></div>

### nginx-rtmp-module 모듈 다운로드

```bash
$ git clone https://github.com/arut/nginx-rtmp-module.git
```

nginx-rtmp-module 소스코드를 다운로드 합니다.


### Nginx 소스코드 다운로드 및 최종 컴파일 설정

```bash
$ wget https://nginx.org/download/nginx-1.24.0.tar.gz
$ tar zxf nginx-1.24.0.tar.gz
$ cd nginx-1.24.0
$ sudo ./configure 
  --with-zlib=../zlib-1.3  //디렉토리에 한데 모아놓으면 경로 입력시 아주 편합니다
  --with-pcre=../pcre2-10.42 
  --with-openssl=../openssl-1.1.1v 
  --with-http_ssl_module // 해당 옵션은 ssl 모듈 설정을 활성화 시킵니다
  --add-module=../nginx-rtmp-module  //내가 설치한 모듈의 소스코드 경로를 기입합니다

```

해당 명령어를 입력하면 밑의 이미지와 같은 메시지들이 나타날 것입니다.


![Configure complete message before compile nginx](/assets/img/linux/nginx/hls/log_configured_compile.jpg)

**nginx path prefix** 는 **/usr/local/nginx** 라는 경로가 prefix 로 기본설정 되었으며 나머지 설정파일이나 바이너리 등등이 해당 prefix 경로 뒤에 설정되었다며 알려줍니다.



### 컴파일하기


```bash
$ sudo make
```

해당 명령어를 입력하면 수많은 로그가 나타나면서 컴파일을 실행하는데 약 1분 이상의 시간이 소요됩니다.


### 최종 설치하기

```bash
$ sudo make install
```

해당 명령어는 위의 make 명령어로 컴파일 되어진 설치파일로 최종 설치를 진행하는 명령어입니다.
<br>
별 다른 에러메시지가 발생하지 않는다면 설치는 완료되었습니다.


```bash
$ sudo /usr/local/nginx/sbin/nginx  //Nginx 서버를 실행합니다.
$ ps aux | grep nginx  //현재 진행중 프로세스를 확인합니다.
```

sudo /usr/local/nginx/sbin/nginx 가 아닌 **systemctl** 등으로 실행시키고 싶다면 추후 전역실행설정을 하시면 됩니다.