var kLib = kLib ||{} ;



(function(kLib)
{

    class KBinder
    {
        constructor(props)
        {
            props = props || {};
            this.loopAttributeName = props.loopAttributeName || "data-kbind-loop-id";
            this.loopItemAttributeName = props.loopItemAttributeName || "data-kbind-loop-item";
            this.kBinderLoopwrapStamp =  props.kBinderLoopwrapStamp || "kbind-wrapped-loop";
        }

        isInput(element)
        {
           let elementTagName =  element.tagName.toUpperCase();
           return elementTagName === "INPUT" ;
        }

        treatLoop(loopName,metaItems)
        {
           let loopElement = document.querySelector("["+this.loopAttributeName+'='+loopName+"]"); 
           let placeHolder = loopElement.parentNode;
           let wraperElement = document.createElement("div");
           wraperElement.className += " "+ this.kBinderLoopwrapStamp;
           kLib.forEach(metaItems,item=>
            {

                kLib.iterateObject(item,(k,v)=>
                {
                   
                    let selectorAddress = "["+this.loopItemAttributeName+"="+k+"]";
                    
                    let target =   loopElement.querySelector(selectorAddress);
                    target = target.cloneNode();
                  
                    if(!target) return;

                    let operation = this.isInput(target) ? t=>
                    {                     
                        t.id = v;
                        t.placeholder = v;
                        t.name = v;
                
                
                     }:t=>{t.innerHTML = v};

                  operation(target);

                  wraperElement.appendChild(target);
                });
              
              //  loopElement.remove();
             //   placeHolder.appendChild(wraperElement);


           });
           placeHolder.replaceChild(wraperElement,loopElement);
        }
    }

    kLib.initBinder = ()=>{
        kLib.log("initiaing binder");
        kLib.kBinder = kLib.kBinder || new KBinder();
    }//KBinder = new KBinder();
})(kLib)
