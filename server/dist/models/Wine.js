import { DataTypes, Model } from 'sequelize';
import client from '../config/connection.js';
class Wine extends Model {
}
Wine.init({
    // Model attributes are defined here
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    region: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize: client,
    tableName: 'wines',
    underscored: true
});
export default Wine;
