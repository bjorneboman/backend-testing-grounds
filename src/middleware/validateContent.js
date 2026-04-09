const validateContent = (req , res , next) => {
    const methodWithBody = ["POST" , "PUT" , "PATCH"];

    if(methodWithBody.includes(req.method)) {
        const contentType = req.headers["content-type"] || "";

        if(!contentType.includes("application/json") ){
            return res.status(415).json(
                {
                    error: "unsupported_media_type",
                    message: "Content - Type must be application/json"

                }
            )

        }
    }
    req.name = "Robin";

    next();
}

module.exports = validateContent;