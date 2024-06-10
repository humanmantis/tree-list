const state = {
  treeData: {},
  selectedNode: null,
};

const mutations = {
  setTreeData(state, treeData) {
    state.treeData = treeData;
  },
  setSelectedNode(state, node) {
    state.selectedNode = node;
    localStorage.setItem("selectedNode", JSON.stringify(node));
  },
};

const actions = {
  loadTreeData({ commit }) {
    fetch("data/tree.json")
      .then((response) => response.json())
      .then((data) => {
        commit("setTreeData", data.tree);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
  selectNode({ commit }, node) {
    commit("setSelectedNode", node);
  },
  loadSelectedNode({ commit }) {
    const selectedNode =
      JSON.parse(localStorage.getItem("selectedNode")) || null;
    commit("setSelectedNode", selectedNode);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
