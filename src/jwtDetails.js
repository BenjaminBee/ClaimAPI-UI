import jwt_decode from "jwt-decode";

function getDecoded() {
    if(localStorage.getItem("jwt") !== null) {
        var token = localStorage.getItem("jwt");
        var decoded = jwt_decode(token);
        return decoded;
    }
}

export function getID() {
    let decoded = getDecoded();
    // console.log(decoded.userID)
    return decoded.userID;
}

export function getRole() {
    let decoded = getDecoded();
    // console.log(decoded.Role)
    return decoded.Role;}