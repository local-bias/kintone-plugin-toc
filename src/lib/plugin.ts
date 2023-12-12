/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): Plugin.Config => ({
  tocTitle: '目次',
  maxWidth: 250,
  headings: [{ spaceId: '', label: '', color: '' }],
});
