const state = {
  records: [],
};

const mutations = {
  setRecords(state, records) {
    state.records = records;
  },
  addRecord(state, record) {
    const isRecordExist = state.records.some((r) => r.id === record.id);
    if (!isRecordExist) {
      state.records = [...state.records, record];
      localStorage.setItem("records", JSON.stringify(state.records));
    }
  },
  removeRecord(state, id) {
    state.records = state.records.filter((record) => record.id !== id);
    localStorage.setItem("records", JSON.stringify(state.records));
  },
  clearLog(state) {
    state.records = [];
    localStorage.removeItem("records");
  },
};

const actions = {
  loadRecords({ commit }) {
    const records = JSON.parse(localStorage.getItem("records")) || [];
    commit("setRecords", records);
  },
  addRecord({ commit }, node) {
    const record = { id: node._nodeId, name: node._name };
    commit("addRecord", record);
  },
  removeRecord({ commit }, id) {
    commit("removeRecord", id);
  },
  clearLog({ commit }) {
    commit("clearLog");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
