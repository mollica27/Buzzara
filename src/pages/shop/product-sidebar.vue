<template>
    <ShopPageProduct :product="product" layout="sidebar" sidebar-position="start" />
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { Context } from '@nuxt/types'
import { IProduct } from '~/interfaces/product'
import ShopPageProduct from '~/components/shop/shop-page-product.vue'

@Component({
    components: { ShopPageProduct },
    async asyncData (context: Context): Promise<{ product: IProduct }> {
        return {
            product: await context.$shopApi.getProductBySlug('brandix-screwdriver-screw1500acc')
        }
    }
})
export default class Page extends Vue {
    product: IProduct = null!
}

</script>
