---
layout: post
title:  "Installing Nginx Compilation for HLS Streaming"
permalink: /en/:categories/install-nginx-compile
date:  2023-10-04 19:04:15
categories: ubuntu nginx hls
excerpt:  Describes the process of compiling and installing Nginx, and provides instructions for adding the nginx-rtmp-module extension module required for HLS streaming. It covers in detail the steps from installing the necessary dependencies to compiling and installing Nginx and its modules.
thumbnail: /ubuntu/nginx/hls/hls_thumbnail_01.jpg
image: /assets/img/ubuntu/nginx/hls/hls_thumbnail_01.jpg
author: MoonSu Kwon
locale: en_US
tags: hls,nginx
---


![HLS Thumbnail Image](/assets/img/ubuntu/nginx/hls/hls_thumbnail_01.jpg)

## Why do I need to compile Nginx instead of a normal installation?


To do HLS streaming in Nginx, an extension module called **nginx-rtmp-module** is required.

Nginx is largely divided into the paid version, Nginx+, and the free version, Nginx. For paid version users, installation of expansion modules is very easy.


On the other hand, if users of the free version of Nginx want to use an extension module such as nginx-rtmp-module, they must go through the process of compiling Nginx directly from the source code, rather than installing it through a typical package manager.


This process will allow you to integrate the module into Nginx and make the necessary configuration.


1. **Install required dependencies**: Install the libraries and tools required to compile Nginx and the RTMP module.

2. **Download Nginx source code**: Download the source code from Nginx's official website or source repository.

3. **Download nginx-rtmp-module**: Download the source code of the RTMP module as well.

4. **Nginx compilation**: After unzipping the downloaded Nginx source code, run the ./configure script and specify the path to the RTMP module using the --add-module option. After that, compile and install Nginx using the make and make install commands.

<br>


This process may vary slightly from system to system, and the exact commands or steps may vary depending on the operating system you are using, the version of Nginx, and the features you require. [Official documentation of nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module)

<div class="divide-line"></div>

## Install Nginx compilation

First of all, preliminary preparation work is required before installation.
Because compilation installation literally means compiling source code and installing it, a build tool is required.

```bash
$ sudo apt install build-essential
```

Install the gcc or gnu essential build tools needed to compile nginx source code.
All can be installed via **build-essential**.

### Required libraries required to compile Nginx source code

<br>

In order to compile Nginx source code, the three libraries below must be installed.

1. PCRE
2. Zlib
3. OpenSSL

```bash
$ mkdir ~/hls-nginx
$ cd ~hls-nginx
```
First, create a directory to store libraries and modules in one place.


#### PCRE Installation

```bash
$ wget github.com/PCRE2Project/pcre2/releases/download/pcre2-10.42/pcre2-10.42.tar.gz
$ tar -zxf pcre2-10.42.tar.gz
$ cd pcre2-10.42
$ ./configure
$ make
$ sudo make install
```

#### Zlib Installation

```bash
$ wget http://zlib.net/zlib-1.3.tar.gz
$ tar -zxf zlib-1.3.tar.gz
$ cd zlib-1.3
$ ./configure
$ make
$ sudo make install
```

#### OpenSSL Installation

```bash
$ wget http://www.openssl.org/source/openssl-1.1.1v.tar.gz
$ tar -zxf openssl-1.1.1v.tar.gz
$ cd openssl-1.1.1v
$ ./Configure linux-x86_64 --prefix=/usr 
$ make
$ sudo make install
```

#### When an error message occurs

```bash
$ ./Configure LIST | grep linux  //Only when an error message appears
```

If an error message is displayed when executing the above ./Configure command, enter the command to check the settings for your operating system.

<div class="divide-line"></div>

### Download nginx-rtmp-module module

```bash
$ git clone https://github.com/arut/nginx-rtmp-module.git
```


Download nginx-rtmp-module source code.


### Nginx source code download and final compilation settings

```bash
$ wget https://nginx.org/download/nginx-1.24.0.tar.gz
$ tar zxf nginx-1.24.0.tar.gz
$ cd nginx-1.24.0
$ sudo ./configure 
  --with-zlib=../zlib-1.3  //If you put them all together in a directory, it is very convenient when entering the path.
  --with-pcre=../pcre2-10.42 
  --with-openssl=../openssl-1.1.1v 
  --with-http_ssl_module // This option activates the SSL module settings.
  --add-module=../nginx-rtmp-module  //Enter the source code path of the module you installed.

```


When you enter the command, messages like the image below will appear.


![Configure complete message before compile nginx](/assets/img/ubuntu/nginx/hls/log_configured_compile.jpg)

**nginx path prefix** indicates that the path **/usr/local/nginx** is set as a prefix by default, and the remaining configuration files, binaries, etc. are set after the prefix path.



### Compiling


```bash
$ sudo make
```

When you enter the command, numerous logs appear and compilation takes about a minute or more.


### Final installation

```bash
$ sudo make install
```

This command is the command that performs the final installation with the installation file compiled with the make command above.
<br>
If no other error messages occur, the installation is complete.


```bash
$ sudo /usr/local/nginx/sbin/nginx  //Nginx 서버를 실행합니다.
$ ps aux | grep nginx  //Check the currently ongoing process.
```

<br>


<a href="{{ site.url }}/ko/ubuntu/nginx/hls/encoding">In Part 3</a>