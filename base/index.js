var post_atual = '';
var user_username =  '';

function postComments(comments){
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

        return html;
}

(function(apiUrl) {
  function getMe() {
    return fetch(apiUrl + "/me")
      .then(function(response) {
        return response.json();
      })
      .then(function(user) {
        const $username = document.getElementById("current-user-username");
        const $avatar = document.getElementById("current-user-avatar");

        user_username = user.username;
        
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

            post_atual = post;
            //console.log(uuid);
            
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
            
             $comments.innerHTML = postComments(post.comments);
             

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

  

  function initialize() {
    getMe();
    getPost();
  }

  initialize();
})("https://taggram.herokuapp.com");

function Enviar() {
  console.log("cheguei");
  var message = document.getElementById("new_comment").value;

  fetch(("https://taggram.herokuapp.com" + "/posts/"+post_atual.uuid+"/comments"), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username":user_username, "message":message})
  })
  .then(response => response.json())
  .then(function(data) { 
  console.log('data is', data);
  document.getElementById("comment-list").innerHTML = postComments(data);
  document.getElementById("qtd-comentarios").innerHTML = data.length + " comentários";
  document.getElementById("new_comment").value = "";
})
  .catch(error => console.log('error is', error));
    
}
  



//navagadores
