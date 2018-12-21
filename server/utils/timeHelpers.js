const milliFromNow = time => new Date().getTime() + time;

const daysFromNow = days => new Date().setDate(new Date().getDate() + days);

module.exports = { milliFromNow, daysFromNow };
