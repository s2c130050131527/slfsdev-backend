import { Router } from 'express';
import { CourseColl } from './model';

const controller = (() => {
  const router = Router();

  router.get('/getall', async (req, res, next) => {
    console.log(req.user);
    try {
      const result = await CourseColl.find({}).exec();
      res.status(200).json({ data: result });
    } catch (e) {
      res.status(500).json({ error: 'Something Went Wrong' });
    }
  });
  router.post('/putall', async (req, res, next) => {
    try {
      const result = await CourseColl.insertMany(req.body.data);
      res.status(200).json({ data: result });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Something Went Wrong' });
    }
  });
  return router;
})();

controller.prefix = '/course';

export default controller;
