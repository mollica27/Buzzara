import Vue from 'vue';
import { NuxtConfig } from '@nuxt/types/config';
import { NuxtOptionsHead } from '@nuxt/types/config/head';
import dataLanguages, { defaultLocale } from './src/data/languages';
import { ILanguage } from '~/interfaces/language';

const envMode = process.env.MODE as NuxtConfig['mode'] || 'universal';
const envRouterBase = process.env.ROUTER_BASE || '/';

const config: NuxtConfig = {
    env: {
        routerBase: envRouterBase,
    },
    ssr: envMode === 'universal',
    target: envMode === 'universal' ? 'server' : 'static',
    srcDir: 'src/',
    head: function (this: Vue | NuxtConfig) {
        let currentLanguage: ILanguage | null = null;
        const links = [];

        if (this.$store) {
            const vue = this as Vue;
            const allLanguages = vue.$store.getters['locale/all'];
            const defaultLanguage = vue.$store.getters['locale/default'];
            currentLanguage = vue.$store.getters['locale/language'];

            let path = vue.$route.fullPath;
            if (vue.$route.params.lang) {
                path = path.substr(vue.$route.params.lang.length + 2);
            } else {
                path = path.substr(1);
            }

            for (const language of allLanguages) {
                let langPath = path;
                if (language.locale === defaultLanguage.locale) {
                    langPath = `/${langPath}`;
                } else {
                    langPath = `/${language.locale}/${langPath}`;
                }

                links.push({
                    rel: 'alternate',
                    hreflang: language.locale === defaultLanguage.locale ? 'x-default' : language.locale,
                    href: vue.$url.img(langPath),
                });
            }
        }

        const options: NuxtOptionsHead = {
            title: process.env.npm_package_name || '',
            titleTemplate(titleChunk: string) {
                return titleChunk ? `${titleChunk} — Buzzara` : 'Buzzara';
            },
            htmlAttrs: {
                lang: currentLanguage?.locale || 'pt-BR', 
                dir: currentLanguage?.direction || 'ltr',
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ],
            link: [
                { rel: 'icon', type: 'image/png', href: `${process.env.routerBase}favicon.png` },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i' },
                ...links,
            ],
        };

        return options;
    } as NuxtOptionsHead,
    loading: { color: '#fff' },
    css: [
        '@fortawesome/fontawesome-free/css/all.min.css',
        'vue-slider-component/dist-css/vue-slider-component.css',
        '~assets/scss/swiper.scss',
        '~assets/scss/style.scss',
    ],
    router: {
        base: envRouterBase,
        middleware: 'i18n',
        extendRoutes(routes) {
            routes.slice().forEach((route) => {
                const langRoute = {
                    name: `lang-${route.name}`,
                    path: `/:lang${route.path}`,
                    component: route.component,
                    chunkName: route.chunkName
                        ? route.chunkName.replace(/^pages\/(.+)$/, 'pages/_lang/$1')
                        : undefined,
                };

                routes.push(langRoute);
            });
        },
    },
    plugins: [
        '~/plugins/url.ts',
        '~/plugins/currency.ts',
        '~/plugins/i18n.ts',
        '~/api/shop.ts',
        '~/plugins/location.ts',
        { src: '~/plugins/notifications.ts', ssr: false },
        { src: '~/plugins/local-storage.ts', ssr: false },
    ],
    buildModules: ['@nuxt/typescript-build'],
    modules: ['bootstrap-vue/nuxt'],
    build: {
        babel: {
            plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
        },
        extend(config) {
            if (!config.module) return;

            const svgRule = config.module.rules.find(
                (rule) => rule.test instanceof RegExp && rule.test.test('.svg')
            );

            if (svgRule) {
                svgRule.test = /\.(png|jpe?g|gif|webp)$/;
            }

            config.module.rules.push({
                test: /\.svg$/,
                use: ['babel-loader', 'vue-svg-loader'],
                exclude: [/@fortawesome[\\/]fontawesome-free[\\/]webfonts[\\/][^\\/]+\.svg$/],
            });

            config.module.rules.push({
                test: /@fortawesome[\\/]fontawesome-free[\\/]webfonts[\\/][^\\/]+\.svg$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            });
        },
    },
    generate: {
        routes() {
            const urls: string[] = [];

            dataLanguages.forEach((lang) => {
                if (lang.locale !== defaultLocale) {
                    urls.push(`/${lang.locale}/`);
                }
            });

            return urls;
        },
    },
};

export default config;
