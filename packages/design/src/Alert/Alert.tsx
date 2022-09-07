/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import styled from 'styled-components';

import { space, width } from 'design/system';

import type { ColorProps, SpaceProps, WidthProps } from 'design/system';

import type { PropsWithTheme } from 'design/theme';

const kind = (props: PropsWithTheme<AlertProps>) => {
  const { kind, theme } = props;
  switch (kind) {
    case 'danger':
      return {
        background: theme.colors.danger,
        color: theme.colors.primary.contrastText,
      };
    case 'info':
      return {
        background: theme.colors.info,
        color: theme.colors.primary.contrastText,
      };
    case 'warning':
      return {
        background: theme.colors.warning,
        color: theme.colors.primary.contrastText,
      };
    case 'success':
      return {
        background: theme.colors.success,
        color: theme.colors.primary.contrastText,
      };
    default:
      return {
        background: theme.colors.danger,
        color: theme.colors.primary.contrastText,
      };
  }
};

export const Alert = styled.div<AlertProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.24);
  margin: 0 0 24px 0;
  min-height: 40px;
  padding: 8px 16px;
  overflow: auto;
  word-break: break-word;
  line-height: 1.5;

  ${space}
  ${kind}
  ${width}
  a {
    color: ${({ theme }) => theme.colors.light};
  }
`;

interface AlertBaseProps {
  kind?: 'danger' | 'info' | 'warning' | 'success';
}

export type AlertProps = React.PropsWithChildren<
  ColorProps &
    SpaceProps &
    WidthProps &
    AlertBaseProps &
    React.HTMLAttributes<HTMLDivElement>
>;

export const Danger = (props: Omit<AlertProps, 'kind'>) => (
  <Alert kind="danger" {...props} />
);

export const Info = (props: Omit<AlertProps, 'kind'>) => (
  <Alert kind="info" {...props} />
);

export const Warning = (props: Omit<AlertProps, 'kind'>) => (
  <Alert kind="warning" {...props} />
);

export const Success = (props: Omit<AlertProps, 'kind'>) => (
  <Alert kind="success" {...props} />
);
