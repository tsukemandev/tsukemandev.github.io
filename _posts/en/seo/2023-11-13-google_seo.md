---
layout: post
title:  "How to delete an index in Google Webmaster Tools (Google Search Console)"
permalink: /en/:categories/removal
date:  2023-11-13 21:14:15
categories: seo google
excerpt: Google Webmaster Tools is an online tool that helps Googlebot index your pages. If you request the page you want to be indexed, you can also delete it. I will explain how to delete an index in Webmaster Tools.
thumbnail: /seo/google-bot.png
image: /assets/img/seo/google-bot.png
author: MoonSu Kwon
locale: en_US
tags: SEO,GoogleIndex,DeleteIndex
---

## Access webmaster tools


In Google Webmaster Tools (Google Search Console), you can remove a URL from search results and request that Google re-index the URL. Here's how:

![Removal Button in Navbar Google Search Console](/assets/img/seo/removal-search-console-navbar.jpg)

1. Log in to Google Webmaster Tools (Google Search Console).

2. Select the property (website) for which you would like to request removal and re-indexing.

3. Click ‘Removals’ in the left menu.


<div class="divide-line"></div>

## Click the delete request button

![New Request Page Button](/assets/img/seo/request-button-removeurl.jpg)

1. In the ‘Temporary Removals’ section, click ‘New Request’.

<div class="divide-line"></div>

## Enter the URL you want to delete

![Enter Remove URL in modal](/assets/img/seo/removalurl-request_modal.jpg)

1.  Enter the URL of the page you want to delete from search results and click 'Next'.  (I will block all URL indexes, not just specific URIs.)

2. Select the appropriate removal method: "Remove page from search results and cache" or "Remove directory". Select the option that suits your needs and click "Next".

> Temporarily remove is simply a request to temporarily stop indexing for 6 months. This does not mean that it will not appear in Google search results forever.
If you want to continuously clear the index, it is recommended that you prevent Googlebot from indexing by using robots.txt or removing the page from the server.

<div class="divide-line"></div>

## finally submitted

![Enter Submit Request Button](/assets/img/seo/submit-request-popup.jpg)

Finally, click the “Submit Request” button.

> Additionally, it may take up to a day for your request to be finally processed.

<div class="divide-line"></div>

## Page removed from Google search results

![Complete Remove Page](/assets/img/seo/completed-remove-page.jpg)

![Complete Remove Page](/assets/img/seo/after-searchview-removetemporary-searchconsole.jpg)

Finally, you can see that all page indexes for deletion requests have been deleted from Google search results.


## How to request reindexing of a deleted index

You can cancel the deletion request again by going to the Removals page in Google Webmaster Tools (Google Search Console).

It is assumed that this too will take some time to be re-indexed.

<div class="divide-line"></div>

[reference document](https://www.quora.com/If-I-request-to-remove-a-URL-in-the-Google-Search-console-can-I-ask-it-to-re-index-it-also-If-yes-then-how)를 참조 하였습니다.