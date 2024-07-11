---
layout: post
title:  "Encode to HLS streaming file"
permalink: /en/:categories/encoding
date:  2023-10-07 22:04:15
categories: ubuntu nginx hls
excerpt: General video formats such as avi, mkv, and wmv formats cannot be streamed with HLS. We need to encode it in H.264, and we will do the encoding using software called FFmpeg.
thumbnail: /ubuntu/nginx/hls/hls_thumbnail_01.jpg
image: /assets/img/ubuntu/nginx/hls/hls_thumbnail_01.jpg
author: MoonSu Kwon
locale: en_US
tags: hls,nginx
---


![HLS Thumbnail Image](/assets/img/ubuntu/nginx/hls/hls_thumbnail_01.jpg)


## Which video format is right for you?


HLS streaming follows specific formats and standards, primarily associated with the MPEG-2 Transport Stream (TS) file format. HLS streaming requires video content to be encoded in this format and using an appropriate codec (usually the H.264 video codec and AAC audio codec).


First, you need to convert your content into a format suitable for HLS streaming (e.g. MP4), segment it, and deliver it with an M3U8 playlist file.


This process requires appropriate video conversion and segmentation tools, which may need to be handled server-side. Tools like FFmpeg are widely used to perform these conversion and segmentation tasks. FFmpeg provides the ability to convert various video formats to HLS-compatible formats, split videos into segments of appropriate length, and create M3U8 playlist files.


> MP4 is a container format for video files, and H.264 is a video codec. The MP4 format can contain video compressed with the H.264 codec, but MP4 files do not necessarily use the H.264 codec. MP4 also supports other video codecs, including H.265 (HEVC), MPEG-4 Part 2, and AVC.


## What tools do I need to encode it into the appropriate format?

**FFmpeg** is a very powerful and flexible multimedia framework, widely used for recording, converting and streaming video, audio and other multimedia files and streams. The tool is open source and cross-platform, meaning it can be used on a variety of operating systems. The main features of FFmpeg are:

1. Video and audio conversion: FFmpeg provides powerful features for converting between various video and audio formats. Users can use this tool to convert file formats, adjust video resolution, or adjust the bitrate of video and audio streams.

2. Streaming: FFmpeg can process and create live streams. It allows users to broadcast real-time video and audio content over the Internet.

3. Video Editing: Although not as intuitive or feature-rich as professional video editing software, FFmpeg provides basic video editing features. For example, you can trim a video, combine multiple video clips, or add an audio track to your video.

4. Codec support: FFmpeg supports many video and audio codecs, which allows it to handle almost any type of multimedia file.

5. Libraries and developer tools: FFmpeg provides several core libraries (Libavcodec, Libavformat, etc.), making it easy to integrate video/audio processing functions in other software projects.

FFmpeg is used through a command line interface (CLI), and its usage can be very flexible but complex. Its powerful features and flexibility make it a favorite among a wide range of users, including video producers, broadcasters, IT professionals, and software developers.


### Install FFmpeg

```bash
$ sudo apt update
$ sudo apt install ffmpeg
```

First, install ffmpeg.


### Download Sample Video

