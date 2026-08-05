import { createApp } from 'vue'

// 字体自托管（Fontsource），不引用任何外部 CDN，保证全球可达
import '@fontsource-variable/sora'
import '@fontsource-variable/inter'

import './styles/tokens.css'
import './styles/base.css'
import LegalPage from './pages/LegalPage.vue'

createApp(LegalPage).mount('#app')
