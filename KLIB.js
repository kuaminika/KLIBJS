



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

        logIfYouCan(data);

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

            doIt(el,i);

        }

    }



    function blnkProcedure()

    {

        logIfYouCan("this is a blank procedure. it should be replaced by an implementation");

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

            logErrorIfYouCan("did not find any thing for class:'{0}'",className);

            return result;

         }

         

         _forEach(domCollection,function(elem)

         {

            if(elem.getAttribute("data-"+dataAttribute) === value)

              result =  elem;

         });

 

        if(!result)         

            logErrorIfYouCan("did not find any thing for class:'"+className+"' and '"+dataAttribute+"'="+value);

         

        logIfYouCan("found");

         return result;

     }


     function getData(element,attributeName)
     {
       var result  = element.getAttribute("data-"+attributeName);
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

     //cannot take credit for this one : 
     //https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
     function isElement(obj) {
        try {

            if(!obj) return false;
          //Using W3 DOM2 (works for FF, Opera and Chrome)
          return obj instanceof HTMLElement;
        }
        catch(e){
          //Browsers not supporting W3 DOM2 don't have HTMLElement and
          //an exception is thrown and we end up here. Testing some
          //properties that all elements have (works on IE7)
          return (typeof obj==="object") &&
            (obj.nodeType===1) && (typeof obj.style === "object") &&
            (typeof obj.ownerDocument ==="object");
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

    function logIfYouCan(logMe)
    {
        if(!console) return;
        console.log(logMe);  
       // console.log(new Error().stack);
    }
    
    function logErrorIfYouCan(error)
    {
        if(!console) return;
        console.error(error);
    }


     function getController(controllerName)
    {

        kLib.activeControllers = kLib.activeControllers || {};

        if( kLib.activeControllers[controllerName]) return kLib.activeControllers[controllerName];



        var notFoundRslt = {run: function(){ logIfYouCan("not found"); },url:""};



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

    kLib.getData = getData;

    kLib.iterateObject = iterateObject;

    kLib.appendToElement = appendToElement;
    kLib.getStringVersion = getStringVersion;

    kLib.mapTemplate = mapTemplate;

    kLib.getController = getController;

    kLib.forEach = _forEach;

    kLib.getById = getById;

    kLib.log = logIfYouCan;

    kLib.logError = logErrorIfYouCan;

    kLib.capitalizeFirst = capitalizeFirst;

    kLib.isFunction = IsFunction;

    kLib.blnkProcedure = blnkProcedure;

    kLib.getfirstFromDataAttribute = getfirstFromDataAttribute;

    kLib.filterWithDataAttribute = filterWithDataAttribute;

  //  kLib.logIfYouCan = logIfYouCan;
  //  kLib.logErrorIfYouCan = logErrorIfYouCan;
    kLib.getFromClassWithDataAttribute = getFromClassWithDataAttribute;
    kLib.isElement = isElement;
    w.kLib = kLib;

    

})()

