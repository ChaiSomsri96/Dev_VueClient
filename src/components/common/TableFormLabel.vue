<template>
  <th :style="thStyle">
    <label class="form-label">
      <span :class="required ? 'ess': ''" :title="label">{{ label }}</span>
      <button class="btn btn-s flat solid ml-5"
              v-if="helpDesc"
              :title='helpDesc' data-toggle="tooltip" data-placement="bottom_right">
        <i class="icon-solidIcon-help"></i>
      </button>
    </label>
  </th>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    hasError: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    helpDesc: {
      type: String,
      default: ''
    },
  },
  computed: {
    thStyle: function () {
      if (this.hasError)
        return {
          "vertical-align": "baseline",
          "padding-top": "6px"
        };
      return null;
    }
  }
}
</script>