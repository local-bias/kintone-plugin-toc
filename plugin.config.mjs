//@ts-check
const hp = 'https://konomi.app/';
const commonCdn = 'https://kintone-plugin.konomi.app/common';
const localhost = 'https://127.0.0.1:57590';

/** @type { import('@konomi-app/kintone-utilities').PluginConfig } */
export default {
  id: 'ribbit-kintone-plugin-toc',
  pluginReleasePageUrl: `https://ribbit.konomi.app/kintone-plugin/`,
  manifest: {
    base: {
      manifest_version: 1,
      version: '1.2.0',
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
      desktop: {
        js: [`${localhost}/dist/dev/desktop/index.js`],
        css: [`${localhost}/dist/dev/desktop.css`],
      },
      mobile: {
        js: [`${localhost}/dist/dev/desktop/index.js`],
        css: [`${localhost}/dist/dev/desktop.css`],
      },
      config: {
        js: [`${localhost}/dist/dev/config/index.js`],
        css: [`${localhost}/dist/dev/config.css`],
      },
    },
    prod: {
      desktop: { js: ['desktop.js'], css: ['desktop.css'] },
      mobile: { js: ['desktop.js'], css: ['desktop.css'] },
      config: { js: ['config.js'], css: ['config.css'] },
    },
    standalone: {
      desktop: { js: ['desktop.js'], css: ['desktop.css'] },
      mobile: { js: ['desktop.js'], css: ['desktop.css'] },
      config: { js: ['config.js'], css: ['config.css'] },
    },
  },
};
