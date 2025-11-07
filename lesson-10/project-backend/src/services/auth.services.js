import {randomBytes} from "crypto";

import Session from "../db/models/Session.js";

import { accessTokenLifetime, refreshTokenLifetime } from "../constants/index.js";

export const createSession = (userId)=> {
    return Session.create({
        userId,
        accessToken: randomBytes(30).toString("base64"),
        refreshToken: randomBytes(30).toString("base64"),
        accessTokenValidUntil: new Date(Date.now() + accessTokenLifetime),
        refreshTokenValidUntil: new Date(Date.now() + refreshTokenLifetime),
    });
};

export const setSessionCookies = (res, session) => {
    res.cookie("accessToken", session.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: accessTokenLifetime,
    });
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: refreshTokenLifetime,
    });
    res.cookie("sessionId", session._id, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: refreshTokenLifetime,
    });
};