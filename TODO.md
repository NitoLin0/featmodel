# Implementation Plan for Feature Model Changes

## Steps to Complete (Approved Plan)

- [x] **Step 1**: Update constants.ts (add tipoLabels, Include connectionType)
- [x] **Step 2**: Update types.ts (FeatureNodeData: tags object, onTagChange params, getNodeLabel)
- [x] **Step 3**: Update DesignSidebar.tsx (split Etiquetas into Complejidad/Tipo sections, add Include button)
- [x] **Step 4**: Update DesignCanvas.tsx (display both selected complejidad/tipo)
- [x] **Step 5**: Update design/page.tsx (state: selectedComplejidad/selectedTipo, getNodeLabel, onTagChange/onEdgeUpdate, pass to nodes)
- [x] **Step 6**: Update FeatureNode.tsx (add left/right handles, conditional visibility, dual badges, context menu changes: category submenus, connections with direction/buttons)
- [x] **Step 7**: Test all features (tags, connections laterals-only for Require/Include, delete/change type)
- [x] **Step 8**: Complete task

Current: Starting Step 1
