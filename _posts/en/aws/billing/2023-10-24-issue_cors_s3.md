---
layout: post
title:  "VPC billing issue in AWS Free Tier"
permalink: /en/:categories/freetier
date:  2024-03-20 19:31:15
categories: aws billing
excerpt: If you use services supported by AWS Free Tier, you can use it for free without any additional charges. However, an issue occurred where VPC fees were unintentionally charged, and we checked the cause of this.
thumbnail: /aws/billing/aws-cost-explorer.png
image: /assets/img/aws/billing/aws-cost-explorer.png
author: MoonSu Kwon
locale: en_US
tags: AWS,freetier,VPCfee
---

## I used the free tier, but VPC fees were charged..

Free Tier is a free service provided by AWS for one year to users who sign up for the first time.

You can use AWS for free only for services provided under the free tier.

Please Check! [See AWS Free Tier section](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all)

{{page.img_url}}

<br>

![I used following freetier services with aws, ec2, s3, rds](/assets/img/aws/billing/used-freetier-services.jpg)

The items above are free tier services I used.


A total of three services **EC2, S3, and RDS** were used.

<br>

![But I was charged a usage fee](/assets/img/aws/billing/freetier-cost.jpg)
![But I was charged a usage fee](/assets/img/aws/billing/freetier-cost-total.jpg)

<br>
<br>

However, we confirmed that VPC fees were unintentionally charged.

I knew that Route53 was regularly charged $0.50 per month, and I understood that other services were charged by testing various things, but the VPC fee was truly unintentional.

In particular, the VPC was created by default for each region, and I don't remember setting it up separately, so it was strange.

So, I contacted the AWS Support team by email.

<br>

![Answer for My Support Request to AWS](/assets/img/aws/billing/freetier-support-answer.jpg)

<br>

Come to think of it... Not only EC2 instances but also RDS are given elastic IPv4 addresses.

The free tier provides 750 hours of free usage per month for one IPv4 address, but if you create two elastic IPv4 addresses, you can only use 375 hours per month.

If this is exceeded, a fee of 0.005 USD per hour will be charged.

<div class="divide-line"></div>

## Conclusion

> It seems that AWS's guidance regarding the free tier is lacking. You should keep in mind that you are charged not only for instances such as EC2 and RDS, but also for the **elastic IPv4** used by those instances.<br><br>
**Elastic IPv4** is also limited to 750 hours per month, and the more you use it, the faster the time is deducted. <br><br>

If you are using the free tier of AWS for study purposes, please be careful when using it.
