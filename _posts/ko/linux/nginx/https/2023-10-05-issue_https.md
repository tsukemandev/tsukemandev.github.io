---
layout: post
title:  "Nginx 웹 서버에 Let's Encrypt 무료 HTTPS 인증서 발급"
permalink: /ko/:categories/issue
date:  2023-10-05 22:04:15
categories: linux nginx https
excerpt: Nginx 서버에 Let's Encrypt를 통해 무료 HTTPS 인증서를 발급받고 설정하는 방법을 단계별로 안내합니다. SSL/TLS 인증서를 통해 웹 사이트의 보안을 강화하는 과정을 설명합니다.
thumbnail: /linux/nginx/https/lets-encrypt-logo.png
---


![Let's Encrypt Logo Image](/assets/img/linux/nginx/https/lets-encrypt-logo.png)

## HTTPS 기본 개념

<div class="divide-line"></div>

### HTTPS
HTTPS(HyperText Transfer Protocol Secure)는 웹에서 안전한 통신을 위해 HTTP에 데이터 암호화를 추가한 프로토콜입니다. 기본적으로 HTTP 통신의 내용을 그대로 전송하는 대신, SSL(Secure Sockets Layer) 또는 TLS(Transport Layer Security) 프로토콜을 사용해 데이터를 암호화하여 전송합니다. 이로 인해 데이터의 기밀성과 무결성이 보장되며, 중간자 공격으로부터 사용자 데이터를 보호할 수 있습니다.

### SSL
SSL(Secure Sockets Layer)은 Netscape에 의해 개발된 웹 상에서 데이터를 암호화하여 전송하는 프로토콜입니다. SSL은 클라이언트와 서버 간의 통신을 암호화함으로써 데이터의 기밀성을 보장하고, 또한 서버 인증 기능을 통해 클라이언트가 실제 의도한 서버와 통신하고 있는지를 확인할 수 있게 합니다. SSL은 1990년대 중반에 처음 등장한 이후 널리 사용되어 왔으나, 현재는 더 안전한 TLS 프로토콜로 대체되었습니다.

### TLS
TLS(Transport Layer Security)는 SSL의 후속 프로토콜로, 보안 통신을 위한 표준 프로토콜입니다. TLS는 SSL과 유사한 방식으로 작동하며, 데이터 암호화, 서버 인증, 메시지 무결성 검사 등의 기능을 제공합니다. TLS는 여러 버전을 거치며 보안성이 강화되었고, 현재는 웹에서 가장 널리 사용되는 보안 프로토콜입니다. HTTPS 통신에도 주로 TLS 프로토콜이 사용됩니다.

### Let's Encrypt
Let'sEncrypt는 무료, 자동, 개방형 인증서 발급 기관(CA)으로, 인터넷의 보안을 강화하기 위해 만들어졌습니다. 사용자가 손쉽게 SSL/TLS 인증서를 발급받아 웹 사이트를 HTTPS로 전환할 수 있도록 돕습니다. Let'sEncrypt는 자동화된 프로세스를 통해 인증서를 발급하고 관리할 수 있게 하여, HTTPS의 보급을 크게 촉진하였습니다. 인증서의 유효 기간은 90일이며, 자동 갱신 기능을 통해 유지 관리의 번거로움을 줄여줍니다.

이러한 각각의 요소들은 웹 상에서의 안전한 통신을 위해 서로 연관되어 작용합니다. HTTPS는 웹의 기본 보안 프로토콜이며, SSL과 TLS는 그 구현을 위한 주요 기술입니다. Let'sEncrypt는 이러한 기술들을 보다 접근하기 쉽게 만들어, 웹의 전반적인 보안 수준을 향상시키는 데 기여하고 있습니다.


<div class="divide-line"></div>

## Nginx 웹 서버에 Let's Encrypt 인증서 발급하기

![Nginx 최초 진입화면](/assets/img/linux/nginx/https/nginx_entry_html.jpg)

Nginx 설치를 끝낸 직후 최초로 요청한 화면입니다.
현재까지 인증서를 발급받지 않아 브라우저에서 경고창을 띄웁니다.

브라우저는 https 가 아닌 http 로의 요청을 보낼 경우 무조건 안전하지 않은 사이트라는 메시지를 보여줍니다.
이는 사용자경험(UX)에도 최악입니다.


### CertBot 설치하기

Certbot 은 Let's Encrypt 인증서를 자동으로 발급/갱신 해주는 **ACME** 클라이언트 입니다.

>**ACME란** : ACME(Automated Certificate Management Environment)는 인터넷 보안 인증서를 자동으로 발급, 갱신, 취소할 수 있는 프로토콜입니다. 이 프로토콜은 특히 Let's Encrypt와 같은 인증 기관(CA)이 인증서의 생명 주기를 자동으로 관리하는 데 사용됩니다. ACME 프로토콜의 주요 목적은 웹 보안의 자동화와 간소화를 통해 SSL/TLS 인증서의 사용을 더욱 쉽게 만드는 것입니다.

certbot 은 각각의 운영체제에 따라 설치방법이 다를수 있으므로 [Certbot 을 설치하는 자세한 가이드는 해당 사이트](https://certbot.eff.org/) 를 참조하시면 됩니다.
각각의 운영체제와 웹 서버에 맞게끔 자세한 가이드가 나와있습니다.

저는 현재 **Ubuntu 20** 으로 서버환경을 세팅하였기에 **Ubuntu 20** 을 기준으로 설명하겠습니다.

```bash
$ sudo apt update
$ sudo apt install snapd
```

certbot 을 설치하기 위해서는 **snap** 이라는 패키지 관리자가 필요합니다.
snap 위 명령어로 snap 을 설치해줍니다.  **( snapd 는 오타가 아닙니다. 그대로 입력해주세요. )**

>certbot 은 무조건 **snap** 으로 설치하여야 합니다! yum, dnf, apt 등의 OS패키지 매니저로 설치하시면 안됩니다..
무슨 이유인지는 모르겠으나 Certbot 사이트에서 그렇게 안내하고 있습니다.


```bash
$ sudo snap install --classic certbot
$ sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

위 명령어로 snap 을 통해서 certbot 을 설치해준뒤 snap 디렉토리에 설치된 certbot 을 전역 /usr/bin/certbot 으로 링크를 설정해줍니다.

```bash
$ sudo certbot --nginx
```

certbot 을 실행해줍니다. 
저는 Nginx 를 사용하기에 **--nginx** 옵션을 사용하였습니다. 옵션은 자신의 웹 서버에 맞게끔 설정합니다.

그럼 각각의 질문에 대해 정보를 입력하시면 됩니다.

<br>

```bash
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Enter email address (used for urgent renewal and security notices)
(Enter 'c' to cancel):   
```

이메일 주소를 입력합니다.


```bash
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.3-September-21-2022.pdf. You must
agree in order to register with the ACME server. Do you agree?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o:

```

Y를 입력하여 동의해줍니다.


```bash
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Would you be willing, once your first certificate is successfully issued, to
share your email address with the Electronic Frontier Foundation, a founding
partner of the Let's Encrypt project and the non-profit organization that
develops Certbot? We'd like to send you email about our work encrypting the web,
EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o:

```

성공적으로 인증서 발급이후 이메일 정보등을 재단에 공유해줄것인지 등을 묻는 질문입니다.
Y나 N을 입력하시면 될듯합니다. 저는 N을 입력했습니다.


```bash
Which names would you like to activate HTTPS for?
We recommend selecting either all domains, or all domains in a VirtualHost/server block.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: streamdiaries.com
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate numbers separated by commas and/or spaces, or leave input
blank to select all options shown (Enter 'c' to cancel):

```

자동적으로 웹 서버 설정에 입력되어진 도메인을 불러오는데 필요한 도메인은 하나 뿐이므로 1을 선택해줍니다.
설정한 다른 도메인이 더 있으시다면 콤마(,) 로 다른 번호도 추가로 입력해주시면 됩니다.


```bash
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/streamdiaries.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/streamdiaries.com/privkey.pem
This certificate expires on 2024-06-11.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate
Successfully deployed certificate for streamdiaries.com to /etc/nginx/sites-enabled/default
Congratulations! You have successfully enabled HTTPS on https://streamdiaries.com

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

```

이후 이러한 메시지가 나타난다면 인증서 발급이 성공적으로 끝난것입니다.


![HTTPS 인증서 발급이후 서버요청화면](/assets/img/linux/nginx/https/nginx_issued_cert_html.jpg)

이후 https 주소로 요청을 해보시면 요청이 성공한것을 확인할수 있습니다.

<div class="divide-line"></div>

### 인증서 재갱신하기

>Let's Encrypt 는 무료지만 인증서의 유효기간이 3개월뿐이라는 단점이 있습니다.
그래서 CertBot 에서는 자동발급한 인증서에 대해서 자동갱신도 설정해줍니다.

해당 포스팅에서 진행한 내용도 **자동발급**에 대한 내용이니 **자동갱신설정**도 certbot 에서 설정해주었을겁니다.

```bash
$ sudo certbot renew --dry-run
```

위 명령어는 재갱신 테스트 명령어인데 성공적으로 success 메시지가 나오면 자동갱신에 아무문제가 없다는 것입니다.

마지막으로 **snap** 패키지관리자로 certbot 을 설치하였다면 재갱신 타이머는 crontab 이 아닌 systemd 로 수행될 것 입니다.

```bash
$ systemctl list-timers | grep certbot
```

위 명령어로 타이머 설정을 확인할 수 있습니다.