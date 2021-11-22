/*to do
+ correggere in modo che il profilo sia visualizzato solo cliccando sull'intestazione     vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  FATTO
+ aggiungere la visualizzazione del timestamp su ogni messaggio      vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  FATTO
+ inserire un pulsante per aggiungere chat alla lista dinamicamente ----------------|--------fanno parte della stessa cosa, cioe' se aggiungi il primo devi fare per forza il secondo
+ finestra modale per inserimento nome chat e selezione icona da una galleria 5x5 --| vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  Fatto
+ tramite i tre puntini consentire di modificare il profilo personale (immagine e nome) vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  FATTO
+ attivare l'inserimento dei messaggi con INVIO      vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  FATTO
+ visualizzare correttamente l'ultimo messaggio nella lista chat (quando troppo lungo troncare con '...')   vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  FATTO

... aggiungere altre due funzionalità a piacere (premio alle più creative)


*/

var i=0;
/*
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("ajaxChats").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "ajaxChats.txt", true);
  xhttp.send();
}*/

$(document).ready(() => {
    $('.chat_head').hide(); //rug
    $('.chat_input').hide();


    ///-----------------------------------------------------------------------------------------

    for(var j=1;j<=25;j++){                                             ///                     aggiunge immagini nella div profilechange_avatars
        var img = $("<img />").attr('src', 'avatars/avatar ('+j+').png');
        $("#profileChange_avatars").append(img);
    }

    for(var j=1;j<=25;j++){                                             ///                     aggiunge immagini nella div profilechange_avatars
        var img = $("<img />").attr('src', 'avatars/avatar ('+j+').png');
        $("#addChat_avatars").append(img);
    }
    ///-----------------------------------------------------------------------------------------

    var selChat;
    var indexChat=0;

    

    ///-----------------------------------------------------------------------------------------
    $('#btnSend').bind("click", () => {                             /// MANDA MESSAGGIO
        var msg = document.getElementById("messaggio").value;

        var today = new Date();
        var time = ("0"+today.getHours()).slice(-2) + ":" + ("0"+today.getMinutes()).slice(-2);

        var time_chat = "<p style='float:right;font-size:13px;'>"+time+"</p>";

        var li = document.createElement("li");

        li.append(document.innerHTML = msg);
        li.setAttribute('Class','msg2');
        $(".chat_messages:visible > ul").append(li);
        $(li).append("<p>"+time+"</p>");

        $('.chats').eq(indexChat).children('.last').children('.last_msg').text(msg);
        $('.chats').eq(indexChat).children('.last').children('.last_msg_time').text(time);

        $('#messaggio').val('');		//JQ forever
    });
    ///-----------------------------------------------------------------------------------------

    $('#messaggio').keydown(function(event){
        if(event.keyCode != 13)
            $('.chats').eq(indexChat).children('.last').children(".last_msg").text("You are typing...").css({"color":"#4ffd37","font-weight":"600",});
    });
    $('#messaggio').keyup(function(){
        if(event.keyCode != 13)
            $('.chats').eq(indexChat).children('.last').children(".last_msg").text('').css({"color":"black","font-weight":"100",});
    });

    ///-----------------------------------------------------------------------------------------

    $('.chats').on("click", function() {                                                             ///     SHOW CHATS
        selChat = event.currentTarget;
        console.log(selChat);
        indexChat = $('.chats').index(this);
        console.log(indexChat);
        $('.chat_messages').hide();
        $('.info_profilo:visible').hide();
        $('.chat_messages').eq(indexChat).fadeIn();

        $('.chat_container').show();
        $('.chat_input').slideDown();
        if(i!=1)
            $('.chat_container').css('background-image', "url('foto/Sfondo_Whatsapp.png')");

    });

    ///-----------------------------------------------------------------------------------------

    $("#puntini").on("click",() =>{                                                             ///     MENU
        $('#puntini').toggleClass('ellipsis');
        $(".menu").slideToggle();
    });

    ///-----------------------------------------------------------------------------------------

    $('.chat_messages img, .chat_messages p').click( function() {                               ///     PROFILO
        $('.chat_container').hide();
        $('.info_profilo').eq(indexChat).fadeIn(500);
    });

    ///-----------------------------------------------------------------------------------------

    $('.info_profilo').click( function() {                                                      ///     PROFILO
        $(this).fadeOut(500);
        $('.chat_container').show();
    });

    ///-----------------------------------------------------------------------------------------

    $("#search").on("keyup", function() {                                                       ///      FUNZIONE SEARCH FILTER
        var value = $(this).val().toLowerCase();
        $("#listachat li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    ///-----------------------------------------------------------------------------------------

    $('#messaggio').keypress(function(event) {                                                  ///      QUANDO SI CLICCA ENTER
        if (event.keyCode == 13) {
            $('#btnSend').click();
        }
    });

    ///-----------------------------------------------------------------------------------------

    $(".menu p:nth-child(1)").on('click', () =>{
        $('#background').fadeToggle();
    });

    $(".menu p:nth-child(2)").on('click', () =>{
        $('#profileChange').fadeToggle();
    });

    $(".menu p:nth-child(3)").on('click', () =>{
        $('#addChat').fadeToggle();
    });

    $("#change_bg").on('click',()  =>{
        var bg = document.getElementById("url").value;
        $('.chat_container').css('background-image', "url("+bg+")");
        $('#background').fadeToggle();
        $('#puntini').toggleClass('ellipsis');
        $(".menu").slideToggle();
        $("#url").val('');
        i=1;

    });

    $("#change").on('click',()  =>{
        var oimg= document.getElementById("originalImage").getAttribute("src");
        var oname= document.getElementById("originalName").textContent;
        var newimg= document.getElementById("avatar_name").value;
        var newname = document.getElementById("profile_name").value;
        console.log(oimg+"  "+oname+"  "+newimg+"  "+newname);

        if(!newimg)
            newimg=oimg;
        if($("#profileChange_avatars *").hasClass("choosed")){
            newimg=$(".choosed").attr('src');
        }
        if(!newname)
            newname=oname;
        $("#originalName").text(newname);
        $("#originalImage").attr("src",newimg);
        $(".x").click();
        $("#avatar_name").val('');
        $("#profile_name").val('');
    });

    $('#add_chat').on('click',()  =>{
        var nome = document.getElementById("nome").value;
        var avatarImg = document.getElementById("avatarurl").value;
        if(!$("#avatarurl").val()){
            avatarImg="foto/Anonymous-Avatar.png";
        }
        if($("#addChat_avatars *").hasClass("choosed")){
            avatarImg=$(".choosed").attr('src');
        }
        var str="<li class= 'chats' id='aggiunto' title='Chat "+nome+"'><img src='"+avatarImg+"' class='chat_fotoprofilo'><p><b>"+nome+"</b></p><div class='last'><p class='last_msg'></p><p class='last_msg_time>'</div></li>";
        $('#listachat').prepend(str);
        str="<div class= 'info_profilo' id='Info "+ nome +"'><img src='"+avatarImg+"'><p><b> "+nome+" </b></p></div>";
        $('.container').prepend(str);
        str="<div class='chat_messages' id='chat_"+nome+"'><img src='"+avatarImg+"'><p><b> "+nome+" </b></p><ul></ul></div>";
        $('.chat_content').prepend(str);
        $(".x").click();
        $("#nome").val('');
        $("#avatarurl").val('');
    });


    $(".x").on('click',()  =>{
        $('#background').fadeOut();
        $('#addChat').fadeOut();
        $('#profileChange').fadeOut();
        $('#puntini').removeClass('ellipsis');
        $(".menu").slideUp();
    });

    $("#profileChange_avatars img").click(function(){
        $("#avatar_name").prop('disabled', true);
        var k1 = $("#profileChange_avatars img").index(this);
        var image = "#profileChange_avatars img:nth-child("+(k1+1)+")";
        $("#profileChange_avatars img").not(image).removeClass("choosed");
        $(image).toggleClass('choosed');
        if(!$("#profileChange_avatars *").hasClass("choosed"))
            $("#avatar_name").prop('disabled', false);
    });

    $("#addChat_avatars img").click(function(){
        $("#avatarurl").prop('disabled', true);
        var index = $("#addChat_avatars img").index(this);
        var image = "#addChat_avatars img:nth-child("+(index+1)+")";
        $("#addChat_avatars img").not(image).removeClass("choosed");
        $(image).toggleClass('choosed');
        if(!$("#addChat_avatars *").hasClass("choosed"))
            $("#avatarurl").prop('disabled', false);
    });
});