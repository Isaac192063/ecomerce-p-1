export const hasRole =  (role) => {
    return (req, res, next) => {
        if(req.user.role !== role){
            return res.status(401).json({
                success: false,
                message: 'usuario no autorizado'
            })
        }
        next()
    };
};
