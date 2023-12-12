import { restoreStorage } from '@konomi-app/kintone-utilities';
import { PLUGIN_ID } from './global';

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): Plugin.Config => ({
  version: 1,
  tocTitle: '目次',
  maxWidth: 250,
  headings: [{ spaceId: '', label: '', color: '' }],
});

/**
 * 古いバージョンの設定情報を新しいバージョンに変換します
 * @param anyConfig 保存されている設定情報
 * @returns 新しいバージョンの設定情報
 */
export const migrateConfig = (anyConfig: Plugin.AnyConfig): Plugin.Config => {
  const { version } = anyConfig;
  switch (version) {
    case undefined:
    case 1:
      return {
        version: 1,
        tocTitle: anyConfig.tocTitle ?? '目次',
        maxWidth: anyConfig.maxWidth ?? 250,
        headings: anyConfig.headings,
      };
    default:
      return anyConfig;
  }
};

/**
 * プラグインの設定情報を復元します
 */
export const restorePluginConfig = (): Plugin.Config => {
  const config = restoreStorage<Plugin.AnyConfig>(PLUGIN_ID) ?? createConfig();
  return migrateConfig(config);
};
