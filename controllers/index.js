
module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('login.html');
    },
    'GET /home': async (ctx, next) => {
        ctx.render('home.html');
    },
    'GET /addBook': async (ctx, next) => {
        ctx.render('addBook.html');
    },
    'GET /addArchive': async (ctx, next) => {
        ctx.render('addArchive.html');
    }
};
