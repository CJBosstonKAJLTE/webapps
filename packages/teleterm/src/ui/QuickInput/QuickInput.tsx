/**
 * Copyright 2021 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { Box, Flex } from 'design';
import { space, width, color, height } from 'styled-system';
import useQuickInput, { State } from './useQuickInput';
import QuickInputList from './QuickInputList';
import { useKeyboardShortcuts } from 'teleterm/ui/services/keyboardShortcuts';

export default function Container() {
  const state = useQuickInput();
  return <QuickInput {...state} />;
}

export function QuickInput(props: State) {
  const { reset, listItems, onKeyDown, activeItem } = props;
  const ref = React.useRef<HTMLInputElement>();
  const [isPickerVisible, setPickerVisible] = React.useState(false);

  const handleOnBlur = () => {
    setPickerVisible(false);
    reset();
  };

  const handleOnChange = React.useMemo(() => {
    return debounce(() => {
      props.setInputValue(ref.current.value);
    }, 100);
  }, []);

  const handleOnFocus = () => {
    setPickerVisible(true);
    handleOnChange();
  };

  useKeyboardShortcuts({
    'focus-global-search': () => {
      ref.current.focus();
      handleOnChange();
    },
  });

  React.useEffect(() => {
    return () => handleOnChange.cancel();
  }, []);

  return (
    <Flex position="relative" justifyContent="center">
      <Box width="600px">
        <Input
          ref={ref}
          placeholder="Search..."
          onFocus={handleOnFocus}
          onChange={handleOnChange}
          onKeyDown={onKeyDown}
          onBlur={handleOnBlur}
        />
      </Box>
      {isPickerVisible && (
        <QuickInputList items={listItems} activeItem={activeItem} />
      )}
    </Flex>
  );
}

const Input = styled.input(props => {
  const { theme } = props;
  return {
    background: theme.colors.primary.light,
    boxSizing: 'border-box',
    color: theme.colors.text.primary,
    width: '100%',
    border: 'none',
    outline: 'none',
    padding: '2px 8px',
    '&:hover, &:focus': {
      color: theme.colors.primary.contrastText,
      background: theme.colors.primary.lighter,
      border: '1px solid ' + theme.colors.action.hover,
      padding: '1px 7px',
      opacity: 1,
    },

    '::placeholder': {
      opacity: '0.4',
    },

    ...space(props),
    ...width(props),
    ...height(props),
    ...color(props),
  };
});