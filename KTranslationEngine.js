
(function(kLib) {

  function KTranslationEngine(classOfElementsToTranslate)
  {
    var private = {};
    var public = this;
    private.objType = classOfElementsToTranslate;
    public.possibleTranslatableClasses = {
        title:objType+"-title",
        description:objType+"-description",
        subTitle:objType+"-sub-title"
    };

    public.keyNameAtribute = "keyName";
    public.performTranslation = function (data)
    {
        var classes =  public.possibleTranslatableClasses;
        kLib.forEach(data,function(value){

            if(value[public.keyNameAtribute])
             {
                 throw "No "+ public.keyNameAtribute + " found in "+ JSON.stringify(value);
             }

             kLib.iterateObject(classes,function(k,lookUpClass){
                
                var element =   kLib.getFromClassWithDataAttribute(lookUpClass,public.keyNameAtribute,value[public.keyNameAtribute]);
               // element.innerHTML = value.
             })

        });
        
    }
  }


  kLib.initTranslationEngine = function(classOfElementsToTranslate)
  {
      var result = new KTranslationEngine(classOfElementsToTranslate)
      return result;

  }

})
(kLib)