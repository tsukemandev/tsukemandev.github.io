---
layout: post
title:  "An Uncaught ReferenceError: X is not defined error message occurs in VideoJS"
permalink: /en/:categories/videojs/reference-error
date:  2024-03-27 20:14:15
categories: react
excerpt: This is a solution to the problem of videos not playing in videojs with a log saying Uncaught ReferenceError X is not defined.
thumbnail: /react/videojs/videojs-logo.jpg
image: /assets/img/react/videojs/videojs-logo.jpg
author: MoonSu Kwon
locale: en_US
tags: React,Videojs,ReferenceError
---

## Cause of the problem

![Uncaught ReferenceError: X is not defined Error Logs](/assets/img/react/videojs/noreferrer.jpg)

In the local development environment, streaming videos hosted on a remote CloudFront server play well, but

Playback suddenly stopped in the EC2 deployment environment.

When I opened the developer tools and checked the log message, the related message **Uncaught ReferenceError: _ is not defined Error Logs** appeared and did not play.

I checked again to see if it was a CORS problem, but since it played well on other online streaming test sites, it wasn't a CORS problem.

If it was a CORS problem in the first place, a CORS message should have appeared in the console window to fix it.

<div class="divide-line"></div>

## Solution to the problem

![Resolution Uncaught ReferenceError: X is not defined Error](/assets/img/react/videojs/resolution-noreferrer.jpg)


I searched and found the answer. **[Videojs Issue Page](https://github.com/videojs/video.js/issues/8170)** 

The person asking the question was using version **Videojs 8**, and I was also using version 8.


![solving playing hls video](/assets/img/react/videojs/solve-videojs-hls.jpg)

As the simplest solution, I **changed the version**. He told me the solution, and as he said, I downgraded to version 7 and it actually worked fine.

The reason why it plays in the local environment but does not work in the distribution environment with the above error has not yet been revealed, but it is highly likely to be a bug.

Since video.js is also open source and continues to develop, it was a day when I realized that in order to use open source, it is important to detect bugs in each version.

<br>
<div class="divide-line"></div>





