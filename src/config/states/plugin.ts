import { restorePluginConfig } from '@/lib/plugin';
import { produce } from 'immer';
import { DefaultValue, atom, selector, selectorFamily } from 'recoil';

const PREFIX = 'plugin';

export const storageState = atom<Plugin.Config>({
  key: `${PREFIX}storageState`,
  default: restorePluginConfig(),
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

export const headingsLengthState = selector<number>({
  key: `${PREFIX}headingsLengthState`,
  get: ({ get }) => {
    const pluginConfig = get(storageState);
    return pluginConfig.headings.length;
  },
});

export const headingRowState = selectorFamily<Plugin.Heading, number>({
  key: `${PREFIX}headingRowState`,
  get:
    (index) =>
    ({ get }) => {
      const pluginConfig = get(storageState);
      return pluginConfig.headings[index];
    },
  set:
    (index) =>
    ({ set }, newValue) => {
      set(storageState, (current) =>
        produce(current, (draft) => {
          if (newValue instanceof DefaultValue) {
            return;
          }
          draft.headings[index] = newValue;
        })
      );
    },
});

export const headingPropertyState = selectorFamily<
  Plugin.Heading[keyof Plugin.Heading],
  [number, keyof Plugin.Heading]
>({
  key: `${PREFIX}headingPropertyState`,
  get:
    ([index, key]) =>
    ({ get }) => {
      const pluginConfig = get(storageState);
      return pluginConfig.headings[index][key];
    },
  set:
    ([index, key]) =>
    ({ set }, newValue) => {
      set(storageState, (current) =>
        produce(current, (draft) => {
          if (newValue instanceof DefaultValue) {
            return;
          }
          draft.headings[index][key] = newValue as never;
        })
      );
    },
});

export const getHeadingLabelState = (index: number) => headingPropertyState([index, 'label']);
export const getHeadingColorState = (index: number) => headingPropertyState([index, 'color']);
export const getHeadingSpaceIdState = (index: number) => headingPropertyState([index, 'spaceId']);
