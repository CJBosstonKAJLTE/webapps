import { EventEmitter } from 'node:events';

import * as grpc from '@grpc/grpc-js';

import * as api from 'teleterm/services/tshd/v1/tshd_events_service_pb';
import * as apiService from 'teleterm/services/tshd/v1/tshd_events_service_grpc_pb';
import Logger from 'teleterm/logger';
import { SubscribeToTshdEvent } from 'teleterm/types';

/**
 * Starts tshd events server.
 * @return {Promise} Object containing an instance of the server and the address it's listening on.
 */
export async function createTshdEventsServer(
  requestedAddress: string,
  credentials: grpc.ServerCredentials
): Promise<{ server: grpc.Server; resolvedAddress: string }> {
  const logger = new Logger('tshd events');
  const server = new grpc.Server();

  // grpc-js requires us to pass localhost:port for TCP connections,
  const grpcServerAddress = requestedAddress.replace('tcp://', '');

  return new Promise((resolve, reject) => {
    try {
      server.bindAsync(grpcServerAddress, credentials, (error, port) => {
        if (error) {
          reject(error);
          return logger.error(error.message);
        }

        server.start();

        const resolvedAddress = requestedAddress.startsWith('tcp:')
          ? `localhost:${port}`
          : requestedAddress;

        logger.info(`tshd events server is listening on ${resolvedAddress}`);
        resolve({ server, resolvedAddress });
      });
    } catch (e) {
      logger.error('Could not start tshd events server', e);
      reject(e);
    }
  });
}

// createTshdEventsService creates a service that can be added to tshd events server. It also
// returns a function which lets UI code subscribe to events which are emitted when a client calls
// this service.
//
// Why do we need to use an event emitter? The gRPC server is created in the preload script but we
// need the UI to react to the events. We cannot create the service in the UI code because this
// would mean that the service would need to cross the contextBridge. This is simply impossible
// because the service is fed custom gRPC classes which can't be passed through the contextBridge.
//
// Instead, we create an event emitter and expose subscribeToEvent through the contextBridge.
// subscribeToEvent lets UI code register a callback for a specific event. That callback receives
// a simple JS object which can freely pass the contextBridge.
export function createTshdEventsService(): {
  service: apiService.ITshdEventsServiceServer;
  subscribeToEvent: SubscribeToTshdEvent;
} {
  const emitter = new EventEmitter();

  const subscribeToEvent: SubscribeToTshdEvent = (eventName, listener) => {
    emitter.on(eventName, listener);
  };

  const service: apiService.ITshdEventsServiceServer = {
    // TODO(ravicious): Remove this once we add an actual RPC to tshd events service.
    test: (call, callback) => {
      emitter.emit('test', call.request.toObject());
      callback(null, new api.TestResponse());
    },
  };

  return { service, subscribeToEvent };
}