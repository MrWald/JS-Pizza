
var create = function (data, signature) {
    LiqPayCheckout.init({
        data: data,
        signature: signature,
        embedTo: "#liqpay",
        mode: "popup"	//	embed	||	popup
    }).on("liqpay.callback", function (data) {
        console.log(data.status);
        console.log(data);
    }).on("liqpay.ready", function (data) {
//	ready
    }).on("liqpay.close", function (data) {
//	close
        window.location.href = '/';
        $('#clear-order').click();
    });
};

exports.create=create;