import jwt from "jsonwebtoken";
import User from "../models/User.js";
export function authverify(req, res, next) {
    const incomimg_token = req.cookies;
    if (!incomimg_token) {
        res.redirect("/signup");
        return;
    }
    if (!incomimg_token['X-Auth-Token']) {
        res.redirect("/login");
        return;
    }
    jwt.verify(incomimg_token['X-Auth-Token'], 'This is supposed to be secret , made with <3 by tba', (err, _decodedtoken) => {
        if (err) {
            res.redirect("/login");
            return;
        }
        else {
            next();
        }
    });
    return;
}
export async function isAdmin(req, res, next) {
    const incomimg_token = req.cookies;
    const decodedToken = jwt.verify(incomimg_token['X-Auth-Token'], 'This is supposed to be secret , made with <3 by tba');
    console.log(decodedToken);
    const user = await User.findById(decodedToken.user_id);
    if (user?.admin) {
        console.log(user);
        next();
    }
    else {
        res.send("Not Authorised");
    }
}
