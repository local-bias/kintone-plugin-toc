import React, { FCX } from 'react';
import styled from '@emotion/styled';

import HeadingsForm from './form-headings';
import {
  PluginFormSection,
  PluginFormTitle,
  PluginFormDescription,
} from '@konomi-app/kintone-utility-component';

const Component: FCX = ({ className }) => {
  return (
    <div {...{ className }}>
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
