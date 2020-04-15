(function(kLib)
{
    /**
	 * blank form options looks like this
	 * kTemplateOptions {id:"elementID"}
	 */
	kLib.initTemplate = function(kTemplateOptions)
	{	
		kLib.activeTemplates = kLib.activeTemplates || {};

		if(kLib.activeTemplates[kTemplateOptions.id] )
			return kLib.activeTemplates[kTemplateOptions.id] ;

		var result = new KTemplate(kTemplateOptions);

	
		kLib.activeTemplates[kTemplateOptions.id] = result;
		return result;
	}


    


    function KTemplate(kTemplateOptions)
    {
        var me = this;
        me.id = kTemplateOptions.id;
        me.data = [];
        me.dataHash = {};
        function abstractMethod(possibleCallBack)
        {
            console.log("this method should be implemented");

            if(!possibleCallBack) return;

            console.log("about to run callback");

            possibleCallBack();

        }

        me.render = abstractMethod;
        me.fetchProcedure = abstractMethod;

        me.onRender = function(renderFn) { 
             me.render = renderFn.bind(me);
             console.log("set on render");
          }    
        me.onFetch = function(fetchProcedureFn) {  
            me.fetchProcedure = fetchProcedureFn.bind(me);
            console.log("set on fetch");
          }    

        me.fetch = function()
        {
            me.fetchProcedure(me.render);
        }

    }
})(kLib)