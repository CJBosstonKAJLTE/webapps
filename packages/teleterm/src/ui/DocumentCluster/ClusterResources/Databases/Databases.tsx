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
import { useDatabases, State } from './useDatabases';
import Table, { Cell } from 'design/DataTable';
import { renderLabelCell } from '../renderLabelCell';
import { Danger } from 'design/Alert';
import { MenuLogin } from 'shared/components/MenuLogin';
import { MenuLoginTheme } from '../MenuLoginTheme';

export default function Container() {
  const state = useDatabases();
  return <DatabaseList {...state} />;
}

function DatabaseList(props: State) {
  return (
    <>
      {props.syncStatus.status === 'failed' && (
        <Danger>{props.syncStatus.statusText}</Danger>
      )}
      <Table
        data={props.dbs}
        columns={[
          {
            key: 'name',
            headerText: 'Name',
            isSortable: true,
          },
          {
            key: 'labelsList',
            headerText: 'Labels',
            render: renderLabelCell,
          },
          {
            altKey: 'connect-btn',
            render: db =>
              renderConnectButton(user => props.connect(db.uri, user)),
          },
        ]}
        pagination={{ pageSize: 100, pagerPosition: 'bottom' }}
        emptyText="No Databases Found"
      />
    </>
  );
}

function renderConnectButton(onConnect: (user: string) => void) {
  return (
    <Cell align="right">
      <MenuLoginTheme>
        <MenuLogin
          placeholder="Enter username…"
          getLoginItems={() => []}
          onSelect={(_, user) => onConnect(user)}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
        />
      </MenuLoginTheme>
    </Cell>
  );
}
