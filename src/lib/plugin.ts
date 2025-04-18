import { restoreStorage } from '@konomi-app/kintone-utilities';
import { PLUGIN_ID } from './global';
import { DEFAULT_COLOR } from './static';

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): Plugin.Config => ({
  version: 2,
  mode: 'sticky-left',
  tocTitle: '目次',
  maxWidth: 250,
  headings: [{ spaceId: '', label: '', color: DEFAULT_COLOR }],
});

/**
 * 古いバージョンの設定情報を新しいバージョンに変換します
 * @param anyConfig 保存されている設定情報
 * @returns 新しいバージョンの設定情報
 */
export const migrateConfig = (anyConfig: Plugin.AnyConfig): Plugin.Config => {
  const { version } = anyConfig;
  switch (version) {
    case undefined: {
      // @ts-expect-error
      return migrateConfig({ ...anyConfig, version: 1 });
    }
    case 1: {
      return migrateConfig({
        version: 2,
        mode: 'sticky-left',
        tocTitle: anyConfig.tocTitle ?? '目次',
        maxWidth: anyConfig.maxWidth ?? 250,
        headings: anyConfig.headings,
      });
    }
    case 2:
    default: {
      return anyConfig;
    }
  }
};

/**
 * プラグインの設定情報を復元します
 */
export const restorePluginConfig = (): Plugin.Config => {
  const config = restoreStorage<Plugin.AnyConfig>(PLUGIN_ID) ?? createConfig();
  return migrateConfig(config);
};
