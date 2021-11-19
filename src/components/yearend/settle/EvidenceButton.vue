<template>
  <div>
    <button class="btn btn-md flat" @click="addEvidence()"><i class="icon-lineIcon-check mr-5"></i>
      증빙등록
    </button>
    <evidence-input-modal ref="evidInputModal"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import EvidenceInputModal from "./modals/EvidenceInputModal";

export default {
  components: {EvidenceInputModal},
  props: {
    step: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      eid: 'yearend/getEid',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    })
  },
  methods: {
    addEvidence() {
      let me = this;
      me.$refs.evidInputModal.show({
        step: me.step
      });
    },
  }
}
</script>