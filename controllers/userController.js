import User from "../models/userModel.js"

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.send(users)
    } catch (e) {
        next(e)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.status(400).send({ message: "Id de l'utilisateur manquant" })
        }

        const user = await User.findByPk(userId)

        if (!user) {
            return res.status(404).send({ message: "Utilisateur non trouvé" })
        }

        res.send(user)
    } catch (e) {
        next(e)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        res.send("Update user")
    } catch (e) {
        next(e)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.status(400).send({ message: "Id de l'utilisateur manquant" })
        }

        const user = await User.findByPk(userId)

        if (!user) {
            return res.status(404).send({ message: "Utilisateur non trouvé" })
        }

        user.destroy()
        res.send({ message: "Utilisateur supprimé" })
    } catch (e) {
        next(e)
    }
}

export const getUserByParams = async (req, res, next) => {
    try {
        res.send("Get user by params")
    } catch (e) {
        next(e)
    }
}