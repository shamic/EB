// const products = require('../products');
const model = require('../model');
const logger = require('../logger.js');

const jwt = require('jsonwebtoken')
const secret = require('../jwt/secret.json')
const bcrypt = require('bcryptjs')

let User = model.User;

const APIError = require('../rest').APIError;

module.exports = {
    // 'GET /api/products': async (ctx, next) => {
    //     ctx.rest({
    //         data: products.getProducts()
    //     });
    // },

    // 'POST /api/products': async (ctx, next) => {
    //     var p = products.createProduct(ctx.request.body.name, ctx.request.body.manufacturer, parseFloat(ctx.request.body.price));
    //     ctx.rest({data: p});
    // },

    // 'DELETE /api/products/:id': async (ctx, next) => {
    //     console.log(`delete product ${ctx.params.id}...`);
    //     var p = products.deleteProduct(ctx.params.id);
    //     if (p) {
    //         ctx.rest(p);
    //     } else {
    //         throw new APIError('product:not_found', 'product not found by id.');
    //     }
    // },

    'POST /api/login': async (ctx, next) => {
        var email = ctx.request.body.email;
        var password = ctx.request.body.password;
        const user = await User.findOne({
            where: {
                email
            }
        })

        // 判断用户是否存在
        if (user) {
            // 判断前端传递的用户密码是否与数据库密码一致
            if (bcrypt.compareSync(password, user.password)) {
                // 用户token
                const userToken = {
                    name: user.email,
                    id: user.id
                }
                const token = jwt.sign(userToken, secret.sign, { expiresIn: '1h' })  // 签发token
                ctx.rest({
                    data: { token: token }
                });
            } else {
                ctx.rest({
                    code: -102,
                    msg: '用户名或密码错误',
                    data: null
                });
            }
        } else {
            ctx.rest({
                code: -101,
                msg: '用户不存在',
                data: null
            });
        }
    },

    'POST /api/createUser': async (ctx, next) => {
        var email = ctx.request.body.email;
        var password = ctx.request.body.password;

        if (password && email) {
            const existUser = await User.findOne({
                where: {
                    email
                }
            }) 
            if (existUser) {
                ctx.rest({
                    code: -101,
                    msg: '用户名已经存在',
                    data: null
                });
            } else {
                // 密码加密
                const salt = bcrypt.genSaltSync()
                const hash = bcrypt.hashSync(password, salt)
                password = hash

                await User.create({
                    email: email, 
                    password: password
                });
                const newUser = await User.findOne({
                    where: {
                        email
                    }
                }) 

                // 签发token
                const userToken = {
                    name: newUser.email,
                    id: newUser.id
                }
                const token = jwt.sign(userToken, secret.sign, { expiresIn: '1h' })

                ctx.rest({
                    msg: '创建成功',
                    data: { token: token }
                });
            }
        } else {
            ctx.rest({
                code: -1,
                msg: '参数错误',
                data: null
            });
        }
    }

};
