<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'소득자 관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <border-box width="260" v-slot="slotProps">
                <border-box-item title="관리번호" :width="slotProps.width">
                    <ui-input :value="formData.EARNER_CODE.value"
                              @change="formData.EARNER_CODE.value=$event;"/>
                </border-box-item>
                <border-box-item title="성명" :width="slotProps.width">
                    <ui-input :value="formData.EARNER_NAME_K.value"
                              @change="formData.EARNER_NAME_K.value=$event;"/>
                </border-box-item>
                <border-box-item title="소득자구분" :width="slotProps.width">
                    <mastcode-dropdown :options="{superCode: 'AK'}"
                                       v-model="formData.EARNER_REG_TYPE.value"
                                       @change="formData.EARNER_REG_TYPE.value=$event.value" />
                </border-box-item>
                <border-box-item title="거주구분" :width="slotProps.width">
                    <mastcode-dropdown :options="{superCode: 'L2'}"
                                       v-model="formData.EARNER_RESID_TYPE.value"
                                       @change="formData.EARNER_RESID_TYPE.value=$event.value" />
                </border-box-item>
                <border-box-item title="내외국인" :width="slotProps.width">
                    <mastcode-dropdown :options="{superCode: 'L3'}"
                                       v-model="formData.EARNER_NATIONALITY.value"
                                       @change="formData.EARNER_NATIONALITY.value=$event.value" />
                </border-box-item>
                <border-box-item title="신고관리 사업장" :width="slotProps.width">
                    <ui-dropdown :items="formData.EARNER_WORK_SITE.items"
                                 :value="formData.EARNER_WORK_SITE.value"
                                 @change="formData.EARNER_WORK_SITE.value=$event.value;"
                                 :options="{
                                     valueField  : 'BP_CODE',
                                     labelField  : 'DV_NAME',
                                     tooltipField: 'DV_NAME'}"/>
                </border-box-item>
                <border-box-item title="상태" :width="slotProps.width">
                    <mastcode-dropdown :options="{superCode: 'Z2'}"
                                       v-model="formData.EARNER_STATUS.value"
                                       @change="formData.EARNER_STATUS.value=$event.value" />
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
                    v-bind:add=true
                    v-bind:upload=true
                    v-on:add="openEarnerInput"
                    v-on:download="downloadEarner"
                    v-on:click="doUpload">
            </button-panel>
            <div>
                <div id="bizinc-earner-grid" class="realgrid-type-style" style="width: 100%; height: 440px;"></div>
            </div>
            <!--소득자 입력-->
            <bizinc-earner-input-modal ref="bizincEarnerInputModal" @loadGridData="loadGridData"/>
        </div>
    </div>
