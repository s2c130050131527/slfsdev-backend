import mongoose, { Schema } from 'mongoose';

const listSchema = new Schema({
  permissionList: [
    {
      type: String,
      required: true,
    },
  ],
});

export const PermissionColl = mongoose.model('Permissions', listSchema);
