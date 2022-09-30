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
import { ResourceKind } from 'e-teleterm/ui/DocumentAccessRequests/NewRequest/useNewRequest';
import { AccessRequest } from 'e-teleport/services/workflow';

import { PendingAccessRequest } from '../workspacesService';

export class AccessRequestsService {
  constructor(
    private getState: () => {
      isAccessRequestsBarCollapsed: boolean;
      pendingAccessRequest: PendingAccessRequest;
      assumed: Record<string, AccessRequest>;
    },
    private setState: (
      draftState: (draft: {
        isAccessRequestsBarCollapsed: boolean;
        pendingAccessRequest: PendingAccessRequest;
        assumed: Record<string, AccessRequest>;
      }) => void
    ) => void
  ) {}

  getCollapsed() {
    return this.getState().isAccessRequestsBarCollapsed;
  }

  toggleBar() {
    this.setState(draftState => {
      draftState.isAccessRequestsBarCollapsed =
        !draftState.isAccessRequestsBarCollapsed;
    });
  }

  getPendingAccessRequest() {
    return this.getState()?.pendingAccessRequest;
  }

  getAssumed() {
    return this.getState().assumed;
  }

  getAssumedRoles() {
    // return only unique roles from the flatMap of all roles
    // assumed in each request
    return [
      ...new Set(
        Object.values(this.getAssumed()).flatMap(request => request.roles)
      ),
    ];
  }

  addToAssumed(request: AccessRequest) {
    this.setState(draftState => {
      draftState.assumed[request.id] = request;
    });
  }

  removeFromAssumed(request: AccessRequest) {
    this.setState(draftState => {
      delete draftState.assumed[request.id];
    });
  }

  clearAssumed() {
    this.setState(draftState => {
      draftState.assumed = {};
    });
  }

  clearPendingAccessRequest() {
    this.setState(draftState => {
      draftState.pendingAccessRequest = getEmptyPendingAccessRequest();
    });
  }

  getAddedResourceCount() {
    const pendingAccessRequest = this.getState()?.pendingAccessRequest;
    return (
      Object.keys(pendingAccessRequest.node).length +
      Object.keys(pendingAccessRequest.db).length +
      Object.keys(pendingAccessRequest.app).length +
      Object.keys(pendingAccessRequest.kube_cluster).length +
      Object.keys(pendingAccessRequest.windows_desktop).length
    );
  }

  addOrRemoveResource(kind: ResourceKind, name: string, resourceName: string) {
    this.setState(draftState => {
      const kindIds = draftState.pendingAccessRequest[kind];
      if (kindIds[name]) {
        delete kindIds[name];
      } else {
        kindIds[name] = resourceName ?? name;
      }
    });
  }
}

export function getEmptyPendingAccessRequest() {
  return {
    node: {},
    db: {},
    kube_cluster: {},
    app: {},
    role: {},
    windows_desktop: {},
  };
}
