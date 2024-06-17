const { ServiceAuth } = require("../services/AuthService");

const AuthUser = async (req, res) => {
    try {
        const data = {
            type: 'auth',
            data: req.body
        }
        const sendData = await ServiceAuth(data);
        return res.status(200).json(sendData);
    } catch (e) {
        return res.status(500).json({
            msg: e.message,
            type: 1
        })
    }
}

const RegisterUser = async (req, res) => {
    try {
        const data = {
            type: 'register',
            data: req.body
        }
        const sendData = await ServiceAuth(data);
        return res.status(200).json(sendData);
    } catch (e) {
        return res.status(500).json({
            msg: e.message,
            type: 1
        })
    }
}
const DataProfil = async (req, res) => {
    try {
        const data = {
            type: 'token',
            data:req.headers['authorization'].replaceAll('"','')
        }
        const sendData = await ServiceAuth(data);
        return res.status(200).json(sendData);
    } catch (e) {
        return res.status(500).json({
            msg: e.message,
            type: 1
        })
    }
}
module.exports = {
    AuthUser,
    DataProfil,
    RegisterUser
}