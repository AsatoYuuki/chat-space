$(function() {
  $(document).on('turbolinks:load', function(){
    function buildHTML(message) {
      var body = message.body ? `${ message.body }` : "";
      var img = message.image ? `<img src= ${ message.image }>` : "";
      var html = `<div class="message__box" data-id="${message.id}">
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
    // $(document).on('turbolinks:load', function(){
      // Rails5を使っている方はturbolinksが悪さをしていることがあるので$(document).ready(function(){})ではなくturbolinksを初回読み込み、リロード、ページ切り替えで動くように上のように記述しましょう。
    // そうすることによってページを一回読み込まないと上手くいかないという事がなくなるはずです。
    // $(function(){})＝$(document).ready(function(){})です。
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var message = new FormData(this); //フォームに入力した値を取得しています。
      var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.message').append(html);
        $('form')[0].reset();
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
    })
  });
