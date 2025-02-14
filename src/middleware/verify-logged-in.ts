import { NextFunction, Request, Response } from "express";
import ErrorModel from "../models/error-model";
import cyber from "../utils/cyber";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction): Promise<void> {

    const authorizationHeader = request.header("authorization"); // Suppose to be "Bearer the-token"

    const isValid = await cyber.verifyToken(authorizationHeader);

    if(!isValid) {
        next(new ErrorModel(401, "You are not logged in"));
        return;
    }

    next();
}

export default verifyLoggedIn