import { DataTypes, Model, Sequelize } from "sequelize";
import User from "../users/user.model";
import sequelize from "../../config/dataBase";

interface IUser_refresh_tokens {
  uid_user_refresh_token?: string;
  id_user?: number;
  refresh_token?: string;
  user_agent?: string;
  ip_address?: string;
  expires_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class user_refresh_tokens
  extends Model<IUser_refresh_tokens>
  implements IUser_refresh_tokens
{
  public uid_user_refresh_token?: string;
  public id_user?: number;
  public refresh_token?: string;
  public user_agent?: string;
  public ip_address?: string;
  public expires_at?: Date;
  public createdAt?: Date;
  public updatedAt?: Date;
}

user_refresh_tokens.init(
  {
    uid_user_refresh_token: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    user_agent: DataTypes.STRING(255),

    ip_address: DataTypes.STRING(45),

    expires_at: DataTypes.DATE(),
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    modelName: "user_refresh_tokens",
  }
);
