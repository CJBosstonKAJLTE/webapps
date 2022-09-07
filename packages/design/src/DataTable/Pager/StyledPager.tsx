import styled from 'styled-components';

import { margin } from 'design/system';

import { Icon } from 'design/Icon';

import type { MarginProps } from 'design/system';

export const StyledArrowBtn = styled.button<MarginProps>`
  background: none;
  border: none;
  cursor: pointer;

  ${margin}

  ${Icon} {
    font-size: 20px;
    transition: all 0.3s;
    opacity: 0.5;
  }

  &:hover,
  &:focus {
    ${Icon} {
      opacity: 1;
    }
  }

  &:disabled {
    cursor: default;
    ${Icon} {
      opacity: 0.1;
    }
  }
`;

export const StyledFetchMoreBtn = styled.button`
  color: ${props => props.theme.colors.link};
  background: none;
  text-decoration: underline;
  text-transform: none;
  outline: none;
  border: none;
  font-weight: bold;
  line-height: 0;
  font-size: 12px;

  &:hover,
  &:focus {
    cursor: pointer;
  }

  &:disabled {
    color: ${props => props.theme.colors.action.disabled};
    cursor: wait;
  }
`;
