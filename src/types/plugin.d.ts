declare namespace kintone {
  namespace plugin {
    /** プラグインがアプリ単位で保存する設定情報🔌 */
    type Storage = {
      headings: Heading[];
    };

    type Heading = { spaceId: string; label: string };
  }
}