</template>
<script>
    import grid from '@/mixin/payroll-grid';
    import BorderBox from '@/components/common/BorderBox';
    import BorderBoxItem from '@/components/common/BorderBoxItem';
    import ButtonPanel from "@/components/common/ButtonPanel";
    import BizincEarnerInputModal from ".//BizincEarnerInputModal";
    import {getMasterCode} from '@/api/setting';
    import MastcodeDropdown from '@/components/common/MastcodeDropdown';

    export default {
        mixins: [grid],
        components: {
            ButtonPanel,
            BorderBox,
            BorderBoxItem,
            BizincEarnerInputModal,
            MastcodeDropdown
        },
        mounted() {
            this.createRealGrid({
                'domId': 'bizinc-earner-grid',
                autoLoad: false
            });

            this.initGridHandler();

            this.loadDropdownData();

            this.loadGridData();
        },
        data() {
            return {
                formData: {
                    EARNER_CODE: {
                        value: ''
                    },
                    EARNER_NAME_K: {
                        value: ''
                    },
                    EARNER_REG_TYPE: {
                        value: '',
                    },
                    EARNER_RESID_TYPE: {
                        value: ''
                    },
                    EARNER_NATIONALITY: {
                        value: ''
                    },
                    EARNER_WORK_SITE: {
                        value: '',
                        items: []
                    },
                    EARNER_STATUS: {
                        value: ''
                    },
                },
                fields: [
                    {fieldName: 'EARNER_CODE', dataType: 'text'},
                    {fieldName: 'EARNER_NAME_K', dataType: 'text'},
                    {fieldName: 'EARNER_REG_TYPE_NAME', dataType: 'text'},
                    {fieldName: 'EARNER_RESID_TYPE_NAME', dataType: 'text'},
                    {fieldName: 'EARNER_NATIONALITY_NAME', dataType: 'text'},
                    {fieldName: 'CLI_NAME', dataType: 'text'},
                    {fieldName: 'EARNER_STATUS_NAME', dataType: 'text'},
                    {fieldName: 'ACTION_UPDATE'},
                    {fieldName: 'ACTION_DEL'}
                ],
                columns: [
                    {fieldName: 'EARNER_CODE', header: '관리번호', width: 100, styleName: "left-column"},
                    {fieldName: 'EARNER_NAME_K', header: '성명', width: 100, styleName: "left-column"},
                    {fieldName: 'EARNER_REG_TYPE_NAME', header: '소득자구분', width: 100, styleName: "left-column"},
                    {fieldName: 'EARNER_RESID_TYPE_NAME', header: '거주구분', width: 100, styleName: "left-column"},
                    {fieldName: 'EARNER_NATIONALITY_NAME', header: '내외국인', width: 100, styleName: "left-column"},
                    {fieldName: 'CLI_NAME', header: '관리사업장', width: 100, styleName: "left-column"},
                    {fieldName: 'EARNER_STATUS_NAME', header: '상태', width: 100, styleName: "left-column"},
                    this.getUpdateColumn({headerText: '수정', fieldName: 'ACTION_UPDATE', columnWidth: 100}),
                    this.getDeleteColumn({headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 100}),
                ],
                rowAttrs: ['EARNER_CODE', 'EARNER_NAME_K', 'EARNER_REG_TYPE', 'EARNER_REG_TYPE_NAME', 'EARNER_NATIONALITY_NAME',
                    'CLI_NAME', 'EARNER_STATUS_NAME', 'EARNER_RRN', 'EARNER_WORK_SITE', 'EARNER_PASSPORT_NO', 'EARNER_NATIONALITY', 'EARNER_RESID_TYPE',
                    'EARNER_ADDR_K', 'EARNER_EMAIL', 'EARNER_BANK_CODE',  'EARNER_RESID_CN', 'EARNER_BANK_HOLDER', 'EARNER_FRN_BIRTH', 'FRN',
                    'EARNER_BANK_AC', 'EARNER_STATUS', 'EARNER_NAME_E', 'EARNER_BIRTH_D', 'EARNER_FRN', 'EARNER_DOMI_NO',
                    'EARNER_TAXPAYER_ID', 'EARNER_ADDR_E', 'EARNER_BIZ_NAME', 'EARNER_BIZ_TEL_NO', 'EARNER_VAT_ID', 'EARNER_REG_NO',
                    'EARNER_BIZ_ADDR', 'EARNER_RESID_TYPE_NAME', 'EARNER_RRN_BIRTH', 'RRN', ]
            }
        },
        methods: {
            saveEarnerCallback: function() {
                alert( '저장했습니다');
                this.onSearch();
            },

            initGridHandler: function() {
                const me = this;
                this.gridView.onCellItemClicked = function(grid, index) {
                    grid.commit();
                    let rowData = me.dataProvider.getFieldValues('ROW_ATTRS', index.dataRow, index.dataRow)[0];
                    if(index.column.fieldName === 'ACTION_DEL') {
                        me.deleteEarner( rowData);
                        return;
                    }

                    if(index.column.fieldName === 'ACTION_UPDATE') {
                        me.openEarnerInput({OPEN_TYPE: 'UPDATE', ...rowData});
                        return;
                    }
                }
            },

            deleteEarner: function(data) {
                const me = this;
                me.confirmDelete(function() {
                    me.$httpPost({
                        param: data,
                        url: '/earner/delete',
                        callback: function() {
                            me.toastSuccessDelete();
                            me.loadGridData();
                        }
                    })
                })
            },

            openEarnerInput: function(data = {}) {
                this.$refs.bizincEarnerInputModal.show(data);
            },

            openEarnerUpload: function() {

            },

            async loadGridData() {
                try {
                    const {data} = await this.$httpGet( '/earner/select', this.getParams());

                    this.setRealgridData(data || []);
                } catch (e) {
                    console.error(e);
                }
            },

            getParams: function() {
                let params = {};
                let formData = this.formData;
                let keys = Object.keys(formData);
                keys.forEach((key) => {
                    params[key] = formData[key].value;
                });

                return params;
            },

            async loadDropdownData() {
                // 신고관리 사업장
                this.formData.EARNER_WORK_SITE.items = await this.getDropdownData({
                    url: '/system/setting/division-mgt/list',
                    params: {}
                });
            },

            async getDropdownData(obj) {
                try {
                    let {data} = await this.$httpGet( obj.url, obj.params || {});
                    return data;
                } catch(e) {
                    console.log(e)
                }
            },

            removeEarner: function() {
                const me = this;
                const checkList = gridView.getCheckedRows();
                if( ! checkList || checkList.length === 0) {
                    return;
                }
                let removeList = [];
                checkList.forEach((rowCnt) => {
                    const data = dataProvider.getJsonRow( rowCnt);
                    removeList.push({
                        EARNER_CODE: data.EARNER_CODE
                    });
                });

            },

            downloadEarner: function() {
                gridView.exportGrid({
                    type: 'excel',
                    target: 'local',
                    fileName: '소득자.xlsx',
                    showProcess: true,
                    progressMessage: '엑셀 export중입니다.',
                    indicator: false,
                    header: true,
                    footer: false,
                    compatibility: 'MS Excel'
                });
            },

            doUpload: function() {

            }
        }
    }
</script>