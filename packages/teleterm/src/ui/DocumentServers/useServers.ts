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

import { useEffect, useState } from 'react';
import { useAttempt } from 'shared/hooks';
import { Node } from 'teleport/services/nodes';
import { useAppContext } from './../appContextProvider';
import * as types from './../types';
import useAsync from './../useAsync';

export default function useNodes({ clusterId }: types.DocumentServers) {
  const ctx = useAppContext();
  const [searchValue, setSearchValue] = useState('');
  const [results, execute] = useAsync(() => {
    return ctx.servicePlatform.listServers(clusterId);
  });

  useEffect(() => {
    execute();
  }, []);

  return {
    searchValue,
    setSearchValue,
    results,
  };
}