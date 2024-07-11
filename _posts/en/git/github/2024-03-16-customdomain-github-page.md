---
layout: post
title:  "Setting up a custom domain for Github Page"
permalink: /en/:categories/page-custom-domain
date:  2024-03-16 20:12:15
categories: git github
excerpt: On Github, you can host your own page for free by creating a repository where the page will be hosted. However, the repository name must be created according to the rules (username.github.io) set by GitHub in order for the page to be hosted, and the domain is also restricted to be set the same as the repository name, username.github.io.
thumbnail: /git/github/github-logo.png
image: /assets/img/git/github/github-logo.png
author: MoonSu Kwon
locale: en_US
tags: github,githubpage,customdomain
---

## Host your Github pages for free

![Create Github Page Repository](/assets/img/git/github/create-repository-githubpage.jpg)

> On Github, you can host your own page for free by creating a repository where the page will be hosted.However, the repository name must be created according to the rules (username.github.io) set by GitHub in order for the page to be hosted, and there is a restriction that the domain must be set the same as the repository name.

<div class="divide-line"></div>

## Setting up a custom domain

If so, let's set up your own domain instead of the subdomain (username.github.io) provided by Github.

You can purchase a domain from the DNS service of your choice.


<div class="divide-line"></div>

### Buy a domain from a DNS service

![Purchase Domain name in Route 53](/assets/img/git/github/purchase_domain_route53.jpg)

I purchased a domain using AWS Route53.

<div class="divide-line"></div>

### Register a custom domain in Github settings

![Setting Custom Domain in Github Setting Page](/assets/img/git/github/setting_github_custom_domain.jpg)

If you purchase a domain, first register the custom domain on Github.

Go into settings and click **Pages -> Add a domain**.

![Verify Domain name Chellenge](/assets/img/git/github/challenge_domain_name.jpg)


When a challenge appears on the screen to verify your domain name, copy the above content.

<div class="divide-line"></div>

### Setting up DNS TXT records

If you purchase a domain from a DNS service, you must enter the relevant DNS Zone and set up a record.

![Verify Domain name Chellenge](/assets/img/git/github/chellenge_domain_name.png)

Click the **Create records** button, create a new record, and paste the settings you copied earlier.

After creating a record, go to the domain verification page and click the Verify button to complete domain verification.

> Based on AWS Route 53, it takes approximately 10 seconds to 1 minute to create and propagate a record.

<div class="divide-line"></div>

### Setting up DNS A records

> If you purchased a domain, you do not need to use the existing **username.github.io** domain.
>
>
> If you only change the repository name, you will not be able to use the existing **username.github.io** domain.
>
>
> If you want to continue using the **username.github.io** domain, you will also need to set up a CNAME record later.

Since I do not use the existing domain, I changed the repository name so that the existing domain cannot be used.


```TXT
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```


[Github Custom Domain Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your -github-pages-site)


![Register the GitHub IPv4 address in the A record.](/assets/img/git/github/register_a-recode_route53.jpg)

Copy the IPv4 addresses above and register them in the A record.

If you need to use multiple IP addresses when registering records in Route 53, break to the next line.

And it creates a record.

<div class="divide-line"></div>

### Setting up DNS CNAME records

![Register CNAME record.](/assets/img/git/github/register_cname_route53.jpg)

**www** subdomains must also have CNAME records set up.

<div class="divide-line"></div>

### Register a custom domain in the Github page menu

![Save the Custom Domain](/assets/img/git/github/progress_dns_check_customdomain.jpg)

When you set the A record and CNAME record and click the Save button, the **wait** message appears for more than 10 seconds.

> Also check Enforce HTTPS.

![Save the Custom Domain](/assets/img/git/github/success_dns_check_customdomain.jpg)


A file called CNAME was created inside the page project, and custom domain registration was completed.


From now on, you can access the Github page through the registered custom domain.