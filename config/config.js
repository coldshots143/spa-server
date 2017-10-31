
module.exports = {
        'secret':require('crypto').createHmac('sha256','!qAz@wSx#eDc').digest('hex'),
        'database': 'mongodb://localhost/spa'
    
    };