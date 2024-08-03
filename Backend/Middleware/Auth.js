import jswebtoken from "jsonwebtoken";

export const generateToken = (user) => {
  return jswebtoken.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      plan: user.plan,
    },
    process.env.SECRET,
    {
      expiresIn: "2h",
    }
  );
}

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jswebtoken.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
}

export const isAdmin = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jswebtoken.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        if(decode.role === "admin"){
        next();
        }else{
          res.status(401).send({ message: "Invalid Token" });
        }
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
}
