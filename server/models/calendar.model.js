const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bookedTime: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
});

const WallsburgCalendar = mongoose.model('wallsburg_calendar', calendarSchema);
const LavaCalendar = mongoose.model('lava_calendar', calendarSchema);

module.exports = { WallsburgCalendar, LavaCalendar };