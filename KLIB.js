

(function()
{
    var w = window||this;
    function IsFunction(specimen)
    {
        var exists = specimen || false;
        var itsAfunction = toString.call(specimen||{}) === '[object Function]';
        return exists && itsAfunction ;
    }
   
    function showParam(data)
    {
        console.log(data);
    }

    function _forEach(collection,doIt)
    {
        for(var i=0; i<collection.length;i++)
        {
            var el= collection[i];
            doIt(el);
        }
    }

    function blnkProcedure()
    {
        console.log("this is a blank procedure. it should be replaced by an implementation");
    }

    function getById(_id)
    {
        var result = document.getElementById(_id);
        return result;
    }


    
    function mapTemplate(controllerName,urlTemplate)
    {
        kLib.activeControllers = kLib.activeControllers || {};

        if( kLib.activeControllers[controllerName]) return;// kLib.activeControllers[controllerFn.name];

        kLib.activeControllers[controllerName] ={run: window[controllerName],url:urlTemplate};        
    }


     function getController(controllerName)
    {
        kLib.activeControllers = kLib.activeControllers || {};
        if( kLib.activeControllers[controllerName]) return kLib.activeControllers[controllerName];

        var notFoundRslt = {run: function(){ console.log("not found"); },url:""};

        return notFoundRslt;

    }

    function getStringVersion(element)
    {
        var tmpParent = document.createElement("span");

        tmpParent.appendChild(element);

        return tmpParent.innerHTML;

    }

	w.kLib = w.kLib || {};
    var kLib = w.kLib ;
    kLib.getStringVersion = getStringVersion;
    kLib.mapTemplate = mapTemplate;
    kLib.getController = getController;
    kLib.forEach = _forEach;
    kLib.getById = getById;
    kLib.isFunction = IsFunction;
    kLib.blnkProcedure = blnkProcedure;
    w.kLib = kLib;
    
})()
