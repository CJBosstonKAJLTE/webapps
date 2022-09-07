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

import { style } from 'design/system';

import type { ColorProps as ColorBaseProps } from 'styled-system';

export interface GapProps {
  gap?: string | number;
}

export const gap = style({
  prop: 'gap',
  cssProperty: 'gap',
  // This makes gap use the space defined in the theme.
  // https://github.com/styled-system/styled-system/blob/v3.1.11/src/index.js#L67
  key: 'space',
});

export { typography } from './typography';
export { borderRadius } from './borderRadius';

export type { TypographyProps } from './typography';

export interface ColorProps extends ColorBaseProps {
  // ColorProps and React.HTMLAttributes[color] collide, so we extend ColorProps and set `as` to
  // prevent that behavior
  // https://stackoverflow.com/a/72455581
  as?: React.ElementType;
}

export {
  alignItems,
  alignSelf,
  border,
  borderColor,
  borders,
  color,
  compose,
  flex,
  flexDirection,
  flexWrap,
  fontSize,
  fontWeight,
  height,
  justifyContent,
  justifySelf,
  lineHeight,
  margin,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  overflow,
  size,
  space,
  style,
  textAlign,
  width,
} from 'styled-system';

export type {
  AlignItemsProps,
  AlignSelfProps,
  BorderColorProps,
  BorderRadiusProps,
  BordersProps,
  FlexProps,
  FlexDirectionProps,
  FlexWrapProps,
  FontSizeProps,
  FontWeightProps,
  HeightProps,
  JustifyContentProps,
  JustifySelfProps,
  LineHeightProps,
  MarginProps,
  MaxHeightProps,
  MaxWidthProps,
  MinHeightProps,
  MinWidthProps,
  OverflowProps,
  SpaceProps,
  TextAlignProps,
  WidthProps,
} from 'styled-system';
