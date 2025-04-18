import { restorePluginConfig } from '@/lib/plugin';
import { getSpaceElement } from '@lb-ribbit/kintone-xapp';
import { css } from '@emotion/css';
import { listener } from '@/lib/listener';
import { DEFAULT_COLOR } from '@/lib/static';
import { getTocElement, resetElementStyle } from './actions';

export const TOC_ROOT_ID = '🐸ribbit-toc-plugin-root';

listener.add(
  ['app.record.detail.show', 'app.record.create.show', 'app.record.edit.show'],
  async (event) => {
    const config = restorePluginConfig();

    if (!config.headings.length) {
      return event;
    }

    for (const heading of config.headings) {
      const { spaceId, label, color = DEFAULT_COLOR } = heading;
      const spaceElement = getSpaceElement(spaceId);
      if (!spaceElement) {
        console.log('スペースが見つかりませんでした');
        continue;
      }

      spaceElement.innerHTML = `<h2 class=${css`
        font-size: 20px;
        font-weight: 600;
        margin: 32px 0 0;
        border-left: 4px solid ${color};
        padding-left: 16px;
      `}>${label}</h2>`;
    }

    if (document.querySelector(`#${TOC_ROOT_ID}`)) {
      return event;
    }

    const toc = getTocElement({ config });

    // if (config.mode === 'sticky-left') {
    //   const target = document.querySelector('#record-gaia');

    //   if (!target) {
    //     console.log('タブをレンダリングする対象エレメントが取得できませんでした');
    //     return event;
    //   }

    //   target.classList.add(css`
    //     padding: 0 !important;
    //     display: flex;
    //     gap: 8px;
    //   `);
    //   target.prepend(toc);
    // } else if (config.mode === 'embed-sidebar-right') {

    const sidebarElement = document.querySelector<HTMLDivElement>(
      '.gaia-argoui-app-show-sidebar-dragged'
    );
    let sidebarContentElement: HTMLDivElement | null = null;
    if (sidebarElement) {
      sidebarContentElement = document.createElement('div');
      sidebarContentElement.classList.add(css`
        position: absolute;
        background-color: #fff;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        opacity: 0;
        pointer-events: none;
        &[data-selected='true'] {
          opacity: 1;
          pointer-events: all;
        }
      `);
      sidebarElement.append(sidebarContentElement);
      sidebarContentElement.append(toc);
    }

    const sidebarTabContainerElement = document.querySelector('.goog-tab-bar');
    if (sidebarElement && sidebarTabContainerElement) {
      const sidebarButtonElement = document.createElement('aside');
      sidebarButtonElement.classList.add(
        'goog-tab',
        'sidebar-tab-comments-gaia',
        css`
          transition: all 250ms ease;
          cursor: pointer;
          display: grid;
          place-items: center;
          background-image: none !important;
          background-color: #9f9f9f;
          color: #fff;
          &:hover {
            background-color: #7f7f7f;
            color: #fff;
          }
          > svg {
            width: 30px;
            height: 30px;
          }

          &[data-selected='true'] {
            background-color: #3498db !important;
            &:hover {
              background-color: #3498db !important;
            }
          }
        `
      );

      sidebarButtonElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table-of-contents"><path d="M16 12H3"/><path d="M16 18H3"/><path d="M16 6H3"/><path d="M21 12h.01"/><path d="M21 18h.01"/><path d="M21 6h.01"/></svg>`;
      sidebarTabContainerElement.append(sidebarButtonElement);

      const selectedElements = Array.from(document.querySelectorAll('a.goog-tab'));
      for (const element of selectedElements) {
        element.addEventListener('click', () => {
          sidebarButtonElement.dataset.selected = 'false';
          if (sidebarContentElement) {
            sidebarContentElement.dataset.selected = 'false';
          }
        });
      }

      sidebarButtonElement.addEventListener('click', () => {
        const selected = sidebarButtonElement.dataset.selected === 'true';
        const isEnable = !selected;

        sidebarButtonElement.dataset.selected = isEnable ? 'true' : 'false';
        if (sidebarContentElement) {
          sidebarContentElement.dataset.selected = isEnable ? 'true' : 'false';
        }
        if (isEnable) {
          sidebarElement.removeAttribute('style');
          const selectedElements = Array.from(document.querySelectorAll('.goog-tab-selected'));
          for (const element of selectedElements) {
            element.classList.remove('goog-tab-selected');
          }
        } else {
          sidebarElement.style.display = 'none';
        }
      });
    } else {
      console.log('サイドバーが見つかりませんでした');
    }
    // }

    const tocHeading = document.querySelectorAll<HTMLLIElement>('.ribbit-toc-heading');
    for (const heading of Array.from(tocHeading)) {
      heading.addEventListener('click', (event) => {
        if (!event.target) {
          console.log('イベントターゲットが取得できませんでした');
          return;
        }
        const spaceId = (event.target as HTMLLIElement).dataset.spaceId;
        if (!spaceId) {
          console.log('スペースIDが取得できませんでした');
          return;
        }
        const spaceElement = getSpaceElement(spaceId);
        if (!spaceElement) {
          console.log('スペースが見つかりませんでした');
          return;
        }
        const headerHeight = 140;
        const spaceTop = spaceElement.getBoundingClientRect().top;
        const scrollY = window.scrollY;
        window.scrollTo({
          top: scrollY + spaceTop - headerHeight,
          behavior: 'smooth',
        });
      });
    }

    return event;
  }
);
