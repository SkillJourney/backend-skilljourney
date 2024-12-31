import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Accès non autorisé, token manquant" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: "Token non valide" })
    }
};

export default verifyToken