<template>
  <div id="app">
    <Tree
      v-if="hasTreeData"
      :treeData="treeData"
      :selectedNode="selectedNode"
      @node-select="onNodeSelect"
    />
    <Log
      :records="records"
      @clear-records="onClearRecords"
      @remove-record="onRemoveRecord"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Tree from "./components/Tree.vue";
import Log from "./components/Log.vue";

export default {
  components: {
    Tree,
    Log,
  },
  computed: {
    ...mapState({
      treeData: (state) => state.tree.treeData,
      selectedNode: (state) => state.tree.selectedNode,
      records: (state) => state.log.records,
    }),
    hasTreeData() {
      return !!this.treeData;
    },
  },
  methods: {
    ...mapActions("tree", ["loadSelectedNode", "loadTreeData"]),
    ...mapActions("log", ["loadRecords"]),
    onClearRecords() {
      this.$store.dispatch("log/clearLog");
    },
    onRemoveRecord(id) {
      this.$store.dispatch("log/removeRecord", id);
    },
    onNodeSelect(node) {
      this.$store.dispatch("log/addRecord", node);
      this.$store.dispatch("tree/selectNode", node);
    },
  },
  mounted() {
    this.loadTreeData();
    this.loadSelectedNode();
    this.loadRecords();
  },
};
</script>
