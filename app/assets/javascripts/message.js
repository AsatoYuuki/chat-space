$(function() {
  function buildHTML(message) {
    var body = message.body ? `${ message.body }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message__box" data-messages-id="${message.id}">
                  <div class="message__box__for">
                      <p class="message__box__for__name">
                        ${message.user_name}
                      </p>
                      <p class="message__box__for__info">
                        ${message.date}
                      </p>
                    </div>
                  <div class="message__box__text">
                    <p class="message__box__text__view">
                      ${body}
                    </p>
                      ${img}
                  </div>`
         return html;
  }
    
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var message = new FormData(this); 
      var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false,
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.message').append(html);
        $('form')[0].reset();
        $('.message').animate({scrollTop: $('.message')[0].scrollHeight });
      })
      
      .fail(function(data){
        alert('エラーが発生したためメッセージは送信できませんでした。');
      })
      .always(function(data){
        $('.form__new_message__sent').prop('disabled', false);//ここで解除している
      })
    });
        
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        var last_message_id = $('.message__box:last').data("messages-id");
        console.log(last_message_id);
        var grouping = $('.main-chat__header').data('group-id');
        var url = "groups/" + grouping  + "/api/messages";
        console.log(url)
        console.log(grouping)
        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {last_id: last_message_id,
                id: grouping}
        })
        .done(function(messages) {
          var insertHTML = '';
          console.log(insertHTML);
          console.log(messages);
          messages.forEach(function (message) {
            insertHTML = buildHTML(message);
            console.log(insertHTML);
            $('.message').append(insertHTML);
          })
          $('.message').animate({scrollTop: $('.message')[0].scrollHeight });
        })
        
        .fail(function() {
          alert('自動更新に失敗しました');
        });
        
      };
      };
        setInterval(reloadMessages, 5000);


});
