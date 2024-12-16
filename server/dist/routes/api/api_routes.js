import { Router } from 'express';
import { Shop } from '../../models/index.js';
import { isAuthenticated } from '../helpers/index.js';
const router = Router();
router.get('/shops/count', async (_, res) => {
    try {
        const shopCount = await Shop.count();
        res.json({ count: shopCount });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while counting shops' });
    }
});
router.get('/shops', isAuthenticated, async (req, res) => {
    const userShops = await Shop.findAll({
        where: {
            UserId: req.user.id
        }
    });
    res.json(userShops);
});
export default router;
