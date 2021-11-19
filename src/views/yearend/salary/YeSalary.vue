<template>
  <ye-count-salary
      :realgridDomId="'ye-salary-grid'"
      :yesType="'yearend'"
      :yesType2="'YEAREND'"
      :settleTypeName="'연말정산'"
      :openYearUrl="'/year-end/setting/settle/incumbent/open-year'"
      :searchUrl="'/year-end/admin/year-income-emp/list'"
      :saveInitUrl="'/year-end/admin2/sum-year-income/insert'"
  />
</template>

<script>
import YeCountSalary from "./YeCountSalary";

export default {
  mixins:[YeCountSalary],
  components: {YeCountSalary},
  data(){
    return {
      settleType: {
        return: null,
        value: 'YEAREND'
      },
      selCode: {
        ATT_YEAR: '',
        QRY_SETTLE_TYPE: 'YEAREND',
        FILTER_YE_STATUS: 'NO'
      }
    }
  }
}
</script>