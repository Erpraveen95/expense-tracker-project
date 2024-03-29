const User = require('../models/user')

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findAll()
        res.status(200).json({ findAllUser: user })
    } catch (err) {
        console.log('database fetch error', err)
        res.status(500).json({ error: err })
    }
}
exports.postUser = async (req, res, next) => {
    try {
        const amount = req.body.amount
        const description = req.body.description
        const userDetails = await User.create({
            amount: amount,
            description: description
        })
        res.status(201).json({ userDetail: userDetails })
    } catch (err) {
        console.log('data write err', err)
        res.status(500).json({ error: err })
    }
}
exports.deleteUser = async (req, res, next) => {
    const id = req.params.id
    try {
        if (!id) {
            res.status(400).json({ err: 'id not found' })
        } else {
            await User.destroy({ where: { id: id } })
            res.status(200).json({ msg: 'success' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
}
