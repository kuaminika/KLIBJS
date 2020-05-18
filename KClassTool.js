var kLib = kLib ||{} ;



(function(kLib)

{

    kLib.addClassById = function(id,className)
    {

        var victim = document.getElementById(id);

        addClasstoElement(victim,className);

    }

    function victimIsFound(victim)
    {
        if(victim) return true;
        
        kLib.logError("note:"+ victimIsFound.caller +" could not find victim so exectution did not finish")
        return false;
    }


    function addClasstoElement(victim,className)
    {
       if(!victimIsFound(victim)) return;
    

        victim.className = victim.className + " "+ className;

    }    

    kLib.addClasstoElement= addClasstoElement;



    function addClassToManyElements(victims,className)
    {

        kLib.forEach(victims,function(element)  {

            addClasstoElement(element,className);           

       });

    }



    

    function removeClassToManyElements(victims,className)
    {     

        kLib.forEach(victims,function(element)
        {

            kLib.log(element);

            removeClassToElement(element,className) ;

        });

    }



    function removeClassToElement(victim,className)
    {
        victim.className = victim.className .replace(className, "");
    }

    kLib.removeClassToElement = removeClassToElement;



    kLib.doThisToElementsWithClassName = function(className,doThis)
    {
        var elementsWithClassName = document.getElementsByClassName(className);

        kLib.forEach(elementsWithClassName,doThis);

    }



    kLib.validateOnlyThisElementHasClassName = function(victimElement,className)
    {
        kLib.removeClassToAllWithClassName(className,className);
        addClasstoElement(victimElement,className);
    }



    //this will set the first Element with the given class name the given value
    kLib.setElementContentByClassName = function(className,value)
    {        
        var nameHolder =  document.getElementsByClassName(className)[0];
        nameHolder.innerHTML = value;
    }



    kLib.addClassToAllWithClassName = function(victimClassName,className)
    {
        var victims =    document.getElementsByClassName(victimClassName);
        addClassToManyElements(victims,className);
    }



    kLib.removeClassToAllWithClassName = function(victimClassName,className)
    {
        var victims =    document.getElementsByClassName(victimClassName);
        removeClassToManyElements(victims,className);
    }


    kLib.getFirstFromClassName = function(className)
    {
        var results =  document.getElementsByClassName(className);
        if(!results.length) throw "No elements were found with:"+className;

        return results[0];
    }

    kLib.getFirstChildWithClassName = function(parent,className)
    {
        if(!parent || !kLib.isElement(parent)) throw "cannot find element: parent is invalid";
     
        var results = parent.getElementsByClassName(className);
        if(!results.length) throw "No elements were found with:"+className;
        return results[0];

    }


})(kLib)