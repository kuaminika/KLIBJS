
(function(kLib)
{

	if(!kLib) throw "kLib Is IMissing";

	var blankProcedure = kLib.blnkProcedure;

	kLib.generateBlankFormOptions = function(){ return {id:"elementID"
											,submitBtnId:"elementID"
									  		,courrierTool:"obj"}; }


	/**
	 * blank form options looks like this
	 * kFormOptions {id:"elementID"
	 * 				,submitBtnId:"elementID"
	 * 				,courrierTool:"obj"}
	 */
	kLib.initForm = function(kFormOptions)
	{	
		kLib.activeForms = kLib.activeForms || {};

		if(kLib.activeForms[kFormOptions.id] )
			return kLib.activeForms[kFormOptions.id] ;

		var newForm = new Kform(kFormOptions);

	
		kLib.activeForms[kFormOptions.id] = newForm;
		return newForm;
	}




	Kform.ValueExtesions = [] // type of KformValueExtension
	Kform.RunExtensionSetters = function(formEl,key,value)
	{
		for(var i =0 ; i<Kform.ValueExtesions.length; i++)
		{
			Kform.ValueExtesions[i].setter(formEl,key,value);
		}	
	}

	Kform.RunExtensionGetters = function(formEl,currentObj)
	{
		for(var i =0 ; i<Kform.ValueExtesions.length; i++)
		{
			currentObj=	Kform.ValueExtesions[i].getter(formEl,currentObj);
		}	
		return currentObj;
	}
	function Kform(kFormOptions)
	{
		kFormOptions = kFormOptions || {};
		
		var formId = kFormOptions.id;
		var submitBtnId = kFormOptions.submitBtnId;
		var courrierTool = kFormOptions.courrierTool;
		var me = this;
		var formHtmlCode;
		var submitProcedure = blankProcedure;

		me.id = formId;
		me.submitBtn = kLib.getById(submitBtnId)||document.createElement("div");

		var validationProcedure = function(e){blankProcedure.bind(me)(e); return true; }
		me.setValidationPocedure = function(newProcedure){validationProcedure = newProcedure.bind(me); }
	
		me.showLoading=	function (loadingCode)
		{
			loadingCode = loadingCode || "loading...";
			var k_cForm = me.findFormEl(); 
			formHtmlCode = k_cForm.innerHTML;
			k_cForm.innerHTML = loadingCode;
		}
		me.takeOffLoading = function()
		{
			var k_cForm = me.findFormEl(); 
			k_cForm.innerHTML = formHtmlCode;
			me.reset();
		}
		me.showSubmitProcedure = function () { console.log(submitProcedure);}
		me.submitBtn.onclick = (function(e)
		{	
			if(!formIsValid())
			{
				console.log("form validation failed. will not do submit procedure");
				return;
			}
			  submitProcedure.bind(me)(e);

		}).bind(me)
		me.reset = function()
		{
			me.submitBtn = kLib.getById(submitBtnId);
			me.setSubmitProcedure(submitProcedure);
		}
		me.setSubmitProcedure=function(newProcedure)
		{

			submitProcedure = newProcedure.bind(me);
			me.submitBtn.onclick = 	(function(e)
			{	
				if(!formIsValid())
				{
					console.log("form validation failed. will not do submit procedure");
					return;
				}
				  submitProcedure(e);
	
			}).bind(me);

		}
		me.findFormEl =findFormEl;
		 function findFormEl (form_id)
		{
			try
			{
				formId = form_id||formId;
				if(!formId) return;
				
				var formEL = document.getElementById(formId);
				
				
				return formEL;
			}
			catch(e)
			{
				console.log(e);
				return;
			}
		}
		
		me.ElIsform = function(el)
		{
			return el.tagName.toLowerCase() === "form"
		}
		
		
		me.getFormObj = function(form_id)
		{
			formId = form_id||formId;
			var formEl = me.findFormEl(formId);
			
			if(!me.ElIsform(formEl)) throw "#"+formEl.id+" this is not a true form";
			
			var result = getFormData(formEl);
			
			return result;
		}
		
		function encodeToSend(data)  {
			return Object.keys(data)
				.map(function(key) { return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])})
				.join('&');
		}
		
		var unknwownUrl = "unknown url";
		me.sendInfo = function(receivingURL,callback)
		{
			var receivingURL = receivingURL ||unknwownUrl ;
			var content = me.getFormObj();
			if(!content)
			{
				throw "sendInfo-fail:dont know what to send to:"+ receivingURL;
				
				return;
			}		
			
			sendInfo(receivingURL,content,callback);
		}
	
		me.setFormData = function (dataName,newValue, /*setExtensionFn,*/k_cForm)
		{
			k_cForm = k_cForm||me.findFormEl();
			var inputs =k_cForm.getElementsByTagName("input");
			var txtAreas = k_cForm.getElementsByTagName("textarea");
			var dropdowns = k_cForm.getElementsByTagName("select");
			//checking inputs first		
			for(var i=0;i<inputs.length;i++)
			{			
				if(!inputs[i].name || inputs[i].name != dataName) continue;
				
				inputs[i].value = newValue;
				return;
			}
			
			// then drop downs
			for(var i=0;i<dropdowns.length;i++)
			{			
				if(!dropdowns[i].name || dropdowns[i].name  != dataName) continue;
				var e = dropdowns[i];
				e.options[e.selectedIndex].value;
			}
					
			for(var i=0;i<txtAreas.length;i++)
			{			
				if(!txtAreas[i].name || txtAreas[i].name  != dataName) continue;
				txtAreas[i].value= newValue;
				//$(txtAreas[i]).summernote('code', newValue);
			}
			
			//if(setExtensionFn) setExtensionFn(k_cForm,dataName,newValue);
			
			Kform.RunExtensionSetters(k_cForm,dataName,newValue);
		}
		

		function sendInfo(receivingURL,content,callback)
		{
			
			if(!receivingURL || receivingURL == unknwownUrl)
			{
				throw "missing url won't send";
				return;
			}
			
			
			
			
			callback = callback || function(response){
					console.log(response);				
			};
			var encoded = encodeToSend(content);
			var headerRules = {headers: {'Content-Type':  'application/x-www-form-urlencoded'}};
				
			courrierTool.post(receivingURL,encoded,headerRules).then(callback).catch(function (error) {
				console.error(error);
				alert("operation failed");
			});
		}

		


		
		function formIsValid()
		{
			try
			{
				if(!formId) 
				{
					throw "mesye.. that form needs an ID";
				
				}
				
				return validationProcedure();
			}
			catch(error)
			{
				console.error(error);
				return false;

			}		
		}
			
		
		
		function getFormData(k_cForm)
		{	
			var result = {};
			var inputs =k_cForm.getElementsByTagName("input");
			var txtAreas = k_cForm.getElementsByTagName("textarea");
			var dropdowns = k_cForm.getElementsByTagName("select");
			

			for(var i=0;i<dropdowns.length;i++)
			{			
				if(!dropdowns[i].name || dropdowns[i].name == "") continue;
				var e = dropdowns[i];
				result[e.name]=e.options[e.selectedIndex].value;
			}
			
			
			for(var i=0;i<inputs.length;i++)
			{			
				if(!inputs[i].name || inputs[i].name == "") continue;
				result[inputs[i].name]=inputs[i].value;
			}
			
				
			for(var i=0;i<txtAreas.length;i++)
			{			
				if(!txtAreas[i].name || txtAreas[i].name == "") continue;
				//result[txtAreas[i].name]=tinyMCE.get(txtAreas[i].id).getContent();//txtAreas[i].value;
				result[txtAreas[i].name]= txtAreas[i].value;
			}
			
			result = Kform.RunExtensionGetters(k_cForm,result);
			
			
			return result;
			/*
			var formArray= jQuery(k_cForm[0]).serializeArray();
			return createObjFromFormArray(formArray);			*/
		}
		
		function createObjFromFormArray(formArray)
		{
			var result = {}
			jQuery.map(formArray,function(el){				
				result[el.name]=el.value;				
			});
			return result;
		}
	}
})(kLib);