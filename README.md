<div align='center'>

# :mortar_board: 얘들아 나 졸업해!! 


![logo](/uploads/876df0af63931d868ec2f12915a8418d/logo.png)


</div>




<br>

# :date: 프로젝트 개요


| 프로젝트 기간 | 2024.01.?? ~ 2024.02.16 (총 7주) |
| --- | --- |

<br/>

### 기획 배경

<div>

졸업식은 많은 사람들에게 특별한 순간입니다. 그동안 함께한 친구들과의 소중한 추억을 함께 공유하고 싶어하지만, 때로는 예상치 못한 일정 변경이나 거리로 인해 함께하지 못하는 경우가 있습니다. 이런 상황에서도 친구들과의 추억을 공유할 수 있는 방법이 필요했습니다. '사진 롤링페이퍼'는 이러한 고민을 해결하기 위해 탄생했습니다.

</div>


<br>
<br>


### 프로젝트 설명 

<div>

'사진 롤링페이퍼'는 사용자들이 졸업식 전까지 함께 찍은 사진들을 모아 졸업식 다음날 함께 볼 수 있는 온라인 플랫폼입니다. 사용자들은 친구들과의 소중한 순간을 담은 사진을 선택하여 네컷 프레임에 담고, 개인적인 메시지와 함께 전송할 수 있습니다. 이를 통해 졸업식에 참석하지 못하는 사람들도 각자의 시간에 맞춰 사진을 공유하고, 함께한 추억을 되새기며 졸업식의 특별한 순간을 함께할 수 있습니다. '사진 롤링페이퍼'는 친구들 간의 연결을 강화하고, 소중한 순간을 온라인으로 공유함으로써 졸업식을 더욱 특별하게 만들어줍니다.

</div>


# 📖목차 
- [README](#readme)
	- [🔑 주요 기능](#-주요-기능)
	- [🎥 시연 영상](#-시연-영상)
	- [❤ 역할](#-역할)
	- [📂 파일 구조](#-파일-구조)
	- [🛠 기술 스택](#-기술-스택)
	- [🏗️ 아키텍쳐](#-아키텍쳐)
	- [📝 설계 문서](#-설계-문서)
	    - [ERD](#erd)
	    - [API](#api)
        - [FIGMA](#FIGMA)

	- [💾 결과물](#-결과물)
	
	- [🖥 회고](#-회고)


<br>
<br>

# 🔑 주요 기능 

#### 주요기능1



#### 주요기능2 


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



# ❤ 역할

|        | Part      | Detail                                                                                                 |
| ------ | --------- | ------------------------------------------------------------------------------------------------------ |
|  | Front-End |                            |
|  | Front-End  |                             |
|  | Front-End  |                           |
|  | Back-End  |                            |
|  | Back-End |                          |
|  | Back-End |                            |

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

- Node v20.10.0
- React v18.2.0
- react-router v6.21.3
- 상태관리 라이브러리
  - recoil v0.7.7
- Socket.io-client v1.0.34
- JSX

- APIs
  - KAKAOLINK API
  - KAKAO LOGIN API
- Library
	- html2canvas v1.4.1
	- @mui 
	- js-file-download v0.4.12
	
### Back
- 작성해야됨 

### DB

- Amazon S3
- MySQL

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


<br>
<br>


# 🏗️ 아키텍쳐


#### 뭔 글을 써야 가지나?
  -사진  추가







# 📝 설계 문서


### 요구사항 명세서


### ERD


### API 명세서


### 와이어 프레임



# 💾 결과물



# 🖥 회고 
