import { Router } from 'express';
import { Shop, Wine } from '../../models/index.js';
import { isAuthenticated } from '../helpers/index.js';
const router = Router();
// Get user shops
// localhost:3333/api/shops/user
router.get('/shops/user', isAuthenticated, async (req, res) => {
    const userShops = await Shop.findAll({
        where: {
            user_id: req.user.id
        }
    });
    res.json({ shops: userShops });
});
// Get a single shop
router.get('/shop/:shop_id', isAuthenticated, async (req, res) => {
    // Get all wines by shop id and also attach the user that created the shop
    // We use the attributes property to specify the fields we want on the user
    const shop = await Shop.findOne({
        // Attach all associated wines for the shop
        include: Wine,
        where: {
            id: req.params.shop_id,
            user_id: req.user.id
        }
    });
    if (!shop) {
        res.status(403).json({
            message: 'You can only view shops that you have created'
        });
        return;
    }
    res.json({
        shop
    });
});
// Create a shop
// localhost:3333/api/shop
router.post('/shop', isAuthenticated, async (req, res) => {
    try {
        await Shop.create({
            ...req.body,
            // Never get the user's id from the client directly (ie. sending a user id through the req.body json object)
            user_id: req.user.id
        });
        res.json({
            message: 'Shop created successfully!'
        });
    }
    catch (error) {
        console.log('create shop error', error);
        res.status(500).json({
            message: 'There was a problem creating the shop'
        });
    }
});
// Edit shop
router.put('/shop', isAuthenticated, async (req, res) => {
    try {
        await Shop.update({
            ...req.body
        }, {
            where: {
                id: Number(req.query.shop_id),
                user_id: req.user.id
            }
        });
        res.json({
            message: 'Shop updated successfully!'
        });
    }
    catch (error) {
        console.log('create shop error', error);
        res.status(500).json({
            message: 'There was a problem updating the shop'
        });
    }
});
// Add a wine to a shop
router.post('/wine', isAuthenticated, async (req, res) => {
    // Find the shop using the logged in users's id and the ShopId provided through req.body from the client/browser
    const userShop = await Shop.findOne({
        where: {
            user_id: req.user.id,
            id: req.body.shop_id
        }
    });
    // If we didn't find the shop then they are not the owner
    if (!userShop) {
        res.status(401).json({
            message: 'Error in finding that shop. Please make sure the shop_id is correct and you created the shop.'
        });
        return;
    }
    try {
        const wine = await Wine.create({
            ...req.body,
            user_id: req.user.id
        });
        res.json({
            wine,
            message: 'Wine added successfully!'
        });
    }
    catch (error) {
        console.log('WINE CREATE ERROR', error);
        res.status(500).json({
            message: 'There was a problem adding a wine'
        });
    }
});
// Delete a shop
router.delete('/shop/:shop_id', isAuthenticated, async (req, res) => {
    // Find the shop using the logged in users's id and the ShopId provided through req.body from the client/browser
    const userShop = await Shop.findOne({
        where: {
            user_id: req.user.id,
            id: req.params.shop_id
        }
    });
    // If we didn't find the shop then they are not the owner
    if (!userShop) {
        res.status(401).json({
            message: 'You are cannot delete a shop you did not create'
        });
        return;
    }
    try {
        // Delete the shop row from the Shops table
        await Shop.destroy({
            where: {
                id: req.params.shop_id
            }
        });
        res.json({
            message: 'Shop deleted successfully!'
        });
    }
    catch (error) {
        console.log('SHOP DELETE ERROR', error);
        res.status(500).json({
            message: 'There was a problem deleting a shop'
        });
    }
});
export default router;
