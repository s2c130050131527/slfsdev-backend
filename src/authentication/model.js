import mongoose, { Schema } from 'mongoose';

/**
 * @example
 * {
 *   username: 'shyam-chen',
 *   password: '3345678',
 *   email: 'shyam.chen@gmail.com',
 *   role: 'user',
 *   permissions: [
 *     {
 *       route: '/foo',
 *       operations: ['create', 'read', 'update', 'delete'],
 *     },
 *     {
 *       route: '/bar',
 *       operations: ['read'],
 *     },
 *   ],
 * }
 */
const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    validate: {
      validator(value) {
        return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
          value,
        );
      },
      message: ({ value }) => `${value} is not a valid email format`,
    },
    required: true,
  },
  permissions: [
    {
      type: String,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

export const UserColl = mongoose.model('User', userSchema);

const refreshTokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  token: String,
  expires: Date,
  revoked: Date,
  ipAddress: String,
});

refreshTokenSchema.virtual('isExpired').get(() => {
  return Date.now() >= this.expires;
});

refreshTokenSchema.virtual('isActive').get(() => {
  return !this.revoked && !this.isExpired;
});

export default {
  User: UserColl,
  RefreshToken: mongoose.model('RefreshToken', refreshTokenSchema),
};
