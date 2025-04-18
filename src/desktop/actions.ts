import { css } from '@emotion/css';
import { TOC_ROOT_ID } from './event';

export const getTocElement = (params: { config: Plugin.Config }): HTMLElement => {
  const { config } = params;
  const { tocTitle = '目次', maxWidth = 250 } = config;
  const minWidth = maxWidth < 160 ? maxWidth : 160;
  const toc = document.createElement('aside');
  toc.id = TOC_ROOT_ID;
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
            <summary><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 9h14V7H3v2m0 4h14v-2H3v2m0 4h14v-2H3v2m16 0h2v-2h-2v2m0-10v2h2V7h-2m0 6h2v-2h-2v2Z"/></svg>${tocTitle}</summary>
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

  return toc;
};

export const resetElementStyle = (element: Element | HTMLElement | null) => {
  if (!element) {
    return;
  }
  element.removeAttribute('style');
};
