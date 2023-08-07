const hp = 'https://konomi.app/';
const commonCdn = 'https://kintone-plugin.konomi.app/common';
const cdn = 'https://kintone-plugin.konomi.app/toc';
const localhost = 'https://127.0.0.1:5500';

/** @type {import('./src/types/plugin-config').PluginConfig} */
export default {
  manifest: {
    base: {
      manifest_version: 1,
      version: '1.0.0',
      type: 'APP',
      name: {
        en: 'Table of Contents Plugin',
        ja: '目次プラグイン',
        zh: '目录插件',
      },
      description: {
        en: 'Add a table of contents to the record editing screen and enable scrolling to any section.',
        ja: 'レコード編集画面に目次を追加し、任意のセクションへスクロールできるようにします',
        zh: '在记录编辑界面添加目录，并实现可以滚动到任意部分。',
      },
      icon: 'icon.png',
      homepage_url: { ja: hp, en: hp },
      desktop: {
        js: [`${commonCdn}/desktop.js`],
        css: [],
      },
      mobile: {
        js: [`${commonCdn}/desktop.js`],
        css: [],
      },
      config: {
        html: 'config.html',
        js: [`${commonCdn}/config.js`],
        css: [],
        required_params: [],
      },
    },
    dev: {
      desktop: { js: [`${localhost}/dist/dev/desktop/index.js`] },
      mobile: { js: [`${localhost}/dist/dev/desktop/index.js`] },
      config: { js: [`${localhost}/dist/dev/config/index.js`] },
    },
    prod: {
      desktop: { js: [`${cdn}/desktop.js`] },
      mobile: { js: [`${cdn}/desktop.js`] },
      config: { js: [`${cdn}/config.js`] },
    },
    standalone: {
      desktop: { js: ['desktop.js'] },
      mobile: { js: ['desktop.js'] },
      config: { js: ['config.js'] },
    },
  },
};
