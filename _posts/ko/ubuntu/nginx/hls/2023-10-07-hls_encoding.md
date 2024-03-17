---
layout: post
title:  "HLS 스트리밍 파일로 인코딩하기"
permalink: /ko/:categories/encoding
date:  2023-10-07 22:04:15
categories: ubuntu nginx hls
excerpt: avi, mkv, wmv 포맷과 같은 일반 비디오 포맷은 HLS 스트리밍을 할수없습니다. H.264로 인코딩을 해주어야하는데 FFmpeg 라는 소프트웨어를 활용하여 인코딩 작업을 하도록 하겠습니다. 
thumbnail: /ubuntu/nginx/hls/hls_thumbnail_01.jpg
---


![HLS Thumbnail Image](/assets/img/ubuntu/nginx/hls/hls_thumbnail_01.jpg)


## 적합한 비디오 포맷은?

HLS 스트리밍은 특정 형식과 기준을 따르는데, 이는 주로 MPEG-2 Transport Stream (TS) 파일 형식과 연결되어 있습니다. HLS 스트리밍을 위해서는 비디오 콘텐츠가 이 포맷으로 인코딩되어야 하며, 적절한 코덱(보통 H.264 비디오 코덱과 AAC 오디오 코덱)을 사용해야 합니다.

먼저 콘텐츠를 HLS 스트리밍에 적합한 포맷(예: MP4)으로 변환하고, 이를 세그먼트화하여 M3U8 플레이리스트 파일과 함께 제공해야 합니다.

이 과정에는 적절한 비디오 변환 및 세그먼트화 도구가 필요하며, 이러한 작업은 서버 측에서 처리되어야 할 수 있습니다. FFmpeg와 같은 도구는 이러한 변환과 세그먼트화 작업을 수행하는 데 널리 사용됩니다. FFmpeg는 다양한 비디오 포맷을 HLS 호환 포맷으로 변환하고, 비디오를 적절한 길이의 세그먼트로 나누며, M3U8 플레이리스트 파일을 생성하는 기능을 제공합니다.


> MP4는 비디오 파일의 컨테이너 포맷이고, H.264는 비디오 코덱입니다. MP4 포맷은 H.264 코덱으로 압축된 비디오를 포함할 수 있지만, MP4 파일이 반드시 H.264 코덱을 사용하는 것은 아닙니다. MP4는 H.265(HEVC), MPEG-4 Part 2, AVC 등 다른 비디오 코덱들도 지원합니다.


## 적합한 포맷으로 인코딩 하기위해 필요한 도구는?

**FFmpeg**은 매우 강력하고 유연한 멀티미디어 프레임워크로, 비디오, 오디오 및 기타 멀티미디어 파일과 스트림을 기록, 변환 및 스트리밍하는 데 널리 사용됩니다. 이 도구는 오픈 소스이며 크로스 플랫폼으로, 다양한 운영 체제에서 사용할 수 있습니다. FFmpeg의 주요 기능은 다음과 같습니다:

1. 비디오 및 오디오 변환: FFmpeg은 다양한 비디오 및 오디오 포맷 간에 변환할 수 있는 강력한 기능을 제공합니다. 사용자는 이 도구를 사용하여 파일 포맷을 변환하거나, 비디오 해상도를 조정하거나, 비디오와 오디오 스트림의 비트레이트를 조절할 수 있습니다.

2. 스트리밍: FFmpeg은 라이브 스트림을 처리하고 생성할 수 있습니다. 이를 통해 사용자는 인터넷을 통해 실시간 비디오와 오디오 콘텐츠를 방송할 수 있습니다.

3. 비디오 편집: 비록 전문 비디오 편집 소프트웨어만큼 직관적이거나 기능이 풍부하지 않지만, FFmpeg은 기본적인 비디오 편집 기능을 제공합니다. 예를 들어, 비디오를 자르거나, 여러 비디오 클립을 결합하거나, 비디오에 오디오 트랙을 추가할 수 있습니다.

4. 코덱 지원: FFmpeg은 많은 비디오 및 오디오 코덱을 지원하며, 이로 인해 거의 모든 형태의 멀티미디어 파일을 처리할 수 있습니다.

