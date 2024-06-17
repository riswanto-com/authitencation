
const models = require('./../models');
const User =models.User;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../configs/secret");

const ServiceAuth = async (req) => {
    try {
        var data = req;
        var res = [];
        if (data.type == 'auth') {
            res = await Auth(data.data);
        }else if(data.type =='register'){
            res = await Register(data.data);
        }else if(data.type =='token'){
            res = await getProfil(data.data);
        }
        return res;
    } catch (e) {
        return {
            msg: e.message,
            type: 2
        }
    }
}
const Auth = async (data)=>{
    try{
        const user = await User.findOne({
            where: {
                user_username: data.username,
            },
        });

        if (!user) {
            return {
                msg: "Username Not found.",
                type: 1
            };
        }

        const passwordIsValid = bcrypt.compareSync(
            data.password,
            user.user_password
        );

        if (!passwordIsValid) {
            return {
                msg: "Invalid Password!",
                type: 1
            };
        }
        const token = jwt.sign({
                id: user.user_id,
                name:user.user_name,
                username:user.user_username
            },
            config.secret, {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });

        return {
            msg: 'Login success',
            type: 0,
            accessToken: token,
            data: {
                name: user.user_name,
                username: user.user_username
                
            }
        };
    }catch (e) {
        return {
            msg: e.message,
            type: 3
        }
    }
}
const Register =async(data)=>{
    try{
        const insert={
            user_name:data.name,
            user_username:data.username,
            user_password: bcrypt.hashSync(data.password, 8),
        }
        const process = await User.create(insert)
        if(process){
            return {
                type:0,
                msg:"register Success"
            };
        }else{

            return {
                type:2,
                msg:"register Fail"
            };
        }
    }catch (e) {
        return {
            msg: e.message,
            type: 3
        }
    }
}
const getProfil = async (data)=>{
    try{
        const bearerHeader = data;
        let token = '';
        if (typeof bearerHeader !== 'undefined') {
            const replaceBearHeader = bearerHeader.replace('  ', ' ');
            const bearer = replaceBearHeader.split(' ');
            const bearerToken = bearer[1];
            token = bearerToken;

        } else {
            //Fobidden
            return {
                type: 1,
                msg: "No token provided!",
            };
        }
        const decoded = jwt.verify(token, config.secret);
        return {type:0,data:decoded};
    }catch (e) {
        return {
            msg: e.message,
            type: 3
        }
    }
}
module.exports = {
    ServiceAuth
}