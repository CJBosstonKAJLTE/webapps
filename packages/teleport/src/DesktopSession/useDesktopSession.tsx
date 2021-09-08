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

import { useMemo, useEffect, useState } from 'react';
import { getAccessToken, getHostName } from 'teleport/services/api';
import { useParams } from 'react-router';
import useAttempt from 'shared/hooks/useAttemptNext';
import cfg, { UrlDesktopParams } from 'teleport/config';
import TdpClient from 'teleport/lib/tdp/client';
import Ctx from 'teleport/teleportContext';
import { Desktop } from 'teleport/services/desktops';
import { stripRdpPort } from '../Desktops/DesktopList';

export default function useDesktopSession(ctx: Ctx) {
  // tracks tdpclient/websocket connection states
  const { attempt: wsAttempt, setAttempt: setWsAttempt } = useAttempt(
    'processing'
  );
  // tracks api call states
  const {
    attempt: fetchDesktopAttempt,
    setAttempt: setFetchDesktopAttempt,
    run: runFetchDesktopAttempt,
  } = useAttempt('processing');
  // tracks combination of tdpclient/websocket and api call state
  const { attempt, setAttempt } = useAttempt('processing');
  const { clusterId, username, desktopId } = useParams<UrlDesktopParams>();
  const [userHost, setUserHost] = useState<string>('user@hostname');

  // creates user@hostname string from list of desktops based on url's desktopId
  const makeUserHost = (desktops: Desktop[]) => {
    const desktop = desktops.find(d => d.name === desktopId);
    if (!desktop) {
      // throw error here so that runFetchDesktopAttempt knows to set the attempt to failed
      throw new Error('Desktop not found');
    }
    setUserHost(`${username}@${stripRdpPort(desktop.addr)}`);
  };

  // Build a client based on url parameters.
  const tdpClient = useMemo(() => {
    const addr = cfg.api.desktopWsAddr
      .replace(':fqdm', getHostName())
      .replace(':clusterId', clusterId)
      .replace(':desktopId', desktopId)
      .replace(':token', getAccessToken());

    return new TdpClient(addr, username);
  }, [clusterId, username, desktopId]);

  useEffect(() => {
    runFetchDesktopAttempt(() =>
      ctx.desktopService.fetchDesktops(clusterId).then(makeUserHost)
    );
  }, [clusterId, username, desktopId]);

  // Synchronizes the attempt meta state of wsAttempt and fetchDesktopAttempt
  useEffect(() => {
    if (wsAttempt.status === 'failed') {
      setAttempt(wsAttempt);
    } else if (fetchDesktopAttempt.status === 'failed') {
      setAttempt(fetchDesktopAttempt);
    } else if (
      wsAttempt.status === 'processing' ||
      fetchDesktopAttempt.status === 'processing'
    ) {
      setAttempt({ status: 'processing' });
    } else if (
      wsAttempt.status === 'success' &&
      fetchDesktopAttempt.status === 'success'
    ) {
      setAttempt({ status: 'success' });
    } else {
      setAttempt({ status: 'failed', statusText: 'unknown error' });
    }
  }, [wsAttempt, fetchDesktopAttempt]);

  return {
    tdpClient,
    wsAttempt,
    setWsAttempt,
    fetchDesktopAttempt,
    setFetchDesktopAttempt,
    userHost,
    attempt,
  };
}

export type State = ReturnType<typeof useDesktopSession>;
