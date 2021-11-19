<template>
  <div class="form-group row">
    <label class="form-label type2" :class="labelClass">
      <span>{{ formLabel }}</span>
    </label>
    <div class="has-danger" :class="inputClass">
      <div class="input-group">
        <slot></slot>
      </div>
      <h5 class="mt-5" v-if="errorMsg && errorMsg.length > 0">{{ errorMsg }}</h5>
    </div>
  </div>

</template>

<script>
import {mlngInfoUtils} from "workplace-vue-common-ui";
export default {
  props: {
    errorMsg: String,
    inputLabel: String,
    labelClass: {
      type: String,
      default: 'col-3'
    },
    inputClass: {
      type: String,
      default: 'col-9'
    }
  },
  computed: {
    formLabel: function(){
      return mlngInfoUtils.getOrDefault(this.inputLabel,this.inputLabel);
    }
  },
}
</script>