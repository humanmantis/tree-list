<template>
  <li class="tree-node" role="treeitem">
    <div
      class="tree-node__title"
      :class="{
        'tree-node__title_leaf': !hasChildren,
        'tree-node__title_selected': selectedNode?._nodeId === node._nodeId,
      }"
      @click="onNodeSelect"
      @dblclick="onNodeToggle"
    >
      <span v-if="hasChildren">
        {{ expanded ? "[-]" : "[+]" }}
      </span>
      <span>{{ name }}</span>
    </div>
    <ul
      v-show="hasChildren && expanded"
      role="group"
      class="tree-node__children"
    >
      <TreeNode
        v-for="child in children"
        :key="child._nodeId"
        :node="child"
        :level="level + 1"
        :expandedNodes="expandedNodes"
        :selectedNode="selectedNode"
        @node-toggle="onChildNodeToggle"
        @node-select="onChildNodeSelect"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: "app-tree-node",
  components: {
    TreeNode: () => import("./TreeNode.vue"),
  },
  props: {
    node: {
      type: Object,
      required: true,
    },
    level: {
      type: Number,
      default: 0,
    },
    expandedNodes: {
      type: Object,
      required: true,
    },
    selectedNode: {
      type: Object,
      default: null,
    },
  },
  computed: {
    name() {
      return this.node._name;
    },
    children() {
      return this.node.cat ? [this.node.cat].flat() : this.node.leaf || [];
    },
    hasChildren() {
      return !!this.children.length;
    },
    expanded() {
      return this.expandedNodes && this.expandedNodes[this.node._nodeId];
    },
  },
  methods: {
    onNodeToggle() {
      this.$emit("node-toggle", this.node);
    },
    onNodeSelect() {
      this.$emit("node-select", this.node);
    },
    onChildNodeToggle(node) {
      this.$emit("node-toggle", node);
    },
    onChildNodeSelect(node) {
      this.$emit("node-select", node);
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-node {
  list-style-type: none;

  &__title {
    cursor: pointer;
    padding: 0.5em;
    width: fit-content;
    user-select: none;

    &_selected {
      background-color: #e3e6e8;
    }

    &_leaf {
      cursor: default;
      color: #3f96c4;
    }
  }

  &__children {
    border-left: 1px solid #ccc;
    margin-left: 15px;
    padding-left: 15px;
  }
}
</style>
