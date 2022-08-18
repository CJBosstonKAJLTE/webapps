/*
Copyright 2021 Gravitational, Inc.

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

import Component from './ConnectDialog';

export default {
  title: 'Teleport/Kubes/Connect',
};

export const Local = () => {
  return (
    <Component
      onClose={() => null}
      username={'sam'}
      authType={'local'}
      kubeConnectName={'tele.logicoma.dev-prod'}
      clusterId={'some-cluster-name'}
    />
  );
};

export const LocalWithRequestId = () => {
  return (
    <Component
      onClose={() => null}
      username={'sam'}
      authType={'local'}
      kubeConnectName={'tele.logicoma.dev-prod'}
      clusterId={'some-cluster-name'}
      assumedRoleRequestId={'8289cdb1-385c-5b02-85f1-fa2a934b749f'}
    />
  );
};

export const Sso = () => {
  return (
    <Component
      onClose={() => null}
      username={'sam'}
      authType={'sso'}
      kubeConnectName={'tele.logicoma.dev-prod'}
      clusterId={'some-cluster-name'}
    />
  );
};
