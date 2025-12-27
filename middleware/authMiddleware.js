// middleware/authMiddleware.js

exports.verifyToken = (req, res, next) => {
    // For now, we allow all requests to pass so you can test the DB
    // Later, we will add JWT verification logic here
    console.log('Auth Middleware: Token verification skipped for testing.');
    next();
};

exports.authorizeRole = (roles) => {
    return (req, res, next) => {
        // For now, we allow all roles to pass
        console.log(`Auth Middleware: Role check for ${roles} skipped for testing.`);
        next();
    };
};