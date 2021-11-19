<template>
    <div class="salary-months-and-dates row">
        <label class="form-label mr-10 type2" :class="labelClassAttr">
            <span>{{ label }}</span>
        </label>
        <div class="input-group salary-months-and-dates__input--width100">
            <input type="text" class="form-control" readonly :value="salaryMonth" />
        </div>
        <label class="form-label px-1 type2">
            <span>월</span>
        </label>
        <div class="input-group salary-months-and-dates__input--width50">
            <input type="text" class="form-control" readonly :value="degree" />
        </div>
        <label class="form-label px-1 type2">
            <span>차</span>
        </label>
        <div class="input-group salary-months-and-dates__input--width100">
            <input type="text" class="form-control" readonly :value="salaryDate" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        salaryMonth: {
            type: String,
            default: ''
        },
        salaryDate: {
            type: String,
            default: ''
        },
        degree: {
            type: [Number, String],
            default: 0
        },
        label: {
            type: String,
            default: '급여월과 차수'
        },
        labelClassAttr: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.salary-months-and-dates {
    &__input--width100 {
        width: 100px;
    }
    &__input--width50 {
        width: 50px;
    }
    .input-group .form-control {
        padding: 0 15px;
    }
}
</style>