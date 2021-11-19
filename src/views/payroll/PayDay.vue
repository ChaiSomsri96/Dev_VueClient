<template>
    <div>
        <ui-header :msg="'급여일 오픈'"/>
        <div class="content-body">
            <div>
                <div class="box border-box type2">
                    <div class="box-body row">
                        <button class="btn btn-md line-1 ml-10" @click="loadData">Load Grid Data</button>
                    </div>
                </div>
                <div id="realgrid-paydate" class="realgrid-type-style" style="width:100%; height: 500px"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getPaydates} from '@/api/setting';
    import {GridView, LocalDataProvider, ValueType } from 'realgrid';

    let gridView = GridView;
    let dataProvider = LocalDataProvider;
    const columns= [
        { fieldName: 'PAY_DATE', header: '급여일', width: 130 },
        { fieldName: 'PAY_MONTH', header: '급여월', width: 140 },
        { fieldName: 'PAY_MONTH_SEQ', header: '급여월차수', width: 140 },
        { fieldName: 'START_DATE', header: '시작일', width: 140 },
        { fieldName: 'CLOSE_FLAG_DESC', header: '마감상태', width: 140 },
    ];

    const fields= [
        { fieldName: 'PAY_DATE', dataType: ValueType.TEXT },
        { fieldName: 'PAY_MONTH', dataType: ValueType.TEXT },
        { fieldName: 'PAY_MONTH_SEQ', dataType: ValueType.TEXT },
        { fieldName: 'START_DATE', dataType: ValueType.TEXT },
        { fieldName: 'CLOSE_FLAG_DESC', dataType: ValueType.TEXT },
    ];

    export default {
        data: function () {
            return {

            }
        },
        methods: {
            async loadData() {
                const $this = this;
                try {
                    const {data} = await getPaydates(); // api 호출
                    console.log( data);
                    $this.gridData = (data && data.list) || [];
                    dataProvider.setRows($this.gridData);
                } catch (e) {
                    console.error(e);
                }
            }
        },
        mounted() {
            dataProvider = new LocalDataProvider(false);
            gridView = new GridView("realgrid-paydate");
            gridView.setDataSource(dataProvider);
            dataProvider.setFields(fields);
            gridView.setColumns(columns);
        }
    }
</script>