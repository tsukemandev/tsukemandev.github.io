---
layout: post
title:  "What are browser developer tools (devtools)?"
permalink: /en/:categories/intro
date:  2023-10-19 21:14:15
categories: devtools
excerpt: In this post, we will introduce browser developer tools (devtools), which are essential for front-end development, and briefly explain how to open the developer tools (devtools).
thumbnail: /devtools/Microsoft_Edge_Dev_Icon.png
image: /assets/img/devtools/Microsoft_Edge_Dev_Icon.png
author: MoonSu Kwon
locale: en_US
tags: Devtools,Edge
---


## What are developer tools?

Developer tools are a set of tools needed for web development that are displayed next to the web page rendered by the browser.
Developer tools provide powerful functions such as debugging and inspection of web applications and web pages.

Developer tools allow you to:

* Use live tools with a visual interface to inspect, adjust, and change the styles of elements on your web pages. Where the browser stores content to make up a web page, such as .html, .css, .js, and .png file formats.

* Emulate how your website performs on different devices and simulate a complete mobile experience under different network conditions. Inspect your network traffic and determine where the problem is.

* Debug JavaScript using breakpoint debugging and a live console. Look for memory issues and rendering issues in your web app.

* Find accessibility, performance, compatibility, and security issues in your products and use DevTools to fix any accessibility issues you find.

* Use your development environment to synchronize changes in DevTools to your file system and the web.


## Open developer tools

| Action   |      	Resulting tool      |
|----------|:-------------:|
| Right-click a specific element such as an image or text on a web page and click Inspect. |  The Element Tool opens with the DOM tree element expanded to show the right-clicked page element. |
| Press Ctrl+Shift+I (Windows, Linux) or Command+Option+I (macOS). |   Previously used or startup tools.  |
| Press F12. | 	Previously used or startup tools. |


### Additional features


| Action   |      	Resulting tool      |
|----------|:-------------:|
| On the Microsoft Edge toolbar, select Settings and more (The 'Settings and more' icon) > More tools > Developer tools. |  Previously used or startup tools. |
| Press Ctrl+Shift+J (Windows, Linux) or Command+Option+J (macOS). |    console   |
| Press Ctrl+Shift+C (Windows, Linux) or Command+Option+C (macOS). | 	Element tool with an expanded DOM tree to display the <body> element. |
| Press Shift+F10 to open the right-click menu. To select the Inspect command, press Up Arrow and then Enter. | Element tool with an expanded DOM tree to display <html> elements. |
| Press Tab or Shift+Tab to put focus on a page element. Then press Shift+F10 to open the right-click menu. To select the Inspect command, press Up Arrow and then Enter. | Element tool with an expanded DOM tree to show the focused page element. |

<div class="divide-line"></div>

### How to open developer tools by right clicking


![Open Devtools used to right click!](/assets/img/devtools/open_devtools_rightclick1.png)

This method is one of the simplest and best methods.

![Open Devtools used to right click!](/assets/img/devtools/open_devtools_rightclick2.png)

DevTools opens, highlighting the right-clicked element in the DOM tree in the Elements tool.

<div class="divide-line"></div>

### How to open developer tools using your browser toolbar

![Open Devtools used to right click!](/assets/img/devtools/open_devtools_browsertoolbar1.png)

Click the ... button (Settings and Other) in the browser toolbar > Other Tools > Developer Tools.

<div class="divide-line"></div>

### ZoomIn , ZoomOut

Devtools' UI is implemented in HTML and CSS like a regular web page. So you can zoom in and out with shortcuts on a standard keyboard.

The zoom levels of Devtools and the rendered page are independent.


#### To zoom in on the DevTools portion of your browser:

1. If Devtools is not already focused, click anywhere in Devtools.
2. Press Ctrl + + or Ctrl + - (Windows or Linux). Or, press Command + + or Command + - (macOS). 

![Zoom Devtools](/assets/img/devtools/zoom-devtools1.png)


To zoom a rendered page, click on the page and use the same keyboard shortcut as above.

<div class="divide-line"></div>

#### Restoring zoom to 100%

1. Make sure the desired part of the browser, either Devtools or the rendered page, is focused.
2. Press Ctrl+0 or Ctrl+NumPad0 (Windows or Linux), or Command+0 (macOS).



<div class="divide-line"></div>

#### Zooming in on DevTools settings

![Devtools Settings](/assets/img/devtools/devtools_setting.jpg)


> A separate method is required to zoom in and out of the Devtools settings window.

1. In DevTools Settings, click Close (x) in the upper right. Open the DevTools Setting window and click the Close (X) button in the upper right.
2. Change the zoom level of DevTools, as described above. Reset the zoom settings in the DevTools window.
3. Click the Settings (Settings icon) button. If you open Settings again, the zoom settings on the Settings screen have been successfully completed.
To zoom DevTools by using the Command Menu:



<div class="divide-line"></div>


#### Setting the zoom in DevTools using the command menu

1. Click the **...** button and click the Run command button.
2. Enter the command below to set the zoom.
  * Reset zoom level
  * Zoom in
  * Zoom out


[Refer to Microsoft document](https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/overview)