/**
 * Created by ekeyser on 3/5/16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(/^\/([^\\/]+?)(?:\/(?=$))?$/i, function (req, res, next) {
    var sellerid = req.params[0];
    var timers = req.app.locals.timers;
    var count = req.app.locals.count;
    console.log(timers);

    setTimeout(function () {
        timers.sellerid.clearTimeout();
        timers.sellerid.setTimeout(timerExpiration, [timers.sellerid], count);
    }, 100);

    function timerExpiration(timer) {
        console.log('timer expiration!');
    }

    res.render('index', {title: sellerid});
});

module.exports = router;
