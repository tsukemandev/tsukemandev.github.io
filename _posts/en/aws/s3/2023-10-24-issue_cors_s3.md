---
layout: post
title:  "How to resolve Cloud Front resource blocking issue due to AWS S3 CORS issue"
permalink: /en/:categories/cors
date:  2023-10-24 22:31:15
categories: aws s3 cloudfront issue
excerpt: Cross-Origin Resource Sharing (CORS) is a mechanism that allows web applications running on another Origin to access resources on the current Origin. Because the web basically follows the 'Same-Origin Policy', loading resources from other origins is restricted. Let's change that policy in S3.
thumbnail: /aws/s3/amazon-s3-logo.svg
image: /assets/img/aws/s3/amazon-s3-logo.svg
author: MoonSu Kwon
locale: en_US
tags: AWS,S3,CloudFront,CORS
---


## CORS issue in Cloud Front

![Video JS Error Image](/assets/img/aws/s3/cors-error-videojs.jpg)

After distributing the HLS video file to S3, I distributed it to Cloud Front and tested it with Video.js, but the video did not play...

![Video JS Error Image](/assets/img/aws/s3/cors-error-videojs2.jpg)

When I ran the browser developer tool and checked the console, a CORS error message appeared as shown above.

> **Cross-Origin Resource Sharing** (CORS) is a mechanism that allows web applications running on another Origin to access resources on the current Origin. Because the web basically follows the 'Same-Origin Policy', loading resources from other origins is restricted. For example, if a web application running on http://www.example.com tries to load an image or API from http://www.another-site.com, this will not be allowed by default. However, through CORS settings, http://www.another-site.com can accept requests from http://www.example.com.

<div class="divide-line"></div>

## CORS problem causes

Browsers default to the **Same-Origin Policy**, which allows only the same origin and blocks all other origins.

To solve this, the server providing the resource must include a specific header called **Access-Control-Allow-Origin** when responding.


The **Access-Control-Allow-Origin** header is an HTTP header used by the server providing the resource to inform the web browser from which **origin** it can access its resource.

For example, to allow a server to access its resources only from http://example.com, set Access-Control-Allow-Origin: http://example.com. To allow access from all origins, set **Access-Control-Allow-Origin**: *.

However, for security reasons, it is best to allow access to specific sources only when necessary and to avoid the use of * wildcards whenever possible.

<div class="divide-line"></div>

## How to solve Cloud Front CORS problem

Cloud Front is a CDN service that distributes resources within S3 bucket storage.

In conclusion, all you have to do is modify S3's CORS policy and have it reflected in Cloud Front.

<div class="divide-line"></div>

### Modify S3 CORS policy

![Edit CORS POLICY FOR S3](/assets/img/aws/s3/s3-permissions.jpg)

1. Go to S3 and click the bucket where the original resource is stored.

2. Click Permissions.

![Edit CORS POLICY FOR S3](/assets/img/aws/s3/s3-cors-editbutton.jpg)

If you scroll down, you will see the CORS policy settings screen.

* Click the **Edit** button.

![Edit CORS POLICY FOR S3](/assets/img/aws/s3/s3-cors-edit.jpg)

1. Copy and paste the policy below.

2. Click the Save button.

```json

[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "PUT",
            "POST",
            "DELETE",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]

```

>  **The above example is a policy for a test bucket, so please set it to permitAll and set the policy as needed.**

<div class="divide-line"></div>

### Edit Cloud Front CORS policy

![Edit CORS POLICY FOR Cloud Front](/assets/img/aws/s3/cloudfront-distributions.jpg)

![Edit CORS POLICY FOR Cloud Front](/assets/img/aws/s3/cloudfront-distribution-behavior01.jpg)

![Edit CORS POLICY FOR Cloud Front](/assets/img/aws/s3/cloudfront-distribution-behavior02.jpg)


The above example refers to the [AWS S3 CORS documentation](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/cors.html).

For Cloud Front CORS policy settings, refer to the [AWS Cloud Front CORS document](https://repost.aws/knowledge-center/no-access-control-allow-origin-error).

