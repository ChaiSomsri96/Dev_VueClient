<template>
    <div>
        <div class="content-header">
            <div class="header-bottom">
                <div class="header-bottom-left">
                    <div class="menu-box">
                        <div class="menu-item title">
                            <div class="menu-item-icon">
                                <button type="button" class="btn btn-s menu-item-icon black"  @click="gotoList()">
                                    <i class="icon icon-lineIcon-line-arrow-left"><span class="blind">뒤로 가기</span></i>
                                </button>
                            </div>
                            <h1 class="menu-text" data-toggle="tooltip" data-placement="bottom_left" data-animation="false" data-original-title="">
                                직장가입자 상실신고 조회
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-body">
            <ul class="nav nav-tabs md">
                <li class="nav-item" @click="tabClick('common')">
                    <a href="#" data-toggle="tab" data-target="#common" class="active">공통</a>
                </li>
                <li class="nav-item" @click="tabClick('annual_pension')">
                    <a href="#" data-toggle="tab" data-target="#annual_pension">연금</a>
                </li>
                <li class="nav-item" @click="tabClick('health')">
                    <a href="#" data-toggle="tab" data-target="#health">건강</a>
                </li>
                <li class="nav-item" @click="tabClick('employment')">
                    <a href="#" data-toggle="tab" data-target="#employment">고용</a>
                </li>
                <li class="nav-item" @click="tabClick('industrial_ash')">
                    <a href="#" data-toggle="tab" data-target="#industrial_ash">산재</a>
                </li>
            </ul>
            <!--<div class="tab-content" id="myTabContent">
                <modal-common-tab />
                <modal-annual-tab />
                <modal-health-tab />
                <modal-employment-tab />
                <modal-industrial-tab />
            </div>-->
            <div class="row" style="height: 300px; margin-top: 20px;">
                <div id="declare-query-modal-grid" class="realgrid-type-style" style="width: 100%; height: 300px"></div>
            </div>
        </div>
        <loss-job-common-input-modal ref="lossJobCommonInputModal" @loadGridData="loadGridData"/>
        <loss-job-annual-input-modal ref="lossJobAnnualInputModal" @loadGridData="loadGridData"/>
        <loss-job-health-input-modal ref="lossJobHealthInputModal" @loadGridData="loadGridData"/>
        <loss-job-employment-input-modal ref="lossJobEmploymentInputModal" @loadGridData="loadGridData"/>
        <loss-job-industrial-ash-input-modal ref="lossJobIndustrialAshInputModal" @loadGridData="loadGridData"/>
    </div>
</template>
<script>
import grid from '@/mixin/payroll-grid';
import gridData from '@/utils/lossJobDeclareGridData';
import LossJobCommonInputModal from '@/components/payroll/social_insurance/modal/LossJobCommonInputModal';
import LossJobAnnualInputModal from '@/components/payroll/social_insurance/modal/LossJobAnnualInputModal';
import LossJobHealthInputModal from '@/components/payroll/social_insurance/modal/LossJobHealthInputModal';
import LossJobEmploymentInputModal from '@/components/payroll/social_insurance/modal/LossJobEmploymentInputModal';
import LossJobIndustrialAshInputModal from '@/components/payroll/social_insurance/modal/LossJobIndustrialAshInputModal';


export default {
    mixins: [grid],
    components: {
        LossJobCommonInputModal,
        LossJobAnnualInputModal,
        LossJobHealthInputModal,
        LossJobEmploymentInputModal,
        LossJobIndustrialAshInputModal
    },    
    data() {
        return {
            fields: [],
            columns: [],
            tab: 'common',
            SI_DEREGIST_MATTER_NO: ''
        }
    },
    methods: {
        tabClick(_tab) {
            this.tab = _tab;
            this.setRealGridOptions();
        },
        async loadGridData() {
            try {
                let { data } = await this.$httpGet(gridData[this.tab]['url'],
                {
                    SI_DEREGIST_MATTER_NO: this.SI_DEREGIST_MATTER_NO,
                    QRY_RRN: 'YES'
                });
                this.setRealgridData(data || []);
            }
            catch(e) {
                console.error("DeclareQueryModal loadGridData: ", e);
            }
        },

        gotoList() {
            this.$router.push({name: 'LossJob'});
        },

        setRealGridOptions: function() {
            this.fields = gridData[this.tab]['fields'];
            this.columns = gridData[this.tab]['columns'];
            if(this.columns[this.columns.length - 1].fieldName !== 'ACTION_UPDATE') {
                this.columns.push(this.getUpdateColumn({headerText: '수정', fieldName: 'ACTION_UPDATE'}));
            }

            this.SI_DEREGIST_MATTER_NO = this.$route.params.SI_DEREGIST_MATTER_NO || 'M001';

            this.setFieldsNColumns();
            this.loadGridData();
        },

        initGridHandler: function() {
            const me = this;
            this.gridView.onCellClicked = function(grid, clickData) {
                grid.commit();

                if(clickData.column === 'ACTION_UPDATE') {
                    me.openInputModal(me.dataProvider.getJsonRow(clickData.dataRow));
                }
            }
        },

        openInputModal: function(data) {
            this.$refs[gridData[this.tab]['modal']].show(data);
        }
    },

    mounted() {
        this.createGridFrame({
            'domId': 'declare-query-modal-grid',
        });

        this.setRealGridOptions();

        this.initGridHandler();
    }
}
</script>