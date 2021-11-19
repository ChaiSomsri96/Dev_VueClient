<template>
<base-modal title="지방소득세세" id="wtr-input-modal" :scroll="false" width="1300">
    <template v-slot:body>
        <div class="form-area">
            <div class="row" style="height: 400px;">
                <div id="local-tax-report-modal-grid" style="width: 100%; height: 400px" class="realgrid-type-style"></div>
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
import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';
import BaseModal from '@/components/common/BaseModal';
export default {
    mixins: [modal, grid],
    components: {
        BaseModal,
    },
    data() {
        return {
            formData: {
                PAY_DATE: {
                    value: ''
                },
                PAY_DATE_SE: {
                    value: ''
                }
            },
            fields: [
                {fieldName: 'PERSON_COMP', dataType: 'text'},
                {fieldName: 'PERSON_COMP_CODE', dataType: 'text'},
                {fieldName: 'DV_RN_C', dataType: 'text'},
                {fieldName: 'DV_VATNM', dataType: 'text'},
                {fieldName: 'DV_VATID_C', dataType: 'text'},
                {fieldName: 'FILE_UNITNAME', dataType: 'text'},
                {fieldName: 'DV_TEL', dataType: 'text'},
                {fieldName: 'SINGO_SIDO', dataType: 'text'},
                {fieldName: 'SIGUNGU', dataType: 'text'},
                {fieldName: 'SINGO_DONG', dataType: 'text'},
                {fieldName: 'SINGO_SIDO_CODE', dataType: 'text'},
                {fieldName: 'SINGO_SIGUNGU_CODE', dataType: 'text'},
                {fieldName: 'DV_ZIP', dataType: 'text'},
                {fieldName: 'DV_ADDR', dataType: 'text'},
                {fieldName: 'DEC_TYPE', dataType: 'text'},
                {fieldName: 'DEC_TYPE_CODE', dataType: 'text'},
                {fieldName: 'PAY_DATE', dataType: 'text'},
                {fieldName: 'PAY_PER', dataType: 'text'},
                {fieldName: 'NUMCNT1', dataType: 'number'},
                {fieldName: 'INCOME_TAX1', dataType: 'number'},
                {fieldName: 'RESID_TAX1', dataType: 'number'},
                {fieldName: 'NUMCNT2', dataType: 'number'},
                {fieldName: 'INCOME_TAX2', dataType: 'number'},
                {fieldName: 'RESID_TAX2', dataType: 'number'},
                {fieldName: 'NUMCNT3', dataType: 'number'},
                {fieldName: 'INCOME_TAX3', dataType: 'number'},
                {fieldName: 'RESID_TAX3', dataType: 'number'},
                {fieldName: 'NUMCNT4', dataType: 'number'},
                {fieldName: 'INCOME_TAX4', dataType: 'number'},
                {fieldName: 'RESID_TAX4', dataType: 'number'},
                {fieldName: 'NUMCNT5', dataType: 'number'},
                {fieldName: 'INCOME_TAX5', dataType: 'number'},
                {fieldName: 'RESID_TAX5', dataType: 'number'},
                {fieldName: 'NUMCNT5B', dataType: 'number'},
                {fieldName: 'INCOME_TAX5B', dataType: 'number'},
                {fieldName: 'RESID_TAX5B', dataType: 'number'},
                {fieldName: 'NUMCNT6', dataType: 'number'},
                {fieldName: 'INCOME_TAX6', dataType: 'number'},
                {fieldName: 'RESID_TAX6', dataType: 'number'},
                {fieldName: 'NUMCNT6B', dataType: 'number'},
                {fieldName: 'INCOME_TAX6B', dataType: 'number'},
                {fieldName: 'RESID_TAX6B', dataType: 'number'},
                {fieldName: 'NUMCNT6C', dataType: 'number'},
                {fieldName: 'INCOME_TAX6C', dataType: 'number'},
                {fieldName: 'RESID_TAX6C', dataType: 'number'},
                {fieldName: 'NUMCNT7', dataType: 'number'},
                {fieldName: 'INCOME_TAX7', dataType: 'number'},
                {fieldName: 'RESID_TAX7', dataType: 'number'},
                {fieldName: 'NUMCNT8', dataType: 'number'},
                {fieldName: 'INCOME_TAX8', dataType: 'number'},
                {fieldName: 'RESID_TAX8', dataType: 'number'},
                {fieldName: 'NUMCNT8B', dataType: 'number'},
                {fieldName: 'INCOME_TAX8B', dataType: 'number'},
                {fieldName: 'RESID_TAX8B', dataType: 'number'},
                {fieldName: 'NUMCNT9', dataType: 'number'},
                {fieldName: 'INCOME_TAX9', dataType: 'number'},
                {fieldName: 'RESID_TAX9', dataType: 'number'},
                {fieldName: 'NUMCNT10', dataType: 'number'},
                {fieldName: 'INCOME_TAX10', dataType: 'number'},
                {fieldName: 'RESID_TAX10', dataType: 'number'},
                {fieldName: 'SELF_PAYMENT_DUEDATE', dataType: 'number'}
            ],
            columns: [
                {fieldName: 'PERSON_COMP', header: '개인/법인 구분'},
                {fieldName: 'PERSON_COMP_CODE', header: '개인/법인 구분코드'},
                {fieldName: 'DV_RN_C', header: '주민/법인번호'},
                {fieldName: 'DV_VATNM', header: '성명/법인명'},
                {fieldName: 'DV_VATID_C', header: '사업자등록번호'},
                {fieldName: 'FILE_UNITNAME', header: '상호/대표자'},
                {fieldName: 'DV_TEL', header: '전화번호'},
                {fieldName: 'SINGO_SIDO', header: '신고관할지 시도명'},
                {fieldName: 'SIGUNGU', header: '신고관할지 시군구명'},
                {fieldName: 'SINGO_DONG', header: '신고관할지 법정동명'},
                {fieldName: 'SINGO_SIDO_CODE', header: '신고관할지 시도코드'},
                {fieldName: 'SINGO_SIGUNGU_CODE', header: '신고관할지 시군구코드'},
                {fieldName: 'DV_ZIP', header: '우편번호'},
                {fieldName: 'DV_ADDR', header: '사업장주소'},
                {fieldName: 'DEC_TYPE', header: '신고구분(월,반기)'},
                {fieldName: 'DEC_TYPE_CODE', header: '신고구분코드(월,반기)'},
                {fieldName: 'PAY_DATE', header: '급여지급일'},
                {fieldName: 'PAY_PER', header: '귀속년월'},
                // 이자소득
                {fieldName: 'NUMCNT1', header: '인원(명)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'INCOME_TAX1', header: '과세표준(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'RESID_TAX1', header: '특별징수세액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                // 배당소득
                {fieldName: 'NUMCNT2', header: '인원(명)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'INCOME_TAX2', header: '과세표준(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'RESID_TAX2', header: '특별징수세액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                // 자유직업소득
                {fieldName: 'NUMCNT3', header: '인원(명)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'INCOME_TAX3', header: '과세표준(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'RESID_TAX3', header: '특별징수세액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                // 갑종근로소득
                {fieldName: 'NUMCNT4', header: '인원(명)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'INCOME_TAX4', header: '과세표준(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'RESID_TAX4', header: '특별징수세액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                // 기타소득
                {fieldName: 'NUMCNT5', header: '인원(명)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'INCOME_TAX5', header: '과세표준(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'RESID_TAX5', header: '특별징수세액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                // 연금소득
                {fieldName: 'NUMCNT5B', header: '인원(명)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'INCOME_TAX5B', header: '과세표준(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'RESID_TAX5B', header: '특별징수세액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                // 갑종퇴직소득
                {fieldName: 'NUMCNT6', header: '인원(명)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'INCOME_TAX6', header: '과세표준(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'RESID_TAX6', header: '특별징수세액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                // 소득세법 제119조 양도소득
                {fieldName: 'NUMCNT6B', header: '인원(명)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'INCOME_TAX6B', header: '과세표준(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'RESID_TAX6B', header: '특별징수세액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                // 저축해지 추징세액등
                {fieldName: 'NUMCNT6C', header: '인원(명)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'INCOME_TAX6C', header: '과세표준(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'RESID_TAX6C', header: '특별징수세액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                // 내국법인(법인세법 제73조)
                {fieldName: 'NUMCNT7', header: '인원(명)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'INCOME_TAX7', header: '과세표준(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'RESID_TAX7', header: '특별징수세액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                // 법인세법 제 98조 규정
                {fieldName: 'NUMCNT8', header: '인원(명)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'INCOME_TAX8', header: '과세표준(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'RESID_TAX8', header: '특별징수세액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                // 외국인으로부터 받은 소득
                {fieldName: 'NUMCNT8B', header: '인원(명)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'INCOME_TAX8B', header: '과세표준(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'RESID_TAX8B', header: '특별징수세액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                // 환급액
                {fieldName: 'NUMCNT9', header: '당월기타환급액(명)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'INCOME_TAX9', header: '연말정산환급액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'RESID_TAX9', header: '중도퇴사자환급액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                // 추가납부액
                {fieldName: 'NUMCNT10', header: '당월추가납부액(명)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'INCOME_TAX10', header: '연말정산추가납부액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'RESID_TAX10', header: '가산세대상추가납부액(원)', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                    footer: { header: "0", expression: "sum", numberFormat: "#,##0", }
                },
                {fieldName: 'SELF_PAYMENT_DUEDATE', header: '자진납부기한'},
            ],
            layout: [
                'PERSON_COMP', 'PERSON_COMP_CODE', 'DV_RN_C', 'DV_VATNM', 'DV_VATID_C', 'FILE_UNITNAME', 'DV_TEL',
                'SINGO_SIDO', 'SIGUNGU', 'SINGO_DONG', 'SINGO_SIDO_CODE', 'SINGO_SIGUNGU_CODE', 'DV_ZIP',
                'DV_ADDR', 'DEC_TYPE', 'DEC_TYPE_CODE', 'PAY_DATE', 'PAY_PER',
                {
                    name: 'group1',direction: 'horizontal', header: {text: '11.이자소득'},
                    items: ['NUMCNT1', 'INCOME_TAX1', 'RESID_TAX1']
                },
                {
                    name: 'group2',direction: 'horizontal', header: {text: '12.배당소득'},
                    items: ['NUMCNT2', 'INCOME_TAX2', 'RESID_TAX2']
                },
                {
                    name: 'group3',direction: 'horizontal', header: {text: '13.자유직업소득(사업소득)'},
                    items: ['NUMCNT3', 'INCOME_TAX3', 'RESID_TAX3']
                },
                {
                    name: 'group4',direction: 'horizontal', header: {text: '14.갑종근로소득'},
                    items: ['NUMCNT4', 'INCOME_TAX4', 'RESID_TAX4']
                },
                {
                    name: 'group5',direction: 'horizontal', header: {text: '16.기타소득'},
                    items: ['NUMCNT5', 'INCOME_TAX5', 'RESID_TAX5']
                },
                {
                    name: 'group5b',direction: 'horizontal', header: {text: '17.연금소득'},
                    items: ['NUMCNT5B', 'INCOME_TAX5B', 'RESID_TAX5B']
                },
                {
                    name: 'group6',direction: 'horizontal', header: {text: '21.갑종퇴직소득'},
                    items: ['NUMCNT6', 'INCOME_TAX6', 'RESID_TAX6']
                },
                {
                    name: 'group6b',direction: 'horizontal', header: {text: '22.소득세법 제119조 양도소득'},
                    items: ['NUMCNT6B', 'INCOME_TAX6B', 'RESID_TAX6B']
                },
                {
                    name: 'group6C',direction: 'horizontal', header: {text: '32.저축해지 추징세액등'},
                    items: ['NUMCNT6C', 'INCOME_TAX6C', 'RESID_TAX6C']
                },
                {
                    name: 'group7',direction: 'horizontal', header: {text: '33.내국법인(법인세법 제73조)'},
                    items: ['NUMCNT7', 'INCOME_TAX7', 'RESID_TAX7']
                },
                {
                    name: 'group8',direction: 'horizontal', header: {text: '31.법인세법 제 98조 규정'},
                    items: ['NUMCNT8', 'INCOME_TAX8', 'RESID_TAX8']
                },
                {
                    name: 'group8b',direction: 'horizontal', header: {text: '91.외국인으로부터 받은 소득'},
                    items: ['NUMCNT8B', 'INCOME_TAX8B', 'RESID_TAX8B']
                },
                {
                    name: 'group9',direction: 'horizontal', header: {text: '환급액'},
                    items: ['NUMCNT9', 'INCOME_TAX9', 'RESID_TAX9']
                },
                {
                    name: 'group10',direction: 'horizontal', header: {text: '추가납부액'},
                    items: ['NUMCNT10', 'INCOME_TAX10', 'RESID_TAX10']
                },
                'SELF_PAYMENT_DUEDATE'
            ]
        }
    },
    methods: {
        async loadGridData() {
            try {
                const {data} = await this.$httpPost({
                    url: '/payroll/withhold/pay-localtax/list',
                    param: this.getParams()
                });
                this.setRealgridData(data || []);
            } catch(e) {
                console.log(e);
            }
        },

        getParams: function() {
            let params = {};
            let keys = Object.keys(this.formData);
            keys.forEach((key) => {
                params[key] = this.formData[key].value;
            });

            return params;
        },

        resetFormData: function() {
            let keys = Object.keys(this.formData);
            keys.forEach((key) => {
                this.formData[key].value = this.$options.data().formData[key].value;
            });
        },

        setFormData: function(data) {
            const me = this;
            let targetFieldName = ['PAY_DATE', 'PAY_DATE_SE'];
            let sourceFieldName = ['PAYDAY_START', 'PAYDAY_END'];

            targetFieldName.forEach((fdNm, idx) => {
                me.formData[fdNm].value = data[sourceFieldName[idx]];
            });
        },

        //modal
        createDynamicComponent() {
            this.createRealGrid({ 'domId': 'local-tax-report-modal-grid'});
        },

        asyncDynamicComponentData(param) {
            this.resetFormData();

            this.setFormData(param);

            this.loadGridData();
        },
    }
}
</script>