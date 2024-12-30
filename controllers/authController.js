import bcryptjs from 'bcryptjs'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
    try {
        const { firstName, lastName, password, role, avatar, email } = req.body;

        if (!firstName || !lastName || !password || !role || !email) {
            return res.status(400).send({ message: "Tous les champs obligatoires doivent être remplis" })
        }

        if (firstName.length > 20 || lastName.length > 20) {
            return res.status(400).send({ message: "Les prénoms et noms ne doivent pas dépasser 20 caractères" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).send({ message: "L'email est invalide" })
        }
        if (email.length > 100) {
            return res.status(400).send({ message: "L'email ne doit pas dépasser 100 caractères" })
        }

        const validRoles = ["USER", "ADMIN"]
        if (!validRoles.includes(role)) {
            return res.status(400).send({ message: "Le rôle doit être 'USER' ou 'ADMIN'" })
        }

        console.log("Mot de passe reçu :", password);

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>~+=_-])[A-Za-z\d!@#$%^&*(),.?":{}|<>~+=_-]{8,100}$/
        if (!passwordRegex.test(password)) {
            return res.status(400).send({ message: "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et être entre 8 et 100 caractères" });
        }

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return next({ status: 409, message: "Utilisateur déjà enregistré avec cet email" });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10)

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            avatar
        })

        res.status(201).json({ message: 'Utilisateur crée avec succès', user })
    } catch (e) {
        next(e)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send({ message: "L'email et le mot de passe sont obligatoires" })
        }

        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(401).send({ message: "Email ou mot de passe incorrect" })
        }

        const isPasswordValid = bcryptjs.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: "Email ou mot de passe incorrect" })
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.status(200).json({
            message: "Connexion réussie",
            userId: user.id,
            userRole: user.role,
            userEmail: user.email,
            token,
        })

    } catch (e) {
        next(e)
    }
}