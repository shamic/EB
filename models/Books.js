const db = require('../db');

module.exports = db.defineModel('books', {
    name: db.STRING(100),
    author: db.STRING(20),
    category: db.STRING(10),
    txt_url: db.STRING(200),
    introduction: db.STRING(200),

    words_num: {
        type: db.BIGINT,
        allowNull: true
    },
    publisher: {
        type: db.STRING(100),
        allowNull: true
    },
    publisher_date: {
        type: db.STRING(10),
        allowNull: true
    },
    thumbnail_url: {
        type: db.STRING(200),
        allowNull: true
    },
    audio_url: {
        type: db.STRING(200),
        allowNull: true
    },
    visits: {
        type: db.INTEGER,
        allowNull: true
    },
    price: {
        type: db.DOUBLE,
        allowNull: true
    },
    was_price: {
        type: db.DOUBLE,
        allowNull: true
    },
    rating: {
        type: db.DOUBLE,
        allowNull: true
    }
});


// create table books (
//      id varchar(50) not null,
//      name varchar(100) not null,
//      author varchar(20) not null,
//      category varchar(10) not null,
//      publisher varchar(100),
//      publisher_date varchar(10),
//      words_num bigint,
//      introduction varchar(200) not null,
//      thumbnail_url varchar(200),
//      txt_url varchar(200),
//      audio_url varchar(200),
//      visits integer,
//      price double,
//      was_price double,
//      rating double,
//      primary key (id)
//      ) engine=innodb;