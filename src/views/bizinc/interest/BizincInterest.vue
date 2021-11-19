<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'이자배당소득 관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <bizinc-interest-tab></bizinc-interest-tab>
            <border-box width="260" v-slot="slotProps">
                <border-box-item title="사업장" :width="slotProps.width">
                    <ui-dropdown :items="searchOptionData.BIZUNIT_CODE.items"
                                 :value="searchOptionData.BIZUNIT_CODE.value"
                                 @change="searchOptionData.BIZUNIT_CODE.value=$event.value;"
                                 :options="{
                                     valueField  : 'BP_CODE',
                                     labelField  : 'DV_NAME',
                                     tooltipField: 'DV_NAME'}"/>
                </border-box-item>
                <border-box-item title="소득자" :width="slotProps.width">
                    <ui-dropdown :items="searchOptionData.EARNER_CODE.items"
                                 :value="searchOptionData.EARNER_CODE.value"
                                 @change="searchOptionData.EARNER_CODE.value=$event.value;"
                                 :options="{
                                           valueField  : 'EARNER_CODE',
                                           labelField  : 'EARNER_NAME',
                                           tooltipField: 'EARNER_NAME'}"/>
                </border-box-item>
                <border-box-item title="귀속월" :width="slotProps.width" multi>
                    <ui-month-picker v-model="searchOptionData.PAY_START_MONTH.value" />
                    <span>~</span>
                    <ui-month-picker v-model="searchOptionData.PAY_END_MONTH.value" />
                </border-box-item>
                <border-box-item button>
                    <button type="button" id="btnSearch" class="btn btn-md line-1 ml-10" @click="loadGridData">
                        <span>검색</span>
                    </button>
                </border-box-item>
            </border-box>
            <button-panel
                    btnType="top"
                    v-bind:download=true
                    v-on:download="downloadRealGridExcel" >
                <template v-slot:start>
                    <button class="btn btn-md mr-5" @click="openBizincInterestInput">
                        <i class="icon-lineIcon-check mr-5"></i>
                        이자배당소득 입력
                    </button>
                </template>
            </button-panel>
            <div>
                <div id="bizinc-interest-grid" class="realgrid-type-style" style="width: 100%; height: 440px;"></div>
            </div>
            <!--이자배당소득 입력-->
            <bizinc-interest-input-modal ref="bizincInterestInputModal" @loadGridData="loadGridData"/>
        </div>
    </div>
