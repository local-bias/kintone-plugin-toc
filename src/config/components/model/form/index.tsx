import React, { FCX } from 'react';
import styled from '@emotion/styled';

import HeadingsForm from './form-headings';
import TocTitleForm from './form-toc-title';
import MaxWidthForm from './form-max-width';
import {
  PluginFormSection,
  PluginFormTitle,
  PluginFormDescription,
} from '@konomi-app/kintone-utility-component';

const Component: FCX = ({ className }) => {
  return (
    <div {...{ className }}>
      <PluginFormSection>
        <PluginFormTitle>目次のタイトル</PluginFormTitle>
        <PluginFormDescription last>目次のタイトルを設定します。</PluginFormDescription>
        <TocTitleForm />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>目次の幅の最大値</PluginFormTitle>
        <PluginFormDescription>許容する目次の幅の最大値を設定してください。</PluginFormDescription>
        <PluginFormDescription last>
          目次の幅は、設定した最大値を超えないように自動的に調整されます。
        </PluginFormDescription>
        <MaxWidthForm />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>目次設定</PluginFormTitle>
        <PluginFormDescription>目次に表示する見出しを設定します。</PluginFormDescription>
        <PluginFormDescription last>
          対象となるスペースIDと、表示する見出しのラベルを入力してください。
        </PluginFormDescription>
        <HeadingsForm />
      </PluginFormSection>
    </div>
  );
};

const StyledComponent = styled(Component)`
  padding: 0 16px;
  > div {
    padding: 8px 8px 8px 16px;
    > h3 {
      font-weight: 500;
      margin-bottom: 16px;
    }
  }
`;

export default StyledComponent;
