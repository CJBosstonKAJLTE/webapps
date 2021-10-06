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

import * as Icons from 'design/Icon';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import AppContext from 'teleterm/ui/appContext';
import * as types from 'teleterm/ui/types';

export default function useExpanderGateways() {
  const ctx = useAppContext();
  const gatewayItems = initGatewayItems(ctx);
  return {
    gatewayItems,
  };
}

function initGatewayItems(ctx: AppContext): types.NavItem[] {
  return [
    {
      title: 'platform.teleport.sh/dbs/mongo-prod',
      Icon: Icons.Clusters,
      uri: ctx.cfg.routes.gateways,
      kind: 'gateways',
      items: [],
      group: false,
    },
  ];
}

export type State = ReturnType<typeof useExpanderGateways>;