<template>
  <div class="form-group row" style="align-items: baseline">
    <label class="form-label type2 col-6">{{ options.text }}</label>
    <div class="row col-6">
      <ui-radio-button-inline
          :vertical="options.vertical"
          :options="options" @change="change($event)"/>
    </div>
  </div>
</template>
<script>
import UiRadioButtonInline from '@/components/common/UiRadioButtonInline';

export default {
  components: {
    UiRadioButtonInline
  },
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  computed: {
    cOptions: function cOptions() {
      let defaultOptions = {
        vertical: false
      };
      return this.$mergeProp(defaultOptions, this.options);
    }
  },
  methods: {
    change($event) {
      this.$emit('doSurvey', $event);
    }
  },
}
</script>