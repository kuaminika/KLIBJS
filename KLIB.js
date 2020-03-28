(function()
{
    var w = window||this;
    function IsFunction(specimen)
    {
        var exists = specimen || false;
        var itsAfunction = toString.call(specimen||{}) === '[object Function]';
        return exists && itsAfunction ;
    }



    var kLib = {};
    kLib.isFunction = IsFunction;

    w.KLib = kLib;
    
})()
