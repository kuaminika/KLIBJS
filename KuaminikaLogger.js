
(function(kLib) {



    var w = window||this;
        
    function blankFunction(){};

    var fucntionsInConsole = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];

    var kLogger = {};
    var consoleObject = w.console || {}; 

    for (var index = 0; index < fucntionsInConsole.length; index++) {
        var fn = fucntionsInConsole[index];        
        kLogger[fn] = consoleObject[fn]||blankFunction;
    }

    kLib.log = kLogger.log;
    kLib.logError = kLogger.error;

    kLib.logger = kLogger;


})(kLib);