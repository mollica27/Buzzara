<template>
    <div class="site-footer">
        <div class="container">
            <div class="site-footer__widgets">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4">
                        <footer-newsletter />
                    </div>
                    <div class="col-6 col-md-3 col-lg-2">
                        <footer-links
                            title="Informações"
                            :links="[
                                {title: 'Sobre', url: ''},
                                {title: 'Politicas de Privacidade', url: ''},
                                {title: 'Suporte', url: ''},
                            ]"
                        />
                    </div>
                    <div class="col-6 col-md-3 col-lg-2">
                        <footer-links
                            title="Minha conta"
                            :links="[
                                {title: 'localização', url: ''},
                                {title: 'Order History', url: ''},
                                {title: 'Afiliado', url: ''}
                            ]"
                        />
                    </div>
                    <div class="col-12 col-md-12 col-lg-4">
                        <footer-contacts />
                        
                    </div>
                </div>
            </div>

            <div class="site-footer__bottom">
                <div class="site-footer__copyright">
                    <!-- copyright -->
                    Desenvolvido por <a href="" target="_blank">Buzzara</a>
                    <!-- copyright / end -->
                </div>
                <div class="site-footer__payments">
                    <img :src="$url.img('/images/payments.png')" alt="">
                </div>
            </div>
        </div>
        <ToTop />
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import FooterContacts from '~/components/footer/footer-contacts.vue'
import FooterLinks from '~/components/footer/footer-links.vue'
import FooterNewsletter from '~/components/footer/footer-newsletter.vue'
import ToTop from '~/components/footer/to-top.vue'
import theme from '~/data/theme'

@Component({
    components: { ToTop, FooterNewsletter, FooterLinks, FooterContacts }
})
export default class Footer extends Vue {
    theme = theme
}

</script>
