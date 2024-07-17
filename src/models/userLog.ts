const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Log Schema
const logSchema = new Schema({
    user_id: String,
    operationType: String,
    changes: Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now }
});

const Log = model('Log', logSchema);
