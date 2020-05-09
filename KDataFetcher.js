(function(kLib) {



    function KDataFetcher(courrier, kSiteDataManager) {

        if (!courrier)

            throw "courrier missing";

        if (!kSiteDataManager)

            throw "kSiteDataManager missing";

        var public = this;

        public.kSiteDataManager = kSiteDataManager;

        public.courrier = courrier;



        public.fetchDataForAll = function(potentialCallback)
        {

            kLib.forEach(public.kSiteDataManager.languageList, function(lang)
            {

                kLib.log("currentLanguage:", lang);

                var getDataPromise =  public.courrier.get("/All/" + lang)
                .then(function(response) { return response.data; })
                .then(privateMethods.storeData.bind({ currentLanguage: lang, currentApiSectionName: "All" }))

                if(potentialCallback) getDataPromise.then(potentialCallback);

                getDataPromise.catch(privateMethods.dealWithFailedData.bind({ currentLanguage: lang, currentApiSectionName: "All" }));

            });

        }



        public.fetchDataForSection = function(apiSectionName) {

            if (!apiSectionName) return;

            

            public.currentApiSectionName = apiSectionName;

            kLib.forEach(public.kSiteDataManager.languageList, function(lang) {

                kLib.log("currentLanguage:", lang);

                public.courrier.get("/" + public.currentApiSectionName + "/" + lang)

                    .then(function(response) { return response.data; })

                    .then(privateMethods.storeDataFromSectionFind.bind({ currentLanguage: lang, currentApiSectionName: apiSectionName }))

                    .catch(privateMethods.dealWithFailedData.bind({ currentLanguage: lang, currentApiSectionName: apiSectionName }));

            });

        };

        var privateMethods = {};

        privateMethods.storeData = function(data) {

            kLib.log(this);

            public.kSiteDataManager.data[this.currentLanguage] = public.kSiteDataManager.data[this.currentLanguage] || {};

            public.kSiteDataManager.data[this.currentLanguage] = data;

        };

        privateMethods.storeDataFromSectionFind = function(data) {

            kLib.log(this);

            public.kSiteDataManager.data[this.currentLanguage] = public.kSiteDataManager.data[this.currentLanguage] || {};

            public.kSiteDataManager.data[this.currentLanguage][this.currentApiSectionName] = data;

        };

        privateMethods.dealWithFailedData = function(error) {

            kLib.log("something went wrong for");

            kLib.log(this);

            kLib.logError(error);

            public.kSiteDataManager.data[this.currentLanguage] = public.kSiteDataManager.data[this.currentLanguage] || {};

            public.kSiteDataManager.data[this.currentLanguage][this.currentApiSectionName] = {};

        };

    }

  

    function kDataFetcherBlankOptions()

    {

       return { courrier: undefined, kSiteDataManager: undefined};

    }



    function initKDataFetcher(options)

    {

        var result = new KDataFetcher(options.courrier,options.kSiteDataManager);

        return result;

    }



    kLib.initKDataFetcher = initKDataFetcher;

    kLib.kDataFetcherBlankOptions = kDataFetcherBlankOptions;





})(kLib)