import client from '../config/connection.js';

import User from './User.js';
import Shop from './Shop.js';
import Wine from './Wine.js';

// // One To Many Relationships
// User can have many associated shops and a shop belongs to a single user
User.hasMany(Shop, { foreignKey: 'user_id' });
Shop.belongsTo(User, { foreignKey: 'user_id' });

// Shop can have many wines and a wine belongs to a single shop
Shop.hasMany(Wine, { foreignKey: 'shop_id' });
Wine.belongsTo(Shop, { foreignKey: 'shop_id' });

// User can have many wines and a wine belongs to a single user
User.hasMany(Wine, { foreignKey: 'user_id' });
Wine.belongsTo(User, { foreignKey: 'user_id' });

// Create the manager association
// User can have one manager but a manager could belong to(or be attached to) any user
User.hasOne(User, { foreignKey: 'manager_id', as: 'manager' });
User.belongsTo(User, { foreignKey: 'manager_id', as: 'employee' });


export {client, User, Shop, Wine};