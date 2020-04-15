function KformValueExtension(settings)
{
	function defaultSetter(kform,key,value){} 
	function defaultGetter(kform,currentObj){return currentObj;}
	settings = settings||{ setter:defaultSetter,getter:defaultGetter};
	var me = this;
	
	me.setter = settings.setter ||defaultSetter;
	me.getter = settings.getter ||defaultGetter;
	
}