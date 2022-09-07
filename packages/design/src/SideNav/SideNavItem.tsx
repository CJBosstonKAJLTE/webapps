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

import styled from 'styled-components';

import { Flex } from 'design/Flex';

import { borderColor } from '../system';

import type { BorderColorProps } from 'design/system';

const fromTheme = ({ theme }) => {
  return {
    background: theme.colors.primary.light,
    color: theme.colors.text.secondary,
    fontSize: theme.fontSizes[1],
    fontWeight: theme.bold,
    '&:active, &.active': {
      borderLeftColor: theme.colors.accent,
      background: theme.colors.primary.lighter,
      color: theme.colors.primary.contrastText,
    },
    '&:hover, &:focus': {
      background: theme.colors.primary.lighter,
      color: theme.colors.primary.contrastText,
    },
  };
};

export type SideNavItemProps = BorderColorProps;

export const SideNavItem = styled(Flex)<SideNavItemProps>`
  min-height: 56px;
  align-items: center;
  justify-content: flex-start;
  border-left: 4px solid transparent;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  width: 100%;
  ${fromTheme}
  ${borderColor}
`;

SideNavItem.defaultProps = {
  pl: 9,
  pr: 5,
  bg: 'primary.main',
  color: 'text.primary',
};

export default SideNavItem;
