const model = require('../model');
const logger = require('../logger.js');
const fs = require('fs');
const path = require('path');

let Books = model.Books;

const APIError = require('../rest').APIError;

module.exports = {
    'POST /api/books': async (ctx, next) => {
        if (ctx.auth && ctx.auth.code != 0) {
            ctx.rest({
                code: ctx.auth.code,
                msg: ctx.auth.message
            })
            return
        }
        var pageSize = parseInt(ctx.request.body.pageSize) || 20;
        var start = parseInt(ctx.request.body.start) || 0;

        var resutl = await Books.findAndCountAll({offset: start, limit: pageSize, order: 'createdAt desc'}); //
        var books = resutl.rows
        books.map(element => {
            element.thumbnail_url = element.thumbnail_url || "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522478341968&di=c60886853463d9f62c8c49d6fe270426&imgtype=0&src=http%3A%2F%2Fwww.memobook.com.tw%2Fsaved%2F13%2F131210%2F13121009462755%2Fthumb%2Fp8_GK5DYP_1.jpg";
            element.rating = element.rating || "--";
        });
        logger.info(`find ${books.length} books:`);
        // for (let book of books) {
        //     console.log(JSON.stringify(book));
        // }
        if (books) {
            ctx.rest({
                data: resutl
            });
        } else {
            throw new APIError('books:not_found', 'books not found.');
        }
    },

    'POST /api/addBook': async (ctx, next) => {
        if (ctx.auth && ctx.auth.code != 0) {
            ctx.rest({
                code: ctx.auth.code,
                msg: ctx.auth.message
            })
            return
        }

        var typeDesc = ctx.request.body.type;
        var type = 1;
        if (typeDesc == '小说') {
            type = 1;
        } else if (typeDesc == '听书') {
            type = 2;
        } else if (typeDesc == '杂志') {
            type = 3;
        } else if (typeDesc == '漫画') {
            type = 4;
        } else if (typeDesc == '资讯') {
            type = 5;
        }

        var txtUrl = ctx.request.body.txt_url || null;

        if (type == 5) {
            var title = ctx.request.body.name;
            var fileName = ctx.request.body.name + '.html';
            var publisher = ctx.request.body.publisher || 'EB';
            var publisher_date = ctx.request.body.publisher_date || '';
            var body_content = ctx.request.body.htmlText || '';
            var data = '<!doctype html>' +
            '<html lang="zh-CN">' +
            '<head>' +
                '<meta charset="utf-8">' +
                '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">' +
                '<meta name="description" content="">' +
                '<meta name="author" content="">' +
                '<link rel="icon" href="../../../../favicon.ico">' +
                '<title>' + title + '</title>' +
                '<!-- Bootstrap core CSS -->' +
                '<link rel="stylesheet" href="../static/css/bootstrap.css">' +
            '</head>' +
            '<body style="width:100%;">' +
                '<div style="margin: 1.8rem;font-size: 1.3rem;">' +
                    '<div class="article-title">' +
                        '<h1>' + title + '</h1>' +
                    '</div>' +
                    '<div style="margin: 1.0rem 0;color:#999999;">' +
                        '<span class="source">' + publisher + '</span>' +
                        '<span class="date" style="margin-left: 10px;">' + publisher_date + '</span>' +
                    '</div>' +
                    body_content +
                '</div>' +
            '</body>' +
            '</html>';
            fs.writeFileSync(path.join(__dirname, '../') + '/archives/' + fileName, data);
            // fs.writeFile('../archives/' + fileName, data, function (err) {
            //     if (err) {
            //         ctx.rest({
            //             code: -1,
            //             msg: '保存咨询文件失败'
            //         });
            //         return
            //     } else {
                    txtUrl = fileName;
            //     }
            // });
        }

        var book = await Books.create({
            name: ctx.request.body.name, 
            author: ctx.request.body.author, 
            category: ctx.request.body.category, 
            type: type, 
            publisher: ctx.request.body.publisher || null, 
            publisher_date: ctx.request.body.publisher_date || null, 
            words_num: parseInt(ctx.request.body.words_num) || null, 
            introduction: ctx.request.body.introduction,
            thumbnail_url:  ctx.request.body.thumbnail_url || null,
            audio_url:  ctx.request.body.audio_url || null,
            txt_url:  txtUrl,
            visits: parseInt(ctx.request.body.visits) || null, 
            price: parseFloat(ctx.request.body.price) || null,
            was_price: parseFloat(ctx.request.body.was_price) || null,
            rating: parseFloat(ctx.request.body.rating) || null
        });
        if (book) {
            logger.info('created: ' + JSON.stringify(book));
            ctx.rest({
                data: book
            });
        } else {
            throw new APIError('book created:fail', 'create book fail.');
        }
    },

    'POST /api/deleteBook': async (ctx, next) => {
        if (ctx.auth && ctx.auth.code != 0) {
            ctx.rest({
                code: ctx.auth.code,
                msg: ctx.auth.message
            })
            return
        }

        var bookId = ctx.request.body.bookId;
        var result = await Books.destroy({'where':{'id':bookId}});
        
        if (result > 0) {
            logger.info('deleted book: ' + JSON.stringify(bookId));
            ctx.rest({
                data: bookId
            });
        } else {
            throw new APIError('book deleted:fail', 'deleted book fail.');
        }
    },
}