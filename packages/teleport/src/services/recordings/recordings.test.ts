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

import api from 'teleport/services/api';

import RecordingsService from './recordings';

test('fetch session recordings, response formatting', async () => {
  jest.spyOn(api, 'get').mockResolvedValue(recordingsJSON);

  const recordings = new RecordingsService();
  const response = await recordings.fetchRecordings('im-a-cluster', {
    from: new Date('2022-07-19T17:47:39.19462805Z'),
    to: new Date('2022-07-19T17:53:50.512132094Z'),
  });

  expect(response).toEqual({
    recordings: [
      {
        createdDate: new Date('2022-07-19T17:53:50.512Z'),
        description: 'play',
        duration: 7535,
        durationText: '8 seconds',
        hostname: 'test12',
        playable: true,
        recordingType: 'ssh',
        sid: 'c21c6c34-c282-51ae-9e29-4e642d8c70ae',
        users: 'fuwa@obiki.ve, ha@fokveh.mc',
      },
      {
        createdDate: new Date('2022-07-19T17:47:39.317Z'),
        description: 'non-interactive',
        duration: 85,
        durationText: '0 seconds',
        hostname: 'kube-cluster/default/nginx',
        playable: false,
        recordingType: 'k8s',
        sid: '456b933c-4ec4-59f1-862c-90ca9f7648b1',
        users: [],
      },
    ],
    startKey: '',
  });
});

const recordingsJSON = {
  events: [
    {
      cluster_name: 'im-a-cluster',
      code: 'T2004I',
      ei: 56,
      enhanced_recording: false,
      event: 'session.end',
      interactive: true,
      login: 'root',
      namespace: 'default',
      participants: ['fuwa@obiki.ve', 'ha@fokveh.mc'],
      server_addr: '1.2.3.4',
      server_hostname: 'test12',
      server_id: 'd770ebed-25ba-511f-a23a-108c18bc2089',
      session_recording: 'node-sync',
      session_start: '2022-07-19T17:53:42.977760449Z',
      session_stop: '2022-07-19T17:53:50.512132094Z',
      sid: 'c21c6c34-c282-51ae-9e29-4e642d8c70ae',
      time: '2022-07-19T17:53:50.512Z',
      uid: '1d425fb4-9748-517b-af27-e341f7afac1c',
      user: 'fuwa@obiki.ve',
    },
    {
      'addr.remote': '1.2.3.4',
      cluster_name: 'im-a-cluster',
      code: 'T2004I',
      ei: 0,
      enhanced_recording: false,
      event: 'session.end',
      initial_command: ['ls'],
      interactive: false,
      kubernetes_cluster: 'kube-cluster',
      kubernetes_container_image: 'nginx',
      kubernetes_container_name: 'nginx',
      kubernetes_groups: ['system:authenticated', 'system:masters'],
      kubernetes_node_name: 'worker04',
      kubernetes_pod_name: 'nginx',
      kubernetes_pod_namespace: 'default',
      kubernetes_users: ['wov@esde.ro'],
      login: 'curitovu@perba.pa',
      namespace: 'default',
      participants: null,
      proto: 'kube',
      server_hostname: 'test3',
      server_id: '2ccb8e3d-6e66-5033-99a1-2e6374a1152b',
      session_recording: 'node-sync',
      session_start: '2022-07-19T17:47:39.19462805Z',
      session_stop: '2022-07-19T17:47:39.279673705Z',
      sid: '456b933c-4ec4-59f1-862c-90ca9f7648b1',
      time: '2022-07-19T17:47:39.317Z',
      uid: 'b68d906c-1c44-512d-a00f-442049c0776a',
      user: 'onuweeme@wiuke.mh',
    },
  ],
  startKey: '',
};
