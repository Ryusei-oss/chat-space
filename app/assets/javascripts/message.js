<<<<<<< Updated upstream
$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class=".message_list">
        <div class=".message_list__contents--name">
          ${message.user_name}
        </div>
        <div class="message_list__contents--date">
          ${message.created_at}
        </div>
        <div class="message_list__contents--comment">
          ${message.content}
        </div>
        <img src=${message.image} >
      </div>`
     return html;
   } else {
     var html =
      `<div class = "message_list__contents">
        <div class="message_list__contents--name">
          ${message.user_name}
        </div>
        <div class="message_list__contents--date">
          ${message.created_at}
        </div>
        <div class="message_list__contents--comment">
          ${message.content}
        </div>
      </div>`
     return html;
   };
 }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
    .always(() => {
      $('input').removeAttr("disabled");
    });
  })
});
=======
$(function(){
  $('#new_message').on('submit', function(e){
    console.log('hoge');
    e.preventDefault()
  });
});
>>>>>>> Stashed changes
