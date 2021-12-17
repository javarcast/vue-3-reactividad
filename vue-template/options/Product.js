app.component("product", {
    template: `
    <section class="product">
        <div class="product__thumbnails">
            <div @click="activeImage = index" v-for="(image,index) in product.images" :key="index" class="thumb" :class="{active: activeImage === index}" :style="{backgroundImage: 'url(' +image.thumbnail +')'}"></div>
        </div>
        <div class="product__image">
            <img :src="product.images[activeImage].image" alt="product.name">
        </div>
    </section>
    <section class="description">
        <h4>{{product.name.toUpperCase()}}</h4>
        <badge :product="product"></badge>
        <p class="description_status" v-if="product.stock === 3">Quedan pocas unidades</p>
        <p class="description_status" v-else-if="product.stock === 2">El producto esta por agotarse</p>
        <p class="description_status" v-else-if="product.stock === 1" >Ultima unidad disponible</p>
        <p class="description_status" v-else-if="product.stock === 0" >AGOTADO</p>
        <p class="description__price" :style="{color: price_color}">$ {{new Intl.NumberFormat("es-CO").format(product.price)}}</p>
        <p class="description__content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto doloribus atque non aspernatur provident ab sunt dolore debitis voluptatum? Iure!</p>
        <div class="discount">
            <span>Codigo de Descuento:</span>
            <input type="text" placeholder="Ingresa tu codigo" @keyup.enter="applyDiscount($event)">
        </div>
        <button :disabled="product.stock === 0" @click="sendToCart()">Agregar al carrito</button>
    </section>`,
    props:[ "product"],
    data() {
        return {
            activeImage : 0,
            discountCodes: ["PLATZI20", "CODDIS"],
            //price_color: "rgb(104, 104, 209)"
        }
    },
    emits: ["sendtocart"],
    methods: {
        applyDiscount(event) {
            const discountCodeIndex = this.discountCodes.indexOf(event.target.value);
            if(discountCodeIndex >= 0){
                this.product.price *= 50/100;
                this.discountCodes.splice(discountCodeIndex,1);
            }
        },
        sendToCart(){
            this.$emit("sendtocart", this.product);
        }
    },
    watch: {
        activeImage(value, oldValue){
            console.log(value, oldValue);
        },
       /* "product.stock"(stock){
            if(stock <= 1){
                this.price_color = "rgb(188, 30 , 67)"
            }
        }*/
    },
    computed:{
        price_color(){

            return (this.product.stock > 1)? "rgb(104, 104, 209)": "rgb(188, 30 , 67)" ;
        }
    }
});