<template>
    <div class="p-10">
        <div class="row mb-10 align-items-center">
            <h2>미분양주택(IMF)</h2>
          <evidence-button :step="step" />
        </div>
        <div class="row">
            <table-form :colgroup="['20%', 'auto', '20%', 'auto']">
                <template v-slot:body>
                    <tr>
                        <table-form-label label="차입자" />
                        <table-form-item>
                            <ui-dropdown 
                                :items="unsoldHousing.borrower.items"
                                :value="unsoldHousing.borrower.value"
                                @change="unsoldHousing.borrower.value=$event.value; unsoldHousing.borrower.return=$event;"
                                :options="{ valueField: 'code', labelField: 'message', tooltipField: 'message'}" 
                            />
                        </table-form-item>
                        <table-form-label label="차입일" />
                        <table-form-item>
                            <ui-input-date 
                                :date="unsoldHousing.borrowing_date.date" 
                                @change="unsoldHousing.borrowing_date.date=$event; 
                                unsoldHousing.borrowing_date.return=$event;"
                            />
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-label label="차입처명" />
                        <table-form-item>
                            <input type="text" class="form-control" v-model="unsoldHousing.borrowing_place">
                        </table-form-item>
                        <table-form-label label="이자상환액" />
                        <table-form-item>
                            <input type="text" class="form-control" v-model="unsoldHousing.interest_repay_amt">
                        </table-form-item>
                    </tr>
                    <tr>
                        <table-form-item label="" />
                        <table-form-item colspan="3" class="pt-20">
                            * 국세청 업로드 자료인 경우, 차입일과 차입처명만 수정가능합니다.
                        </table-form-item>
                    </tr>
                </template>
                <template v-slot:footer>
                    <div class="row">
                        <div class="col-6">
                            <button class="btn btn-md black mr-3">
                                <i class="icon-lineIcon-check mr-5"></i>공제대상
                            </button>
                            <button class="btn btn-md mr-3">
                                <i class="icon-lineIcon-minus mr-5"></i>공제대상 아님
                            </button>
                        </div>
                        <div class="col-6 text-right">
                            <button class="btn btn-md black mr-3" @click="onApply">
                                <i class="icon-lineIcon-check mr-5"></i>신청
                            </button>
                            <button class="btn btn-md line-1 mr-3" @click="onInquiry">
                                <i class="icon-lineIcon-search mr-5"></i>설문지조회
                            </button>
                            <button class="btn btn-md mr-3" @click="onDelete">
                                <i class="icon-lineIcon-minus mr-5"></i>삭제
                            </button>
                        </div>
                    </div>
                </template>
            </table-form>
        </div>
    </div>
</template>
<script>
import TableForm from '@/components/common/TableForm';
import TableFormItem from '@/components/common/TableFormItem';
import TableFormLabel from '@/components/common/TableFormLabel';
import EvidenceButton from "../../../../components/yearend/settle/EvidenceButton";

export default {
    components: {
      EvidenceButton,
        TableForm,
        TableFormItem,
        TableFormLabel
    },
    data() {
        return {
            unsoldHousing: {
                borrower: {
                    value: '유종호',
                    return: null,
                    items: [{ message: '유종호', code: '유종호' }]
                },
                borrowing_date: {
                    date: '19981010',
                    return: null
                },
                borrowing_place: '국민은행',
                interest_repay_amt: '200,000'
            }
        }
    },
    methods: {
        addEvidence() {},
        onApply() {},
        onInquiry() {},
        onDelete() {}
    }
}
</script>