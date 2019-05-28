### Free_chat
> 실시간 그룹채팅

node.js의 socket.io를 활용한 실시간 그룹채팅

 # 처음메인화면
![chat1](https://user-images.githubusercontent.com/49370287/58519743-ce4f9680-81ef-11e9-8deb-294de0ff672f.png)
 # 채팅테스트화면
![chat2](https://user-images.githubusercontent.com/49370287/58519633-72850d80-81ef-11e9-91dc-c6d42fd2409b.png)


## 사용 예제
# *app.js

//새로운 유저 접속
```
  socket.on('newuser', function(name) {
    console.log(name + ' login');
    socket.name = name;
    io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속'});
  });
```
//채팅메시지
```
  socket.on('message', function(data) {
    data.name = socket.name;
    console.log(data);
    socket.broadcast.emit('update', data);
  })
```
//접속종료
```
  socket.on('disconnect', function() {
    console.log(socket.name + 'logout');
    socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나감'});
  });
```
# *index.html
//body
```<body >
    <h1 id="h1">Free_Chat</h1>
    <div id="btnform">
      <input id="id" type="text" placeholder="Unknown" >  
      <button id="btnlogin"  onclick="login()">Connect</button>
    </div>
      

    <div id="main">
        <button id="btnlogout" onclick="logout()">X</button>
      <div id="chat"></div>  
      <div>
        <input type="text" id="text" placeholder="   Write here.." onkeydown="JavaScript:press();">
        <button id="btn" onclick="send()">SEND</button>
      </div>
    </div>
  </body>
```
*js
```
//엔터 이벤트
    function press(){
      if(event.keyCode == 13){
        send();
      }
    };
```
//최신화시 스크롤 하단 고정 이벤트
```
    var autoScroll = function() { 
      document.getElementById('chat').scrollTop = document.getElementById('chat').scrollHeight;
    };
```
//로그인 이벤트
```
    function login(){
      var main = document.getElementById('main');
      var btnlogout =document.getElementById('btnlogout');
        main.style.visibility = 'visible';
      var name =document.getElementById('id').value;
      
      /*이름이 빈칸인 경우 익명 + 랜덤 숫자*/
      if(!name) {
        name = 'Unknown'+Math.floor(Math.random() * 100) + 1;
      }
      var name1 =document.getElementById('id');
      var btnlogin =document.getElementById('btnlogin');
      var h1 =document.getElementById('h1');
        name1.style.visibility = 'hidden';
        h1.style.visibility = 'hidden';
        btnlogin.style.visibility = 'hidden';
        btnlogout.style.visibility = 'visible';
        socket.emit('newuser', name);
    };
```
//로그아웃시 새로고침 이벤트
```
    function logout(){
      location.href="/";
    };
```
//서버로부터 받아오기
```
    socket.on('update', function(data) {
      var chat = document.getElementById('chat');
      var message = document.createElement('div');
      var node = document.createTextNode(`${data.name}: ${data.message}`);
      var className = '';

/* 타입에 따라 적용할 클래스를 다르게 지정 */
      switch(data.type) {
  //상대방 메세지
        case 'message':
          className = 'other'
          break;
  //접속
        case 'connect':
          className = 'connect'
          break;
  //접속 종료
        case 'disconnect':
          className = 'disconnect'
          break;
      };
      message.classList.add(className);
      message.appendChild(node);
      chat.appendChild(message);
    });
```
// 메시지 전송 이벤트 
```
    function send() {
      var message = document.getElementById('text').value;
      if(!message){
        alert('No text');
      }else{
        document.getElementById('text').value = '';
      var chat = document.getElementById('chat');
      var msg = document.createElement('div');
      var node = document.createTextNode(message);
        msg.classList.add('me');
        msg.appendChild(node);
        chat.appendChild(msg);
```        
// 서버로 message 이벤트 전달 + 데이터와 함께
```
      socket.emit('message', {type: 'message', message: message});
      
      autoScroll();
      }
    };
```


## 업데이트 내역

* 5.29
    * 첫  출시

## 정보

홍성현 - shh6155@naver.com
https://github.com/shh6155
