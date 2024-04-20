var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student_result'
})
con.connect()

// app.get('/', function (req, res){
//     res.render('result')
// })  

app.get('/', function (req, res){
    var qr = "select * from result";

    con.query(qr,function(error,result,index){
        if(error) throw error;
        res.render('result',{result})
    })
})
app.post('/', function (req, res){
    var id=req.params.id
    var name=req.body.sname
    var sub1=parseInt(req.body.sub1)
    var sub2=parseInt(req.body.sub2)
    var sub3=parseInt(req.body.sub3)
    var sub4=parseInt(req.body.sub4)
    var sub5=parseInt(req.body.sub5)
    var total=parseInt(sub1+sub2+sub3+sub4+sub5)
    var avg=total/5

    if(sub1>33 && sub2>33 && sub3>33 && sub4>33 && sub5>33){
        result="PASS"
    }else{
        result="FAIL"
    }

    var qr="insert into result (name,sub1,sub2,sub3,sub4,sub5,total,avg,result) values('"+name+"','"+sub1+"','"+sub2+"','"+sub3+"','"+sub4+"','"+sub5+"','"+total+"','"+avg+"','"+result+"')"
    con.query(qr,function(error,result,index){
        if(error) throw error
        res.redirect("/")
    })
})

app.get("/update/:id",function(req,res){

    var id=req.params.id;

    var qr="select * from result where id="+id
    con.query(qr,function(error,result,index){
        if(error) throw error
        res.render("update",{result})
    })
})

app.post("/update/:id",function(req,res){
    var id=req.params.id;
    var name=req.body.name
    var sub1=parseInt(req.body.sub1)
    var sub2=parseInt(req.body.sub2)
    var sub3=parseInt(req.body.sub3)
    var sub4=parseInt(req.body.sub4)
    var sub5=parseInt(req.body.sub5)
    var total=parseInt(sub1+sub2+sub3+sub4+sub5)
    var avg=total/5    

    if(sub1>33 && sub2>33 && sub3>33 && sub4>33 && sub5>33){
        result="PASS"
    }else{
        result="FAIL"
    }

    var qr="update result set name='"+name+"',sub1='"+sub1+"',sub2='"+sub2+"',sub3='"+sub3+"',sub4='"+sub4+"',sub5='"+sub5+"',total='"+total+"',avg='"+avg+"',result='"+result+"' where id="+id
    con.query(qr,function(error,result,index){
        if(error) throw error
        res.redirect("/")
    })
})

app.get('/delete/:id',function(req,res){
    var id=req.params.id

    var qr="delete from result where id="+id

    con.query(qr,function(error,result,index){
        if(error) throw error
        res.redirect("/")
    })
})

app.listen(7000)