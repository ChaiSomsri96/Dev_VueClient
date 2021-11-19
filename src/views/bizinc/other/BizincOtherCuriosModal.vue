<template>
    <base-modal title="서화ㆍ골동품 입력" id="otherinc-curios-modal" size="large" :scroll="false" width="1380">
        <template v-slot:body>
            <button-panel
                    btnType="top"
                    v-bind:add=true
                    v-bind:download=true
                    v-on:download="downloadRealGridExcel"
                    v-on:add="addEmptyData"></button-panel>
            <div style="height: 400px;">
                <div id="curios-grid" class="realgrid-type-style" style="width: 100%; height: 400px"></div>
            </div>
        </template>
        <template v-slot:footer>
            <div class="btn-wrap">
                <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                    <i class="icon-lineIcon-close mr-5"></i>취소
                </button>
                <button type="button"
                        class="btn btn-md black"
                        v-on:click="doSave">
                    <i class="icon-lineIcon-check mr-5"></i><span>저장</span>
                </button>
            </div>
        </template>
    </base-modal>
</template>
<script>
    import BaseModal from '@/components/common/BaseModal';
    import modal from '@/mixin/modal';
    import grid from '@/mixin/payroll-grid'
    import ButtonPanel from "@/components/common/ButtonPanel";

    export default {
        name: 'bizinc-other-curios-modal',
        mixins: [modal, grid],
        components: {
            ButtonPanel,
            BaseModal,
        },
        data() {
            return {
                requireDataList: [
                    {code: 'WORK_CODE', msg: '작품코드를 선택해주세요.'},
                    {code: 'BUYER_NAME', msg: '양수자 성명을 입력해주세요.'},
                    {code: 'BUYER_RRN', msg: '양수자 주민등로번호를 입력해주세요.'}
                ],
                code: {
                    WORK_CODE: {
                        values: [],
                        labels: []
                    },
                    BUYER_TYPE: {
                        values: [],
                        labels: []
                    }
                },
                formData: {
                    EXTRA_SEQ_NO: {
                        value: ''
                    },
                    EXTRA_ATT_YEAR: {
                        value: ''
                    },
                    SELLER_NAME: {
                        value: ''
                    },
                    SELLER_RRN: {
                        value: ''
                    },
                    PAY_DATE: {
                        value: ''
                    },
                },
                emptyRealGridData: {
                    WORK_CODE: ''
                },
                fields: [
                    {fieldName: 'SEQ_NO', dataType: 'text'},
                    {fieldName: 'WORK_CODE', dataType: 'text'},
                    {fieldName: 'SALES_PRICE', dataType: 'number'},
                    {fieldName: 'PAYMENT', dataType: 'number'},
                    {fieldName: 'BUYER_NAME', dataType: 'text'},
                    {fieldName: 'BUYER_RRN', dataType: 'text'},
                    {fieldName: 'BUYER_TYPE', dataType: 'text'},
                    {fieldName: 'ARTIST_NAME', dataType: 'text'},
                    {fieldName: 'WORK_NAME', dataType: 'text'},
                    {fieldName: 'WORK_MATERIAL', dataType: 'text'},
                    {fieldName: 'WORK_SIZE', dataType: 'text'},
                    {fieldName: 'WORK_YEAR', dataType: 'text'},
                    {fieldName: 'DELETE', dataType: 'text'}
                ],
                columns: [],
                layout: [
                    'WORK_CODE',
                    'SALES_PRICE',
                    'PAYMENT',
                    {
                        name: 'BUYER_GROUP',
                        direction: 'horizontal',
                        items: [
                            'BUYER_NAME',
                            'BUYER_RRN',
                            'BUYER_TYPE'
                        ],
                        header: {
                            text: '양수자'
                        }
                    },
                    'ARTIST_NAME',
                    'WORK_NAME',
                    'WORK_SIZE',
                    'WORK_YEAR',
                    'DELETE'
                ]
            }
        },

        async created() {
            await this.loadCodeData();
            this.loadReadlGridColumns();
        },

        methods: {
            loadReadlGridColumns() {
                let me = this;
                this.columns = [
                    {fieldName: 'WORK_CODE', header: '작품코드', width: 100, "lookupDisplay": true, styleName: "left-column",
                        values: me.code.WORK_CODE.values, labels: me.code.WORK_CODE.labels, editable: true,
                        editor: {'type': "dropdown", 'dropDownCount': 4},
                    },
                    {fieldName: 'SALES_PRICE', header: '총 양도가액', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        editor: {type: "number", editFormat: "#,##0", multipleChar: "+"},
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    {fieldName: 'PAYMENT', header: '지급액', width: 100, styleName: "right-column", numberFormat: "#,##0", nanText: '0',
                        editor: {type: "number", editFormat: "#,##0", multipleChar: "+"},
                        footer: { header: "0", expression: "sum", numberFormat: "#,##0" }
                    },
                    {fieldName: 'BUYER_NAME', header: '성명', width: 100, styleName: "left-column"},
                    {fieldName: 'BUYER_RRN', header: '주민번호', width: 150, styleName: "left-column"},
                    {fieldName: 'BUYER_TYPE', header: '종류', width: 130, "lookupDisplay": true, styleName: "left-column",
                        values: me.code.BUYER_TYPE.values, labels: me.code.BUYER_TYPE.labels, editable: true,
                        editor: {'type': "dropdown", 'dropDownCount': 4},
                    },
                    {fieldName: 'ARTIST_NAME', header: '작가', width: 150, styleName: "left-column"},
                    {fieldName: 'WORK_NAME', header: '작품명', width: 150, styleName: "left-column"},
                    {fieldName: 'WORK_MATERIAL', header: '재질', width: 150, styleName: "left-column"},
                    {fieldName: 'WORK_SIZE', header: '크기', width: 100, styleName: "left-column"},
                    {fieldName: 'WORK_YEAR', header: '제작연도', width: 80},
                    this.getDeleteColumn({columnWidth:45})
                ]
            },

            async loadCuriosGridData() {
                try {
                    const {data} = await this.$httpGet( '/bizinc/ext-income/getCurioTransList', {
                        EXTRA_ATT_YEAR: this.formData.EXTRA_ATT_YEAR.value,
                        EXTRA_SEQ_NO: this.formData.EXTRA_SEQ_NO.value
                    });

                    if( this.payrollUtil.isEmpty(data) || data.length < 1) {
                        return;
                    }

                    this.setRealgridData(data);
                } catch(e) {
                    console.log("loadCuriosGridData error", e);
                }
            },

            async deleteCurios(data) {
                const me = this;
                me.confirmDelete(function() {
                    me.$httpPost({
                        param: {
                            SEQ_NO: data.SEQ_NO.value
                        },
                        url: '/bizinc/ext-income/deleteCurioTransItem',
                        callback: function() {
                            me.toastSuccessDelete();
                            me.loadCuriosGridData();
                            me.$emit('loadGridData');
                        }
                    })
                });
            },

            asyncDynamicComponentData(_param = {}) {
                this.setFormData(_param);
                this.loadCuriosGridData();
            },

            async loadWorkCodeItems() {
                try {
                    const me = this;
                    const {data} = await this.$httpGet( '/system/setting/mastcode/list-all', {SUPER_CODE: 'C8', INACTIVE: 'N'});
                    if(! data) {
                        return;
                    }

                    data.forEach((d) => {
                        me.code.WORK_CODE.values.push(d.REAL_CODE);
                        me.code.WORK_CODE.labels.push(d.CODE_NAME)
                    });
                }catch(e) {
                    console.log(e)
                }
            },

            async loadBuyerTypeItems() {
                try {
                    const me = this;
                    const {data} = await this.$httpGet( '/system/setting/mastcode/list-all', {SUPER_CODE: 'C9', INACTIVE: 'N'});
                    if(! data) {
                        return;
                    }

                    data.forEach((d) => {
                        me.code.BUYER_TYPE.values.push(d.REAL_CODE);
                        me.code.BUYER_TYPE.labels.push(d.CODE_NAME)
                    });
                }catch(e) {
                    console.log(e)
                }
            },

            async loadCodeData() {
                await this.loadWorkCodeItems();
                await this.loadBuyerTypeItems();
            },

            setFormData: function(param) {
                this.resetFormData();

                this.formData.SELLER_NAME.value = param.EARNER_NAME;
                this.formData.SELLER_RRN.value = param.EARNER_RRN;
                this.formData.EXTRA_ATT_YEAR.value = param.EXTRA_ATT_YEAR;
                this.formData.EXTRA_SEQ_NO.value = param.EXTRA_SEQ_NO;
                this.formData.PAY_DATE.value = param.PAY_DATE;
            },

            createDynamicComponent() {
                this.createRealGrid({
                    'domId': 'curios-grid',
                    editable: true,
                    useNormalDelete: true,
                });
            },

            resetFormData: function() {
                Object.assign(this.formData, this.$options.data().formData);
            },

            async doSave() {
                const me = this;
                const params = this.getSaveParams();
                if(! this.isValidSaveData(params)) {
                    return;
                }

                this.$httpPost({
                    url: '/bizinc/ext-income/saveCurioTransItem',
                    param: params,
                    callback: function() {
                        me.toastSuccessSave();
                        me.loadCuriosGridData();
                    }
                })
            },

            isValidSaveData: function(params) {
                let list = JSON.parse(params.DATA_LIST);
                if(! list || list.length === 0) {
                    this.toast({message: '변경된 데이터가 없습니다.', type:"error"});
                    return false;
                }

                const me = this;
                let valid = true;
                list.forEach((data) => {
                    if( ! valid) {
                        return false;
                    }
                    me.requireDataList.forEach((requireInfo) => {
                        if(me.payrollUtil.isEmpty(data[requireInfo.code])) {
                            me.toast({message: requireInfo.msg, type:'error'});
                            valid = false;
                            return false;
                        }
                    });

                });
                return valid;
            },

            addRealGridOption: function() {
                this.dataProvider.setOptions({
                    softDeleting: false,
                    deleteCreated: true
                });
            },

            getSaveParams: function() {
                const me = this;
                let params = {};
                let keys = Object.keys(this.formData);
                keys.forEach((key) => {
                    params[key] = me.formData[key].value;
                });

                let list = this.dataProvider.getJsonRows(0, -1) || [];
                params.DATA_LIST = JSON.stringify(list);
                return params;
            }
        }
    }
</script>