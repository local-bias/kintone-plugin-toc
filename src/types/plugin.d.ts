declare namespace kintone {
  namespace plugin {
    /** プラグインがアプリ単位で保存する設定情報🔌 */
    type Storage = {
      tocTitle?: string;
      maxWidth?: number;
      headings: Heading[];
    };

    type Heading = { spaceId: string; label: string; color?: string };
  }
}
