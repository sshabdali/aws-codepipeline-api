import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    fullName: { type: String, required: 'Enter a full name' },
    email: { type: String },
    phone: { type: Number },
    created_date: { type: Date, default: Date.now }
});