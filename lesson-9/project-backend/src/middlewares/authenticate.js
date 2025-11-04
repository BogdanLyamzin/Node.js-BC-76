import createHttpError from "http-errors";

import Session from "../db/models/Session.js";
import User from "../db/models/User.js";

const authenticate = async(req, res, next)=> {
    if(!req.cookies.accessToken) throw createHttpError(401, "Access token missing");
    
    const session = await Session.findOne({
        accessToken: req.cookies.accessToken,
    });
    if(!session) throw createHttpError(401, "Session not found");
    
    const isAccessTokenExpired = session.accessTokenValidUntil < new Date();
    if(isAccessTokenExpired) throw createHttpError(401, "Access token expired");

    const user = await User.findOne({_id: session.userId});
    if(!user) throw createHttpError(401, "User not found");

    req.user = user;
    next();
};

export default authenticate;