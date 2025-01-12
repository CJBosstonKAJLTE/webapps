import React, { useMemo } from 'react';

import styled from 'styled-components';

import { DocumentAccessRequests } from 'e-teleterm/ui/DocumentAccessRequests/DocumentAccessRequests';

import { useAppContext } from 'teleterm/ui/appContextProvider';
import * as types from 'teleterm/ui/services/workspacesService';
import { DocumentsService } from 'teleterm/ui/services/workspacesService';
import DocumentCluster from 'teleterm/ui/DocumentCluster';
import DocumentGateway from 'teleterm/ui/DocumentGateway';
import DocumentTerminal from 'teleterm/ui/DocumentTerminal';

import Document from 'teleterm/ui/Document';

import { WorkspaceContextProvider } from './workspaceContext';
import { KeyboardShortcutsPanel } from './KeyboardShortcutsPanel';

export function DocumentsRenderer() {
  const { workspacesService } = useAppContext();

  function renderDocuments(documentsService: DocumentsService) {
    return documentsService.getDocuments().map(doc => {
      const isActiveDoc = workspacesService.isDocumentActive(doc.uri);
      return <MemoizedDocument doc={doc} visible={isActiveDoc} key={doc.uri} />;
    });
  }

  const workspaces = useMemo(
    () =>
      Object.entries(workspacesService.getWorkspaces()).map(
        ([clusterUri, workspace]) => ({
          rootClusterUri: clusterUri,
          localClusterUri: workspace.localClusterUri,
          documentsService:
            workspacesService.getWorkspaceDocumentService(clusterUri),
          accessRequestsService:
            workspacesService.getWorkspaceAccessRequestsService(clusterUri),
        })
      ),
    [workspacesService.getWorkspaces()]
  );

  return (
    <>
      {workspaces.map(workspace => (
        <DocumentsContainer
          isVisible={
            workspace.rootClusterUri === workspacesService.getRootClusterUri()
          }
          key={workspace.rootClusterUri}
        >
          <WorkspaceContextProvider value={workspace}>
            {workspace.documentsService.getDocuments().length ? (
              renderDocuments(workspace.documentsService)
            ) : (
              <KeyboardShortcutsPanel />
            )}
          </WorkspaceContextProvider>
        </DocumentsContainer>
      ))}
    </>
  );
}

const DocumentsContainer = styled.div`
  display: ${props => (props.isVisible ? 'contents' : 'none')};
`;

function MemoizedDocument(props: { doc: types.Document; visible: boolean }) {
  const { doc, visible } = props;
  return React.useMemo(() => {
    switch (doc.kind) {
      case 'doc.cluster':
        return <DocumentCluster doc={doc} visible={visible} />;
      case 'doc.gateway':
        return <DocumentGateway doc={doc} visible={visible} />;
      case 'doc.terminal_shell':
      case 'doc.terminal_tsh_node':
      case 'doc.terminal_tsh_kube':
        return <DocumentTerminal doc={doc} visible={visible} />;
      case 'doc.access_requests':
        return <DocumentAccessRequests doc={doc} visible={visible} />;
      default:
        return (
          <Document visible={visible}>
            Document kind "{doc.kind}" is not supported
          </Document>
        );
    }
  }, [visible, doc]);
}
