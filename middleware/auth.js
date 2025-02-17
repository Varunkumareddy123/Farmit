import jwt from 'jsonwebtoken';
// const excludeRoutes = ['/Main/FSignUp','/Main/FLogin'];

   const AuthMiddleware = (req, res, next) =>{
    const token = req.headers.authorization;
   
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
         next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


const checkRole = (roles) => (req, res, next) => {
    
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Access not allowed' });
        }
        next();
};
      
export {AuthMiddleware,checkRole}