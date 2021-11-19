<template>
<section>
    <ye-settle-tabs :tabs="tabs" />
</section>
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
                {name: 'PensionSaving', label: '연금저축'},
                {name: 'HomeRental', label: '주택임차차입금'},
                {name: 'HousingMortgage', label: '주택저당차입금'},
                {name: 'HousingSaving', label: '주택마련저축'},
                {name: 'MonthlyRent', label: '월세액'},
                /*{name: 'UnsoldHousing', label: '미분양주택(IMF)'},*/
                {name: 'Extra', label: '기타'},
                {name: 'ForeignTax', label: '외납세액'},
            ]       
        }
    }
}
</script>   
