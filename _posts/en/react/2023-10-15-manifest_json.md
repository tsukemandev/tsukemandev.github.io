---
layout: post
title:  "What is a web app manifest?"
permalink: /en/:categories/manifestjson
date:  2023-10-15 21:14:15
categories: react
excerpt: A web manifest (manifest.json) file is a JSON file that allows you to add a web application or website "like an app" to a user's desktop or mobile home screen. This file provides metadata about your web application and can define the application's name, startup URL, icon, background color, and display style. This helps your web application look and feel like a native app.
thumbnail: /react/webmanifest_thumbnail.webp
image: /assets/img/react/webmanifest_thumbnail.webp
author: MoonSu Kwon
locale: en_US
tags: React,manifestjson
---

## Intro

> A web manifest (manifest.json) file is a JSON file that allows you to add a web application or website "like an app" to a user's desktop or mobile home screen. This file provides metadata about your web application and can define the application's name, startup URL, icon, background color, and display style. This helps your web application look and feel like a native app.


## Properties:

* **name**: The name of the application.

* **short**_name: This is the short name of the application used when it appears on the home screen.

* **start_url**: The URL that opens when the application starts. This URL serves as the entry point to your application.

* **display**: Determines how the application screens will appear. For example, fullscreen, standalone, minimal-ui, etc.

* **background_color**: The background color of the application launch screen.

* **description**: A description of the application.

* **icons**: You can define application icons of various sizes. This icon is used when added to the home screen or in the application switcher.

* **theme_color**: Specifies the color of the status bar and navigation bar.


## Add a web app manifest to your page

```html
<link rel="manifest" href="/manifest.json">
```

The web manifest file is located in the root directory of your web application and must be added as a link to the <head> section of your HTML document.


The browser can read this file to get the information it needs to add the application "as an app" to the user's device. This feature is especially important when building progressive web apps (PWAs).

## Example of writing a web app manifest


```json
{
  "name": "Example App",
  "short_name": "App",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "description": "An example Progressive Web App",
  "icons": [
    {
      "src": "images/icon-48x48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "images/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "images/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "images/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "images/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "images/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#4A90E2"
}

```


### 설명:

* **name**: "Example App" - The full name of the application.

* **short_name**: "App" - This is the short name of the application used when it appears on the home screen. Used when space is limited.

* **start_url**: "/" - The path to the web page to which the user will be directed when the application starts. Here it refers to the root directory.

* **display**: "standalone" - This means that the application will run in standalone mode. This means the app runs full screen without a browser UI.

  - **fullscreen** :	Opens a web app without a browser UI and takes up all available display real estate.

  - **standalone** :	Open the web app so it looks like a standalone app. Apps run in their own window, separate from the browser, and hide standard browser UI elements such as the address bar.

  - **minimal-ui** : 	This mode is similar to standalone, but provides the user with a minimal set of UI elements to control navigation, such as back and refresh buttons.

  - **browser** : 
This is a standard browser environment.


<br>

* **background_color**: "#ffffff" - The background color to be used on the application's startup screen.

* **description**: "An example Progressive Web App" - A brief description of the application.

* **icons**: 
An array of application icons of various sizes. Each icon specifies the path as src, the size as sizes, and the MIME type as type. (This will be explained in detail later.)

* **theme_color**: "#4A90E2" - The application's theme color. This color may be used in the browser's address bar, etc.


This example is a very basic manifest file. You can add or adjust various properties as needed, allowing you to fine-tune how “app-like” your web application looks.


#### Main components of the icons attribute

> The icons attribute plays an important role in the web manifest file (manifest.json). This property is used to define icons for web applications, providing graphics that represent the application in various situations and environments. Icons are used in a variety of places, including the user's home screen, task manager, notifications, and application settings.


* **src** : Indicates the file path of the icon. It can be a relative or absolute path.

* **sizes** : Indicates the size of the icon. Here, the size is expressed as width and height in 'width x height' format, and the unit is pixel. You can define multiple sizes for an icon, with each size separated by a space.

* **type** : Indicates the MIME type of the icon file. For example, for a PNG image it would be image/png. This information helps the browser properly handle icon files.


```json
"icons": [
  {
    "src": "icon/lowres.webp",
    "sizes": "48x48",
    "type": "image/webp"
  },
  {
    "src": "icon/hd_highres.png",
    "sizes": "72x72 96x96 128x128 256x256",
    "type": "image/png"
  },
  {
    "src": "icon/hd_highres.webp",
    "sizes": "72x72 96x96 128x128 256x256",
    "type": "image/webp"
  }
]


```


This example defines three icons. The first is a 48x48 WebP image, the second and third are PNG and WebP images that support various sizes. By providing icons in these different sizes and formats, applications can use the optimal icons for a variety of devices and situations.


##### Important considerations:

* **Size Diversity**: Consider providing icons in multiple sizes to account for different screen resolutions and devices.

* **Platform Support**: Depending on your operating system or browser, certain formats or sizes of icons may be better supported. Therefore, it is useful to include a variety of formats and sizes for broad compatibility.

* **Quality and Optimization**: Icon images should be high quality while keeping file size to a minimum. This is because it may affect loading times.

* Effective use of the **icons** attribute can improve the user experience and contribute to the branding and awareness of your application.

<div class="divide-line"></div>

## Manifest test

> Click the F12 button in your browser to open developer tools and click the Application panel. There is a Manifest tab in the submenu.

![HLS Thumbnail Image](/assets/img/react/manifest_json_test.jpg)

This window provides human-readable versions of many of the manifest properties, allowing you to verify that all images are loading properly.


<div class="divide-line"></div>

## splash screen

When your app first runs on mobile, it may take a moment for the browser to start and the initial content to start rendering. Instead of showing a white screen that might make the user think the app isn't working, the browser shows a splash screen until the first paint.


Chrome automatically creates a splash screen from the name, background_color, and icons specified in the manifest. To ensure a smooth transition from the splash screen to the app, specify the background_color the same color as the loading page.

Chrome chooses the icon on the splash screen that most closely matches the device resolution. In most cases, providing 192px and 512px icons will be sufficient, but you can also provide additional icons for a more accurate match.


refer : [web.dev refer](https://web.dev/articles/add-manifest?hl=ko)