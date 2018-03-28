
module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('login.html');
    },
    'GET /home': async (ctx, next) => {
        ctx.render('index.html');
    },
    'GET /addBook': async (ctx, next) => {
        ctx.render('addBook.html');
    }
};
