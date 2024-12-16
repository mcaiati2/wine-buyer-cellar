import { DataTypes, Model } from 'sequelize';
import client from '../config/connection.js';

interface ShopAttributes {
  id: number;
  name: string;
  address: string;
  user_id?: number;
}

class Shop extends Model<ShopAttributes> implements ShopAttributes {
  public id!: number;
  public name!: string;
  public address!: string;
}

Shop.init(
  {
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
  },

  {
    // This is the required client connection
    sequelize: client,
    tableName: 'shops',
    underscored: true
  }
);

export default Shop;