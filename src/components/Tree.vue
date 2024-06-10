<template>
  <div class="tree">
    <button class="button" @click="onExpandSelectedNode">Expand</button>
    <button class="button" @click="onCollapseSelectedNode">Collapse</button>
    <ul v-if="treeData.cat" role="tree" class="tree-list">
      <TreeNode
        :node="treeData.cat"
        :level="0"
        :expandedNodes="expandedNodes"
        :selectedNode="selectedNode"
        @node-toggle="onNodeToggle"
        @node-select="onNodeSelect"
      />
    </ul>
  </div>
</template>

<script>
import TreeNode from "./TreeNode.vue";

export default {
  name: "app-tree",
  components: {
    TreeNode,
  },
  props: {
    treeData: {
      type: Object,
      required: true,
    },
    selectedNode: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      expandedNodes: {},
    };
  },
  watch: {
    treeData: {
      handler() {
        this.expandedNodes = this.selectedNode
          ? this.getExpandedNodes()
          : this.getFirstLevelNodes();
      },
      deep: true,
    },
  },
  methods: {
    onExpandSelectedNode() {
      this.toggleNodeDeep(this.selectedNode, true);
    },
    onCollapseSelectedNode() {
      this.toggleNodeDeep(this.selectedNode, false);
    },
    toggleNodeDeep(node, expanded) {
      const children = node.cat ? [node.cat].flat() : node.leaf || [];

      if (children.length) {
        if (expanded) {
          this.expandedNodes = {
            ...this.expandedNodes,
            [node._nodeId]: true,
          };
        } else {
          const expandedNodes = { ...this.expandedNodes };
          delete expandedNodes[node._nodeId];
          this.expandedNodes = expandedNodes;
        }

        for (let child of children) {
          this.toggleNodeDeep(child, expanded);
        }
      }
    },
    onNodeToggle(node) {
      const id = node._nodeId;

      if (this.expandedNodes[id]) {
        const expandedNodes = { ...this.expandedNodes };
        delete expandedNodes[id];
        this.expandedNodes = expandedNodes;
      } else {
        this.expandedNodes = {
          ...this.expandedNodes,
          [id]: true,
        };
      }
    },
    onNodeSelect(node) {
      this.$emit("node-select", node);
    },
    getFirstLevelNodes() {
      const nodes = {};

      if (this.treeData.cat) {
        const children = [this.treeData.cat].flat();

        for (let child of children) {
          nodes[child._nodeId] = true;
        }
      }

      return nodes;
    },
    getFirstNode() {
      if (this.treeData?.cat?._nodeId) {
        return this.treeData?.cat;
      }

      return null;
    },
    getExpandedNodes() {
      const expandedNodes = {};

      // Function to traverse the tree recursively
      const traverse = (node) => {
        if (node._nodeId === this.selectedNode._nodeId) {
          expandedNodes[node._nodeId] = true;
          return true;
        }

        const children = node.cat ? [node.cat].flat() : node.leaf || [];
        for (const child of children) {
          if (traverse(child)) {
            expandedNodes[node._nodeId] = true;
            return true;
          }
        }

        return false;
      };

      traverse(this.treeData);

      return expandedNodes;
    },
  },
};
</script>

<style lang="scss" scoped>
.tree {
  width: 100%;
  max-width: 700px;
  background-color: #f4f6f8;
  padding: 16px;
}

.tree-list {
  list-style-type: none;
  padding-left: 0;
}
</style>
