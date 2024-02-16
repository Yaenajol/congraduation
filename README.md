<div align='center'>

# :mortar_board: 얘들아 나 졸업해!!

<p align='center'>

<img src="/uploads/876df0af63931d868ec2f12915a8418d/logo.png" width="40%">
<img src="/uploads/71434a3913224259b5a166dca949ca08/dogimo.png" width="20%">

</p>

</div>

<br>

# :date: 프로젝트 개요

| 프로젝트 기간 | 2024.01.03 ~ 2024.02.16 (총 7주) |
| ------------- | -------------------------------- |

https://zest-fact-d42.notion.site/0169c665e8c14220bcc2c57fa561cf65
<br>
(프로젝트 notion)

### 기획 배경

<div>

졸업식은 많은 사람들에게 특별한 순간입니다. 그동안 함께한 친구들과의 소중한 추억을 함께 공유하고 싶어하지만, 때로는 예상치 못한 일정 변경이나 거리로 인해 함께하지 못하는 경우가 있습니다. 이런 상황에서도 친구들과의 추억을 공유할 수 있는 방법이 필요했습니다. '사진 롤링페이퍼'는 이러한 고민을 해결하기 위해 탄생했습니다.

</div>

### 프로젝트 설명

<div>

'사진 롤링페이퍼'는 사용자들이 졸업식 전까지 함께 찍은 사진들을 모아 졸업식 다음날 함께 볼 수 있는 온라인 플랫폼입니다. 사용자들은 친구들과의 소중한 순간을 담은 사진을 선택하여 네컷 프레임에 담고, 개인적인 메시지와 함께 전송할 수 있습니다. 이를 통해 졸업식에 참석하지 못하는 사람들도 각자의 시간에 맞춰 사진을 공유하고, 함께한 추억을 되새기며 졸업식의 특별한 순간을 함께할 수 있습니다. '사진 롤링페이퍼'는 친구들 간의 연결을 강화하고, 소중한 순간을 온라인으로 공유함으로써 졸업식을 더욱 특별하게 만들어줍니다.
<br>
<br>
https://zest-fact-d42.notion.site/cf83737962c04bb1b543becaafa94791
<br> (프로젝트 요약)

</div>

<br>
<br>

# 📖목차

