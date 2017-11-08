 var API = require('./API');
 $(".quantity-ordered").each(function (i, item) {
     var num=parseInt($(item).text(), 10);
     var add;
     if(num>1)add="піци";
     else add="піца";
     $(item).text(num+" "+add);
 });

 $("#flname").bind("keypress", function(event){
     var regex= new RegExp("[А-Яа-яІіЇїЄєҐґ']");
     var key=String.fromCharCode(!event.charCode ? event.which : event.charCode);
     if(!regex.test(key)){
         event.preventDefault();
         return false;
     }
 });

 $("#phone").bind("keypress", function(event){
     var regex;
     var key;
     var text=$(this).val();
     switch(text.length){
         case 0:
             regex=new RegExp("[0+]");
             break;
         case 1:
             if(text.charAt(0)!=='0') {
                 regex = new RegExp("[3]");
                 break;
             }
         case 2:
             if(text.charAt(0)!=='0') {
                 regex = new RegExp("[8]");
                 break;
             }
         case 3:
             if(text.charAt(0)!=='0') {
                 regex = new RegExp("[0]");
                 break;
             }
         default:
             regex = new RegExp("[0-9]");
     }
     key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
     if(!regex.test(key) || (text.charAt(0)==='0' && text.length===10) || (text.charAt(0)==='+' && text.length===13)){
         event.preventDefault();
         return false;
     }
 });

 $("#address").bind("keypress", function(event){
     var regex;
     var key;
     regex= new RegExp("^[0-9А-Яа-яІіЇїЄєҐґ'.,/ -]+$");
     key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
     if(!regex.test(key)){
         event.preventDefault();
         return false;
     }
 });

 $("#submit").click(function () {
     var name = $("#flname").text();
     var phone = $("#phone").text();
     var address = $("#address").text();
     var order_info = {
         name: name,
         phone: phone,
         address: address
     };
     API.createOrder(order_info, function (error, data) {
         if (error) alert(error);
         else {
             alert("Success");
             window.location.href = '/';
             $('#clear-order').click();
         }
     });
 });
 $("#reorder").click(function () {
     window.location.href = '/';
 });