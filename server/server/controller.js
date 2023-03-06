const process = require('../process/_index')

module.exports = (req, res, db) => {

    // point request to process
    process[req.path][req.method]({ req, res ,db })
}