<template>
<section class="ui-month-picker">
    <datepicker minimum-view="month" :language="language" :format="DatePickerFormat" bootstrap-styling :value="cValue" @input="input" calendar-class="ui-month-picker__calendar"></datepicker>
</section>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
export default {
    name: 'ui-month-picker',
    components: {
        Datepicker
    },
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    computed: {
        cValue() {
            return [this.value.slice(0, 4), '-', this.value.slice(4)].join('');      
        }
    },
    data() {
        return {
            DatePickerFormat: 'yyyyMM',
            language: {
                language: 'Korean',
                months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                monthsAbbr: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                days: ['일', '월', '화', '수', '목', '금', '토'],
                rtl: false,
                ymd: false,
                yearSuffix: '년'
            }
        }
    },
    methods: {
        input(e) {
            let yearMonth = e.getMonth() + 1;
            yearMonth = [e.getFullYear(), (yearMonth > 9 ? '' : '0') + yearMonth].join('');
            this.$emit('input', yearMonth)
        }
    }
}
</script>
