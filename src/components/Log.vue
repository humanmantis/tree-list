<template>
  <div class="log-table-wrapper">
    <table>
      <thead>
        <tr>
          <th class="col-id">ID</th>
          <th class="col-name">Name</th>
          <th class="col-action">
            <button class="button" @click="onClearRecords">Clear</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in records" :key="record.id">
          <td class="col-id">{{ record.id }}</td>
          <td class="col-name">{{ record.name }}</td>
          <td class="col-action">
            <button class="button" @click="onRemoveRecord(record.id)">
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "app-log",
  props: {
    records: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onRemoveRecord(id) {
      this.$emit("remove-record", id);
    },
    onClearRecords() {
      this.$emit("clear-records");
    },
  },
};
</script>

<style lang="scss" scoped>
.log-table-wrapper {
  width: 100%;
  padding: 10px;
  background-color: #f0f0f0;
}

table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

th {
  background-color: #f0f0f0;
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid #353535;
}

td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.col-id {
  width: 50px;
}

.col-action {
  width: 90px;
}

.button {
  width: 100%;
}
</style>
