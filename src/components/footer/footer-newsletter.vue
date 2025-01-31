<template>
    <div class="site-footer__widget footer-newsletter">
        <h5 class="footer-newsletter__title">Siganos</h5>
            <img :src="LogoFooter" alt="Logo" />
        <social-links class="footer-newsletter__social-links" shape="circle" />    
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SocialLinks from "~/components/shared/social-links.vue";
import LogoFooter from "~/static/images/logos/logoFooter.png";

@Component({
    components: { SocialLinks },
})
export default class FooterNewsletter extends Vue {
    LogoFooter = LogoFooter;

}
</script>
