export const checkEmail = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        return res.status(409).json({ email: "Correo ya registrado" });
      }
      else {
        next();
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Error al verificar el correo electrónico" });
    });
};