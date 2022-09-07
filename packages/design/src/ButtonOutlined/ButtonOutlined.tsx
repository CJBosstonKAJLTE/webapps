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

import { space, width } from 'design/system';

import type { SpaceProps, WidthProps } from 'design/system';

import type { PropsWithTheme } from 'design/theme';

interface ButtonOutlinedBaseProps<T extends ElementType> {
  setRef?: React.Ref<HTMLButtonElement>;
  size?: 'small' | 'medium' | 'large';
  kind?: 'primary';
  block?: boolean;
  disabled?: boolean;
  as?: T;
  children?: React.ReactNode;
}

export type ButtonOutlinedProps<T extends ElementType = 'button'> =
  ButtonOutlinedBaseProps<T> &
    ComponentPropsWithoutRef<T> &
    SpaceProps &
    WidthProps;

export function ButtonOutlined<T extends ElementType = 'button'>({
  children,
  setRef,
  ...props
}: ButtonOutlinedProps<T>) {
  return (
    <StyledButton {...props} ref={setRef}>
      <span>{children}</span>
    </StyledButton>
  );
}

const size = (props: ButtonOutlinedProps) => {
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

const themedStyles = (props: PropsWithTheme<ButtonOutlinedProps>) => {
  const { colors } = props.theme;
  const style = {
    color: colors.secondary.contrastText,
    '&:disabled': {
      background: colors.action.disabledBackground,
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
  };
};

const kinds = (props: PropsWithTheme<ButtonOutlinedProps>) => {
  const { kind, theme } = props;
  switch (kind) {
    case 'primary':
      return {
        borderColor: theme.colors.secondary.main,
        color: theme.colors.secondary.light,
        '&:hover, &:focus': {
          borderColor: theme.colors.secondary.light,
        },
        '&:active': {
          borderColor: theme.colors.secondary.dark,
        },
      };
    default:
      return {
        borderColor: theme.colors.text.primary,
        color: theme.colors.text.primary,
        '&:hover, &:focus': {
          borderColor: theme.colors.light,
          color: theme.colors.light,
        },
      };
  }
};

const block = (props: ButtonOutlinedProps) =>
  props.block
    ? {
        width: '100%',
      }
    : null;

const StyledButton = styled.button`
  line-height: 1.5;
  border-radius: 4px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  box-sizing: border-box;
  background-color: transparent;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
  outline: none;
  opacity: 0.56;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s;
  -webkit-font-smoothing: antialiased;

  &:hover {
    opacity: 1;
  }

  &:active {
    opacity: 0.24;
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${themedStyles}
  ${kinds}
  ${block}
`;
