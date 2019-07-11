$(function() {
  function appendUser(html){
    $(`#user-search-result`).append(html);
  }

  function appendMembers(html){
    $('.chat-group-users').append(html);
    
  }

  function buildHTML(user) {
    var html = `<div id="user-search-result">
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add  " data-user-id="${user.id}" data-user-name="${user.name}">追加 </a>
            
                </div></div>`

     return html;

  }

  function buildMenberHTML(name,id) {
      var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${id}">
                    <input name="group[user_ids][]" type="hidden" value="${id}">
                    <p class="chat-group-user__name">${name}</p>
                    <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                  </div></div>`
        return html;
  }




  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({ 
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json',
    })
    .done(function(names) {
      $("#user-search-result").empty();
      if (names.length !== 0) {
        names.forEach(function(name){
          var html = buildHTML(name);
         appendUser(html);


        });
      }
      else {
           ("一致するnameはありません");
      }
    });
  });
    
    $(function(){
      $(document).on('click', '.user-search-add', function() {
        $(this).parent().remove();
        var id = $(this).attr("data-user-id");
        var name = $(this).attr("data-user-name");
        var html = buildMenberHTML(name,id)
        appendMembers(html);
        
      });
      
      $(document).on('click','.user-search-remove',function() {
        $(this).parent().remove();
      });
  
    });
    
  });
