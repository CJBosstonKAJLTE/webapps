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

import { fontSize, margin, space } from 'design/system';

import type { FontSizeProps, MarginProps } from 'design/system';

interface LabelInputBaseProps {
  hasError?: boolean;
}

export type LabelInputProps = LabelInputBaseProps & FontSizeProps & MarginProps;

export const LabelInput = styled.label<LabelInputProps>`
  color: ${props =>
    props.hasError ? props.theme.colors.error.main : props.theme.colors.light};
  display: block;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  width: 100%;
  ${space}
  ${margin}
  ${fontSize}
`;

LabelInput.defaultProps = {
  fontSize: 0,
  mb: 1,
};
