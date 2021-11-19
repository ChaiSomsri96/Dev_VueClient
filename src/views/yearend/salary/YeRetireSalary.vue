<template>
  <ye-count-salary
      :realgridDomId="'ye-retire-salary-grid'"
      :yesType="'retire'"
      :yesType2="'SEV'"
      :settleTypeName="'퇴사자 정산'"
      :openYearUrl="'/year-end/setting/settle/incumbent/open-year'"
      :searchUrl="'/yearend/retireynd/settle-retired-targets'"
      :saveInitUrl="'/year-end/admin2/sum-retire-income/insert'"
  />
</template>

<script>
import YeCountSalary from "./YeCountSalary";

export default {
  extends: YeCountSalary,
  components: {YeCountSalary},
  data(){
    return {
      settleType: {
        return: null,
        value: 'SEV'
      },
      selCode: {
        ATT_YEAR: '',
        QRY_SETTLE_TYPE: 'SEV',
        FILTER_YE_STATUS: 'NO'
      }
    }
  }
}
</script>