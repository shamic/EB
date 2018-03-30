const model = require('../model');
let Books = model.Books;

const APIError = require('../rest').APIError;

module.exports = {
    'GET /api/books': async (ctx, next) => {
        var books = await Books.findAll({limit: 10, order: 'id asc'});
        console.log(`find ${books.length} books:`);
        for (let book of books) {
            console.log(JSON.stringify(book));
        }
        if (books) {
            ctx.rest({
                books: books
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
            publisher: ctx.request.body.publisher, 
            publisher_date: ctx.request.body.publisher_date, 
            words_num: parseInt(ctx.request.body.words_num), 
            introduction: ctx.request.body.introduction,
            //thumbnail_url:  ctx.request.body.thumbnail_url,
            //audio_url:  ctx.request.body.audio_url,
            //txt_url:  ctx.request.body.txt_url,
            visits: parseInt(ctx.request.body.visits), 
            price: parseFloat(ctx.request.body.price),
            was_price: parseFloat(ctx.request.body.was_price),
            rating: parseFloat(ctx.request.body.rating)
        });
        if (book) {
            console.log('created: ' + JSON.stringify(book));
            ctx.rest(book);
        } else {
            throw new APIError('book created:fail', 'create book fail.');
        }
    },
}