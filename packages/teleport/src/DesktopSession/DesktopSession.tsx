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
import styled from 'styled-components';
import useDesktopSession, { State } from './useDesktopSession';
import TopBar from './TopBar';
import { Indicator, Box, Alert, Text } from 'design';
import useTeleport from 'teleport/useTeleport';
import { ButtonState } from 'teleport/lib/tdp/codec';

export default function Container() {
  const ctx = useTeleport();
  const state = useDesktopSession(ctx);
  return <DesktopSession {...state} />;
}

export function DesktopSession(props: State) {
  const { userHost, tdpClient, attempt, clipboard, recording } = props;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Waits for the state hook to initialize the TdpClient.
  // Once the client is initialized, sets wsAttempt to 'success'.
  React.useEffect(() => {
    tdpClient.on('render', ({ bitmap, left, top }) => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(bitmap, left, top);
    });

    // If client parameters change or component will unmount, close the websocket.
    return () => {
      tdpClient.disconnect();
    };
  }, [tdpClient]);

  React.useEffect(() => {
    // React's vdom apparently doesn't support
    // standard html document.activeElement semantics
    // so tracking here manually instead.
    var canvasInFocus = false;

    const onresize = () => {
      const canvas = canvasRef.current;
      syncCanvasSizeToClientSize(canvas);
      tdpClient.resize(canvas.width, canvas.height);
    };

    const onkeydown = (e: KeyboardEvent) => {
      if (canvasInFocus) {
        tdpClient.sendKeyboardInput(e.code, ButtonState.DOWN);
      }
    };

    const onkeyup = (e: KeyboardEvent) => {
      if (canvasInFocus) {
        tdpClient.sendKeyboardInput(e.code, ButtonState.UP);
      }
    };

    const oncontextmenu = () => false;

    const onmousemove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      tdpClient.sendMouseMove(x, y);
    };

    const onmousedown = (e: MouseEvent) => {
      if (e.button === 0 || e.button === 1 || e.button === 2) {
        tdpClient.sendMouseButton(e.button, ButtonState.DOWN);
      }
    };

    const onmouseup = (e: MouseEvent) => {
      if (e.button === 0 || e.button === 1 || e.button === 2) {
        tdpClient.sendMouseButton(e.button, ButtonState.UP);
      }
    };

    const onmouseenter = () => {
      canvasInFocus = true;
    };

    const onmouseleave = () => {
      canvasInFocus = false;
    };

    if (attempt.status === 'success') {
      const canvas = canvasRef.current;
      // When attempt is set to 'success' after both the websocket connection and api call have succeeded,
      // the canvas component gets rendered at which point we can send its width and height to the tdpClient
      // as part of the TDP initial handshake.
      syncCanvasSizeToClientSize(canvas);
      tdpClient.sendUsername();
      tdpClient.resize(canvas.width, canvas.height);

      // Prevent native context menu to not obscure remote context menu.
      canvas.oncontextmenu = oncontextmenu;

      canvas.onmousemove = onmousemove;
      canvas.onmousedown = onmousedown;
      canvas.onmouseup = onmouseup;

      // Focus canvas on mouse enter. Send key input when canvas is in focus.
      canvas.onmouseenter = onmouseenter;
      canvas.onmouseleave = onmouseleave;
      document.onkeydown = onkeydown;
      document.onkeyup = onkeyup;

      // Begin listening for resize events and send the client the new size when detected.
      window.onresize = onresize;
    }

    return () => {
      // Clean up event listeners
      const canvas = canvasRef.current;
      canvas.removeEventListener('contextmenu', oncontextmenu);
      canvas.removeEventListener('mousemove', onmousemove);
      canvas.removeEventListener('mousedown', onmousedown);
      canvas.removeEventListener('mouseup', onmouseup);
      canvas.removeEventListener('mouseenter', onmouseenter);
      canvas.removeEventListener('mouseleave', onmouseleave);
      document.removeEventListener('keydown', onkeydown);
      document.removeEventListener('keyup', onkeyup);
      window.removeEventListener('resize', onresize);
    };
  }, [attempt]);

  // Canvas has two size attributes: the dimension of the pixels in the canvas (canvas.width)
  // and the display size of the html element (canvas.clientWidth). syncCanvasSizeToClientSize
  // ensures the two remain equal.
  function syncCanvasSizeToClientSize(canvas: HTMLCanvasElement) {
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // If it's resolution does not match change it
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  return (
    <StyledDesktopSession>
      <TopBar
        onDisconnect={() => {
          tdpClient.disconnect();
        }}
        userHost={userHost}
        clipboard={clipboard}
        recording={recording}
        attempt={attempt}
      />
      {attempt.status === 'failed' && (
        <Alert
          style={{
            alignSelf: 'center',
          }}
          width={'450px'}
          my={2}
          children={attempt.statusText}
        />
      )}
      {attempt.status === 'processing' && (
        <Box textAlign="center" m={10}>
          <Indicator />
        </Box>
      )}

      {attempt.status === 'disconnected' && (
        <Box textAlign="center" m={10}>
          <Text>Remote desktop successfully disconnected.</Text>
        </Box>
      )}

      {attempt.status === 'success' && (
        <>
          <canvas style={{ height: '100%', width: '100%' }} ref={canvasRef} />
        </>
      )}
    </StyledDesktopSession>
  );
}

// Ensures the UI fills the entire available screen space.
const StyledDesktopSession = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
`;
