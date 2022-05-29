export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secretOrKey: process.env.JWT_SECRET,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRY || 86400 },
  },
});
