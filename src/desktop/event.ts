import { createConfig } from '@/lib/plugin';
import { restoreStorage } from '@konomi-app/kintone-utilities';
import { getSpaceElement } from '@lb-ribbit/kintone-xapp';
import { PLUGIN_ID } from '@/lib/global';
import { css } from '@emotion/css';
import { listener } from '@/lib/listener';

const TOC_ID = 'ribbit-toc-plugin-root';

listener.add(
  ['app.record.detail.show', 'app.record.create.show', 'app.record.edit.show'],
  async (event) => {
    const config = restoreStorage<kintone.plugin.Storage>(PLUGIN_ID) ?? createConfig();

    if (!config.headings.length) {
      return event;
    }

    const target = document.querySelector('#record-gaia');

    if (!target) {
      console.log('タブをレンダリングする対象エレメントが取得できませんでした');
      return event;
    }

    target.classList.add(css`
      padding: 0 !important;
      display: flex;
      gap: 8px;
    `);

    for (const heading of config.headings) {
      const { spaceId, label } = heading;
      const spaceElement = getSpaceElement(spaceId);
      if (!spaceElement) {
        console.log('スペースが見つかりませんでした');
        continue;
      }

      spaceElement.innerHTML = `<h2 class=${css`
        font-size: 20px;
        font-weight: 600;
        margin: 32px 0 0;
        border-left: 4px solid #0006;
        padding-left: 16px;
      `}>${label}</h2>`;
    }

    if (document.querySelector(`#${TOC_ID}`)) {
      return event;
    }

    const { tocTitle = '目次', maxWidth = 250 } = config;
    const minWidth = maxWidth < 160 ? maxWidth : 160;

    const toc = document.createElement('aside');
    toc.id = TOC_ID;
    toc.classList.add(css`
      > div {
        flex: 1;
        position: sticky;
        top: 130px;
        padding: 16px;
      }
      detail {
        display: block;
        min-width: ${minWidth}px;
        max-width: ${maxWidth}px;
        overflow: auto;
        padding: 16px 24px 24px;
        border: 1px solid #0003;
        border-radius: 4px;
      }
      summary {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      ul {
        margin: 0;
        padding: 8px 0 0;
      }
      li {
        list-style: none;
        padding: 4px;
        cursor: pointer;
        border-radius: 4px;
        transition: all 250ms ease;
        &:hover {
          background-color: #0001;
        }
      }
    `);
    toc.innerHTML = `
        <div>
          <detail>
            <summary class="ribbit-toc-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 9h14V7H3v2m0 4h14v-2H3v2m0 4h14v-2H3v2m16 0h2v-2h-2v2m0-10v2h2V7h-2m0 6h2v-2h-2v2Z"/></svg>${tocTitle}</summary>
            <ul>
              ${config.headings
                .map(
                  (heading) =>
                    `<li class="ribbit-toc-heading" data-space-id="${heading.spaceId}">${heading.label}</li>`
                )
                .join('')}
            </ul>
          </detail>
        </div>
      `;
    target.prepend(toc);

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
