$(function(){ 

  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class = "message" data-message-id = ${message.id}>
        <div class="message_list__contents">
          <div class="message_list__contents--name">
            ${message.user_name}
          </div>
          <div class="message_list__contents--date">
            ${message.created_at}
          </div>
          <div class="message_list__contents--comment">
            ${message.content}
          </div>
          <img src=${message.image} >
        </div>
      </div>`
     return html;
   } else {
     var html =
      `<div class ="message" data-message-id = ${message.id}>
        <div class = "message_list__contents">
          <div class="message_list__contents--name">
            ${message.user_name}
          </div>
          <div class="message_list__contents--date">
            ${message.created_at}
          </div>
          <div class="message_list__contents--comment">
            ${message.content}
          </div>
        </div>
      </div>`
     return html;
   };
 }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat_main__message_list').append(html);
      $('.chat_main__message_list').animate({ scrollTop: $('.chat_main__message_list')[0].scrollHeight});
      $('form')[0].reset();      
    })
    .fail(function(data){
      alert("空送信または連打していませんか？")
    })
    .always(() => {
      $('input').removeAttr("disabled");
    });
    
  })

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.chat_main__message_list').append(insertHTML);
        $('.chat_main__message_list').animate({ scrollTop: $('.chat_main__message_list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});


