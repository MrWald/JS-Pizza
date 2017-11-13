/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var crypto	=	require('crypto');
var LIQPAY_PUBLIC_KEY='i69608224328';
var LIQPAY_PRIVATE_KEY='aFTFKaoKRdqK0eZZaXqFoT8pmt8HdAxggFs0i6yn';


function base64(str)	 {
    return new Buffer(str).toString('base64');
}

function	sha1(string)	{
    var sha1	=	crypto.createHash('sha1');
    sha1.update(string);
    return	sha1.digest('base64');
}


exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};


exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);
    var description=
        "Замовлення піци: "+order_info.name+"\n" +
        "Адреса доставки: "+order_info.address+"\n" +
        "Телефон: "+order_info.phone+"\n" +
        "Замовлення:\n" +
        "- 1шт. [Мала] Імпреза;- 2шт. [Велика] BBQ\n" +
        "Разом "+order_info.cost+"грн";
    var order={
        version:	3,
        public_key:	LIQPAY_PUBLIC_KEY,
        action:	"pay",
        amount:	order_info.cost,
        currency:	"UAH",
        description:	description,
        order_id:	Math.random(),
//!!!Важливо щоб було 1,	бо інакше візьме гроші!!!
        sandbox:	1
    };
    var data	=	base64(JSON.stringify(order));
    var signature = sha1(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY);
    res.send({
        status: true,
        data:data,
        signature:signature
    });
};