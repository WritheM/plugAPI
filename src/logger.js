var chalk = require('chalk');
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var levels = {
    success: ['green'],
    info: ['white'],
    warning: ['yellow', 'underline'],
    error: ['bgRed', 'white', 'bold']
};

function pad(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

function timestamp() {
    var d = new Date();
    var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
    return [pad(d.getDate()), months[d.getMonth()], time].join(' ');
}

function chalkPaint(sidewalkChalks, text) {
    var combinedChalk = chalk;
    for (var i in sidewalkChalks) {
        if (!sidewalkChalks.hasOwnProperty(i)) continue;
        combinedChalk = combinedChalk[sidewalkChalks[i]];
    }
    return combinedChalk(text);
}

module.exports = {
    log: function() {
        var args = Array.prototype.slice.call(arguments);
        var level = 'info';
        if (levels[args[0]] !== undefined) {
            level = args.shift();
        }

        args.unshift(new Array(10 - level.length - 2).join(' '));
        args.unshift(chalkPaint(levels[level], '[' + level.toUpperCase() + ']'));
        args.unshift(timestamp());

        console.log.apply(console, args);
    },
    success: function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('success');
        this.log.apply(this, args);
    },
    info: function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('info');
        this.log.apply(this, args);
    },
    warn: function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('warning');
        this.log.apply(this, args);
    },
    warning: function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('warning');
        this.log.apply(this, args);
    },
    error: function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('error');
        this.log.apply(this, args);
    }
};