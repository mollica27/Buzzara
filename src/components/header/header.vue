<template>
    <div class="site-header">

        <div v-if="layout === 'default'" class="site-header__middle container">
            <div class="site-header__logo">
                <AppLink to="/">
                    <img :src="LogoPng" class="logo-header" alt="Logo" />
                </AppLink>
            </div>
            <div class="site-header__search">
                <Search location="header" />
            </div>
            <div class="site-header__phone">
                <div class="site-header__phone-title">Customer Service</div>
                <div class="site-header__phone-number">
                    {{ theme.contacts.phone }}
                </div>
            </div>
        </div>

        <div class="site-header__nav-panel">
            <NavPanel :layout="layout" sticky-mode="alwaysOnTop" />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State } from "vuex-class";
import { RootState } from "~/store";
import { HeaderLayout } from "~/store/options";
import Search from "~/components/header/search.vue";
import NavPanel from "~/components/header/nav-panel.vue";
import AppLink from "~/components/shared/app-link.vue";
import LogoPng from "~/static/images/logos/logo.png";
import theme from "~/data/theme";

@Component({
    components: { AppLink, NavPanel, Search },
})
export default class Header extends Vue {
    theme = theme;
    LogoPng = LogoPng;

    @State((state: RootState) => state.options.headerLayout)
    layout!: HeaderLayout;
}
</script>
