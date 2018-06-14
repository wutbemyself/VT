const log4js = require('log4js');
var moment = require('moment');
var date = Date.now();
date = moment(date).format('DD-MM-YYYY');
var logger = module.exports = {};
var memCache = require('memory-cache');

logger.debug = function (msg) {
    log4js.configure('./app/config/log4js-file.json');
    const logger = log4js.getLogger('KEEN-VT');
    logger.debug(msg);
    log4js.configure('./app/config/log4js-console.json');
    var _logger = log4js.getLogger('KEEN-VT');
    _logger.level = 'debug';
    _logger.debug(msg);

};

logger.info = function (msg) {
    log4js.configure('./app/config/log4js-file.json');
    const logger = log4js.getLogger('KEEN-VT');
    logger.info(msg);
    log4js.configure('./app/config/log4js-console.json');
    var _logger = log4js.getLogger('KEEN-VT');
    _logger.level = 'info';
    _logger.info(msg);

};

logger.error = function (msg, err) {
    log4js.configure('./app/config/log4js-file.json');
    const logger = log4js.getLogger('KEEN-VT');
    logger.error(msg);
    log4js.configure('./app/config/log4js-console.json');
    var _logger = log4js.getLogger('KEEN-VT');
    _logger.level = 'error';
    _logger.error(msg);

};

logger.log = function (msg) {
    // var header = logger.header || '';
    _logger.log(msg);
};

logger.write = function (req, type, data) {
    // var token = (req.headers && req.headers.authorization ? JSON.parse(req.headers.authorization) : '');
    var user = memCache.get('user') ? memCache.get('user') : '';
    var sessionID = memCache.get('sessionID') ? memCache.get('sessionID') : '';
    var sessionId;
    if (req && req.headers) {
        sessionId = user + " - " + sessionID + " :: ";
    }
    (sessionId || sessionId != undefined ? sessionId : sessionId = '')
    if (type != null && type != undefined) {
        try { 
            switch (type) {
                case 'debug':
                    logger.debug(sessionId + data);
                    break;
                case 'info':
                    logger.info(sessionId + data);
                    break;
                case 'error':
                    logger.error(sessionId + data);
                    break;
                default:
            }
        } catch (e) {
            logger.error(sessionId + e);
        }
    }


}