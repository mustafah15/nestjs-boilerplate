import { registerAs } from '@nestjs/config';

export default registerAs('jwt.config', () => ({
  secretOrKey: process.env.JWT_SECRET,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXPIRY || 86400 },
}));
