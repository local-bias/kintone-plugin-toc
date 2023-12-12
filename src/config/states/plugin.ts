import { PLUGIN_ID } from '@/lib/global';
import { createConfig } from '@/lib/plugin';
import { restoreStorage } from '@konomi-app/kintone-utilities';
import { produce } from 'immer';
import { DefaultValue, atom, selector } from 'recoil';

const PREFIX = 'plugin';

export const storageState = atom<Plugin.Config>({
  key: `${PREFIX}storageState`,
  default: restoreStorage<Plugin.Config>(PLUGIN_ID) ?? createConfig(),
});

export const loadingState = atom<boolean>({
  key: `${PREFIX}loadingState`,
  default: false,
});

export const tocTitleState = selector<string>({
  key: `${PREFIX}tocTitleState`,
  get: ({ get }) => {
    const pluginConfig = get(storageState);
    return pluginConfig.tocTitle ?? '目次';
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        if (newValue instanceof DefaultValue) {
          return;
        }
        draft.tocTitle = newValue;
      })
    );
  },
});

export const maxWidthState = selector<number>({
  key: `${PREFIX}maxWidthState`,
  get: ({ get }) => {
    const pluginConfig = get(storageState);
    return pluginConfig.maxWidth ?? 250;
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        if (newValue instanceof DefaultValue) {
          return;
        }
        draft.maxWidth = newValue;
      })
    );
  },
});

export const headingsState = selector<Plugin.Heading[]>({
  key: `${PREFIX}headingsState`,
  get: ({ get }) => {
    const pluginConfig = get(storageState);
    return pluginConfig.headings;
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) =>
      produce(current, (draft) => {
        if (newValue instanceof DefaultValue) {
          return;
        }
        draft.headings = newValue;
      })
    );
  },
});