</template>
<script>
    import BorderBox from '@/components/common/BorderBox';
    import BorderBoxItem from '@/components/common/BorderBoxItem';
    import BizincInterestTab from './BizincInterestTab';
    import UiMonthPicker from '@/components/common/UiMonthPicker';
    import BizincInterestInputModal from './BizincInterestInputModal';
    import grid from '@/mixin/payroll-grid';
    import ButtonPanel from "@/components/common/ButtonPanel";

    export default {
        mixins: [grid],
        components: {
            BizincInterestTab,
            BizincInterestInputModal,
            BorderBox,
            UiMonthPicker,
            BorderBoxItem,
            ButtonPanel
        },
        data() {
            return {
                searchOptionData: {
                    EARNER_CODE: {
                        value: '',
                        items: []
                    },
                    BIZUNIT_CODE: {
                        value: '',
                        items: []
                    },
                    PAY_START_MONTH: {
                        value: this.getFirstMonthOfTheYear()
                    },
                    PAY_END_MONTH: {
                        value: this.getCurrentMonth()
                    }
                },
                fields: [
                    {fieldName: 'PAY_MONTH', dataType: 'text'},
                    {fieldName: 'PAY_DATE', dataType: 'text'},
                    {fieldName: 'INCOME_TYPE', dataType: 'text'},
                    {fieldName: 'TAXB_CODE', dataType: 'text'},
                    {fieldName: 'INTINC_TYPE', dataType: 'text'},
                    {fieldName: 'PER_START', dataType: 'text'},
                    {fieldName: 'PER_END', dataType: 'text'},
                    {fieldName: 'INTE_RATE', dataType: 'text'},
                    {fieldName: 'PAY_AMOUNT', dataType: 'number'},
                    {fieldName: 'TAX_RATE', dataType: 'number'},
                    {fieldName: 'RATE_INCL_LTAX', dataType: 'text'},
                    {fieldName: 'INCOME_TAX', dataType: 'number'},
                    {fieldName: 'CORP_TAX', dataType: 'number'},
                    {fieldName: 'RESID_TAX', dataType: 'number'},
                    {fieldName: 'JOSE_SPC', dataType: 'text'},
                    {fieldName: 'PROD_CODE', dataType: 'text'},
                    {fieldName: 'BOND_ITYPE', dataType: 'text'},
                    {fieldName: 'SEC_CODE', dataType: 'text'},
                    {fieldName: 'SINTAK_YN', dataType: 'text'},
                    {fieldName: 'TAX_MEMO', dataType: 'text'},
                    {fieldName: 'WARD_OFFICE', dataType: 'text'},
                    {fieldName: 'TAX_OFFICE', dataType: 'text'},
                    {fieldName: 'ACTION_UPDATE'},
                    {fieldName: 'ACTION_DEL'},
                ],
                columns: [
                    {fieldName: 'PAY_MONTH', header: '귀속월', width: 100},
                    {fieldName: 'PAY_DATE', header: '지급일', width: 100},
                    {fieldName: 'INCOME_TYPE', header: '구분', width: 100},
                    {fieldName: 'TAXB_CODE', header: '과세구분', width: 100},
                    {fieldName: 'INTINC_TYPE', header: '소득의 종류', width: 100},
                    {fieldName: 'PER_START', header: '시작일', width: 100},
                    {fieldName: 'PER_END', header: '종료일', width: 100},
                    {fieldName: 'INTE_RATE', header: '이자율', width: 100},
                    {fieldName: 'PAY_AMOUNT', header: '지급액', width: 100},
                    {fieldName: 'TAX_RATE', header: '세율', width: 100},
                    {fieldName: 'RATE_INCL_LTAX', header: '지방세 포함', width: 100},
                    {fieldName: 'INCOME_TAX', header: '소득세', width: 100},
                    {fieldName: 'CORP_TAX', header: '법인세', width: 100},
                    {fieldName: 'RESID_TAX', header: '지방소득세', width: 100},
                    {fieldName: 'JOSE_SPC', header: '조세특례', width: 100},
                    {fieldName: 'PROD_CODE', header: '금융상품코드', width: 100},
                    {fieldName: 'SEC_CODE', header: '유가증권코드/사업자번호', width: 100},
                    {fieldName: 'BOND_ITYPE', header: '채권이자구분', width: 100},
                    {fieldName: 'SINTAK_YN', header: '신탁이익', width: 100},
                    {fieldName: 'TAX_MEMO', header: '제한세율근거', width: 100}
                ],
                layout: [
                    'PAY_MONTH',
                    'PAY_DATE',
                    'INCOME_TYPE',
                    'TAXB_CODE',
                    'INTINC_TYPE',
                    {
                        name: 'PER_PERIOD',
                        direction: 'horizontal',
                        items: [
                            'PER_START',
                            'PER_END'
                        ],
                        header: {
                            text: '지급대상기간'
                        }
                    },
                    'INTE_RATE',
                    'PAY_AMOUNT',
                    'TAX_RATE',
                    'RATE_INCL_LTAX',
                    'INCOME_TAX',
                    'CORP_TAX',
                    'RESID_TAX',
                    'JOSE_SPC',
                    'PROD_CODE',
                    'SEC_CODE',
                    'BOND_ITYPE',
                    'SINTAK_YN',
                    'TAX_MEMO'
                ]
            }
        },
        methods: {
            openBizincInterestInput: function() {
                this.$refs.bizincInterestInputModal.show();
            },

            async loadGridData() {
                try {
                    const {data} = await this.$httpPostBody({
                        url: 'bizinc/biz-income/getBizIncomeList',
                        param: this.searchOptionData
                    });

                    this.setRealgridData(data || []);
                } catch(e) {
                    console.error(e)
                }
            },

            async loadWorkBizunitCodeItems() {
                try {
                    const {data} = await this.$httpGet( '/system/setting/division-mgt/list', {});
                    this.searchOptionData.BIZUNIT_CODE.items = data || [];
                }catch(e) {
                    console.error( e);
                }
            },

            async loadEarnerCodeItems() {
                try {
                    const {data} = await this.$httpGet( '/earner/selectResidencePersonal', {});
                    this.searchOptionData.EARNER_CODE.items = data || [];
                }catch(e) {
                    console.log(e)
                }
            }
        },
        mounted() {
            this.createRealGrid({
                'domId': 'bizinc-interest-grid',
                autoLoad: false
            });

            // 소득자
            this.loadEarnerCodeItems();

            // 사업장
            this.loadWorkBizunitCodeItems();
        }
    }
</script>