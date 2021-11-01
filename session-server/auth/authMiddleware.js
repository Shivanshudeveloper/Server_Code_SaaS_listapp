const authMiddleware = (req, res, next) => {
    if(!req.user){
        res.status(401).json({message: 'You are not authenticated to view this route'});
    }
    next();
}

module.exports = authMiddleware;