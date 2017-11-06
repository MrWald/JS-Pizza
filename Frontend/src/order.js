 var API = require('./API');
 $(".quantity-ordered").each(function (i, item) {
     var num=parseInt($(item).text(), 10);
     var add;
     if(num>1)add="піци";
     else add="піца";
     $(item).text(num+" "+add);
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