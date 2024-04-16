const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { userRoles } = require("../config/roles.js");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: function () {
        // Email is required if mobile is not provided
        return !this.mobile;
      },
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },

    password: {
      type: String,
      trim: true,
      minlength: 8,
      required: function () {
        // Password is required if mobile is not provided
        return !this.mobile;
      },
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true, // used by the toJSON plugin
    },
    mobile: {
      type: String,
      unique: true,
      trim: true,
      required: function () {
        // Mobile number is required if email is not provided
        return !this.email;
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    role: {
      type: String,
      enum: userRoles,
      default: "member",
    },
  },
  {
    methods: {
      /**
       * Check if password matches the user's password
       * @param {string} password
       * @returns {Promise<boolean>}
       */
      isPasswordMatch: async function (password) {
        const user = this;
        return bcrypt.compare(password, user.password);
      },
    },
    statics: {
      /**
       * Check if email is taken
       * @param {string} email - The user's email
       * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
       * @returns {Promise<boolean>}
       */
      isEmailTaken: async function (email, excludeUserId) {
        const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
        return !!user;
      },
      /**
       * Check if mobile number is taken
       * @param {string} mobile - The user's mobile number
       * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
       * @returns {Promise<boolean>}
       */
      isMobileTaken: async function (mobile, excludeUserId) {
        const user = await this.findOne({ mobile, _id: { $ne: excludeUserId } });
        return !!user;
      },
    },
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
// userSchema.plugin(paginate);

// hash password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
