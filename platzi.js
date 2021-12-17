class PLatziReactive {
    // Dependencies
    deps = new Map();

    constructor(options){
        this.origen = options.data();
        // Destino
        const self = this;
        this.$data = new Proxy(this.origen, {
            get(target, name){
                if(Reflect.has(target, name)){
                    self.track(target, name);
                    return Reflect.get(target, name);
                }

                console.warn("La propiedad ", name, " No Existe")
                return "";
            },
            set(target, name, value){
                Reflect.set(target, name, value);
                self.trigger(name);
            }
        });
    }

    track(target, name){
        if(!this.deps.has(name)){
            const effect = () => {
                document.querySelectorAll(`*[p-text=${name}]`).forEach(el => {
                    this.pText(el, target, name)
                });

                document.querySelectorAll(`*[p-model=${name}]`).forEach(el =>{
                    this.pModel(el, target,name);
                })
            }
            this.deps.set(name, effect);
        }
    }

    trigger(name){
        const effect = this.deps.get(name);
        effect();
    }

    mount(){
        document.querySelectorAll("*[p-text]").forEach(el =>{
            this.pText(el, this.$data, el.getAttribute("p-text"))
        });

        document.querySelectorAll("*[p-model]").forEach(el=>{
            const name = el.getAttribute("p-model");
            this.pModel(el, this.$data, name)
            el.addEventListener("input", () =>{
                Reflect.set(this.$data, name, el.value);
            })
        });

        document.querySelectorAll("*[p-bind]").forEach(el => {
            const [attr, name] = el.getAttribute("p-bind").match(/(\w+)/g);
            this.pBind(el,this.$data, name, attr);
        });
    }

    pText(el, target, name){
        el.innerText = Reflect.get(target, name);
    }

    pModel(el, target, name){
        el.value = Reflect.get(target,name);
    }

    pBind(el, target, name, attr){
        el.setAttribute(attr,Reflect.get(target, name));
    }
}

var Platzi = {
    createApp(options){
        return new PLatziReactive(options)
    }
}