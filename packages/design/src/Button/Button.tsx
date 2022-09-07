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

import React, { ComponentPropsWithoutRef, ElementType } from 'react';
import styled from 'styled-components';

import { space, width, height } from 'design/system';

import { PropsWithTheme } from 'design/theme';

import type { HeightProps, SpaceProps, WidthProps } from 'design/system';

interface ButtonBaseProps<T extends ElementType> {
  setRef?: React.Ref<HTMLButtonElement>;
  kind?: 'primary' | 'secondary' | 'text' | 'warning' | 'border';
  size?: 'small' | 'medium' | 'large';
  block?: boolean;
  onClick?: React.MouseEventHandler;
  title?: string;
  as?: T;
}

export type ButtonProps<T extends ElementType> = ButtonBaseProps<T> &
  ComponentPropsWithoutRef<T> &
  SpaceProps &
  WidthProps &
  HeightProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button<T extends ElementType = 'button'>({
  children,
  setRef,
  ...props
}: React.PropsWithChildren<ButtonProps<T>>) {
  return (
    <StyledButton {...props} ref={setRef}>
      {children}
    </StyledButton>
  );
}

const size = (props: ButtonProps<any>) => {
  switch (props.size) {
    case 'small':
      return {
        fontSize: '10px',
        minHeight: '24px',
        padding: '0px 16px',
      };
    case 'large':
      return {
        minHeight: '40px',
        fontSize: '12px',
        padding: '0px 40px',
      };
    default:
      // medium
      return {
        minHeight: '32px',
        fontSize: `12px`,
        padding: '0px 24px',
      };
  }
};

const themedStyles = (props: PropsWithTheme<ButtonProps<any>>) => {
  const { colors } = props.theme;
  const { kind } = props;

  const style = {
    color: colors.text.primary,
    '&:disabled': {
      background: kind === 'text' ? 'none' : colors.action.disabledBackground,
      color: colors.action.disabled,
    },
  };

  return {
    ...kinds(props),
    ...style,
    ...size(props),
    ...space(props),
    ...width(props),
    ...block(props),
    ...height(props),
  };
};

const kinds = (props: PropsWithTheme<ButtonProps<any>>) => {
  const { kind, theme } = props;
  switch (kind) {
    case 'secondary':
      return {
        background: theme.colors.primary.light,
        '&:hover, &:focus': {
          background: theme.colors.primary.lighter,
        },
      };
    case 'border':
      return {
        background: theme.colors.primary.lighter,
        border: '1px solid ' + theme.colors.primary.main,
        opacity: '.87',
        '&:hover, &:focus': {
          background: theme.colors.primary.lighter,
          border: '1px solid ' + theme.colors.action.hover,
          opacity: 1,
        },
        '&:active': {
          opacity: 0.24,
        },
      };
    case 'warning':
      return {
        background: theme.colors.error.dark,
        '&:hover, &:focus': {
          background: theme.colors.error.main,
        },
      };
    case 'text':
      return {
        background: 'none',
        'text-transform': 'none',
        '&:hover, &:focus': {
          background: 'none',
          'text-decoration': 'underline',
        },
      };
    case 'primary':
    default:
      return {
        background: theme.colors.secondary.main,
        '&:hover, &:focus': {
          background: theme.colors.secondary.light,
        },
        '&:active': {
          background: theme.colors.secondary.dark,
        },
      };
  }
};

const block = (props: ButtonProps<any>) =>
  props.block
    ? {
        width: '100%',
      }
    : null;

const StyledButton = styled.button`
  line-height: 1.5;
  margin: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  outline: none;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s;
  -webkit-font-smoothing: antialiased;

  &:active {
    opacity: 0.56;
  }

  ${themedStyles}
`;

export const ButtonPrimary = <T extends ElementType>(
  props: React.PropsWithChildren<Omit<ButtonProps<T>, 'kind'>>
) => <Button kind="primary" {...props} />;

export const ButtonSecondary = <T extends ElementType>(
  props: React.PropsWithChildren<Omit<ButtonProps<T>, 'kind'>>
) => <Button kind="secondary" {...props} />;

export const ButtonBorder = <T extends ElementType>(
  props: React.PropsWithChildren<Omit<ButtonProps<T>, 'kind'>>
) => <Button kind="border" {...props} />;

export const ButtonWarning = <T extends ElementType>(
  props: React.PropsWithChildren<Omit<ButtonProps<T>, 'kind'>>
) => <Button kind="warning" {...props} />;

export const ButtonText = <T extends ElementType>(
  props: React.PropsWithChildren<Omit<ButtonProps<T>, 'kind'>>
) => <Button kind="text" {...props} />;
