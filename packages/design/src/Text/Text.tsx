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

import {
  alignSelf,
  justifySelf,
  lineHeight,
  typography,
  TypographyProps,
  fontSize,
  space,
  color,
  textAlign,
  fontWeight,
  width,
} from 'design/system';

import type {
  AlignSelfProps,
  ColorProps,
  FontSizeProps,
  FontWeightProps,
  JustifySelfProps,
  LineHeightProps,
  SpaceProps,
  TextAlignProps,
  WidthProps,
} from 'design/system';

export type TextProps = ColorProps &
  SpaceProps &
  AlignSelfProps &
  JustifySelfProps &
  LineHeightProps &
  FontSizeProps &
  FontWeightProps &
  TextAlignProps &
  TypographyProps &
  WidthProps;

export const Text = styled.div<TextProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  ${typography}
  ${fontSize}
  ${lineHeight}
  ${space}
  ${justifySelf}
  ${alignSelf}
  ${fontWeight}
  ${color}
  ${textAlign}
  ${fontWeight}
  ${width}
`;

Text.defaultProps = {
  m: 0,
};
