(function(kLib) {

    var ids = 0;
    function generateId()
    {
        ids++;
        var id = "KAudioTool"+ids;
        return id;
    }
//kLib.activeCourriers = kLib.activeCourriers || {};
    function KAudioToolOptions(rawOptions)
    {
        var public = this;
        rawOptions = rawOptions || {};
        public.id = rawOptions.id || generateId();
        public.audioTag = rawOptions.audioTag || document.createElement("audio");
        public.playToggleButtonClassName = rawOptions.playToggleButtonClassName || "k-audio-play-toggle-button";
        public.playAtLaunch = rawOptions.playAtLaunch || [false];
        public.playToggleButtonTag = rawOptions.playToggleButtonTag || [];//document.createElement("div");
        public.nextButtonClassName = rawOptions.nextButtonClassName || "k-audio-next-button";
        public.nextButtonTag = rawOptions.nextButtonTag || [];// document.createElement("div");
        public.wrapperTag = rawOptions.wrapperTag || [];// document.createElement("div");
    }

    function initKAudioTool(rawOptions)
    {
        var validOptions = new KAudioToolOptions(rawOptions);
        
        var result = new KAudioTool(validOptions);
        kLib.activeAudioTools = kLib.activeAudioTools || {};
        
        kLib.activeAudioTools[result.id] = result;
        return result;
    }

    KAudioToolOptions.validate = function(options)
    {
        if(!options) throw "Missing KAudioTool options";

        var testAgent = new KAudioToolOptions({id:0});
        kLib.iterateObject(testAgent,function(key,value){
            if(!options[key]) throw "KAudioTool options missing: "+ key; 
        });

        return options;
    }

    function KAudioTool(kAudioToolOptions)
    {
        var options = KAudioToolOptions.validate(kAudioToolOptions);
        var public = this;
        var defaults = {};
        var audioTag = options.audioTag;

        var givens = {};

        defaults.onProgression = function(proressionRatio) {kLib.log("playing audio the progression is:"+proressionRatio);}
        defaults.onPlayCallBack =  function()   {    kLib.log("play button clicked on ");  }
        defaults.onNextCallBack = function(){kLib.log("play button clicked on ");  }

        kLib.iterateObject(defaults,function(key,value){
            givens[key] = value;
        });

        public.feedItems = [];
        public.currentIndex = 0;
        public.options = options;
        public.id = options.id;
        public.audioTag = audioTag;
        public.activate = activate;
        public.playToggleButtonElement = options.playToggleButtonTag;

        public.wrapperTag = options.wrapperTag;
        public.nextButtonElement = options.nextButtonTag;

        public.innerPauseHTML = "pause";
        public.innerPlayHTML  = "play";
        public.setOnProgression = function(fn) { givens.onProgression = fn.bind(this);}
        public.setOnPlayClicked = function(fn){ givens.onPlayCallBack = fn.bind(this); }
        public.setOnNextClicked = function(fn){ givens.onNextCallBack = fn.bind(this); }
        public.playAtLaunch  = options.playAtLaunch[0];
        

        function validateFeedItem(feedItem)
        {
            if(!feedItem) throw "no feed item provided";
            if(!feedItem.mp3Link) throw "audio feed needs mp3Link attribute";

            return feedItem;

        }

        function playNext()
        {
            public.currentIndex ++;
            var index = public.currentIndex;
            var feedItem = public.feedItems[index];
            feedItem = validateFeedItem(feedItem);
            audioTag.setAttribute("src",feedItem.mp3Link);
            audioTag.play();
            public.playToggleButtonElement.innerHTML =  public.innerPauseHTML  ;
            givens.onNextCallBack(feedItem);
        }

        function activate()
        {


            /**  public.feedItems = [];
        public.currentIndex = 0; */
            var index = public.currentIndex;
            var feedItem = public.feedItems[index];
            feedItem = validateFeedItem(feedItem);
            audioTag.setAttribute("src",feedItem.mp3Link);
            public.audioTag.setAttribute("src",feedItem.mp3Link);


            public.nextButtonElement = kLib.isElement(public.nextButtonElement) ? public.nextButtonElement: kLib.getFirstChildWithClassName(public.wrapperTag,options.nextButtonClassName);
            public.nextButtonElement.style.cursor = "pointer";
            public.nextButtonElement.onclick = playNext.bind(this);


            public.playToggleButtonElement  =  kLib.isElement(public.playToggleButtonElement) ?public.playToggleButtonElement:  kLib.getFirstChildWithClassName(public.wrapperTag,options.playToggleButtonClassName);
            public.playToggleButtonElement.style.cursor = "pointer";
            public.playToggleButtonElement.onclick =(function()
            {   
                var itWasPaused = audioTag.paused;
                var thingTodo = itWasPaused ? audioTag.play.bind(audioTag) :audioTag.pause.bind(audioTag);
                public.playToggleButtonElement.innerHTML = itWasPaused ? public.innerPauseHTML : public.innerPlayHTML ;
               
                thingTodo();
                givens.onPlayCallBack();
            }).bind(this);

            audioTag.ontimeupdate = function()
            {
              var progressionRatio = (audioTag.currentTime/audioTag.duration);
              givens.onProgression(progressionRatio);
             
              if(progressionRatio<1 || !audioTag.paused ) return;

              public.playToggleButtonElement.innerHTML =  public.innerPlayHTML;
            }

            if(audioTag.paused && public.playAtLaunch  )
            { 
                audioTag.play();
                kLib.log("-------------------------------------------------->here");
                kLib.log(public.innerPauseHTML);
                kLib.log(public.playToggleButtonElement);
                public.playToggleButtonElement.innerHTML =  public.innerPauseHTML  ;
            }
        }
    }


    kLib.initAudioTool  = initKAudioTool;


})(kLib)