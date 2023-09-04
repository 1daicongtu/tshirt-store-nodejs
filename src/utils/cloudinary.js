const cloudinary = require("cloudinary").v2

          
cloudinary.config({ 
    cloud_name: 'dmma7axts', 
    api_key: '781433791738536', 
    api_secret: '_dgJmfsVpCO0RQBkvE1wpsQSnRU' 
});

module.exports = cloudinary;