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
            const $qtd_comentarios = document.getElementById("qtd-comentarios");
            const $data = document.getElementById("data");
            const $comments = document.getElementById("comment-list");

            const location = post.location;
            $info.innerHTML = location.city+", "+location.country;

            const comments = post.comments;
            $qtd_comentarios.innerHTML = comments.length + " comentários";

            var month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  
             const datac= new Date(post.created_at); 
             $data.innerHTML = datac.getDate() + " de " + month[datac.getMonth()] ;
            
             var html = '';
             var altura = 0;
             const data_atual = new Date().getHours();
             var horas_comment;

             for(var i = 0; i<comments.length; i++)
             {
               const comment = comments[i];
               horas_comment = data_atual - new Date(comment.created_at).getHours();

              html +='<div class="comment" id="comment">'+
              '<div class="comment__info" "><b>'+
              comment.user.username+'</b>'+' '+comment.message+'</div>'+
              '<div class="comment__avatar" ">'+
                '<img src="'+comment.user.avatar+'" class="img_comment">'+
              '</div>'+'<div class="comment__time"">'+
                horas_comment+'h'+
            '</div>'+
            '</div>';
              
            
              //altura = document.getElementById("comment")
             }

             $comments.innerHTML = html;
             

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
