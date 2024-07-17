import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define an interface for the User document
export interface IUser extends Document {
  user_id: string;
  name: string;
  dob: Date;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  email: string;
  city: string;
  state: string;
  kyc_status: 'pending' | 'done';
  bank_details: Record<string, string>;
  photos: string;
  product_type: string;
  createdOn: Date;
}

// Regular expression for validating a 10-digit numeric mobile number
const mobileRegex = /^\d{10}$/;

// Regular expression for validating an email address
const emailRegex = /^\S+@\S+\.\S+$/;

// Create the User schema
const UserSchema: Schema = new Schema({
  user_id: { type: String, unique: true, default: uuidv4 },
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  mobile: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return mobileRegex.test(v);
      },
      message: 'Invalid mobile number format'
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return emailRegex.test(v);
      },
      message: 'Invalid email format'
    }
  },
  city: { type: String, required: true },
  state: { type: String, required: true },
  kyc_status: { type: String, enum: ['pending', 'done'], required: true },
  bank_details: { type: Map, of: String, required: true },
  photos: { type: String, required: false },
  product_type: { type: String, required: true },
  createdOn: { type: Date, default: Date.now }
});

// Create an index on user_id
UserSchema.index({ user_id: 1 });

// Export the User model
export default mongoose.model<IUser>('User', UserSchema);
