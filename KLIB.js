



(function()

{

    var w = window||this;



    /** This is a description of the IsFunction function. */

    function IsFunction(specimen)

    {

        var exists = specimen || false;

        var itsAfunction = toString.call(specimen||{}) === '[object Function]';

        return exists && itsAfunction ;

    }

   

    

    /** This is a description of the showParam function. */

    function showParam(data)

    {

        console.log(data);

    }



     /**  @function kLib.forEach

      * @param collection - anything that has a .length

      * @param doIt - the function that will be done to elements of the given collection

      */

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



     /** @function kLib.getFromClassWithDataAttribute

      * @param className - 

      * @param dataAttribute - 

      * @param value -

      */

     function getFromClassWithDataAttribute(className,dataAttribute,value)

     {

         var result = null ; 

         var domCollection = document.getElementsByClassName(className);

         if(!domCollection)

         {

            console.error("did not find any thing for class:'{0}'",className);

            return result;

         }

         

         _forEach(domCollection,function(elem)

         {

            if(elem.getAttribute("data-"+dataAttribute) === value)

              result =  elem;

         });

 

        if(!result)         

            console.error("did not find any thing for class:'"+className+"' and '"+dataAttribute+"'="+value);

         

        console.log("found");

         return result;

     }



     /** @function kLib.iterateObject

      * @param obj - 

      * @param fn

      * this method is supposed to iterate the 'obj' and do fn(x,j) where x is a property of obj  and j i

      */

     function iterateObject(obj,fn)

     {

        for(var key in obj)

        {

            var j = obj[key];

            fn(key,j);

        }

     }





    /** @function kLib.getfirstFromDataAttribute

      * @param collection - 

      * @param dataAttribute - 

      * @param value -

      */

    function getfirstFromDataAttribute(domCollection,dataAttribute,value)

    {

        var result = null ; 

        _forEach(domCollection,function(elem)

        {

           if(elem.getAttribute("data-"+dataAttribute)===value)

             result =  elem;

        });



        return result;

    }



  /**  @function kLib.filterWithDataAttribute

      * @param collection - 

      * @param dataAttribute - 

      * @param value -

      */

    function filterWithDataAttribute(domCollection,dataAttribute,value)

    {



        var filterResult = [];

        _forEach(domCollection,function(elem)

        {

            if(elem.getAttribute("data-"+dataAttribute)===value)

              filterResult.push(elem);

        });



        return filterResult;

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





    function capitalizeFirst(victimStr)

    {

        var index = 0;

        var result =   victimStr.charAt(index).toUpperCase() + victimStr.slice(1);

        return result;

    }

    function appendToElement(element1,newChild)
    {
        var currentInnerSTR = element1.innerHTML;
        var newChildInSTR = getStringVersion(newChild);

        var newInnerSTR = currentInnerSTR+newChildInSTR;

        element1.innerHTML = newInnerSTR;

    }



     /**  @function kLib.getStringVersion */

    function getStringVersion(element)

    {

        var tmpParent = document.createElement("span");



        tmpParent.appendChild(element);



        return tmpParent.innerHTML;



    }



    w.kLib = w.kLib || {};

    



    /**

     * A namespace.

     * @namespace kLib

     */

    var kLib = w.kLib ;

    kLib.iterateObject = iterateObject;

    kLib.appendToElement = appendToElement;
    kLib.getStringVersion = getStringVersion;

    kLib.mapTemplate = mapTemplate;

    kLib.getController = getController;

    kLib.forEach = _forEach;

    kLib.getById = getById;

    kLib.log = console.log;

    kLib.logError = console.error;

    kLib.capitalizeFirst = capitalizeFirst;

    kLib.isFunction = IsFunction;

    kLib.blnkProcedure = blnkProcedure;

    kLib.getfirstFromDataAttribute = getfirstFromDataAttribute;

    kLib.filterWithDataAttribute = filterWithDataAttribute;

    kLib.getFromClassWithDataAttribute = getFromClassWithDataAttribute;

    w.kLib = kLib;

    

})()

