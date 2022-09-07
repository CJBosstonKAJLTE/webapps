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

import React, { ElementType } from 'react';
import styled from 'styled-components';

import { Button } from '../Button/Button';

import type { ButtonProps } from '../Button/Button';

export function ButtonLink<T extends ElementType = 'button'>(
  props: React.PropsWithChildren<ButtonProps<T>>
) {
  return Button<T>({ ...props, as: StyledButtonLink });
}

const StyledButtonLink = styled.a`
  color: ${({ theme }) => theme.colors.link};
  font-weight: normal;
  background: none;
  text-decoration: underline;
  text-transform: none;
  padding: 0 8px;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.primary.light};
  }
`;
