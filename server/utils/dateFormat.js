// utils/dateFormat.js
const dateFormat = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().substring(0, 10);
  };
  
module.exports = dateFormat;
  