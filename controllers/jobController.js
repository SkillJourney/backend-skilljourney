import Job from "../models/jobModel.js"
import User from "../models/userModel.js"

export const createJob = async (req, res, next) => {
    try {
        const { title, salary, description, location } = req.body

        if (!title || !salary || !description || !location) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" })
        }

        if (title.length > 100) {
            return res.status(400).json({ message: "Le prénom ne doit pas dépasser 100 caractères" });
        }

        if (salary < 0 || salary > 300000) {
            return res.status(400).json({ message: "Le salaire doit être compris entre 0 et 300000" });
        }

        if (description.length > 1000) {
            return res.status(400).json({ message: "La description ne doit pas dépasser 1000 caractères" });
        }

        if (location.length > 100) {
            return res.status(400).json({ message: "La localisation ne doit pas dépasser 100 caractères" })
        }

        const existingUserId = await User.findByPk(req.user.id)

        if (!existingUserId) {
            return res.status(404).send({ message: "Utilisateur non trouvé" })
        }

        const job = await Job.create({
            title,
            salary,
            description,
            location,
            userId: req.user.id,
        })

        const jobWithUser = await Job.findByPk(job.id, {
            include: {
                model: User,
                as: "user",
                attributes: ["username", "email", "avatar"]
            }
        });

        res.status(201).json({ message: 'Emploi crée avec succès', job: jobWithUser })
    } catch (e) {
        next(e)
    }
}

export const getJobsByUserId = async (req, res, next) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.status(400).send({ message: "Id de l'utilisateur manquant" })
        }

        const existingUserId = await User.findByPk(userId)

        if (!existingUserId) {
            return res.status(404).send({ message: "Utilisateur non trouvé" })
        }

        const jobs = await Job.findAll({ where: { userId } })

        res.status(200).json(jobs)
    } catch (e) {
        next(e)
    }
}

export const getJobById = async (req, res, next) => {
    try {
        const jobId = req.params.id

        if (!jobId) {
            return res.status(400).send({ message: "Id de l'emploi manquant" })
        }

        const job = await Job.findByPk(jobId)

        if (!job) {
            return res.status(404).send({ message: "Emploi non trouvé" })
        }

        res.status(200).json(job)
    } catch (e) {
        next(e)
    }
}

export const updateJob = async (req, res, next) => {
    try {
        const jobId = req.params.id

        if (!jobId) {
            return res.status(400).send({ message: "Id de l'emploi manquant" })
        }

        const job = await Job.findByPk(jobId)

        if (!job) {
            return res.status(404).send({ message: "Emploi non trouvé" })
        }

        const { title, salary, description, location } = req.body

        if (!title || !salary || !description || !location) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" })
        }

        if (title.length > 100) {
            return res.status(400).json({ message: "Le prénom ne doit pas dépasser 100 caractères" });
        }

        if (salary < 0 || salary > 300000) {
            return res.status(400).json({ message: "Le salaire doit être compris entre 0 et 300000" });
        }

        if (description.length > 1000) {
            return res.status(400).json({ message: "La description ne doit pas dépasser 1000 caractères" });
        }

        if (location.length > 100) {
            return res.status(400).json({ message: "La localisation ne doit pas dépasser 100 caractères" });
        }

        const updatedJob = await job.update({
            title,
            salary,
            description,
            location
        })

        res.status(200).json({ message: 'Emploi mis à jour avec succès', updatedJob })
    } catch (e) {
        next(e)
    }
}

export const deleteJob = async (req, res, next) => {
    try {
        const jobId = req.params.id

        if (!jobId) {
            return res.status(400).send({ message: "Id de l'emploi manquant" })
        }

        const job = await Job.findByPk(jobId)

        if (!job) {
            return res.status(404).send({ message: "Emploi non trouvé" })
        }

        await job.destroy()

        res.status(200).json({ message: 'Emploi supprimé avec succès' })
    } catch (e) {
        next(e)
    }
}

export const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.findAll()

        res.status(200).json(jobs)
    } catch (e) {
        next(e)
    }
}