- [README](#readme)
  - [🎥 시연 영상](#-시연-영상)
  - [❤ 역할](#-역할)
  - [📂 파일 구조](#-파일-구조)
  - [🛠 기술 스택](#-기술-스택)
  - [🏗️ 아키텍쳐](#-아키텍쳐)
  - [📝 설계 문서](#-설계-문서)
    - 요구사항 명세서
    - ERD
      - API 명세서
    - 와이어 프레임
  - [💾 결과물](#-결과물)
  - [💻 구동 방법](#-구동-방법)
  - [🖥 회고](#-회고)

<br>
<br>

# 🎥 시연 영상

<div align="center">

### 메모리 업로드

![memoryupload](/uploads/607c73be2f28a02317b3da5975e7d2e4/memoryupload.gif)
<br>
총 4장의 사진과 별명, 메세지를 작성하여 특정 앨범에 메모리를 등록합니다.

### 메모리 확인

![checkmomery](/uploads/2f7ada6079c3d85554ea86e59b43ac31/checkmomery.gif)
<br>
졸업일 이후에 앨범의 주인은 각각의 메모리를 모달창을 통해 확인할 수 있습니다

### 카카오 공유

![linkshare](/uploads/3408e0107e21e73d6d84ac4414cfad88/linkshare.gif)
<br>
카카오 공유 API를 통해 카카오톡과 연계하여 앨범 링크를 공유할 수 있습니다.

### 메모리 다운로드

![download](/uploads/8aebc3d8610af07f2b2d8148cdcae1b3/download.gif)
<br>
또한 지인이 작성해준 메모리를 선택하여 압축파일로 다운로드를 받을 수 있습니다.

#### 압축 해제 후

![image](/uploads/66246326f4424290f399dc4ab0d85c4b/image.png)

#### 다운로드 된 메모리 한 장

![image_13](/uploads/28c512627a0fdaed7a547127c2310ac5/image_13.png)

</div>

<br>

# ❤ 역할

| **[조민준]**  | **[문경림]** | **[박소현]** |                                  **[박성인](https://github.com/psi7218)**                                   | **[이용준]** | **[서정현]** |
| :-----------: | :----------: | :----------: | :---------------------------------------------------------------------------------------------------------: | :----------: | :----------: |
|               |              |              | [<img src="https://avatars.githubusercontent.com/u/133967948?v=4" width="400">](https://github.com/psi7218) |              |              |
| Frontend/팀장 |   Frontend   |   Backend    |                                                  Frontend                                                   | Backend/발표 |   Backend    |

<br/>

<br>

# 📂 파일 구조

### Front

```
📦front
 ┣ 📂build
 ┣ 📂node_modules
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂button
 ┃ ┃ ┣ 📂font
 ┃ ┃ ┣ 📂images
 ┃ ┃ ┣ 📂page
 ┃ ┃ ┣ 📂spinner
 ┃ ┃ ┣ 📂store
 ┃ ┃ ┗ 📂styledComponents
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.js
 ┃ ┣ 📜App.test.js
 ┃ ┣ 📜globalStyle.js
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.js
 ┃ ┣ 📜reportWebVitals.js
 ┃ ┗ 📜setupTests.js
 ┣ 📜.env.development
 ┣ 📜.env.production
 ┣ 📜.gitignore
 ┣ 📜Dockerfile
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜README.md
```

### Back

```
📦backend
 ┣ 📂.gradle
 ┣ 📂.idea
 ┣ 📂build
 ┣ 📂gradle
 ┣ 📂out
 ┣ 📂src
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂generated
 ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂ssafy
 ┃ ┃ ┃ ┃ ┃ ┗ 📂backend
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂errorcode
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜GlobalExceptionHandler.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂jwt
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mattermost
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂sender
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MMFeedbackManager.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂model
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FeedbackDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MattermostIncomingDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MattermostIncomingProperties.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MattermostOutgoingDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂stomp
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂util
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜BackendApplication.java
 ┃ ┃ ┗ 📂resources
 ┃ ┃ ┃ ┣ 📂static
 ┃ ┃ ┃ ┗ 📂templates
 ┃ ┗ 📂test
 ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂ssafy
 ┃ ┃ ┃ ┃ ┃ ┗ 📂backend
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜BackendApplicationTests.java
 ┣ 📜build.gradle
 ┣ 📜Dockerfile
 ┣ 📜gradlew
 ┣ 📜gradlew.bat
 ┗ 📜settings.gradle
```

<br>
<br>

# 🛠 기술 스택

### Front

- Visual Studio Code : x64-1.85.1
- Node.js : v20.10.0
- React : v18.2.0
- react-router-dom : v6.21.3
- recoil : v0.7.7
- axios : ^1.6.5

- APIs
  - KAKAO LINK API
  - KAKAO LOGIN API
- Library
  - html2canvas v1.4.1
  - @mui
  - js-file-download v0.4.12
  - jszip : v3.10.1
  - @stomp/stompjs : v7.0.0
  - dajjs. v.1.11.10
  - moment : ^2.30.1

### Back

- Intellij : 2023.3.2
- Spring-boot : 3.2
- Java : jdk 17.0.9 2023-10-17 LTS

### DB

- Amazon S3
- MySQL : 8.0.34

### CI/CD

- Docker
- Jenkins
- NGINX

### 협업 툴

- GitLab
- Notion
- JIRA
- MatterMost
- Webex
- Gerrit

<br>
<br>

# 🏗️ 아키텍쳐

![CICD__1_](/uploads/0caa2f638b1183b7fc4a553c10c8edcd/CICD__1_.png)

<br>

# 📝 설계 문서

### 요구사항 명세서

<details>
<summary>요구사항 명세서</summary>
<div markdown="1">       
    ![image](/uploads/592e868ceb8c521435ac3544c76df16d/image.png)

</div>
https://zest-fact-d42.notion.site/a375431242fd4360950edc156236184d?v=0dd40bfe21e34aeb8f5b940508d94105
</details>

### ERD

<details>
<summary>ERD</summary>
<div markdown="1">       
    ![image](/uploads/1ddb5cf4e002aa8fb5eb478040932b40/image.png)

</div>
https://www.notion.so/ERD-2839ae0ee9154a77b3afcc9437c01f10
</details>

### API 명세서

<details>
<summary>API 문서</summary>
<div markdown="1">       
    ![image](/uploads/6c388cab9f4926be06773afc7d485a0b/image.png)

</div>
https://www.notion.so/API-b9e2afe99a9f4adfb3ad059cca08a888
</details>

### 와이어 프레임

<details>
<summary>와이어 프레임</summary>
<div markdown="1">       
    ![image](/uploads/24a055381853cc820ff7c4a4009de650/image.png)

</div>
https://zest-fact-d42.notion.site/98a70919678b40cabaac94fdf2135188
</details>

<br>

# 💾 결과물

### UCC

-링크 추가

### GA

<details>
<summary>GA</summary>
<div markdown="1">       
![image](/uploads/aba93cb825eee78d904fdce43ffe1066/image.png)
</div>
</details>

### 트래픽

<details>
<summary>트래픽 조사</summary>
<div markdown="1">

![image__1_](/uploads/69424bd2a21d5284e25a81fb17cfb914/image__1_.png)
![image__2_](/uploads/266b77a5d37d8948abf323f9f82a1d7f/image__2_.png)

</div>
</details>

<br>

# 💻 구동 방법

### Front

1. Clone Project

```
git clone (추가해야됨)
```

2. Change path to front and install

```
npm i
```

3. Create .env file

```
# .env.development
REACT_APP_BACKEND_API_URL=http://codakcodak.site:8001/backend
REACT_APP_KAKAO_NATIVE_APP_KEY={YOUR_KAKAO_REST_API_KEY}
REACT_APP_KAKAO_RESTAPI_KEY={YOUR_KAKAO_REST_API_KEY}
REACT_APP_KAKAO_JAVASCRIPT_KEY={YOUR_KAKAO_REST_API_KEY}
REACT_APP_KAKAO_ADMIN_KEY={YOUR_KAKAO_REST_API_KEY}
REACT_APP_BACKEND_DOMAIN_URL=codakcodak.site:8001/backend

# .env.production
REACT_APP_BACKEND_API_URL=https://congraduation.me/backapi
REACT_APP_KAKAO_NATIVE_APP_KEY={YOUR_KAKAO_REST_API_KEY}
REACT_APP_KAKAO_RESTAPI_KEY={YOUR_KAKAO_REST_API_KEY}
REACT_APP_KAKAO_JAVASCRIPT_KEY={YOUR_KAKAO_REST_API_KEY}
REACT_APP_KAKAO_ADMIN_KEY={YOUR_KAKAO_REST_API_KEY}
REACT_APP_BACKEND_DOMAIN_URL=congraduation.me/backapi
```

4. Frontend start

```
npm start
```

<br>

# 🖥 회고
