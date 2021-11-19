<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'급여일 관리'"/>
        <!-- //Header 영역 -->

        <!-- Body 영역 -->
        <div class="content-body">
            <h2 class="title-wrap">급여일 입력</h2>
            <div class="form-wrap">
                <div class="form-group row">
                    <LabeledInput :title="'급여월'" class="col-6 p-0">
                        <ui-input :value="payday.PAY_MONTH" @change="payday.PAY_MONTH=$event; payday.return=$event;"/>
                    </LabeledInput>
                    <LabeledInput :title="'급여차수'" class="col-6 p-0">
                        <ui-input :value="payday.SEQ" @change="payday.SEQ=$event; "/>
                    </LabeledInput>
                    <LabeledInput :title="'급여일'" class="col-6 p-0">
                        <ui-input-date :value="payday.PAY_DATE" @change="payday.PAY_DATE=$event; "/>
                    </LabeledInput>
                    <LabeledInput :title="'메모'" class="col-6 p-0">
                        <ui-input :value="payday.PAYDAY_MEMO1" @change="payday.PAYDAY_MEMO1=$event; "/>
                    </LabeledInput>
                    <LabeledInput :title="'시작/종료일'" class="col-6 p-0">
                        <div class="colwrap">
                            <div class="colwrap-item bradius-all">
                                <ui-input-date :date="payday.START_DATE"
                                               :max-date="payday.END_DATE"
                                               :options="{addInputClass: 'essential'}"
                                               :value="payday.START_DATE"
                                               @change="payday.START_DATE=$event; "/>
                            </div>
                            <div class="colwrap-item">
                                <span>~</span>
                            </div>
                            <div class="colwrap-item bradius-all">
                                <ui-input-date :date="payday.END_DATE"
                                               :min-date="payday.START_DATE"
                                               :options="{addInputClass: 'essential'}"
                                               :value="payday.END_DATE"
                                               @change="payday.END_DATE=$event; "/>
                            </div>
                        </div>
                    </LabeledInput>
                    <LabeledInput :title="'상태'" class="col-6 p-0">
                        <ui-input :value="payday.CLOSE_FLAG"  @change="payday.CLOSE_FLAG=$event; "/>
                    </LabeledInput>
                    <button type="button" class="btn btn-lg ml-5" data-dismiss="modal" @click="save()">저장</button>
                    <button type="button" class="btn btn-lg ml-5" data-dismiss="modal" @click="search()">조회</button>
                </div>
                <table class="table table-hover table-striped table-bordered" >
                    <thead style="background-color: #0a6aa1;color:white;">
                    <tr>
                        <th scope="col">급여일자</th>
                        <th scope="col">급여월</th>
                        <th scope="col">차수</th>
                        <th scope="col">메모</th>
                        <th scope="col">상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="paydate in gridData" :key="paydate.PAYDAY">
                        <td scope="col">{{paydate.PAY_DATE}}</td>
                        <td scope="col">{{paydate.PAY_MONTH}}</td>
                        <td scope="col">{{paydate.PAY_MONTH_SEQ}}</td>
                        <td scope="col">{{paydate.PAYDAY_MEMO1}}</td>
                        <td scope="col">{{paydate.CLOSE_FLAG_DESC}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- //Body 영역 -->
    </div>
</template>

<script>
    import {getSetting,saveSetting} from '@/api/setting';
    import UiInput from "workplace-vue-common-ui";
    import LabeledInput from "@/components/common/LabeledInput";

    export default {
        components: {
            //DefaultUsage,
            LabeledInput,
            // RealGrid
        },
        data() {
            return {
                gridData: {},
                dataProvider: null,
                payday: {
                    PAY_MONTH: '202105',
                    SEQ: 1
                }
            }
        },
        mounted: function () {
            this.search();
            let thisData = this.$data;
            thisData.cateItems =
                [{'name': '전체', 'value': '', 'checked': 'Y'}
                    , {'name': '기본', 'value': 'BASIC', 'checked': 'N'}
                ];
        },
        methods: {
            async save(){
                const $this = this;
                let saveParam = $this.payday; // 저장할 데이터
                await saveSetting( saveParam);
                $this.search();
            },
            /**
             * 조회
             */
            async search() {
                const $this = this;

                try {
                    const {data} = await getSetting(); // api 호출
                    $this.gridData = data && data.list || [];

                } catch (e) {
                    console.error(e);
//
//                    common_popup.toast({
//                        type   : "error",
//                        message: jsmp.getOrDefault("js.bcs.alert.error", "오류가 발생했습니다. 잠시후 다시 시도하십시오.")
//                    });
                }
            },
            addMessage(msg) {
                this.messages.push(`${msg}`);
            },
            // 행 추가 이벤트 처리
            onRowInserted(provider, row) {
                const values = provider.getRows(row);
                this.addMessage(`[EVENT] onRowInserted <${values}>`);
            },
            // 셀 클릭 이벤트 처리
            onDataCellClicked(grid, index) {
                this.addMessage(`[EVENT] onDataCellClicked <${JSON.stringify(index)}>`)
            },
            // 그리드가 마운트 될때 매핑
            gridRendered(provider, view) {
                // RealGrid.setRootContext("/");
                this.dataProvider = provider;
                this.gridView = view;
                // 이벤트 처리
                this.dataProvider.onRowInserted = this.onRowInserted;
                this.gridView.onDataCellClicked = this.onDataCellClicked;
            },
            setFields() {
                const fields = [
                    {
                        fieldName: "field1"
                    },
                    {
                        fieldName: "field2"
                    }
                ];
                this.dataProvider.setFields(fields);
            },
            setColumns() {
                const columns = [
                    {
                        name: "col1",
                        fieldName: "field1",
                        header : {
                            text: "컬럼1"
                        },
                        width: 200
                    },
                    {
                        name: "col2",
                        fieldName: "field2",
                        header : {
                            text: "컬럼2"
                        },
                        width: 200
                    }
                ];
                this.gridView.setColumns(columns);
            },
            addRow() {
                const rowCount = this.dataProvider.getRowCount();
                this.dataProvider.addRow({
                    field1: `Field1 Value:${rowCount}`,
                    field2: `Field2 Value:${rowCount}`,
                });
            },
            /**
             * 저장
             */
            save2() {
//                const $this = this;
//
//                let saveParam = $this.setting; // 저장할 데이터

//                common_popup.confirm({
//                    message    : jsmp.getOrDefault("js.bcs.confirm.save", "저장하시겠습니까?"),
//                    yesCallback: async function () {
//                        try {
//                            const response = await saveSetting(saveParam);
//
//                            common_popup.toast({
//                                type             : "success",
//                                message          : jsmp.getOrDefault("js.bcs.alert.success.save", "정상적으로 저장되었습니다."),
//                                callbackDelayMsec: 0,
//                                callback         : function () {
//                                    //$this.$mount(); // re-mount
//                                    //$this.search();
//                                    location.reload(); // SNB 변경이 일어나기 때문에 페이지 리로드 처리
//                                }
//                            });
//
//                        } catch (e) {
//                            console.error(e);
//
//                            common_popup.toast({
//                                type   : "error",
//                                message: jsmp.getOrDefault("js.bcs.alert.error.save", "저장을 실패했습니다. 잠시후 다시 시도하십시오.")
//                            });
//                        }
//                    }
//                });
            },
            /**
             * 취소
             */
            cancel() {
//                const $this = this;

//                common_popup.confirm({
//                    message    : jsmp.getOrDefault("js.bcs.confirm.cancel", "취소하시겠습니까?"),
//                    yesCallback: function () {
//                        //$this.$mount(); // re-mount
//                        $this.search();
//                    }
//                });
            },
        }
    }
</script>