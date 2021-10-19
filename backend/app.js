const express = require('express');
const app = express();
var mysql = require('mysql');
var con = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database: "drinks"
})
var datarecs;
con.connect(function(err){
	if(err) throw err;
	var sql="SELECT d_name,d_price,d_cat,d_desc,d_status FROM drinksinfo";
		con.query(sql,function(err,result){
			if(err) throw err;
			console.log(result);
			datarecs=result;
		});

});
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin","X-Requested-With",
    "Content-Type",
    "Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Method", "GET, POST, PATCH, DELETE, PUT, OPTIONS"
      );
  next();
})
app.use('/api/drinks', (req,res)=>{
  const drinks = datarecs;
  // [
  //   { d_name: 'bjs15151lkn',
  //     d_price: 203,
  //     d_cat: 'category 1',
  //     d_desc: 'coming from server',
  //     d_status: 'y'
  //   },
  //   { d_name: 'ads15151lkj',
  //     d_price: 520,
  //     d_cat: 'category 2',
  //     d_desc: 'coming from server',
  //     d_status: 'n'
  //   }
  // ];
  res.json({
    message: 'post fetched successfully',
    drinks: drinks
  });
});
module.exports = app;
