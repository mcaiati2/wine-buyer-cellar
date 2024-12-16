import { DataTypes, Model } from 'sequelize';
import client from '../config/connection.js';
class Shop extends Model {
}
Shop.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    // This is the required client connection
    sequelize: client,
    tableName: 'shops',
    underscored: true
});
export default Shop;
