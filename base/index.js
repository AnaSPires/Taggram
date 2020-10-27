// guarda o post para quando for enviar uma mensagem
var post_atual = '';

// guarda o username do usuário para quando for enviar uma mensagem
var user_username =  '';

// função que exibe todos os comentários
function postComments(comments){
  var html = '';
        var altura = 0;
        const data_atual = new Date().getHours();
        var horas_comment;
        var cod_avatar;

        for(var i = 0; i<comments.length; i++)
        {
          const comment = comments[i];
          horas_comment = data_atual - new Date(comment.created_at).getHours();
          if(comment.user.avatar)
          cod_avatar = '<img src="'+comment.user.avatar+'" class="img_comment">';
          else
          cod_avatar='';
        
          html +='<div class="comment" id="comment">'+
          '<div class="comment__info" "><b>'+
          comment.user.username+'</b>'+' '+comment.message+'</div>'+
          '<div class="comment__avatar" ">'+cod_avatar+
          '</div>'+'<div class="comment__time"">'+
            horas_comment+'h'+
        '</div>'+
        '</div>';
        }
        // retorna o código html pronto com todos os comentários
        return html;

}

(function(apiUrl) {
  function getMe() {
    return fetch(apiUrl + "/me")
      .then(function(response) {
        return response.json();
      })
      .then(function(user) {
        if(data.type == "user_not_found")
        alert("Fique tranquilo = ) O usuário não foi encontrado, apenas recarregue a página");
        
        else{
        const $username = document.getElementById("current-user-username");
        const $avatar = document.getElementById("current-user-avatar");

        user_username = user.username;
        
        $username.innerHTML = user.username;

        if (user.avatar) {
          $avatar.style.backgroundImage = "url('" + user.avatar + "')";
        }
      }
      });
    }

      // função para pegar o post pela api e exibí-la
      function getPost() {
        return fetch(apiUrl + "/post")
          .then(function(response) {
            return response.json();
          })
          .then(function(post) {
            if(data.type == "post_not_found")
            alert("Fique tranquilo = ) O post não foi encontrado, apenas recarregue a página");
            
            else{
            post_atual = post;
            
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
            
            // vetor que serve para exíbir na tela pelo nome, já que na api 
            //só há o número do mês, lembrando que o vetor começa na posição 0

            var month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", 
            "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  
             const datac= new Date(post.created_at); 
             $data.innerHTML = datac.getDate() + " de " + month[datac.getMonth() - 1] ;
            
             $comments.innerHTML = postComments(post.comments);
             
            const user = post.user;
            $username.innerHTML = user.username;
           
    
            if (post.photo) {
              $photo.style.backgroundImage = "url('" + post.photo + ".jpg')";
            }

            if (user.avatar) {
              $avatar.style.backgroundImage = "url('" + post.photo + "')";
            }
          }
            
          });
        }

  

  function initialize() {
    getMe();
    getPost();
  }

  initialize();
})("https://taggram.herokuapp.com");

// função chamada quando o botão é clicado, adiciona o comentário na api 
// e exibe os comentários novamente
function Enviar() {
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
  if(data.type == "random_error")
  alert("Fique tranquilo = ) Você caiu na probabilicade de 33%, apenas recarregue a página");
  
  else{
    document.getElementById("comment-list").innerHTML = postComments(data);
    document.getElementById("qtd-comentarios").innerHTML = data.length + " comentários";
    document.getElementById("new_comment").value = "";
  }
})
.catch(function(error){
  console.log(error);
})
  
    
}
  



//navagadores
