<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'급여환경 세팅'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <div class="form-area">
                <div class="form-wrap">
                    <labeled-input
                        v-for="(item, index) in formList" 
                        :key="index"
                        :input-label="item.CODE_NAM"
                        labelClass="col-4"
                        inputClass="col-3">
                        <ui-dropdown 
                            v-if="item.CONFIG_SETTING == 'YES' || item.CONFIG_SETTING == 'NO'"
                            :items="((item.READ_ONLY == 'true' && item.CONFIG_TYPE != 'BONUS_BANKAC') || (item.READ_ONLY == 'true' && !selfBankac && item.CONFIG_TYPE == 'BONUS_BANKAC') ) ? [] : dropdownItem"
                            :value="item.CONFIG_SETTING"
                            @change="dropdownChange($event, item)"
                            :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message',
                                                disabled: ((item.READ_ONLY == 'true' && item.CONFIG_TYPE != 'BONUS_BANKAC') || (item.READ_ONLY == 'true' && !selfBankac && item.CONFIG_TYPE == 'BONUS_BANKAC') )
                                            }"
                        />
                        <ui-dropdown 
                            v-else-if="item.CONFIG_TYPE == 'APPOINT_BANK'"
                            :items="(item.READ_ONLY == 'true' && !selfBankac) ? [] : bankList"
                            :value="item.CONFIG_SETTING"
                            @change="dropdownChange($event, item)"
                            :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message',
                                                disabled: item.READ_ONLY == 'true' && !selfBankac
                                            }"
                        />
                        <div v-else-if="item.CONFIG_TYPE == 'BANNED_PERIOD'" style="display: flex; align-items: center;">
                            <ui-dropdown 
                                :items="(item.READ_ONLY == 'true' && !selfBankac) ? [] : bannedPeriodItem"
                                :value="item.FIXED_VALUE"
                                @change="dropdownChange($event, item, 'FIXED_VALUE')"
                                :options="{
                                                    valueField  : 'code',
                                                    labelField  : 'message',
                                                    tooltipField: 'message',
                                                    disabled: item.READ_ONLY == 'true' && !selfBankac
                                                }"
                            />  
                            <span class="px-1">~</span>
                            <ui-dropdown 
                                :items="(item.READ_ONLY == 'true' && !selfBankac) ? [] : bannedPeriodItem"
                                :value="item.AUX_VALUE"
                                @change="dropdownChange($event, item, 'AUX_VALUE')"
                                :options="{
                                                    valueField  : 'code',
                                                    labelField  : 'message',
                                                    tooltipField: 'message',
                                                    disabled: item.READ_ONLY == 'true' && !selfBankac
                                                }"
                            />  
                        </div>
                    </labeled-input>         
                </div>
                <div class="form-bottom">
                    <button type="button" class="btn btn-lg flat" @click="cancel()"><i class="icon-lineIcon-close mr-5"></i>취소</button>
                    <button type="button" class="btn btn-lg black ml-5" @click="onSave()"><i class="icon-lineIcon-check mr-5"></i>저장</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LabeledInput from "@/components/common/LabeledInput";
export default {
    components: {
        LabeledInput
    },
    data() {
        return {
            formList: [],
            dropdownItem: [
                { code: 'NO', message: 'NO - 아니요' },
                { code: 'YES', message: 'YES - 예' },
            ],
            bankList:[ //은행 목록
                { code: '', message: '지정은행 없음'},
            ],
            bannedPeriodItem: [],
            selfBankac: false
        }
    },
    methods: {
        dropdownChange($event, item, key) {
            if(item.CONFIG_TYPE != 'BANNED_PERIOD') {
                item.CONFIG_SETTING=$event.value;
            }
            else {
                item[key] = $event.value;
            }

            if(item.CONFIG_TYPE == 'SELF_BANKAC')
                this.changeReadOnlySetting($event.value);
        },
        changeReadOnlySetting(_selfBankac) {
            this.selfBankac = (_selfBankac == 'YES');
        },
        async loadBankList() {
            try {
                let {data} = await this.$httpGet('/system/setting/krbank/list') || [];
                for(let i = 0; i < data.length; i ++) {
                    this.bankList.push({
                        code: data[i]['BANK_CODE'],
                        message: data[i]['BANK_CODE'] + ' - ' + data[i]['BANK_NAM']
                    });
                }
            }
            catch(e) {
                console.error("CfgPayConSetting loadBankList err: ", e);
            }
        },
        async loadFormData() {
            try {
                let {data} = await this.$httpGet('/payroll/code/cfg-salary/list') || [];
                this.formList = data;
                for(let i = 0; i < this.formList.length; i ++) {
                    if(this.formList[i]['CONFIG_TYPE'] == 'SELF_BANKAC') {
                        this.changeReadOnlySetting(this.formList[i]['CONFIG_SETTING']);
                        break;
                    }
                }
            }
            catch(e) {
                console.error("CfgPayConSetting loadFormData err: ", e);
            }
        },
        filterReqFormList() {
            let reqParamList = [];
            for(let i = 0; i < this.formList.length; i ++) {
                if(this.formList[i]['CONFIG_SETTING'] == 'YES' || this.formList[i]['CONFIG_SETTING'] == 'NO') {
                    if( !((this.formList[i]['READ_ONLY'] == 'true' && this.formList[i]['CONFIG_TYPE'] != 'BONUS_BANKAC') ||
                        (this.formList[i]['READ_ONLY'] == 'true' && !this.selfBankac && this.formList[i]['CONFIG_TYPE'] == 'BONUS_BANKAC')) ) {
                            reqParamList.push(this.formList[i]);
                    }
                }
                else if(this.formList[i]['CONFIG_TYPE'] == 'APPOINT_BANK') {
                    if( !(this.formList[i]['READ_ONLY'] == 'true' && !this.selfBankac) ) {
                            reqParamList.push(this.formList[i]);
                    }
                }
                else if(this.formList[i]['CONFIG_TYPE'] == 'BANNED_PERIOD') {
                    if( !(this.formList[i]['READ_ONLY'] == 'true' && !this.selfBankac) ) {
                        reqParamList.push(this.formList[i]);
                    }
                }
            }
            return reqParamList;
        },
        async onSave() {
            try {
                let me = this;
                await this.$httpPost({
                    url: "/payroll/code/cfg-salary/save-all",
                    param: {
                        'formData': JSON.stringify(this.filterReqFormList(this.formList))
                    },
                    callback: function() {
                        me.toastSuccessSave();
                    }
                });
            }
            catch(e) {
                console.error("CfgPayConSetting error: ", e);
            }
        },
        cancel() { //조작???
        }
    },
    async mounted() {
        for(let i = 1; i <= 31; i ++)
            this.bannedPeriodItem.push({ code: i.toString(), message: i.toString() });
        await this.loadBankList();
        this.loadFormData();
    },
}
</script>
