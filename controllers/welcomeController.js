export const welcome = (req, res, next) => {
    try {
        res.send({ message: "Welcome to the SkillJourney API" })
    } catch (e) {
        next(e)
    }
};
