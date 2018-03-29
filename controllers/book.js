const model = require('../model');
let Books = model.Books;

const APIError = require('../rest').APIError;

module.exports = {
    'GET /api/books': async (ctx, next) => {
        ctx.rest({
            books: Books.findAll()
        });
    },

    'POST /api/books': async (ctx, next) => {
        var p = products.createProduct(
            ctx.request.body.name, 
            ctx.request.body.author, 
            ctx.request.body.category, 
            ctx.request.body.publisher, 
            ctx.request.body.publisher_date, 
            parseInt(ctx.request.body.words_num), 
            ctx.request.body.introduction,
            // ctx.request.body.thumbnail_url,
            // ctx.request.body.audio_url,
            // ctx.request.body.txt_url,
            parseInt(ctx.request.body.visits), 
            parseFloat(ctx.request.body.price),
            parseFloat(ctx.request.body.was_price),
            parseFloat(ctx.request.body.rating)
        );
        ctx.rest(p);
    },
}

// (async () => {
//     var user = await User.create({
//         name: 'John',
//         gender: false,
//         email: 'john-' + Date.now() + '@garfield.pet',
//         passwd: 'hahaha'
//     });
//     console.log('created: ' + JSON.stringify(user));
//     var cat = await Pet.create({
//         ownerId: user.id,
//         name: 'Garfield',
//         gender: false,
//         birth: '2007-07-07',
//     });
//     console.log('created: ' + JSON.stringify(cat));
//     var dog = await Pet.create({
//         ownerId: user.id,
//         name: 'Odie',
//         gender: false,
//         birth: '2008-08-08',
//     });
//     console.log('created: ' + JSON.stringify(dog));
// })();