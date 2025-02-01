<template>
    <div>
       

        <BlockProductsCarouselContainer
            v-slot="{ products, isLoading, tabs, handleTabChange }"
            :tabs="[
                { id: 1, name: 'Todos', categorySlug: undefined },
                { id: 2, name: 'Mulheres', categorySlug: 'Mulheres' },
                { id: 3, name: 'Homens', categorySlug: 'Homens' },
                { id: 4, name: 'Trans', categorySlug: 'Trans' }
            ]"
            :initial-data="featuredProducts"
            :data-source="featuredProductsSource"
        >
            <BlockProductsCarousel
                title="Em destaques"
                layout="grid-4"
                :products="products"
                :loading="isLoading"
                :groups="tabs"
                @groupClick="handleTabChange"
            />
        </BlockProductsCarouselContainer>

        <BlockBanner />

        <BlockProducts
            title="Mais Procurados"
            layout="large-first"
            :featured-product="(bestsellers || [])[0]"
            :products="(bestsellers || []).slice(1, 7)"
        />

        <BlockCategories
            title="Popular"
            layout="classic"
            :categories="categories"
        />

        <BlockProductsCarouselContainer
            v-slot="{ products, isLoading, tabs, handleTabChange }"
            :tabs="[
                { id: 1, name: 'Todos', categorySlug: undefined },
                { id: 2, name: 'Mulheres', categorySlug: 'Mulheres' },
                { id: 3, name: 'Homens', categorySlug: 'Homens' },
                { id: 4, name: 'Trans', categorySlug: 'Trans' }
            ]"
            :initial-data="latestProducts"
            :data-source="latestProductsSource"
        >
            <BlockProductsCarousel
                title="Novidades"
                layout="horizontal"
                :rows="2"
                :products="products"
                :loading="isLoading"
                :groups="tabs"
                @groupClick="handleTabChange"
            />
        </BlockProductsCarouselContainer>

        <BlockPosts
            title="Mais Recentes"
            layout="list"
            :posts="posts"
        />

        <BlockBrands />

        <BlockProductColumns :columns="columns" />
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { Context } from '@nuxt/types'
import { runOnlyOnServer } from '~/services/helpers'
import { IProduct } from '~/interfaces/product'
import { ICategory } from '~/interfaces/category'
import { IPost } from '~/interfaces/post'
import { BlockProductColumnsItem } from '~/interfaces/components'
import { ShopApi } from '~/api/shop'
import BlockSlideshow from '~/components/blocks/block-slideshow.vue'
import BlockFeatures from '~/components/blocks/block-features.vue'
import BlockProductsCarousel from '~/components/blocks/block-products-carousel.vue'
import BlockProductsCarouselContainer from '~/components/blocks/block-products-carousel-container.vue'
import BlockBanner from '~/components/blocks/block-banner.vue'
import BlockProducts from '~/components/blocks/block-products.vue'
import BlockCategories from '~/components/blocks/block-categories.vue'
import BlockPosts from '~/components/blocks/block-posts.vue'
import BlockBrands from '~/components/blocks/block-brands.vue'
import BlockProductColumns from '~/components/blocks/block-product-columns.vue'
import dataShopBlockCategories from '~/data/shopBlockCategories'
import dataBlogPosts from '~/data/blogPosts'

async function loadColumns (shopApi: ShopApi) {
    const topRated = shopApi.getTopRatedProducts({ limit: 3 })
    const specialOffers = shopApi.getDiscountedProducts({ limit: 3 })
    const bestsellers = shopApi.getPopularProducts({ limit: 3 })

    return [
        { title: 'Mais avaliados', products: await topRated },
        { title: 'Ofertas Especiais', products: await specialOffers },
        { title: 'Mais Procurados', products: await bestsellers }
    ]
}

@Component({
    components: {
        BlockSlideshow,
        BlockFeatures,
        BlockProductsCarousel,
        BlockProductsCarouselContainer,
        BlockBanner,
        BlockProducts,
        BlockCategories,
        BlockPosts,
        BlockBrands,
        BlockProductColumns
    },
    async asyncData (context: Context) {
        context.store.commit('options/setHeaderLayout', 'default')
        context.store.commit('options/setDropcartType', 'dropdown')

        const featuredProducts = runOnlyOnServer(() => context.$shopApi.getFeaturedProducts({ limit: 8 }), null)
        const bestsellers = runOnlyOnServer(() => context.$shopApi.getPopularProducts({ limit: 7 }), null)
        const latestProducts = runOnlyOnServer(() => context.$shopApi.getLatestProducts({ limit: 8 }), null)
        const columns = runOnlyOnServer(() => loadColumns(context.$shopApi), null)

        return {
            featuredProducts: await featuredProducts,
            bestsellers: await bestsellers,
            latestProducts: await latestProducts,
            columns: await columns
        }
    },
    head () {
        return {
            title: 'Home'
        }
    }
})
export default class HomePageOne extends Vue {
    featuredProducts: IProduct[] | null = []

    bestsellers: IProduct[] | null = []

    categories: ICategory[] = dataShopBlockCategories

    latestProducts: IProduct[] | null = []

    posts: IPost[] = dataBlogPosts

    columns: BlockProductColumnsItem[] | null = []

    mounted () {
        if (this.bestsellers === null) {
            this.$shopApi.getPopularProducts({ limit: 7 }).then((products) => {
                this.bestsellers = products
            })
        }
        if (this.columns === null) {
            loadColumns(this.$shopApi).then((columns) => {
                this.columns = columns
            })
        }
    }

    featuredProductsSource (tab: {categorySlug: string}): Promise<IProduct[]> {
        return this.$shopApi.getFeaturedProducts({ limit: 8, category: tab.categorySlug })
    }

    latestProductsSource (tab: {categorySlug: string}): Promise<IProduct[]> {
        return this.$shopApi.getLatestProducts({ limit: 8, category: tab.categorySlug })
    }
}

</script>
