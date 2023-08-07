import { selector } from 'recoil';
import { flatLayout, getUserDefinedFields } from '@/lib/kintone-api';
import { getFormLayout, kintoneAPI } from '@konomi-app/kintone-utilities';
import { GUEST_SPACE_ID } from '@/lib/global';
import { getAppId } from '@lb-ribbit/kintone-xapp';

const PREFIX = 'kintone';

export const appFieldsState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}appFieldsState`,
  get: async () => {
    const properties = await getUserDefinedFields({ preview: true, guestSpaceId: GUEST_SPACE_ID });

    const values = Object.values(properties);

    return values.sort((a, b) => a.label.localeCompare(b.label, 'ja'));
  },
});

export const appLayoutState = selector<kintoneAPI.Layout>({
  key: `${PREFIX}appLayoutState`,
  get: async () => {
    const app = getAppId();
    if (!app) {
      throw new Error('アプリのフィールド情報が取得できませんでした');
    }

    const { layout } = await getFormLayout({ app, preview: true, guestSpaceId: GUEST_SPACE_ID });
    return layout;
  },
});

export const appSpacesState = selector<kintoneAPI.layout.Spacer[]>({
  key: `${PREFIX}appSpacesState`,
  get: ({ get }) => {
    const layout = get(appLayoutState);

    const fields = flatLayout(layout);

    const spaces = fields.filter((field) => field.type === 'SPACER') as kintoneAPI.layout.Spacer[];

    const filtered = spaces.filter((space) => space.elementId);

    return filtered;
  },
});
