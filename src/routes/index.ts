import express from 'express';
import sdroutes from './service-discovery';
import providerroutes from './providers';

const router = express.Router();

router.use('/', sdroutes);
router.use('/v1/providers', providerroutes);

router.get('/health', (_req, res) => {
  res.send('ok');
});

export default router;
