const log4js = require('log4js');
var moment = require('moment');
var date = Date.now();
date = moment(date).format('DD-MM-YYYY');

var logger = module.exports = {};

logger.debug = function (msg) {
    log4js.configure('./app/config/log4js-file.json');
    const logger = log4js.getLogger('KEEN-VT');
    logger.debug(msg);
    log4js.configure('./app/config/log4js-console.json');
    var _logger = log4js.getLogger('KEEN-VT');
    _logger.level = 'debug';
    _logger.debug(msg);

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

logger.log = function (msg) { debugger
    var header = logger.header || '';
    _logger.log(header + '::' + msg);
};

// logger.fatal = function (msg) {
//     var header = logger.header || '';
//     _logger.fatal(header + '::' + msg);
// };

// logger.stream = {
//     write: function (message, encoding) {
//         _accessLogger.debug(message);
//     }
// };

logger.write = function (req, type, data) { debugger
    var sessionId;
    var header = logger.header || '';
    if (req && req.currentUser) {
        sessionId = req.currentUser.id + " - " + req.sessionID + " - " + req.id + " :: ";
    }
    if (type != null && type != undefined) {
        try {
            switch (type) {
                case 'debug':
                    logger.debug(header + ' :: ' + sessionId + data);
                    break;
                case 'error':
                    logger.error(header + ' :: ' + sessionId + data);
                    break;
                default:
            }
        } catch (e) {
            logger.error(header + ' :: ' + sessionId + e);
        }
    }


}