/*
Copyright 2021-2022 Gravitational, Inc.

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

import React, { useState, useMemo } from 'react';
import { Text, Card, ButtonPrimary, Flex, Box } from 'design';
import { Danger } from 'design/Alert';
import Validation, { Validator } from 'shared/components/Validation';
import createMfaOptions, { MfaOption } from 'shared/utils/createMfaOptions';
import FieldSelect from 'shared/components/FieldSelect';
import FieldInput from 'shared/components/FieldInput';
import {
  requiredToken,
  requiredPassword,
  requiredConfirmedPassword,
} from 'shared/components/Validation/rules';
import RecoveryCodes from 'teleport/components/RecoveryCodes';
import useToken, { State } from '../useToken';
import Expired from './Expired';
import TwoFAData from './TwoFaInfo';

export default function Container({
  tokenId = '',
  title = '',
  submitBtnText = '',
  resetMode = false,
}) {
  const state = useToken(tokenId);
  return (
    <NewCredentials
      {...state}
      title={title}
      submitBtnText={submitBtnText}
      resetMode={resetMode}
    />
  );
}

export function NewCredentials(props: Props) {
  const {
    fetchAttempt,
    submitAttempt,
    clearSubmitAttempt,
    passwordToken,
    recoveryCodes,
    resetMode,
    redirect,
    auth2faType,
    preferredMfaType,
    onSubmit,
    onSubmitWithWebauthn,
    title,
    submitBtnText,
  } = props;

  if (fetchAttempt.status === 'failed') {
    return <Expired resetMode={resetMode} />;
  }

  if (fetchAttempt.status !== 'success') {
    return null;
  }

  if (recoveryCodes) {
    return (
      <RecoveryCodes
        recoveryCodes={recoveryCodes}
        redirect={redirect}
        isNewCodes={resetMode}
      />
    );
  }

  const { user, qrCode } = passwordToken;
  const [password, setPassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState('');
  const [token, setToken] = useState('');

  const mfaOptions = useMemo<MfaOption[]>(
    () =>
      createMfaOptions({
        auth2faType: auth2faType,
        preferredType: preferredMfaType,
      }),
    []
  );
  const [mfaType, setMfaType] = useState(mfaOptions[0]);

  const secondFactorEnabled = auth2faType !== 'off';
  const showSideNote =
    secondFactorEnabled &&
    mfaType.value !== 'optional' &&
    mfaType.value !== 'webauthn';
  const boxWidth = (showSideNote ? 720 : 464) + 'px';

  function onBtnClick(
    e: React.MouseEvent<HTMLButtonElement>,
    validator: Validator
  ) {
    e.preventDefault();
    if (!validator.validate()) {
      return;
    }

    switch (mfaType?.value) {
      case 'webauthn':
        onSubmitWithWebauthn(password);
        break;
      default:
        onSubmit(password, token);
    }
  }

  function onSetMfaOption(option: MfaOption, validator: Validator) {
    setToken('');
    clearSubmitAttempt();
    validator.reset();
    setMfaType(option);
  }

  return (
    <Validation>
      {({ validator }) => (
        <Card as="form" bg="primary.light" my={6} mx="auto" width={boxWidth}>
          <Flex>
            <Box flex="3" p="6">
              <Text typography="h2" mb={3} textAlign="center" color="light">
                {title}
              </Text>
              {submitAttempt.status === 'failed' && (
                <Danger children={submitAttempt.statusText} />
              )}
              <Text typography="h4" breakAll mb={3}>
                {user}
              </Text>
              <FieldInput
                rule={requiredPassword}
                autoFocus
                autoComplete="off"
                label="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <FieldInput
                rule={requiredConfirmedPassword(password)}
                autoComplete="off"
                label="Confirm Password"
                value={passwordConfirmed}
                onChange={e => setPasswordConfirmed(e.target.value)}
                type="password"
                placeholder="Confirm Password"
              />
              {secondFactorEnabled && (
                <Flex alignItems="center">
                  <FieldSelect
                    maxWidth="50%"
                    width="100%"
                    data-testid="mfa-select"
                    label="Two-factor type"
                    value={mfaType}
                    options={mfaOptions}
                    onChange={opt =>
                      onSetMfaOption(opt as MfaOption, validator)
                    }
                    mr={3}
                    isDisabled={submitAttempt.status === 'processing'}
                  />
                  {mfaType.value === 'otp' && (
                    <FieldInput
                      width="50%"
                      label="Authenticator code"
                      rule={requiredToken}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      value={token}
                      onChange={e => setToken(e.target.value)}
                      placeholder="123 456"
                    />
                  )}
                </Flex>
              )}
              <ButtonPrimary
                width="100%"
                mt={3}
                disabled={submitAttempt.status === 'processing'}
                size="large"
                onClick={e => onBtnClick(e, validator)}
              >
                {submitBtnText}
              </ButtonPrimary>
            </Box>
            {showSideNote && (
              <Box
                flex="1"
                bg="primary.main"
                p={6}
                borderTopRightRadius={3}
                borderBottomRightRadius={3}
              >
                <TwoFAData auth2faType={mfaType.value} qr={qrCode} />
              </Box>
            )}
          </Flex>
        </Card>
      )}
    </Validation>
  );
}

export type Props = State & {
  submitBtnText: string;
  title: string;
  resetMode?: boolean;
};