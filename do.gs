function doPost(e) {
  // Обязательно отвечаем только на запросы json
  if(e.postData.type == "application/json") {
    
    // Разбор обновления, отправленного из Telegram
    var update = JSON.parse(e.postData.contents);
   Logger.log(update);
    // Создание нашего бота, передающего обновление
    var bot = new Bot(token, update);
    var options ={};
    options.ParseMode= 'markdown'
    var msg=bot.controller()
   // msg["msgType"].keys[0].keys[0]//
  //  var msgID=bot.SendMsg(msg["Chat ID"], URLDecode(msg["msgType"].keys+' %0A'+e.postData.contents),options);
var q=objSeparate(msg["msgType"])
//var msgID=bot.SendMsg(msg["Chat ID"], URLDecode(q+' %0A'+e.postData.contents),options)
var msgID=bot.SendMsg(msg["Chat ID"],q+' %0A',options)
switch (q) {
  case 'callback_query':
   // alert( 'Маловато' );
    break;
  case 'message.private.botCommand':
  msgID=bot.SendMsg(msg["Chat ID"], q+'%0A'+e.postData.contents,options);
        
   msgID=bot.SendMsg('192818801', "Отправлено сообщение "+ msgID +" Пользователю ID"+'%0A'+msg["Chat ID"] ,options);      
    break;
  case 'message.private.document':
    
    
 //   alert( 'Перебор' );
    break;
  case 'inline_query':
  //  alert( 'В точку!' );
    break;   
  case 'channel_post':
  //  alert( 'В точку!' );
    break;   
   case 'message_group_left_chat_member':
  //  alert( 'В точку!' );
    break; 
   case 'message_group_new_chat_member':
  //  alert( 'В точку!' );
    break;    
   case 'message_group_':
    
    
    
  //  alert( 'В точку!' );
    break;  
   case 'message.private.text':
  msgID=bot.SendMsg(msg["Chat ID"], q+'%0A'+e.postData.contents,options);
  msgID=bot.SendMsg('192818801', "Отправлено сообщение "+ msgID +" Пользователю ID"+'%0A'+msg["Chat ID"] ,options);  
    break;        
 
    
  default:
       
    var msgID=SendMsg(msg["Chat ID"], 'Я таких значений не знаю',options);
}

  
    // Построение команд
    var bus = new CommandBus();
    bus.on(/\/start/, function () {
      this.replyToSender("");
    });
    
  bus.on(/\/joke\s*([A-Za-z0-9_]+)?\s*([A-Za-z0-9_]+)?/, randomJoke);
  bus.on(/\/blog\s*([A-Za-z0-9_]+)?\s*([A-Za-z0-9_]+)?/, ruh);
  bus.on(/\/ruh\s*([A-Za-zєЄА-Яа-яІіЇі'0-9_]+)?\s*([A-Za-zєЄА-Яа-яІіЇі'0-9_]+)?/, ruh);
  bus.on(/\/Рух\s*([A-Za-zєЄА-Яа-яІіЇі'0-9_]+)?\s*([A-Za-zєЄА-Яа-яІіЇі'0-9_]+)?/, sendPhoto)
  bus.on(/\/id\s*([A-Za-zєЄА-Яа-яІіЇі'0-9_]+)?\s*([A-Za-zєЄА-Яа-яІіЇі'0-9_]+)?/, sendId)
 ///   sendPhoto
    // Зарегистрируем командную шину
    bot.register(bus);
    
    // Если обновление действительно, обрабатываем его
    if (update) {
      bot.process();
    }   
  }      
}