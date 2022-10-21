/**
 * Copyright 2022 Gravitational, Inc.
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
import { NavLink } from 'react-router-dom';
import { Card, Text, Link, ButtonText } from 'design';
import { Danger } from 'design/Alert';

export const PrivateKeyPolicyCard = ({
  title,
  recoverRoute,
}: {
  title: string;
  recoverRoute?: RecoverRoute;
}) => (
  <Card bg="primary.light" my="5" mx="auto" width="464px" px={5} pb={4}>
    <Text typography="h3" pt={4} textAlign="center" color="light">
      {title}
    </Text>
    <Danger my={5}>Private Key Policy Enabled</Danger>
    <Text mb={2} typography="paragraph2" textAlign="center">
      Configurations require use of hardware backed{' '}
      <Link
        color="light"
        href="https://goteleport.com/docs/access-controls/guides/hardware-key-support/"
        target="_blank"
      >
        private keys
      </Link>{' '}
      which are not supported in the web. Please use{' '}
      <Link
        color="light"
        href="https://goteleport.com/docs/connect-your-client/tsh/#installing-tsh"
        target="_blank"
      >
        tsh
      </Link>{' '}
      or{' '}
      <Link
        color="light"
        href="https://goteleport.com/docs/connect-your-client/teleport-connect/"
        target="_blank"
      >
        Teleport Connect
      </Link>{' '}
      to sign in.
    </Text>
    {recoverRoute && (
      <Text typography="paragraph2" textAlign="center" mt={4}>
        <ButtonText
          as={NavLink}
          to={recoverRoute.password}
          style={{ padding: '0px', minHeight: 0 }}
          mr={2}
        >
          Forgot Password?
        </ButtonText>
        or{' '}
        <ButtonText
          as={NavLink}
          to={recoverRoute.device}
          style={{ padding: '0px', minHeight: 0 }}
          ml={1}
        >
          Lost Two-Factor Device?
        </ButtonText>
      </Text>
    )}
  </Card>
);

type RecoverRoute = {
  password: string;
  device: string;
};
