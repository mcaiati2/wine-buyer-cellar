import { DataTypes, Model } from 'sequelize';
import client from '../config/connection.js';

interface WineAttributes {
  brand: string;
  type: string;
  region: string;
  price: number;
  shop_id?: number;
}

class Wine extends Model<WineAttributes> implements WineAttributes {
  public brand!: string;
  public type!: string;
  public region!: string;
  public price!: number;
}

Wine.init(
  {
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
  },

  {
    sequelize: client,
    tableName: 'wines',
    underscored: true
  }
);

export default Wine;