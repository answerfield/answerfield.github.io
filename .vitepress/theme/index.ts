import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import AfPreview from './AfPreview.vue';
import './style.css';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('AfPreview', AfPreview);
    }
} satisfies Theme;
