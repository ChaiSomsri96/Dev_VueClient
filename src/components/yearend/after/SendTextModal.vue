<template>
    <base-modal title="문자작성 및 발송" id="send-text-modal" :scroll="false" width="1200">
        <template v-slot:body>
            <div class="row">
                <div class="col-6">
                    <div id="send-text-modal-grid"
                    style="width: 100%; height: 340px" class="realgrid-type-style"></div>
                </div>
                <div class="col-6">

                    <div class="form-wrap pb-0">
                        <labeled-input input-label="제목"
                        :error-msg="errors.TITLE">
                            <ui-input :value="smsData.title" @change="smsData.title=$event;" />
                        </labeled-input>

                        <labeled-input input-label="발송용 상용구">
                            <ui-dropdown :items="smsData.commercialSphere.items"
                                :value="smsData.commercialSphere.value"
                                @change="smsData.commercialSphere.value=$event.value; smsData.commercialSphere.return=$event;"
                                :options="{
                                        valueField  : 'code',
                                        labelField  : 'message',
                                        tooltipField: 'message'
                                    }" />    
                        </labeled-input>

                        <labeled-input input-label="발송내용"
                        :error-msg="errors.SEND_TEXT">
                            <textarea class="form-control" rows="10" cols="60" v-model="smsData.sendText"></textarea>
                        </labeled-input>

                        <labeled-input input-label="발송메모"
                        :error-msg="errors.SEND_MEMO">
                            <ui-input :value="smsData.sendMemo" @change="smsData.sendMemo=$event;"/>
                        </labeled-input>

                        <div class="form-group row">
                            <div class="row col-12" style="justify-content: flex-end;">
                                <button class="btn btn-md black" @click="sendLMS()">
                                    <i class="icon-lineIcon-mail mr-5"></i>LMS 발송
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </template>
        <template v-slot:footer>
            <div class="btn-wrap">
                <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                    <i class="icon-lineIcon-close mr-5"></i>창닫기
                </button>
            </div>
        </template>
    </base-modal>
</template>
<script>
import BaseModal from '@/components/common/BaseModal';
import LabeledInput from '@/components/common/LabeledInput';
import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';
export default {
    mixins: [modal, grid],
    components: {   
        BaseModal,
        LabeledInput       
    },
    data() {
        return {
            errors: {},
            fields: [
                {fieldName: "EMP_NUMBER",  dataType: 'text'},
                {fieldName: "EMP_NAME",  dataType: 'text'},
                {fieldName: "MOBILE_NO",  dataType: 'text'},
                {fieldName: "YE_PROGRESS",  dataType: 'text'},
            ],
            columns: [
                { header: "사번", fieldName: "EMP_NUMBER" },
                { header: "이름", fieldName: "EMP_NAME" },
                { header: "해드폰번호", fieldName: "MOBILE_NO" },
                { header: "정산상태", fieldName: "YE_PROGRESS" },
            ],
            rowAttrs: ['EID'],

            smsData: {
                title: '',
                commercialSphere: {
                    value: '',
                    return: null,
                    items: []
                },
                sendText: '',
                sendMemo: ''
            }
        }
    },
    methods: {
        async loadGridData(param) {
            try {
                let {data} = await this.$httpPost({
                    url: '/year-end/admin/sms-targets',
                    param: {
                        "ATT_YEAR": param.attYear,
                        "WRITE_FROM": '',
                        "WRITE_TO": '',
                        "TERMI_YES_NO": 'NO_TERMI',
                        "TITLE": '',
                        "MEMO_1": '',
                        "SMS_CONTENTS": '',
                        "bravo_combo_code-1241-inputEI": ''
                    }
                });
                this.setRealgridData(data || []);
            }   
            catch(e) {
                console.error("SendTextModal loadGridData err: ", e);
            }
        },
        createDynamicComponent() {
            let me = this;
            this.columns[3]['type'] = 'data';
            this.columns[3]['renderer'] = {
                type: "html",
                callback: function(grid, cell, w, h) {
                    return me.getYeProgressText(cell.value);
                }
            };
            this.createRealGrid({ 'domId': 'send-text-modal-grid', 'checkbar': 'multi' });
        },
        async asyncDynamicComponentData(param) {
            try {
                await this.loadGridData(param);
            }
            catch(e) {
                console.error("SendTextModal loadGridData error: ", e);
            }
        },
        isValidSMS() {
            let me = this;
            let hasError = false;
            me.errors = {};
            if(me.payrollUtil.isEmpty(this.smsData.title) ){
                hasError = true;
                me.errors.TITLE = '제목을 입력해 주세요.';
            }
            if(me.payrollUtil.isEmpty(this.smsData.sendText) ) {
                hasError = true;
                me.errors.SEND_TEXT = "발송내용을 입력해 주세요."
            }
            if(me.payrollUtil.isEmpty(this.smsData.sendMemo) ) {
                hasError = true;
                me.errors.SEND_MEMO = "발송내용을 입력해 주세요."
            }
            if(hasError)
                return false;
            return true;
        },
        sendLMS() {
            let checkedRows = this.gridView.getCheckedRows();
            if(checkedRows.length < 1) {
                this.toastAlertSelect()
                return;
            }
            let eidList = [];
            for(let i = 0; i < checkedRows.length; i ++) {
                let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);    
                eidList.push({'EID': _rowData[0]['EID']});
            }
            if(!this.isValidSMS()) {
                return;
            }
            /*
            api 호출 
            eidList -> 사원목록
            smsData -> 발송 파라미터
            */
           console.log("eidList==>", eidList);
        }
    },
    async mounted() {
        try {
            let {data} = await this.$httpGet('/system/setting/mastcode/list', {
                    "SUPER_CODE": '8K',
                    "INACTIVE": 'N'
                }) || [];
            for(let i = 0; i < data.length; i ++) {
                this.smsData.commercialSphere.items.push({message: data[i]['CODE_NAME'], code: data[i]['REAL_CODE']});
            }
            if(data.length > 0)
                this.smsData.commercialSphere.value = data[0]['REAL_CODE'];
        }
        catch(e) {
            console.error("SendTextModal error: ", e);
        }
    },
}
</script>