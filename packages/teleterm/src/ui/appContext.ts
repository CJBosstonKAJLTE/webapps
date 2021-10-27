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

import uris from './uris';
import ServiceClusters from 'teleterm/ui/services/clusters';
import ServiceCommands from 'teleterm/ui/services/commands';
import ServiceDocs from 'teleterm/ui/services/docs';
import ServicePty from 'teleterm/ui/services/pty';

export default class AppContext {
  serviceClusters: ServiceClusters;
  serviceCommands: ServiceCommands;
  serviceDocs: ServiceDocs;
  servicePty: ServicePty;

  uris = uris;

  constructor() {}
}
