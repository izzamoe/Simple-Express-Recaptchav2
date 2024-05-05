function securePath(req, res, next) {
    if (req.session && req.session.user) {
        // If user session exists, continue to the next handler
        next();
    } else {
        // If user session does not exist, redirect to /login
        res.redirect('/login');
    }
}

export default securePath;