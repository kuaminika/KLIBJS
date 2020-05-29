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

	kLib.getBlankCourrierOptions = generateOptions;

    kLib.initCourrier = function(kCourierOptions)
    {


		try
		{
			kLib.log("init courrier request",kCourierOptions);


			if(!kCourierOptions) throw "options missing";
			if(!kCourierOptions.id) throw "options.id missing";
			if(!kCourierOptions.mainHostUrl) throw "options.mainHostUrl missing";


			kLib.activeCourriers = kLib.activeCourriers || {};


			if(kCourierOptions.id && kLib.activeCourriers[kCourierOptions.id]) return kLib.activeCourriers[kCourierOptions.id];




			var result = new KuaminikaCourrier(kCourierOptions);


			kLib.activeCourriers[kCourierOptions.id] = result;
			return result;

		}

		catch(error)

		{

			kLib.logError(error);

		}

	}

	var apiMainOptions = generateOptions();

	

	kLib.APIMainCourrier = kLib.initCourrier( apiMainOptions);

	var mainOptions = generateOptions();



	kLib.MainCourrier = kLib.initCourrier(mainOptions);

    function KuaminikaCourrier(courrierOptions)
	{

        courrierOptions =  courrierOptions|| kLib.kCourierOptions;


		var urlForHost = courrierOptions.mainHostUrl || mainHostUrl;

		var self = this;



		self.hostURL = urlForHost;

		function snitchProblem(problem)
		{
			kLib.log(problem);
			kLib.logError(problem);
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