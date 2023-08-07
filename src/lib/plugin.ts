/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): kintone.plugin.Storage => ({
  headings: [{ spaceId: '', label: '' }],
});
