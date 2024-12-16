import { Router } from 'express';
import { Shop, User, Wine } from '../../models/index.js';
const router = Router();
// Get all shops
router.get('/shops', async (_, res) => {
    try {
        // Find all shops and attach the user that created the shop and also all the wines associated with the shop
        // We use the attributes property to select the columns/fields that we want
        // await Shop.findAll()
        const shops = await Shop.findAll({
            // This property is specific to associations (ie. hasMany, belongsTo, belongsToMany, hasOne)
            include: [
                {
                    model: Wine,
                    // This allows us to choose the fields we would like to get back on the wine objects
                    attributes: ['brand', 'type']
                },
                {
                    model: User,
                    // This is pulling a nested user object, so you have to make sure you DO NOT include the password field
                    // In other words, pick the fields you want
                    attributes: ['first_name', 'last_name']
                }
            ]
        });
        res.json({ shops });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while counting shops' });
    }
});
export default router;
