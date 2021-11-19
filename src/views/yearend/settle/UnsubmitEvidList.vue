<template>
  <div>
    <div class="tbl-title">
      <h3>미제출 증빙서류</h3>
    </div>
    <div>
      <div id="unsubmit-evidence-grid" class="realgrid-type-style" style="height: 250px"></div>
    </div>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import GridTitle from '@/components/common/GridTitle';
import {mapGetters} from 'vuex';
import ButtonPanel from "../../../components/common/ButtonPanel";

export default {
  mixins: [grid],
  components: {
    ButtonPanel,
    GridTitle
  },
  computed: {
    ...mapGetters({
      eid: 'yearend/getEid',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    })
  },
  data() {
    return {
      fields: [
        {fieldName: 'evid_category', dataType: 'text'},
        {fieldName: 'PERSON_NAME', dataType: 'text'},
        {fieldName: 'EVID_NAME', dataType: 'text'},
        {fieldName: 'desc', dataType: 'text'},
      ],
      columns: [
        {fieldName: 'evid_category', header: '항목', width: 100},
        {fieldName: 'PERSON_NAME', header: '대상자', width: 100},
        {fieldName: 'EVID_NAME', header: '미제출증빙', width: 200},
        {fieldName: 'desc', header: '비고', width: 500}
      ]
    }
  },
  methods: {
    // grid
    async loadGridData(__param) {
      try {
        let {data} = await this.$httpPost({
          url: '/year-end/employee/evid/check-result',
          param: {
            'EID': 1491, //this.eid,
            'ATT_YEAR': this.attYear,
            'CURRENT_STEP': 'EVID',
            'PAYDAY': this.payday,
            'LIST_ALL': 'YES'
          }
        });
        this.setRealgridData(data || []);
      } catch (e) {
        console.error("UnsubmitEvidence loadGridData err: ", e);
      }
    },
    async asyncData() {
    },
    addRealGridOption(){
      console.log( this.gridView);
      this.gridView.footers.visible = false;
    }
  },
  mounted() {
    this.createRealGrid({'domId': 'unsubmit-evidence-grid', hideFooters: true });
    this.asyncData();
    this.loadGridData();
  }
}
</script>