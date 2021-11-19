<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'사원조회'"/>
        <!-- //Header 영역 -->

        <!-- Body 영역 -->
        <div class="content-body">
            <h2 class="title-wrap">사원조회</h2>
            <div class="form-wrap">
                <div class="form-group row">
                    <button type="button" class="btn btn-lg ml-5" data-dismiss="modal" @click="search()">조회</button>
                    <button type="button" class="btn btn-lg ml-5" data-dismiss="modal" @click="save()">저장</button>
                </div>
                <table class="table table-hover table-striped table-bordered" >
                    <thead style="background-color: #0a6aa1;color:white;">
                    <tr>
                        <th scope="col">사원키</th>
                        <th scope="col">로그인id</th>
                        <th scope="col">부서코드</th>
                        <th scope="col">부서명</th>
                        <th scope="col">사번</th>
                        <th scope="col">이름</th>
                        <th scope="col">입사일</th>

                        <th scope="col">부양가족수</th>
                        <th scope="col">건강보험<br>월보수액</th>
                        <th scope="col">고용보험<br>월보수액</th>
                        <th scope="col">국민연금<br>월보수액</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="emp in gridData" :key="emp.empId">
                        <td scope="col">{{emp.empId}}</td>
                        <td scope="col">{{emp.loginId}}</td>
                        <td scope="col">{{emp.deptNo}}</td>
                        <td scope="col">{{emp.deptName}}</td>
                        <td scope="col">{{emp.empNo}}</td>
                        <td scope="col">{{emp.empName}}</td>
                        <td scope="col">{{emp.etrocYmd}}</td>

                        <td scope="col">{{emp.DEDUCT_FAMILY}}</td>
                        <td scope="col">{{emp.MDMON_REGUL}}</td>
                        <td scope="col">{{emp.EIMON_REGUL}}</td>
                        <td scope="col">{{emp.NPMON_REGUL}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- //Body 영역 -->
    </div>
</template>

<script>
    import {getEmpList,saveEmp} from '@/api/setting';

    export default {
        data() {
            return {
                gridData: {}
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
            async search() {
                const $this = this;
                try {
                    const {data} = await getEmpList(); // api 호출
                    $this.gridData = data || [];
                } catch (e) {
                    console.error(e);
                }
            },
            async save(){
                const $this = this;
                let saveParam = $this.gridData[3]; // 저장할 데이터
                saveParam.DEDUCT_FAMILY = 3;
                saveParam.MDMON_REGUL = 5000000;
                saveEmp( saveParam);
            },
        }
    }
</script>