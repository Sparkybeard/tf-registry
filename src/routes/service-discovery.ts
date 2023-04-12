import express from 'express';

const router = express.Router();

// ref: https://www.terraform.io/docs/internals/remote-service-discovery.html
router.get('/.well-known/terraform.json', (_req, res) => {
    // match with https://registry.terraform.io/.well-known/terraform.json
    res.json({
        'modules.v1': '/v1/modules/',
        'providers.v1': '/v1/providers/',
    });
});

export default router;
