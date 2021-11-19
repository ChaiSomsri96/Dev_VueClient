<template>
  <div>
    <ye-settle-tabs :tabs="tabs" :initialParam="currentCompParam"/>
  </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import GridTitle from '@/components/common/GridTitle';
import YeSettleTabs from '@/components/yearend/settle/YeSettleTabs';
import {mapGetters} from 'vuex';

export default {
  mixins: [grid],
  components: {
    GridTitle,
    YeSettleTabs
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
      //tabs
      tabs: [],
      currentCompParam: {}
    }
  },
  methods: {
    async asyncData() {
      let work;
      try {
        let {data} = await this.$httpPost({
          url: '/year-end/employee/deduction/request/next-step-data',
          param: {
            'EID': this.eid,
            'ATT_YEAR': this.attYear,
            'CURRENT_STEP': 'YEAR_INCOME',
            'PAYDAY': this.payday
          }
        });
        for (let i = 0; i < data.list.length; i++) {
          work = data.list[i];
          if (i == 0){
            this.tabs.push({
              name: 'YeAnnualIncomeDetail',
              label: '현직장',
              params: { id: i, WORK_SEQ_NO: work.WORK_SEQ_NO }
            });
          }else{
            this.tabs.push({
              name: 'YeAnnualIncomeDetail',
              label: '전직장' + (i),
              params: {id: i, COMP_NAME: work['COMP_NAME'], WORK_SEQ_NO: work.WORK_SEQ_NO}
            });

            if (i != 0 && i == this.$route.params.id) {
              this.currentCompParam = {
                id: i,
                COMP_NAME: work['COMP_NAME'],
                WORK_SEQ_NO: work.WORK_SEQ_NO
              };
            }
          }
        }
      } catch (e) {
        console.log("YeAnnualIncome asyncData err: ", e);
      }
    }
  },
  mounted() {
    this.asyncData();
  }
}
</script>