app.component("badge", {
    template: `
        <span class="badge new" v-if="product.new">Nuevo</span>
        <span class="badge offer" v-if="product.offer">Oferta</span>
    `,
    props: ["product"]
});