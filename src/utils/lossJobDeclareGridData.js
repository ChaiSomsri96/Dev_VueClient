const gridData = {
    'common': {
        "fields": [
            {fieldName: 'SI_DEREGIST_MATTER_NO', dataType: 'text'},
            {fieldName: 'EID', dataType: 'text'},
            {fieldName: 'EMP_NUMBER', dataType: 'text'},
            {fieldName: 'EMP_NAME', dataType: 'text'},
            {fieldName: 'RRN_ENCRYPT', dataType: 'text'},
            {fieldName: 'RETIRE_DATE', dataType: 'text'},
            {fieldName: 'SI_EMP_TEL_NO', dataType: 'text'},
            {fieldName: 'ACTION_UPDATE'},
        ],
        "columns": [
            {fieldName: 'EMP_NAME', header: '성명'},
            {fieldName: 'RRN_ENCRYPT', header: '주민등록번호'},
            {fieldName: 'RETIRE_DATE', header: '퇴사일'},
            {fieldName: 'SI_EMP_TEL_NO', header: '전화번호'}
        ],
        'url': '/payroll/insurance/deregist/common-inf/in-list',
        'modal': 'lossJobCommonInputModal'
    },
    'annual_pension': {
        "fields": [
            {fieldName: 'SI_DEREGIST_MATTER_NO', dataType: 'text'},
            {fieldName: 'PEN_SELECT_FL', dataType: 'text'},
            {fieldName: 'EID', dataType: 'text'},
            {fieldName: 'EMP_NUMBER', dataType: 'text'},
            {fieldName: 'EMP_NAME', dataType: 'text'},
            {fieldName: 'PEN_DEREGIST_DATE', dataType: 'text'},
            {fieldName: 'PEN_DEREGIST_CODE', dataType: 'text'},
            {fieldName: 'PEN_DEREGIST_PAY_FL', dataType: 'text'},
            {fieldName: 'ACTION_UPDATE'},
        ],
        "columns": [
            {fieldName: 'PEN_SELECT_FL', header: '신고여부'},
            {fieldName: 'EMP_NAME', header: '성명'},    
            {fieldName: 'PEN_DEREGIST_DATE', header: '상실일'},
            {fieldName: 'PEN_DEREGIST_CODE', header: '상실부호'},
            {fieldName: 'PEN_DEREGIST_PAY_FL', header: '초일취득, 당일상실자납부여부'},
        ],
        'url': '/payroll/insurance/deregist/pension/list',
        'modal': 'lossJobAnnualInputModal'
    },
    'health': {
        "fields": [
            {fieldName: 'SI_DEREGIST_MATTER_NO', dataType: 'text'},
            {fieldName: 'MED_SELECT_FL', dataType: 'text'},
            {fieldName: 'EID', dataType: 'text'},
            {fieldName: 'EMP_NUMBER', dataType: 'text'},
            {fieldName: 'EMP_NAME', dataType: 'text'},
            {fieldName: 'MED_DEREGIST_DATE', dataType: 'text'},
            {fieldName: 'MED_DEREGIST_CODE', dataType: 'text'},
            {fieldName: 'MED_CURR_YR_INCOME', dataType: 'number'},
            {fieldName: 'MED_CURR_NO_MONTH', dataType: 'number'},
            {fieldName: 'MED_PREV_YR_INCOME', dataType: 'number'},
            {fieldName: 'MED_PREV_NO_MONTH', dataType: 'number'},
            {fieldName: 'MED_PREV_YR_SETT_TYPE', dataType: 'text'},
            {fieldName: 'MED_FINAL_AVE_INCOME', dataType: 'number'},
            {fieldName: 'ACTION_UPDATE'},
        ],
        "columns": [
            {fieldName: 'MED_SELECT_FL', header: '신고여부'},
            {fieldName: 'EMP_NAME', header: '성명'},    
            {fieldName: 'MED_DEREGIST_DATE', header: '상실일'},
            {fieldName: 'MED_DEREGIST_CODE', header: '상실부호'},
            {fieldName: 'MED_FINAL_AVE_INCOME', header: '퇴직전 3개월 평균보수', width: 110, numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                footer: {
                    header: "0",
                    expression: "sum",
                    numberFormat: "#,##0",
                }
            },
            {fieldName: 'MED_CURR_YR_INCOME', header: '당해년도 보수총액', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                footer: {
                    header: "0",
                    expression: "sum",
                    numberFormat: "#,##0",
                },
            },
            {fieldName: 'MED_CURR_NO_MONTH', header: '당해년도 산정월수'},
            {fieldName: 'MED_PREV_YR_SETT_TYPE', header: '전년도 정산구분'},
            {fieldName: 'MED_PREV_YR_INCOME', header: '전년도 보수총액', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                footer: {
                    header: "0",
                    expression: "sum",
                    numberFormat: "#,##0",
                },
            },
            {fieldName: 'MED_PREV_NO_MONTH', header: '전년도 산정월수'}
        ],
        'url': '/payroll/insurance/deregist/med/list',
        'modal': 'lossJobHealthInputModal'
    },
    'employment': {
        "fields": [
            {fieldName: 'SI_DEREGIST_MATTER_NO', dataType: 'text'},
            {fieldName: 'EID', dataType: 'text'},
            {fieldName: 'EMP_NUMBER', dataType: 'text'},
            {fieldName: 'EMP_NAME', dataType: 'text'},
            {fieldName: 'EMP_DEREGIST_DATE', dataType: 'text'},
            {fieldName: 'EMP_DEREGIST_CODE', dataType: 'text'},
            {fieldName: 'EMP_SELECT_FL', dataType: 'text'},
            {fieldName: 'EMP_CURR_YR_INCOME', dataType: 'number'},
            {fieldName: 'EMP_PREV_YR_INCOME', dataType: 'number'},
            {fieldName: 'EMP_DEREGIST_REASON', dataType: 'text'},

            {fieldName: 'ACTION_UPDATE'}
        ],
        "columns": [
            {fieldName: 'EMP_NAME', header: '성명'},    
            {fieldName: 'EMP_DEREGIST_DATE', header: '상실일'},
            {fieldName: 'EMP_DEREGIST_CODE', header: '상실사유'},
            {fieldName: 'EMP_SELECT_FL', header: '신고 선택여부'},
            {fieldName: 'EMP_CURR_YR_INCOME', header: '당해년도 보수총액', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                footer: {
                    header: "0",
                    expression: "sum",
                    numberFormat: "#,##0",
                }
            },
            {fieldName: 'EMP_PREV_YR_INCOME', header: '전년도 보수총액', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                footer: {
                    header: "0",
                    expression: "sum",
                    numberFormat: "#,##0",
                }
            },
            {fieldName: 'EMP_DEREGIST_REASON', header: '구체적 상실사유'}
        ],
        'url': '/payroll/insurance/deregist/emp/list',
        'modal': 'lossJobEmploymentInputModal'
    },
    'industrial_ash': {
        "fields": [
            {fieldName: 'SI_DEREGIST_MATTER_NO', dataType: 'text'},
            {fieldName: 'EID', dataType: 'text'},
            {fieldName: 'EMP_NUMBER', dataType: 'text'},
            {fieldName: 'EMP_NAME', dataType: 'text'},
            {fieldName: 'WC_DEREGIST_DATE', dataType: 'text'},
            {fieldName: 'WC_DEREGIST_CODE', dataType: 'text'},
            {fieldName: 'WC_SELECT_FL', dataType: 'text'},
            {fieldName: 'WC_CURR_YR_INCOME', dataType: 'number'},
            {fieldName: 'WC_PREV_YR_INCOME', dataType: 'number'},
            {fieldName: 'WC_DEREGIST_REASON', dataType: 'text'},
            {fieldName: 'ACTION_UPDATE'}
        ],
        "columns": [
            {fieldName: 'EMP_NAME', header: '성명'},
            {fieldName: 'WC_DEREGIST_DATE', header: '상실일'},
            {fieldName: 'WC_DEREGIST_CODE', header: '상실사유'},
            {fieldName: 'WC_SELECT_FL', header: '신고 선택여부'},
            {fieldName: 'WC_CURR_YR_INCOME', header: '당해년도 보수총액', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                footer: {
                    header: "0",
                    expression: "sum",
                    numberFormat: "#,##0",
                }
            },
            {fieldName: 'WC_PREV_YR_INCOME', header: '전년도 보수총액', numberFormat: "#,##0", styleName: "right-column", nanText: '0',
                footer: {
                    header: "0",
                    expression: "sum",
                    numberFormat: "#,##0",
                }
            },
            {fieldName: 'WC_DEREGIST_REASON', header: '구체적 상실사유'}
        ],
        'url': '/payroll/insurance/deregist/wc/list',
        'modal': 'lossJobIndustrialAshInputModal'
    },
}
export default gridData;