function checkUserSession(req, res, next) {
    if (req.session && req.session.user) {
        // If user is logged in, continue to the next handler
        res.redirect('/users');
    } else {
        // If user is not logged in, redirect to /login
        res.redirect('/login');
    }
}

export default checkUserSession;