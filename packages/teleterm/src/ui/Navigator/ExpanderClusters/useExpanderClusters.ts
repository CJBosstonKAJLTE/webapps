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
import * as Icons from 'design/Icon';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import AppContext from 'teleterm/ui/appContext';
import * as types from 'teleterm/ui/types';

export default function useExpanderClusters() {
  const ctx = useAppContext();
  const { clusters } = ctx.serviceClusters.useState();

  const clusterItems = React.useMemo<ClusterNavItem[]>(() => {
    return initClusterItems(ctx);
  }, [clusters]);

  function addCluster() {
    ctx.serviceCommands.sendCommand({ kind: 'dialog.cluster-add-new.open' });
  }

  return {
    clusterItems,
    addCluster,
  };
}

function initClusterItems(ctx: AppContext): ClusterNavItem[] {
  return [...ctx.serviceClusters.state.clusters.values()].map<ClusterNavItem>(
    cluster => ({
      title: cluster.name,
      Icon: Icons.Clusters,
      uri: cluster.uri,
      kind: 'clusters',
      connected: cluster.connected,
      items: [
        {
          title: 'Servers',
          Icon: Icons.Server,
          uri: ctx.serviceDocs.getUriServer({ clusterId: cluster.name }),
          kind: 'servers',
          items: [],
          group: false,
        },
        {
          title: 'Databases',
          Icon: Icons.Database,
          uri: ctx.serviceDocs.getUriDb({ clusterId: cluster.name }),
          kind: 'dbs',
          items: [],
          group: false,
        },
        {
          title: 'Applications',
          Icon: Icons.NewTab,
          uri: ctx.serviceDocs.getUriApps({ clusterId: cluster.name }),
          kind: 'apps',
          items: [],
          group: false,
        },
      ],
      group: true,
    })
  );
}

export type State = ReturnType<typeof useExpanderClusters>;

export interface ClusterNavItem extends types.NavItem {
  connected: boolean;
}
