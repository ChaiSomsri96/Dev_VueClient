import request from '@/utils/request'
import qs from 'qs';

export function getPayCodeList() {
    return request({
      url: '/payroll/code/pay-pay/list',
      method: 'get'
    })
}

/*
페이지 공통 - 오픈된 급여일 가져오기
[페이지 로딩시 급여월,차수,급여일]
*/
export function getOpenPayDate() {
    return request({
        url: '/payroll/code/open-pay-date/list',
        method: 'get'
    })
}

/*
페이지 공통 - 급여입력 대상사원 목록 조회
[페이지로딩시 하단의 grid 부분]
*/
export function getMonthSeqList(payMonth, seq, payGaap = 1, empNumber = '', empNam = '', empCd = '') {
    return request({
        url: '/payroll/salarymanual/emp_entry/month-seq-list',
        method: 'get',
        params: {
            PAY_MONTH: payMonth,
            SEQ: seq,
            PAY_GAAP: payGaap,
            EMP_NUMBER: empNumber,
            EMP_NAM: empNam,
            EMP_CD: empCd
        }
    })
}
/*
급여입력 - 사원한명의 급여내역 가져오기
[급여입력 버튼 클릭 후 popup창)
*/
export function getPayEntryEmp(payMonth = '202105', seq = 1, payGaap = 1, empNumber = '110123', empCd = 3291, empNam='기사모') {
    return request({
        url: '/payroll/salarymanual/pay-entryemp/list',
        method: 'get',
        params: {
            PAY_MONTH: payMonth,
            SEQ: seq,
            PAY_GAAP: payGaap,
            EMP_NUMBER: empNumber,
            EMP_CD: empCd,
            EMP_NAM: empNam
        }
    })
}
/*
급여생성-급여항목조회
[ 급여계산 별도창에서 급여항목 체크리스트]
list_activive_with_virtual
*/
export function getActiviveWithVirtualList() {
    return request({
        url: '/payroll/code/pay-pay/list_activive_with_virtual',
        method: 'get'
    })
}
/*
급여생성-사원,급여항목 선택후 생성 미리보기
[ 급여계산 별도창에서 미리보기 버튼 클릭]
*/
//   /payroll/salarycalc/integrate-paygen/list
export function getIntegratePaygenList() {
    let data = {
        'formData': '{"PAY_MONTH":"202105","SEQ":"1","PAY_GAAP":"1","EMPTYPE_CD":null,"PAYTYPE_CD":null,"JOBGROUP_CD":null,"MODIFY_TYPE":null,"EMP_SEL":"SELECT"}',
        'paycdList': '[{"PAY_CODE":"1000"},{"PAY_CODE":"1005"}]',
        'paymonthseqList': '[]',
        'eidList': '[{"EID":3280},{"EID":3267},{"EID":3277},{"EID":3283}]'
    };

/*
    data['formData'] = '{"PAY_MONTH":"202105","SEQ":"1","PAY_GAAP":"1","EMPTYPE_CD":null,"PAYTYPE_CD":null,"JOBGROUP_CD":null,"MODIFY_TYPE":null,"EMP_SEL":"SELECT"}';
    data['paycdList'] = '[{"PAY_CODE":"1000"},{"PAY_CODE":"1005"}]';
    data['paymonthseqList'] = '[]';
    data['eidList'] = '[{"EID":3280},{"EID":3267},{"EID":3277},{"EID":3283}]'; */

    return request({
        url: '/payroll/salarycalc/integrate-paygen/list',
        method: 'post',
        data: qs.stringify(data)
    });
}