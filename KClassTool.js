var kLib = kLib ||{} ;

(function(kLib)
{
    kLib.addClassById = function(id,className)
    {
        var victim = document.getElementById(id);
        addClasstoElement(victim,className);
    }

    function addClasstoElement(victim,className)
    {
        victim.className = victim.className + " "+ className;
    }    
    kLib[addClasstoElement.name] = addClasstoElement;

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
            console.log(element);
            removeClassToElement(element,className) ;
        });
    }

    function removeClassToElement(victim,className)
    {
        victim.className = victim.className .replace(className, "");
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


})(kLib)