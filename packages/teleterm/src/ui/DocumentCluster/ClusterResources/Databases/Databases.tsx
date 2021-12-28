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
import styled from 'styled-components';
import { Danger } from 'design/Alert';
import { Text, Flex, Box } from 'design';
import DatabaseList from './DatabaseList';
import useDatabases from './useDatabases';

export default function DocumentDbs(props: Props) {
  const { clusterUri } = props;
  const { dbs, openGateway, searchValue, syncStatus } =
    useDatabases(clusterUri);
  return (
    <Container>
      <Flex justifyContent="space-between" mb="2">
        <Text typography="h5" color="text.secondary">
          Databases
        </Text>
      </Flex>
      {syncStatus.status === 'failed' && (
        <Danger>{syncStatus.statusText}</Danger>
      )}
      <DatabaseList
        searchValue={searchValue}
        databases={dbs}
        onOpenGateway={openGateway}
      />
    </Container>
  );
}

type Props = {
  clusterUri: string;
};

const Container = styled(Box)`
  flex-direction: column;
  display: flex;
  flex: 1;
  max-width: 1024px;
  ::after {
    content: ' ';
    padding-bottom: 24px;
  }
`;