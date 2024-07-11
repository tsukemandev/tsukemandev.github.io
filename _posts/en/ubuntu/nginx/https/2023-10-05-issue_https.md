---
layout: post
title:  "Issue a Let's Encrypt free HTTPS certificate to your Nginx web server"
permalink: /en/:categories/issue
date:  2023-10-05 22:04:15
categories: ubuntu nginx https
excerpt: We provide step-by-step instructions on how to obtain and set up a free HTTPS certificate on your Nginx server through Let's Encrypt. Describes the process of enhancing the security of your website through SSL/TLS certificates.
thumbnail: /ubuntu/nginx/https/lets-encrypt-logo.png
image: /assets/img/ubuntu/nginx/https/lets-encrypt-logo.png
author: MoonSu Kwon
locale: en_US
tags: https,letsencrypt,certbot
---


![Let's Encrypt Logo Image](/assets/img/ubuntu/nginx/https/lets-encrypt-logo.png)

## HTTPS basic concepts

<div class="divide-line"></div>

### HTTPS
HTTPS (HyperText Transfer Protocol Secure) is a protocol that adds data encryption to HTTP for secure communication on the web. Basically, instead of transmitting the contents of HTTP communication as is, the data is encrypted and transmitted using SSL (Secure Sockets Layer) or TLS (Transport Layer Security) protocols. This ensures data confidentiality and integrity and protects user data from man-in-the-middle attacks.

### SSL
SSL (Secure Sockets Layer) is a protocol developed by Netscape to encrypt and transmit data on the web. SSL ensures data confidentiality by encrypting communication between the client and server, and also verifies that the client is actually communicating with the intended server through server authentication. SSL has been widely used since its inception in the mid-1990s, but has now been replaced by the more secure TLS protocol.

### TLS
Transport Layer Security (TLS) is the successor to SSL and is a standard protocol for secure communications. TLS works in a similar way to SSL and provides features such as data encryption, server authentication, and message integrity checking. TLS' security has been strengthened through several versions, and it is currently the most widely used security protocol on the web. The TLS protocol is also mainly used for HTTPS communication.

### Let's Encrypt
Let'sEncrypt is a free, automated, open certificate authority (CA) created to enhance the security of the Internet. We help users easily issue SSL/TLS certificates and convert their websites to HTTPS. Let'sEncrypt has greatly accelerated the adoption of HTTPS by enabling certificates to be issued and managed through an automated process. The validity period of the certificate is 90 days, and the automatic renewal function reduces maintenance hassle.

Each of these elements work together to ensure secure communication on the web. HTTPS is the basic security protocol of the web, and SSL and TLS are the main technologies for its implementation. Let'sEncrypt helps improve the overall security of the web by making these technologies more accessible.


<div class="divide-line"></div>

## Issue Let's Encrypt certificate to Nginx web server

![Nginx initial entry screen](/assets/img/ubuntu/nginx/https/nginx_entry_html.jpg)

This is the first screen requested immediately after completing the Nginx installation.
A warning window appears in the browser because the certificate has not been issued so far.

If the browser sends a request to http instead of https, it will always display a message that the site is not secure.
This is also the worst for user experience (UX).

### Install CertBot

Certbot is a **ACME** client that automatically issues/renewes Let's Encrypt certificates.

>**What is ACME**: ACME (Automated Certificate Management Environment) is a protocol that can automatically issue, renew, and cancel Internet security certificates. This protocol is specifically used by certificate authorities (CAs), such as Let's Encrypt, to automatically manage the life cycle of certificates. The main purpose of the ACME protocol is to make SSL/TLS certificates easier to use by automating and simplifying web security.

The installation method for certbot may vary depending on each operating system, so please refer to the [corresponding guide](https://certbot.eff.org/).
Detailed guides are provided for each operating system and web server.


Since I currently set up the server environment as **Ubuntu 20**, I will explain based on **Ubuntu 20**.

```bash
$ sudo apt update
$ sudo apt install snapd
```

To install certbot, you need a package manager called **snap**.

snap Install snap using the above command.  **(snapd is not a typo. Please enter it as is.)**

>certbot must be installed as **snap**! Do not install using an OS package manager such as yum, dnf, or apt.
I don't know why, but that's what the Certbot site says.


```bash
$ sudo snap install --classic certbot
$ sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

After installing certbot through snap with the above command, link the certbot installed in the snap directory to the global **/usr/bin/certbot**.

```bash
$ sudo certbot --nginx
```

Run certbot. 
Since I use Nginx, I used the **--nginx** option. Set options to suit your web server.

Then, just enter the information for each question.

<br>

```bash
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Enter email address (used for urgent renewal and security notices)
(Enter 'c' to cancel):   
```

Enter your email address.


```bash
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.3-September-21-2022.pdf. You must
agree in order to register with the ACME server. Do you agree?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o:

```

Enter Y to agree.


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

This question asks whether email information, etc. will be shared with the foundation after the certificate is successfully issued.
You may want to enter Y or N. I entered N.


```bash
Which names would you like to activate HTTPS for?
We recommend selecting either all domains, or all domains in a VirtualHost/server block.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: streamdiaries.com
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate numbers separated by commas and/or spaces, or leave input
blank to select all options shown (Enter 'c' to cancel):

```

Since only one domain is required to automatically load the domain entered in the web server settings, select 1.
If you have other domains set up, you can enter additional numbers using commas (,).


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

If this message appears afterward, certificate issuance has been completed successfully.


![Server request screen after issuing HTTPS certificate](/assets/img/ubuntu/nginx/https/nginx_issued_cert_html.jpg)


Afterwards, if you make a request to the https address, you can confirm that the request was successful.

<div class="divide-line"></div>

### Renew your certificate

>Let's Encrypt is free, but the downside is that the certificate is only valid for 3 months.
So, CertBot also sets up automatic renewal for automatically issued certificates.

Since the content in this post is about **automatic issuance**, **automatic renewal settings** must have also been set in certbot.

```bash
$ sudo certbot renew --dry-run
```

The above command is a renewal test command, and if a success message appears, there is no problem with automatic renewal.

Lastly, if you install certbot with the **snap** package manager, the renewal timer will be performed by systemd, not crontab.

```bash
$ systemctl list-timers | grep certbot
```

You can check the timer settings with the above command.