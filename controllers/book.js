const model = require('../model');
const logger = require('../logger.js');
let Books = model.Books;

const APIError = require('../rest').APIError;

module.exports = {
    'GET /api/books': async (ctx, next) => {
        var books = await Books.findAll({limit: 10, order: 'createdAt asc'});
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
                data: books
            });
        } else {
            throw new APIError('books:not_found', 'books not found.');
        }
    },

    'POST /api/books': async (ctx, next) => {
        // TODO: param check
        var book = await Books.create({
            name: ctx.request.body.name, 
            author: ctx.request.body.author, 
            category: ctx.request.body.category, 
            publisher: ctx.request.body.publisher || null, 
            publisher_date: ctx.request.body.publisher_date || null, 
            words_num: parseInt(ctx.request.body.words_num) || null, 
            introduction: ctx.request.body.introduction,
            thumbnail_url:  ctx.request.body.thumbnail_url || null,
            //audio_url:  ctx.request.body.audio_url,
            txt_url:  ctx.request.body.txt_url || null,
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
}