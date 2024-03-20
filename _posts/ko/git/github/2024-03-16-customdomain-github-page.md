---
layout: post
title:  "Github Page의 커스텀 도메인을 설정하기"
permalink: /ko/:categories/page-custom-domain
date:  2024-03-16 20:12:15
categories: git github
excerpt: Github 에서는 페이지가 호스팅 되어질 repository 를 생성하여 무료로 자신의 페이지를 호스팅 할 수 있습니다. 하지만 repository 이름은 github 에서 필수적으로 정해주는 규칙(username.github.io)으로 생성해야 페이지가 호스팅되어지고 도메인 역시 username.github.io 라는 repository 이름과 똑같이 설정되어지는 제약이 있습니다.
thumbnail: /git/github/github-logo.png
---

## 무료로 Github 페이지 호스팅하기

![Create Github Page Repository](/assets/img/git/github/create-repository-githubpage.jpg)

> Github 에서는 페이지가 호스팅 되어질 repository 를 생성하여 무료로 자신의 페이지를 호스팅 할 수 있습니다. 하지만 repository 이름은 github 에서 필수적으로 정해주는 규칙(username.github.io)으로 생성해야 페이지가 호스팅되어지고 도메인 역시 그러한 repository 이름과 똑같이 설정되어지는 제약이 있습니다.

<div class="divide-line"></div>

## 커스텀 도메인 설정하기

그렇다면 Github 에서 제공해주는 하위도메인 (username.github.io) 가 아닌 자신의 도메인을 직접 설정해봅시다.

도메인은 원하시는 DNS 서비스에서 구매하실수 있습니다.


<div class="divide-line"></div>

### DNS 서비스에서 도메인 구매하기

![Purchase Domain name in Route 53](/assets/img/git/github/purchase_domain_route53.jpg)

저는 AWS Route53 을 이용하여 도메인을 구매하였습니다.

<div class="divide-line"></div>

### Github 설정에서 커스텀 도메인 등록하기

![Setting Custom Domain in Github Setting Page](/assets/img/git/github/setting_github_custom_domain.jpg)

도메인을 구매하셨으면 우선 Github 에 커스텀 도메인을 등록해줍니다.

설정에 들어가셔서 **Pages -> Add a domain** 을 클릭해줍니다.

![Verify Domain name Chellenge](/assets/img/git/github/challenge_domain_name.jpg)

이후 도메인 이름을 검증하기 위해 챌린지가 화면에 표시되면 위 내용을 복사해둡니다.

<div class="divide-line"></div>

### DNS TXT 레코드 설정하기

DNS 서비스에서 도메인을 구입하시면 해당 DNS Zone 으로 진입해서 레코드를 설정해줘야합니다.

![Verify Domain name Chellenge](/assets/img/git/github/chellenge_domain_name.png)

**Create records** 버튼을 클릭하고 새 레코드를 생성하여 아까 복사해두었던 설정값을 그대로 붙여넣습니다.

그리고 레코드를 생성한 이후 도메인 검증페이지로 이동한 이후 Verify 버튼을 클릭하시면 도메인 검증이 완료됩니다.

> AWS Route 53 기준으로 레코드를 생성하고 전파되기까지 10초에서 1분가까이 시간이 걸립니다.

<div class="divide-line"></div>

### DNS A 레코드 설정하기

> 도메인을 구매하셨으면 기존 **username.github.io** 도메인은 필요없으니 사용하지 않으셔도 됩니다.
>
>
> repository 이름만 변경해주시면 기존 **username.github.io** 도메인은 사용할수 없습니다.
>
>
> 만약 **username.github.io** 도메인도 계속 사용하시려면 추후 CNAME 레코드도 설정해주셔야 합니다.

저는 기존 도메인은 사용하지 않기에 repository 이름을 변경하여 기존 도메인을 쓸 수 없게 하였습니다.


```TXT
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

위 IPv4 주소는 [Github 커스텀 도메인 가이드](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) 에서 가져온 내용입니다.


![Register the GitHub IPv4 address in the A record.](/assets/img/git/github/register_a-recode_route53.jpg)

위 IPv4 주소들을 복사하여 A레코드에 등록해줍니다.

Route 53 에서 레코드 등록시 여러 IP주소를 사용해야할 경우 다음 줄로 개행합니다.

그리고 레코드를 생성합니다.

<div class="divide-line"></div>

### DNS CNAME 레코드 설정하기

![Register CNAME record.](/assets/img/git/github/register_cname_route53.jpg)

**www** 하위도메인도 반드시 CNAME 레코드 설정을 해야합니다.

<div class="divide-line"></div>

### Github page 메뉴에서 커스텀 도메인 등록

![Save the Custom Domain](/assets/img/git/github/progress_dns_check_customdomain.jpg)

A레코드와 CNAME레코드를 설정하고 Save 버튼을 클릭하면 10초 이상 **wait** 메시지가 나타납니다.

> Enforce HTTPS 도 체크해줍니다.

![Save the Custom Domain](/assets/img/git/github/success_dns_check_customdomain.jpg)

페이지 프로젝트 내부에 CNAME 이라는 파일이 하나 생성됨과 동시에 커스텀 도메인 등록이 완료되었습니다.

이제부터 등록된 커스텀 도메인을 통해서 Github 페이지에 접근하면 됩니다.