<template>
<div>
    <ye-settle-tabs :tabs="tabs" />
</div>
</template>
<script>
import YeSettleTabs from '@/components/yearend/settle/YeSettleTabs';
export default {
    components: {
        YeSettleTabs
    },
    data() {
        return {
            tabs: [
                {name: 'InsuranceFee', label: '보험료'},
                {name: 'MedicalExpense', label: '의료비'},
                {name: 'EducationalExpense', label: '교육비'},
                {name: 'CreditCard', label: '신용카드'},
                {name: 'Donation', label: '기부금'},
            ]
        }
    }
}
</script>   