[Sample video download link](https://drive.google.com/drive/folders/1P7-_se8T3OVL7NIL8E9McwMdCPN1bRcb?usp=drive_link)

If you are a WSL user, move the video file to your Linux user folder, or if you own a separate server, move it to your server's user directory.
I will create an mp4 directory and put it there.


```bash
$ cd ~ // access user directory
$ mkdir hls-root 
$ cd hls-root 
$ mkdir hls mp4 
```


Create a random directory in the user directory and create two additional directories within it.

* hls-root (root directory of hls server)
* hls (Directory to collect segments of encoded video)
* mp4 (Directory to store the mp4 file unzipped above)


### Encoding and fragmenting video with FFmpeg

```bash
$ cd mp4
$ sudo ffmpeg -y \
  -i pogo-lg.mp4 \  // Media files to be segmented after encoding
  -force_key_frames "expr:gte(t,n_forced*2)" \
  -sc_threshold 0 \
  -s 1280x720 \
  -c:v libx264 -b:v 1500k \
  -c:a copy \
  -hls_time 6 \
  -hls_playlist_type vod \
  -hls_segment_type fmp4 \
  -hls_segment_filename "/home/pizzadog/hls-root/hls/segment-%d.m4s" \  //Path to save segment files
  /home/pizzadog/hls-root/hls/index.m3u8  // Path to store the index file (usually tied together with a segment)
```

When you run that command, FFmpeg will perform real-time encoding and segmentation operations.


This FFmpeg command converts the pogo-lg.mp4 video file to HTTP Live Streaming (HLS) format. Each part of the command directs the following actions:

**sudo ffmpeg**: Run the FFmpeg program with administrator privileges. FFmpeg is a powerful tool for video and audio conversion, processing, and more.

* **-y**: If the output file already exists, it will be overwritten.

* **-i pogo-lg.mp4**: Use pogo-lg.mp4 as input file.

* **-force_key_frames "expr:gte(t,n_forced\*2)"** : 
 Set a rule to force insertion of key frames. This expression means "Force insert a key frame every n_forced*2 seconds." For example, if n_forced is 1, a key frame will be inserted every 2 seconds. Key frames provide an important reference point when streaming or editing video.

* **-sc_threshold 0**: Disable scene transition detection. This prevents automatic detection of transitions within the video and ensures that key frames are determined only by the -force_key_frames option.

* **-s 1280x720**: Set the resolution of the output video to 1280x720 (720p).

* **-c:v libx264**: It uses libx264 as the video codec. This codec is used to encode H.264/MPEG-4 AVC video streams.

* **-b:v 1500k**: Set the video bitrate to 1500 kilobits per second. This is an important factor in determining the quality and file size of your video.

* **-c:a copy**: Use the 'Copy' option for the audio codec. This means that the audio stream is not converted and remains original.

* **-hls_time 6**: Set the length of each HLS segment to 6 seconds. This is the basis for splitting the video into several smaller files.

* **-hls_playlist_type vod**: Set the type of HLS playlist to 'vod' (Video On Demand). This means that the entire video is pre-staged, providing pre-recorded content rather than live streaming.

* **-hls_segment_type fmp4**: Set the HLS segment type to 'fmp4' (Fragmented MP4). This creates segment files into small pieces in MP4 format.

* **-hls_segment_filename "/home/pizzadog/hls-root/hls/segment-%d.m4s"**: Specifies the storage path and name pattern for the HLS segment file. Here, %d represents the segment sequence number.

* **/home/pizzadog/hls-root/hls/index.m3u8**: Specifies the path and name of the HLS playlist file that will be ultimately created.

With this command, the pogo-lg.mp4 file is encoded at 720p resolution, split into video segments in HLS-compatible format, and an M3U8 playlist file is created referencing these segments. As a result, these files create VOD content that can be streamed across a variety of bandwidths and devices.


![FFmpeg finished Encoding](/assets/img/ubuntu/nginx/hls/hls_ffmpeg_complete_encoding.jpg)

If no other error message appears, the operation is completed successfully.

![FFmpeg finished Encoding](/assets/img/ubuntu/nginx/hls/hls_ffmpeg_segments_video.jpg)

If you then go into the relevant directory and check, you can confirm that the segmentation task has been completed after the H.264 encoding task.

### Configuring hls in nginx.conf file


```json
rtmp {

    server {

        listen 1935;

        chunk_size 4000;

        # HLS

        # For HLS to work please create a directory in tmpfs (/tmp/hls here)
        # for the fragments. The directory contents is served via HTTP (see
        # http{} section in config)
        #
        # Incoming stream must be in H264/AAC. For iPhones use baseline H264
        # profile (see ffmpeg example).
        # This example creates RTMP stream from movie ready for HLS:
        #
        # ffmpeg -loglevel verbose -re -i movie.avi  -vcodec libx264
        #    -vprofile baseline -acodec libmp3lame -ar 44100 -ac 1
        #    -f flv rtmp://localhost:1935/hls/movie
        #
        # If you need to transcode live stream use 'exec' feature.
        #
        application hls {
            live on;
            hls on;
            hls_path /home/pizzadog/hls-root/hls;
        }
    }
}

# HTTP can be used for accessing RTMP stats
http {

    server {
        listen      8080;
        location /hls {
            # Serve HLS fragments
            types {
                application/vnd.apple.mpegurl m3u8;
                video/mp2t ts;
            }
            root /home/pizzadog/hls-root;
            add_header Cache-Control no-cache;
        }

    }
}
```

Afterwards, you can configure the **nginx.conf** file settings according to your case.
The above example is my sample setup run with WSL. (You don’t have to follow it exactly.)

[Refer to RTMP-MODULE-DOCS](https://github.com/arut/nginx-rtmp-module)




```bash
$ cd /usr/local/nginx/sbin
$ sudo ./nginx -s reload

```

After modifying the settings, reload nginx once more.



### HLS Streaming Test

![HLS Streaming Test1](/assets/img/ubuntu/nginx/hls/hls_streaming_url.jpg)
![HLS Streaming Test2](/assets/img/ubuntu/nginx/hls/hls_streaming_test_01.png)
![HLS Streaming Test3](/assets/img/ubuntu/nginx/hls/hls_streaming_test_02.jpg)

You can confirm that HLS video streaming is successful.

<br>

> I will end this post about simple HLS streaming with Nginx.