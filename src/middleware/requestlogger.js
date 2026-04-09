const requestLogger = (req , res , next) => {
    const timestamp = new Date().toISOString();
    console.log(req.name + " > " + timestamp + ": " + req.method + " > " + req.path);

    next();
}

module.exports = requestLogger;