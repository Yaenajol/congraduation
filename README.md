<div align='center'>

# :mortar_board: 얘들아 나 졸업해!! 

<p align='center'>

<img src="https://github.com/Yaenajol/congraduation/assets/133967948/c2c08543-3e0a-4ee2-a253-55ec5b342feb" width="40%">
<img src="https://github.com/Yaenajol/congraduation/assets/133967948/beb9f8a7-1e8c-4d53-9af0-d7818dcb8556" width="20%">

</p>

</div>




<br>

# :date: 프로젝트 개요


| 프로젝트 기간 | 2024.01.03 ~ 2024.02.16 (총 7주) |
| --- | --- |

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
	- [🚧 시스템 아키텍쳐](#-시스템-아키텍쳐)
	- [📝 설계 문서](#-설계-문서)
	    - 요구사항 명세서
	    - ERD
        - API 명세서
		- 와이어 프레임
	- [💾 결과물](#-결과물)


<br>
<br>


# 🎥 시연 영상 

<div align="center">

### 메모리 업로드 
![memoryupload_optimized](https://github.com/Yaenajol/congraduation/assets/133967948/55607a36-e075-4645-a91b-488e4b6fc3cb)
<br>
	 총 4장의 사진과 별명, 메세지를 작성하여 특정 앨범에 메모리를 등록합니다.


### 메모리 확인 
![checkmomery](https://github.com/Yaenajol/congraduation/assets/133967948/198dddab-4f56-461b-941d-d5bb0299faf3)


<br>
	 졸업일 이후에 앨범의 주인은 각각의 메모리를 모달창을 통해 확인할 수 있습니다


### 카카오 공유

![linkshare](https://github.com/Yaenajol/congraduation/assets/133967948/1c1f5cbf-286d-4671-883f-1c80353e963a)
<br>
	 카카오 공유 API를 통해 카카오톡과 연계하여 앨범 링크를 공유할 수 있습니다.


### 1:1 문의(Mattermost)
![inquiry](https://github.com/Yaenajol/congraduation/assets/133967948/acf2c867-0bd5-464b-a514-76e33504c16b)

<br>
	websoket(stomp) 기능을 통해 Mattermost와 연동하여 실시간 피드백을 할 수 있습니다


### 메모리 다운로드 
![download](https://github.com/Yaenajol/congraduation/assets/133967948/7ac5da80-fa8a-4ac7-bc41-a89b0e67fb5d)
<br>
	 또한 지인이 작성해준 메모리를 선택하여 압축파일로 다운로드를 받을 수 있습니다.



#### 압축 해제 후 
![image](https://github.com/Yaenajol/congraduation/assets/133967948/f33e4a63-3990-45e9-a91d-621599d0ab1c)


#### 다운로드 된 메모리 한 장 
![image_13](https://github.com/Yaenajol/congraduation/assets/133967948/d0ee5d62-eb85-4125-be46-12f783f57945)

</div>

<br>

# ❤ 역할



|**[조민준](https://github.com/Cr0c0-MJ)**|**[문경림](https://github.com/moonsky737)**|**[박소현](https://github.com/sohoneyee)**|**[박성인](https://github.com/psi7218)**|**[이용준](https://github.com/37YongJun-LEE)**|**[서정현](https://github.com/Nliker)**|
| :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: |
|[<img src="https://avatars.githubusercontent.com/u/134778713?v=4" width="400">](https://github.com/Cr0c0-MJ) |[<img src="https://avatars.githubusercontent.com/u/148518497?v=4" width="400">](https://github.com/moonsky737) |[<img src="https://avatars.githubusercontent.com/u/139411346?v=4" width="400">](https://github.com/sohoneyee) |  [<img src="https://avatars.githubusercontent.com/u/133967948?v=4" width="400">](https://github.com/psi7218)  |  [<img src="https://avatars.githubusercontent.com/u/108706790?v=4" width="400">](https://github.com/37YongJun-LEE) | [<img src="https://avatars.githubusercontent.com/u/77044696?v=4" width="400">](https://github.com/Nliker) |
|Frontend/팀장|Frontend|Backend|Frontend|Backend/발표|Backend|



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


# 🚧 시스템 아키텍쳐

![CICD__1_](https://github.com/Yaenajol/congraduation/assets/133967948/c62b6dbd-5a54-48f6-8f30-3605e26ca2a9)

<br>

# 📝 설계 문서


### 요구사항 명세서

<details>
<summary>요구사항 명세서</summary>
<div markdown="1">       

![requirement](https://github.com/Yaenajol/congraduation/assets/133967948/0d90c733-d7c3-47d1-841c-076603c80968)
</div>
https://zest-fact-d42.notion.site/a375431242fd4360950edc156236184d?v=0dd40bfe21e34aeb8f5b940508d94105
</details>


### ERD

<details>
<summary>ERD</summary>
<div markdown="1">       
	
![erd](https://github.com/Yaenajol/congraduation/assets/133967948/c209135e-410a-48f1-b1ef-f9f8fcd281cb)
</div>
https://www.notion.so/ERD-2839ae0ee9154a77b3afcc9437c01f10
</details>

### API 명세서

<details>
<summary>API 문서</summary>
<div markdown="1">       
  
![api](https://github.com/Yaenajol/congraduation/assets/133967948/9fc63413-5085-4932-990b-cf9ab9cafcc0)
</div>
https://www.notion.so/API-b9e2afe99a9f4adfb3ad059cca08a888
</details>

### 와이어 프레임

<details>
<summary>와이어 프레임</summary>
<div markdown="1">       

 ![wire](https://github.com/Yaenajol/congraduation/assets/133967948/3df06d55-d6d8-41fe-a2e1-58a100619566)
</div>
https://zest-fact-d42.notion.site/98a70919678b40cabaac94fdf2135188
</details>

<br>

# 💾 결과물

### UCC

<details>
<summary>UCC</summary>
<div markdown="1">       
(https://lab.ssafy.com/s10-webmobile1-sub2/S10P12B107/uploads/274423460082be2e35ada327c260b1d8/UCC_%EC%B5%9C%EC%B5%9C%EC%A2%85.gif)
</div>
</details>

### GA

<details>
<summary>GA</summary>
<div markdown="1">       

![ga](https://github.com/Yaenajol/congraduation/assets/133967948/1f5c2e14-5acb-47f2-a9e9-e3849340aa40)

</div>
</details>

### 트래픽

<details>
<summary>트래픽 조사</summary>
<div markdown="1">       

![traffic1](https://github.com/Yaenajol/congraduation/assets/133967948/dac322bd-c4eb-4333-b71a-4b368f682c82)
![traffic2](https://github.com/Yaenajol/congraduation/assets/133967948/34e9426c-d4d7-4a19-8f0f-d6226a12c4dc)
</div>
</details>

<br>


