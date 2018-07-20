var mysql = require('mysql');
var config = require('../config/config');

var pool = mysql.createPool({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database,
    port: config.port
})

let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('sql connect error: ', err);
                reject(err);
            } else {
                console.log('sql语句： '+ sql);
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            }
        });
    });
};

let users =
    `create table if not exists _user(
         id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(100) NOT NULL,
         pwd VARCHAR(100) NOT NULL,
         regTime DATE NOT NULL
    );`;
let categorys =
    `create table if not exists categorys(
        categoryId int not null AUTO_INCREMENT,
        categoryName char(12) not null COMMENT '分类名称',
        PRIMARY KEY( categoryId )
    );`;
let goods =
    `create table if not exists goods(
        goodId int not null auto_increment,
        categoryId int not null comment '所属分类',
        goodName char(16) not null comment '商品名称',
        goodDesc char(100) not null comment '商品描述',
        goodImgs char not null comment '商品图片',
        goodPrice double not null comment '商品价格',
        stock int not null comment '商品库存',
        createTime DATE not null comment '录入时间',
        isSell tinyint(1) not null comment '是否上架',
        primary key(goodId)
    );`;
let orders =
    `create table if not exists orders(
        orderId int not null auto_increment,
        orderTime DATE not null comment '下单时间',
        payTime DATE not null comment '支付时间',
        completeTime Date not null comment '完成时间',
        status int(1) not null comment '订单状态',
        totalAmount double not null comment '订单金额',
        list char not null comment '订单列表',
        primary key(orderId)
    );`;


let createTable = sql => {
    return query(sql, [])
};

createTable(users);
createTable(categorys);
createTable(goods);
createTable(orders);

// 根据用户名查询用户
exports.findUserByName = function (name) {
    let str = `select * from _user where name = '${name}';`;
    return query(str);
}

// 添加新注册用户
exports.addUser = function (values) {
    let str = `insert into _user set name=?,pwd=?,regTime=?;`;
    return query(str, values);
}

exports.addGoods = function (values) {
    let str = `insert into goods set categoryId=?goodName=?goodDesc=?goodImgs=?goodPrice=?stock=?createTime=?isSell=?;`
    return query(str, values);
}