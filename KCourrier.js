(function(kLib){

    var blankOptions = {
        mainHostUrl:location.href};

    var ids = 0;

    function generateId()
    {
        ids++;
        var id = "kCourrier"+ids;
        return id;
    }
    function generateOptions()
    {
        var id = generateId();
        var result = blankOptions;
        result.id = id;
        return result;
    }
    kLib.initCourrier = function(kCourierOptions)
    {

        kLib.activeCourriers = kLib.activeCourriers || {};

       if(kCourierOptions.id && kLib.activeCourriers[kCourierOptions.id]) return kLib.activeCourriers[kCourierOptions.id];


        var result = new KuaminikaCourrier(kCourierOptions);

        kLib.activeCourriers[kCourierOptions.id] = result;

        return result;
	}
	var apiMainOptions = generateOptions();
	
	kLib.APIMainCourrier = kLib.initCourrier( apiMainOptions);
	var mainOptions = generateOptions();

	kLib.MainCourrier = kLib.initCourrier(mainOptions);
    function KuaminikaCourrier(courrierOptions)
	{
        courrierOptions =  courrierOptions|| kLib.kCourierOptions;
		//var urlForHost = "https://heartmindequation.com/index.php/"; // for prod
		var urlForHost = courrierOptions.mainHostUrl || mainHostUrl;// "https://"+location.hostname+"/KuaminikaWorkspace/heartmindequation.com/index.php/";
		var self = this;

		self.hostURL = urlForHost;
		function snitchProblem(problem)
		{
			console.log(problem);
			console.error(problem);
	     }

		
		 self.post = function(restOfUrl,data,headerRules)
		 {
			
			var promiseResult = new Promise(function(resolve,reject)
			{

				reject = reject ||snitchProblem;
				try 
				{					
					var fullURL = self.hostURL+restOfUrl;
					axios.post(fullURL,data,headerRules).then(resolve,reject);
				}
				catch(e)
				{
					snitchProblem(e);
				}			

			});

			

			return promiseResult;
 
		 }

		self.get= function(restOfUrl)
		{

			var promiseResult = new Promise(function(resolve,reject)
			{

				reject = reject ||snitchProblem;
				try
				{
					var fullURL = self.hostURL+restOfUrl;
					axios.get(fullURL).then(resolve,reject);
				}
				catch(e)
				{
					snitchProblem(e);
				}			

			});

			

			return promiseResult;

		}	

	}


})(kLib)