import { Router } from 'express';
import { PermissionColl } from './model';
import { Authentication } from '~/authentication';

const controller = (() => {
  const router = Router();
  router.get('/', async (req, res) => {
    const permissionList = await PermissionColl.find().exec();
    res.json({ data: { permissionList: permissionList[0].permissionList } });
  });

  router.post('/', async (req, res) => {
    try {
      const permissionList = await PermissionColl.updateOne(
        {},
        {
          permissionList: req.body.permissionList,
        },
        {
          upsert: true,
        },
      ).exec();
      res.json({ data: permissionList });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/update_user', async (req, res) => {
    if (!req.user) {
      res.status(401).send('Unauthorized');
      return;
    }
    try {
      const userObject = await Authentication.UserColl.updateOne(
        { id: req.user.id },
        {
          permissions: req.body.permissionList,
        },
      ).exec();

      res.status(200).json({ data: userObject });
    } catch (err) {
      res.status(503).json({ error: err.message });
    }
  });

  return router;
})();

controller.prefix = '/permissions';

export default controller;
