import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"

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
        const userId = req.params.id
        const { firstName, lastName, email, avatar, password } = req.body

        if (!firstName || !lastName || !password || !email) {
            return res.status(400).send({ message: "Tous les champs obligatoires doivent être remplis" })
        }

        if (firstName.length > 20) {
            return res.status(400).json({ message: "Le prénom ne doit pas dépasser 20 caractères" });
        }

        if (lastName.length > 20) {
            return res.status(400).json({ message: "Le nom de famille ne doit pas dépasser 20 caractères" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).send({ message: "L'email est invalide" })
        }
        if (email.length > 100) {
            return res.status(400).send({ message: "L'email ne doit pas dépasser 100 caractères" })
        }

        const existingUserEmail = await User.findOne({ where: { email } });

        if (existingUserEmail) {
            return next({ status: 409, message: "Utilisateur déjà enregistré avec cet email" });
        }

        const existingUserId = await User.findByPk(userId)

        if (!existingUserId) {
            return res.status(404).send({ message: "Utilisateur non trouvé" })
        }

        if (password !== existingUserId.password) {

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>~+=_-])[A-Za-z\d!@#$%^&*(),.?":{}|<>~+=_-]{8,100}$/
            if (!passwordRegex.test(password)) {
                return res.status(400).send({ message: "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et être entre 8 et 100 caractères" });
            }

            const hashedPassword = bcryptjs.hashSync(password, 10)
            console.log("hashedPassword", hashedPassword)
            existingUserId.password = hashedPassword
        } else {
            existingUserId.password = password
        }

        if (avatar) {
            existingUserId.avatar = avatar;
        }

        existingUserId.firstName = firstName
        existingUserId.lastName = lastName
        existingUserId.email = email

        await existingUserId.save();
        res.status(200).json({ message: "Utilisateur mis à jour avec succès", updatedUser: existingUserId })

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