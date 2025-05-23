import mongoose from "mongoose"
import bcrypt from "bcrypt"

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
}, {
    timestamps: true,
})

// Hash password before saving
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Method to compare password
adminSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const Admin = mongoose.model("Admin", adminSchema)

export default Admin
