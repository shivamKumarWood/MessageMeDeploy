import jwt from 'jsonwebtoken';

const createTokenAndSaveCookie = (userId,res) => {

    const token= jwt.sign({userId},process.env.JWT_TOKEN, { 
        expiresIn: "10d"
    });
    console.log(token);
    res.cookie("jwt", token, {
        httpOnly: true,  //xss attack
        secure:true,
        samesite: "strict",
    }
    );
};
export default createTokenAndSaveCookie;