5. 라이브러리 및 개발자 도구: FFmpeg은 몇 가지 핵심 라이브러리(Libavcodec, Libavformat 등)를 제공하여, 다른 소프트웨어 프로젝트에서 비디오/오디오 처리 기능을 쉽게 통합할 수 있도록 합니다.

FFmpeg은 명령줄 인터페이스(CLI)를 통해 사용되며, 그 사용법은 매우 유연하지만 복잡할 수 있습니다. 강력한 기능과 유연성으로 인해 비디오 제작자, 방송사, IT 전문가, 소프트웨어 개발자 등 다양한 사용자가 선호합니다.


### FFmpeg 설치하기

```bash
$ sudo apt update
$ sudo apt install ffmpeg
```

우선을 ffmpeg 를 설치해줍니다.


### Sample Video 를 다운로드하기

[샘플 비디오 다운로드 링크](https://drive.google.com/drive/folders/1P7-_se8T3OVL7NIL8E9McwMdCPN1bRcb?usp=drive_link)를 통해서 샘플 비디오를 다운로드 해줍니다.

WSL 유저라면 비디오 파일을 리눅스 사용자 폴더에 옮기거나 별도 서버를 가지고 소유하고 있는 사용자라면 자신의 서버 사용자 디렉토리에 옮겨줍니다.
저는 mp4 디렉토리를 만들어 넣어두도록 하겠습니다.


```bash
$ cd ~ // 사용자 디렉토리에 접근
$ mkdir hls-root 
$ cd hls-root 
$ mkdir hls mp4 
```


사용자 디렉토리에서 임의의 디렉토리를 1개 만들고 그 안에 디렉토리 2개를 추가로 더 만들어줍니다.
* hls-root (hls 서버의 루트디렉토리)
* hls  ( 인코딩 되어진 영상의 세그먼트들을 모아둘 디렉토리) 
* mp4  (위에서 압축해제한 mp4 파일을 담아둘 디렉토리 )


### FFmpeg 로 영상을 인코딩 및 조각화하기

```bash
$ cd mp4
$ sudo ffmpeg -y \
  -i pogo-lg.mp4 \  // 인코딩 이후 세그먼트화 시킬 미디어파일
  -force_key_frames "expr:gte(t,n_forced*2)" \
  -sc_threshold 0 \
  -s 1280x720 \
  -c:v libx264 -b:v 1500k \
  -c:a copy \
  -hls_time 6 \
  -hls_playlist_type vod \
  -hls_segment_type fmp4 \
  -hls_segment_filename "/home/pizzadog/hls-root/hls/segment-%d.m4s" \  //세그먼트 파일들을 저장할 경로
  /home/pizzadog/hls-root/hls/index.m3u8  // 인덱스 파일을 저장할 경로 (보통 세그먼트와 같이 묶어줍니다.)
```

해당 명령어를 실행하면 FFmpeg 가 실시간 인코딩 작업 및 세그먼트화 작업을 실행합니다.


이 FFmpeg 명령어는 pogo-lg.mp4 비디오 파일을 HLS(HTTP Live Streaming) 포맷으로 변환하는 과정을 수행합니다. 명령어의 각 부분은 다음과 같은 작업을 지시합니다:

sudo ffmpeg: 관리자 권한으로 FFmpeg 프로그램을 실행합니다. FFmpeg는 비디오 및 오디오 변환, 처리 등을 위한 강력한 도구입니다.

* -y: 출력 파일이 이미 존재하는 경우 덮어쓰기를 수행합니다.

* -i pogo-lg.mp4: 입력 파일로 pogo-lg.mp4를 사용합니다.

* -force_key_frames "expr:gte(t,n_forced*2)": 키 프레임을 강제로 삽입하는 규칙을 설정합니다. 이 표현식은 "각 n_forced*2초마다 키 프레임을 강제로 삽입하라"는 것을 의미합니다. 예를 들어, n_forced가 1이면 매 2초마다 키 프레임이 삽입됩니다. 키 프레임은 비디오 스트리밍이나 편집에서 중요한 참조점을 제공합니다.

* -sc_threshold 0: 장면 전환 감지를 비활성화합니다. 이는 비디오 내에서 자동으로 장면 전환이 감지되는 것을 방지하고, -force_key_frames 옵션에 의해서만 키 프레임이 결정되도록 합니다.

* -s 1280x720: 출력 비디오의 해상도를 1280x720(720p)로 설정합니다.

* -c:v libx264: 비디오 코덱으로 libx264를 사용합니다. 이 코덱은 H.264/MPEG-4 AVC 비디오 스트림을 인코딩하는 데 사용됩니다.

* -b:v 1500k: 비디오 비트레이트를 초당 1500킬로비트로 설정합니다. 이는 비디오의 품질과 파일 크기를 결정하는 중요한 요소입니다.

* -c:a copy: 오디오 코덱에 대해 '복사' 옵션을 사용합니다. 이는 오디오 스트림을 변환하지 않고 원본을 그대로 유지한다는 의미입니다.

* -hls_time 6: 각 HLS 세그먼트의 길이를 6초로 설정합니다. 이는 비디오를 여러 개의 작은 파일로 분할하는 기준이 됩니다.

* -hls_playlist_type vod: HLS 플레이리스트의 타입을 'vod'(Video On Demand)로 설정합니다. 이는 비디오 전체가 미리 준비되어 있음을 의미하며, 라이브 스트리밍이 아닌, 사전에 녹화된 콘텐츠를 제공합니다.

* -hls_segment_type fmp4: HLS 세그먼트 타입을 'fmp4'(Fragmented MP4)로 설정합니다. 이는 세그먼트 파일을 MP4 형식의 작은 조각으로 만듭니다.

* -hls_segment_filename "/home/pizzadog/hls-root/hls/segment-%d.m4s": HLS 세그먼트 파일의 저장 경로와 이름 패턴을 지정합니다. 여기서 %d는 세그먼트 순번을 나타냅니다.

* /home/pizzadog/hls-root/hls/index.m3u8: 최종적으로 생성될 HLS 플레이리스트 파일의 경로와 이름을 지정합니다.

이 명령어를 통해, pogo-lg.mp4 파일은 720p 해상도로 인코딩되고, HLS 호환 포맷의 비디오 세그먼트로 분할되며, 이 세그먼트들을 참조하는 M3U8 플레이리스트 파일이 생성됩니다. 결과적으로, 이 파일들을 이용하여 다양한 대역폭과 장치에서 스트리밍할 수 있는 VOD 콘텐츠가 준비됩니다.


![FFmpeg finished Encoding](/assets/img/ubuntu/nginx/hls/hls_ffmpeg_complete_encoding.jpg)

별 다른 에러메시지가 나타나지 않으면 성공적으로 작업이 완료됩니다.

![FFmpeg finished Encoding](/assets/img/ubuntu/nginx/hls/hls_ffmpeg_segments_video.jpg)

이후 해당 디렉토리로 들어가서 확인해보면 해당 H.264 인코딩 작업 이후 세그먼트 작업이 완료된 것을 확인할 수 있습니다.


### nginx.conf 파일에서 hls 설정하기


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

이후 **nginx.conf** 파일설정은 사용자의 케이스에 맞춰서 설정해주시면 됩니다.
위의 예시는 WSL 로 실행한 제 샘플설정파입니다. (똑같이 따라하실 필요없습니다.)
자세한 사항은 [RTMP-MODULE-DOCS](https://github.com/arut/nginx-rtmp-module)를 참조하시면 됩니다.




```bash
$ cd /usr/local/nginx/sbin
$ sudo ./nginx -s reload

```

설정을 수정한 이후에는 nginx 를 한번 더 reload 해줍니다.



### HLS 스트리밍 테스트

![HLS Streaming Test1](/assets/img/ubuntu/nginx/hls/hls_streaming_url.jpg)
![HLS Streaming Test2](/assets/img/ubuntu/nginx/hls/hls_streaming_test_01.png)
![HLS Streaming Test3](/assets/img/ubuntu/nginx/hls/hls_streaming_test_02.jpg)

성공적으로 HLS 영상 스트리밍이 되는 것을 확인할 수 있습니다.

<br>

> Nginx 로 간단하게 HLS 스트리밍을 해보는 포스팅은 여기서 끝마치도록 하겠습니다.