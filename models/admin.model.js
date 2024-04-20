const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
// const { toJSON, paginate } = require("./plugins");
const { adminRoles } = require("../config/roles");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: adminRoles,
      default: "admin",
    },
    // isEmailVerified: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    methods: {
      /**
       * Check if password matches the admin's password
       * @param {string} password
       * @returns {Promise<boolean>}
       */
      isPasswordMatch: async function (password) {
        const admin = this;
        return bcrypt.compare(password, admin.password);
      },
    },
    statics: {
      /**
       * Check if email is taken
       * @param {string} email - The admin's email
       * @param {ObjectId} [excludeAdminId] - The id of the admin to be excluded
       * @returns {Promise<boolean>}
       */
      isEmailTaken: async function (email, excludeAdminId) {
        const admin = await this.findOne({
          email,
          _id: { $ne: excludeAdminId },
        });
        return !!admin;
      },
    },
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
// adminSchema.plugin(toJSON);
// adminSchema.plugin(paginate);

adminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }
  next();
});

//adding reference to marketing agent
adminSchema.add({
  approvedAgents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MarketingAgent'
  }]
});
/**
 * @typedef Admin
 */
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
