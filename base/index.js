(function(apiUrl) {
  function getMe() {
    return fetch(apiUrl + "/me")
      .then(function(response) {
        return response.json();
      })
      .then(function(user) {
        const $username = document.getElementById("current-user-username");
        const $avatar = document.getElementById("current-user-avatar");
        
        $username.innerHTML = user.username;

        if (user.avatar) {
          $avatar.style.backgroundImage = "url('" + user.avatar + "')";
        }
      });
    }

      function getPost() {
        return fetch(apiUrl + "/post")
          .then(function(response) {
            return response.json();
          })
          .then(function(post) {
            const $photo = document.getElementById("photo");
            const $avatar = document.getElementById("author-avatar");
            const $username = document.getElementById("author-username");
            const $info = document.getElementById("author-info");

            const location = post.location;
            $info.innerHTML = location.city+", "+location.country; 

            const user = post.user;
            $username.innerHTML = user.username;
           
    
            if (post.photo) {
              $photo.style.backgroundImage = "url('" + post.photo + ".jpg')";
            }

            if (user.avatar) {
              $avatar.style.backgroundImage = "url('" + post.photo + "')";
            }
          });
        }

        function pegaTamanho(){
          //pega a resolução
          var w = screen.availWidth;
          var h = screen.availHeight;
          //resolução
          //define o sistema operacional
          var OSName="Unknown OS";
          if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
          if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
          if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
          if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
          //sistema operacional

          //navegadores
          // mozilla firefox
          if ($.browser.mozilla == true) {
            console.log('sistema operacional: '+ OSName +'\n'+ w +'x'+ h +'\n'+'  Firefox / Versão:' + $.browser.version);
            // internet explorer
          } else if($.browser.msie == true) {
            console.log('sistema operacional: '+ OSName +'\n'+ w +'x'+ h +'\n'+'  Internet Explorer / Versão:' + $.browser.version);
          // webkit
          } else if($.browser.webkit == true) {
            console.log('sistema operacional: '+ OSName +'\n'+ w +'x'+ h +'\n'+'  Navegador baseado em WebKit / Versão:' + $.browser.version);
          // outros navegadores
          } else {
            console.log('sistema operacional: '+ OSName + 'Outros nevegadores');
          }
        }
  

  function initialize() {
    getMe();
    getPost();
    pegaTamanho();
  }

  initialize();
})("https://taggram.herokuapp.com");


//navagadores
