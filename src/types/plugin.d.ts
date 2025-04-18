declare namespace Plugin {
  type Config = ConfigV2;

  type AnyConfig = ConfigV1 | ConfigV2;

  type Mode = Config['mode'];

  type Heading = Config['headings'][number];

  type ConfigV2 = Omit<ConfigV1, 'version'> & {
    version: 2;
    mode: 'sticky-left' | 'embed-sidebar-right';
  };

  /** プラグインがアプリ単位で保存する設定情報🔌 */
  type ConfigV1 = {
    version: 1;
    tocTitle?: string;
    maxWidth?: number;
    headings: { spaceId: string; label: string; color?: string }[];
  };
}
