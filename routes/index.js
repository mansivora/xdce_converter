var express = require('express');
var router = express.Router();
var axios = require('axios');
var inr_price = 0;
var fiat_unit =0;
var data =[];
/* GET home page. */
router.get('/', async function (req, res, next) {
  fiat_unit =  req.query.convert;
  fiat_price = req.query.amount;
 fiat_unit = fiat_unit.toUpperCase();



 return await axios.get('https://api.coinmarketcap.com/v2/ticker/2634/?convert='+fiat_unit)
    .then(function (response) {
      // console.log(response);
      console.log(response.data.data.quotes);
      inr_price = response.data.data.quotes[fiat_unit].price;
      
      if(fiat_price != null )
      {
        console.log(typeof(fiat_price));
        if(fiat_price/1 == fiat_price)
        {
          fiat_price = parseFloat(fiat_price);
          total_amt = fiat_price*inr_price;
          data = JSON.stringify({'result':200,'data':{'convert':fiat_unit,'price':inr_price,
          'amount':fiat_price,'total':total_amt}});

        }
        else
        {
          data = JSON.stringify({'result':422,'message':"Please enter a valid number"});
        }
      }
      else
      {
        data = JSON.stringify({'result':200,'data':{'convert':fiat_unit,'price':inr_price}});
      }

     
      console.log(data);
      res.send( data);
    })
    .catch(function (error) {
      console.log(error);
    });

});

module.exports = router;
