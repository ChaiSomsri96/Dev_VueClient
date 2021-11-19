const familyRelationRenderer = function (value) {
    switch (value) {
        case '0':
            return '본인';
        case '1':
            return '1-소득자 직계존속';
        case '2':
            return '2-배우자 직계존속';
        case '3':
            return '3-배우자';
        case '4':
            return '4-직계비속(자녀,입양자)';
        case '5':
            return '5-직계비속(기타)';
        case '6':
            return '6-형제자매';
        case '7':
            return '7-수급자';
        case '8':
            return '8-위탁아동';
    }
    return value;
}
const gridData = {
    'REC2': { // 원천징수영수증-정산명세
        "fields": [
            {fieldName: 'EMP_NUMBER', dataType: 'text'},
            {fieldName: 'EMP_NAM', dataType: 'text'},
            {fieldName: 'TAX_CODE', dataType: 'text'},
            {fieldName: 'DISPLAY_ORDER', dataType: 'text'},
            {fieldName: 'TAXNAM', dataType: 'text'},
            {fieldName: 'AMOUNT', dataType: 'number'},
            {fieldName: 'HEAD_COUNT', dataType: 'number'},
            {fieldName: 'BASE_AMOUNT', dataType: 'number'},
            {fieldName: 'APPL_AMOUNT', dataType: 'number'},
        ],
        "columns": [
            // {fieldName: 'EMP_NUMBER', header: "사번"},
            {fieldName: 'EMP_NAM', header: "성명"},
            {fieldName: 'TAX_CODE', header: "코드"},
            {fieldName: 'DISPLAY_ORDER', header: "번호"},
            {fieldName: 'TAXNAM', header: "구분"},
            {
                fieldName: 'AMOUNT', header: "금액", numberFormat: "#,##0", styleName: "right-column",
                footer: {
                    header: "0",
                    expression: "sum",
                    numberFormat: "#,##0",
                }, nanText: '0'
            },
            {fieldName: 'HEAD_COUNT', header: "인원수", width: 75, nanText: '0'},
            {
                fieldName: 'BASE_AMOUNT', header: "공제대상액", numberFormat: "#,##0", styleName: "right-column",
                footer: {
                    header: "0",
                    expression: "sum",
                    numberFormat: "#,##0",
                }, nanText: '0'
            },
            {
                fieldName: 'APPL_AMOUNT', header: "신청액", numberFormat: "#,##0", styleName: "right-column",
                footer: {
                    header: "0",
                    expression: "sum",
                    numberFormat: "#,##0",
                }, nanText: '0'
            },
        ],
        groupByEmp:true
    },
    'FILE1': { // 소득공제신고서-기본사항
        "fields": [
            {fieldName: 'EMP_NUMBER', dataType: 'text'},
            {fieldName: 'EMP_NAM', dataType: 'text'},
            {fieldName: 'PERSON_RRN_FULL', dataType: 'text'},
            {fieldName: 'CLI_NAM', dataType: 'text'},
            {fieldName: 'DV_VATID', dataType: 'text'},
            {fieldName: 'HOUSE_HEAD', dataType: 'text'},
            {fieldName: 'NATION_CODE', dataType: 'text'},
            {fieldName: 'WORK_PERIOD', dataType: 'text'},
            {fieldName: 'EXEMPT_PERIOD', dataType: 'text'},
            {fieldName: 'RESID_STATUS', dataType: 'text'},
            {fieldName: 'RESID_CODE', dataType: 'text'},
            {fieldName: 'FAMILY_CHANGE', dataType: 'text'},
            {fieldName: 'ALLOT_APPL', dataType: 'text'},
            {fieldName: 'WHT_RATE', dataType: 'text'},
        ],
        "columns": [
            // {fieldName: 'EMP_NUMBER', header: "사번"},
            {fieldName: 'EMP_NAM', header: "성명"},
            {fieldName: 'PERSON_RRN_FULL', header: "주민등록번호", width: 140},
            {fieldName: 'CLI_NAM', header: "근무처명칭", width: 140},
            {fieldName: 'DV_VATID', header: "사업자등록번호"},
            {
                fieldName: 'HOUSE_HEAD', header: "세대주 여부",
                type: "data",
                renderer: {
                    type: "html",
                    callback: function (grid, cell, w, h) {
                        if (!cell.value)
                            return '';
                        if (cell.value == "1")
                            return '세대주';
                        else if (cell.value == "2")
                            return '세대원';
                    }
                }
            },
            {fieldName: 'NATION_CODE', header: "국적코드"},
            {fieldName: 'WORK_PERIOD', header: "근무기간", width: 180},
            {fieldName: 'EXEMPT_PERIOD', header: "감면기간", width: 180},
            {
                fieldName: 'RESID_STATUS', header: "거주구분",
                type: "data",
                renderer: {
                    type: "html",
                    callback: function (grid, cell, w, h) {
                        if (!cell.value)
                            return '';
                        if (cell.value == "1")
                            return '거주';
                        else if (cell.value == "2")
                            return '비거주';
                    }
                }
            },
            {fieldName: 'RESID_CODE', header: "거주지국코드"},
            {
                fieldName: 'FAMILY_CHANGE', header: "인적공제항목 변동",
                type: "data",
                renderer: {
                    type: "html",
                    callback: function (grid, cell, w, h) {
                        if (cell.value == "1")
                            return '전년과 동일';
                        else if (cell.value == "2")
                            return '변동있음';
                    }
                }
            },
            {
                fieldName: 'ALLOT_APPL', header: "분납신청 여부",
                type: "data",
                renderer: {
                    type: "html",
                    callback: function (grid, cell, w, h) {
                        if (cell.value == "1")
                            return '신청';
                        else
                            return '미신청';
                    }
                }
            },
            {
                fieldName: 'WHT_RATE', header: "원천징수세액 선택",
                type: "data",
                renderer: {
                    type: "html",
                    callback: function (grid, cell, w, h) {
                        if (!cell.value)
                            return '';
                        if (cell.value == '1')
                            return '100%';
                        else if (cell.value == '2')
                            return '120%';
                        else if (cell.value == '3')
                            return '80%';
                    }
                }
            },
        ],
        hideFooter: true
    },
    'FILE2': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: "관계코드", fieldName: "PERSON_REL", width: 180, styleName: "left-column" },
            {header: '부양가족이름', fieldName: 'PERSON_NAME', width: 95},
            {header: '내외국인', fieldName: 'PERSON_NATION', width: 80,
                type: "data",
                renderer: {
                    type: "html",
                    callback: function (grid, cell, w, h) {
                        switch (cell.value) {
                            case '1':
                                return '내국인';
                            case '9' :
                                return "외국인";
                        }
                        return '';
                    }
                }
            },
            {header: '주민등록번호', fieldName: 'PERSON_RRN_FULL', width: 120},
            {header: '여권번호', fieldName: 'PASSPORT_NO', width: 90},
            {header: '나이', fieldName: 'PERSON_AGE', width: 70},
            {header: '연소득100만원', fieldName: 'PERSON_INCOME_YN', width: 80},
            {header: '기본공제', fieldName: 'BASIC_DED_O', width: 80},
            {header: '경로우대', fieldName: 'ELDER_DED_O', width: 80},
            {header: '출산', fieldName: 'BIRTH_DED_YN', width: 80},
            {header: '입양', fieldName: 'ADOPTION_DED_YN', width: 80},
            {header: '부녀자공제', fieldName: 'FEMALE_DED_O', width: 80},
            {header: '한부모', fieldName: 'SINGLE_PARENT_O', width: 70},
            {header: '장애인', fieldName: 'HANDI_DED', width: 195,
                type: "data",
                renderer: {
                    type: "html",
                    callback: function (grid, cell, w, h) {
                        switch (cell.value) {
                            case '1':
                                return '1-대상-장애인 복지법에 따른 장애인';
                            case '2':
                                return '2-대상-국가 유공자법에 따른 상이자';
                            case '3':
                                return '3-대상-항시치료를 요하는 중증환자';
                            case 'Z':
                                return '';
                        }
                        return '';
                    }
                }
            },
            {header: '자녀세액공제', fieldName: 'CHILD_DED_O', width: 80},
            {
                header: '건강,고용보험등-국세청',
                fieldName: 'MED_INS_NTS',
                width: 140,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '건강,고용보험등-기타',
                fieldName: 'MED_INS_OTH',
                width: 130,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '보장성-국세청',
                fieldName: 'DAM_INS_NTS',
                width: 105,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '보장성-기타',
                fieldName: 'DAM_INS_OTH',
                width: 100,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '장애인전용-국세청',
                fieldName: 'HANDI_INS_NTS',
                width: 115,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '장애인전용-기타',
                fieldName: 'HANDI_INS_OTH',
                width: 115,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '의료비-국세청',
                fieldName: 'MED_EXP_NTS',
                width: 100,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '의료비-기타',
                fieldName: 'MED_EXP_OTH',
                width: 100,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '교육비-국세청',
                fieldName: 'EDU_EXP_NTS',
                width: 100,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '교육비-기타',
                fieldName: 'EDU_EXP_OTH',
                width: 100,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '신용카드-국세청',
                fieldName: 'CRED_CARD_NTS',
                width: 110,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '신용카드-기타',
                fieldName: 'CRED_CARD_OTH',
                width: 110,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '직불카드-국세청',
                fieldName: 'DEBIT_CARD_NTS',
                width: 110,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '직불카드-기타',
                fieldName: 'DEBIT_CARD_OTH',
                width: 110,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '현금영수증-국세청',
                fieldName: 'CASH_REC_NTS',
                width: 120,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '전통시장사용액-국세청',
                fieldName: 'TRAD_MARKET_NTS',
                width: 130,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '전통시장사용액-기타',
                fieldName: 'TRAD_MARKET_OTH',
                width: 130,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '대중교통이용액-국세청',
                fieldName: 'MASS_TRANS_NTS',
                width: 130,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '대중교통이용액-기타',
                fieldName: 'MASS_TRANS_OTH',
                width: 130,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '도서와공연-국세청',
                fieldName: 'BOOK_ART_NTS',
                width: 130,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '도서와공연-기타',
                fieldName: 'BOOK_ART_OTH',
                width: 130,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '기부금-국세청',
                fieldName: 'DONATION_NTS',
                width: 110,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '기부금-기타',
                fieldName: 'DONATION_OTH',
                width: 105,
                align: 'right',
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            }
        ],
        "fields": [
            {header: "사원이름", fieldName: "EMP_NAM"},
            {header: "관계코드", fieldName: "PERSON_REL",
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    return familyRelationRenderer(values[fieldNames.indexOf("PERSON_REL")]);
                }
            },
            {header: '부양가족이름', fieldName: 'PERSON_NAME'},
            {header: '내외국인', fieldName: 'PERSON_NATION'},
            {header: '주민등록번호', fieldName: 'PERSON_RRN_FULL'},
            {header: '여권번호', fieldName: 'PASSPORT_NO'},
            {header: '나이', fieldName: 'PERSON_AGE'},
            {header: '연소득100만원', fieldName: 'PERSON_INCOME_YN'},
            {header: '기본공제', fieldName: 'BASIC_DED_O'},
            {header: '경로우대', fieldName: 'ELDER_DED_O'},
            {header: '출산', fieldName: 'BIRTH_DED_YN'},
            {header: '입양', fieldName: 'ADOPTION_DED_YN'},
            {header: '부녀자공제', fieldName: 'FEMALE_DED_O'},
            {header: '한부모', fieldName: 'SINGLE_PARENT_O'},
            {header: '장애인', fieldName: 'HANDI_DED'},
            {header: '자녀세액공제', fieldName: 'CHILD_DED_O'},
            {header: '건강,고용보험등-국세청',fieldName: 'MED_INS_NTS',dataType: 'number'},
            {header: '건강,고용보험등-기타',fieldName: 'MED_INS_OTH',dataType: 'number'},
            {header: '보장성-국세청',fieldName: 'DAM_INS_NTS',dataType: 'number'},
            {header: '보장성-기타',fieldName: 'DAM_INS_OTH',dataType: 'number'},
            {header: '장애인전용-국세청',fieldName: 'HANDI_INS_NTS',dataType: 'number'},
            {header: '장애인전용-기타',fieldName: 'HANDI_INS_OTH',dataType: 'number'},
            {header: '의료비-국세청',fieldName: 'MED_EXP_NTS',dataType: 'number'},
            {header: '의료비-기타',fieldName: 'MED_EXP_OTH',dataType: 'number'},
            {header: '교육비-국세청',fieldName: 'EDU_EXP_NTS',dataType: 'number'},
            {header: '교육비-기타',fieldName: 'EDU_EXP_OTH',dataType: 'number'},
            {header: '신용카드-국세청',fieldName: 'CRED_CARD_NTS',dataType: 'number'},
            {header: '신용카드-기타',fieldName: 'CRED_CARD_OTH',dataType: 'number'},
            {header: '직불카드-국세청',fieldName: 'DEBIT_CARD_NTS',dataType: 'number'},
            {header: '직불카드-기타',fieldName: 'DEBIT_CARD_OTH',dataType: 'number'},
            {header: '현금영수증-국세청',fieldName: 'CASH_REC_NTS',dataType: 'number'},
            {header: '전통시장사용액-국세청',fieldName: 'TRAD_MARKET_NTS',dataType: 'number'},
            {header: '전통시장사용액-기타',fieldName: 'TRAD_MARKET_OTH',dataType: 'number'},
            {header: '대중교통이용액-국세청',fieldName: 'MASS_TRANS_NTS',dataType: 'number'},
            {header: '대중교통이용액-기타',fieldName: 'MASS_TRANS_OTH',dataType: 'number'},
            {header: '도서와공연-국세청',fieldName: 'BOOK_ART_NTS',dataType: 'number'},
            {header: '도서와공연-기타',fieldName: 'BOOK_ART_OTH',dataType: 'number'},
            {header: '기부금-국세청',fieldName: 'DONATION_NTS',dataType: 'number'},
            {header: '기부금-기타',fieldName: 'DONATION_OTH',dataType: 'number'}
        ],
        groupByEmp: true
    },
    'FILE3': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "성명", fieldName: "EMP_NAM", width: 100},
            {header: "코드", fieldName: "TAX_CODE", width: 100},
            //{header: "번호", fieldName: "DISPLAY_ORDER", width: 100},
            {header: "코드명", fieldName: "TAXNAM", width: 200, styleName: "left-column"},
            {
                header: "금액", fieldName: "APPL_AMOUNT", width: 120, numberFormat: "#,##0", styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0'
            },
        ],
        "fields": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "성명", fieldName: "EMP_NAM", width: 100},
            {header: "코드", fieldName: "TAX_CODE", width: 100},
            {header: "번호", fieldName: "DISPLAY_ORDER", width: 100},
            {header: "구분", fieldName: "TAXNAM", width: 100},
            {header: "금액", fieldName: "APPL_AMOUNT", dataType: 'number'}
        ],
        groupByEmp: true
    },
    'REC1P': { //원천징수영수증-소득명세
        "fields": [
            {fieldName: 'EMP_NUMBER', dataType: 'text'},
            {fieldName: 'EMP_NAM', dataType: 'text'},
            {fieldName: 'TPA_JOIN', dataType: 'text'},
            {fieldName: 'COMP_NAME', dataType: 'text'},
            {fieldName: 'BP_CODE', dataType: 'text'},
            {fieldName: 'WORK_PERIOD', dataType: 'text'},
            {fieldName: 'EXEMPT_PERIOD', dataType: 'text'},
            {fieldName: 'TAXCODE_1', dataType: 'text'},
            {fieldName: 'TAXNAM_1', dataType: 'text'},
            {fieldName: 'AMOUNT_1', dataType: 'number'},
        ],
        "columns": [
            // {fieldName: 'EMP_NUMBER', header: "사번"},
            {fieldName: 'EMP_NAM', header: "사원이름"},
            {fieldName: 'TPA_JOIN', header: "납세조합여부"},
            {fieldName: 'COMP_NAME', header: "회사명"},
            {fieldName: 'BP_CODE', header: "사업자등록번호"},
            {fieldName: 'WORK_PERIOD', header: "근무기간", width: 140},
            {fieldName: 'EXEMPT_PERIOD', header: "감면기간", width: 140},
            {fieldName: 'TAXCODE_1', header: "세목코드"},
            {fieldName: 'TAXNAM_1', header: "세목코드명"},
            {
                fieldName: 'AMOUNT_1', header: "금액", numberFormat: "#,##0", styleName: "right-column",
                footer: {
                    header: "0",
                    expression: "sum",
                    numberFormat: "#,##0",
                }, nanText: '0'
            },
        ],
        groupByEmp: true
    },
    'REC1L': {
        "fields": [
            {fieldName: 'EMP_NUMBER', dataType: 'text'},
            {fieldName: 'EMP_NAM', dataType: 'text'},
            {fieldName: 'TPA_JOIN', dataType: 'text'},
            {fieldName: 'COMP_NAME', dataType: 'text'},
            {fieldName: 'BP_CODE', dataType: 'text'},
            {fieldName: 'WORK_PERIOD', dataType: 'text'},
            {fieldName: 'EXEMPT_PERIOD', dataType: 'text'},
        ],
        "columns": [
            // {fieldName: 'EMP_NUMBER', header: "사번"},
            {fieldName: 'EMP_NAM', header: "사원이름"},
            {fieldName: 'TPA_JOIN', header: "납세조합여부"},
            {fieldName: 'COMP_NAME', header: "회사명"},
            {fieldName: 'BP_CODE', header: "사업자등록번호"},
            {fieldName: 'WORK_PERIOD', header: "근무기간", width: 140},
            {fieldName: 'EXEMPT_PERIOD', header: "감면기간", width: 140},
        ],
        "dynamic": true
    },
    'CARD': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: "부양가족 주민번호", fieldName: "PERSON_RRN_FULL", width: 150},
            {header: "이름", fieldName: "PERSON_NAME", width: 100},
            {header: "나이", fieldName: "PERSON_AGE", width: 100},
            {header: "관계코드", fieldName: "PERSON_REL", width: 180, styleName: "left-column"},
            {header: "기본공제", fieldName: "BASIC_DED_O", width: 100},
            {header: '자료원천', fieldName: 'DATA_SOURCE_DESC', width: 80 },
            {header: '카드종류', fieldName: 'CARD_TYPE_DESC', width: 150, styleName: "left-column"},
            {header: '사용연도', fieldName: 'CARD_YEAR', width: 80 },
            // {header: '기간구분', fieldName: 'CARD_PERIOD', width: 80 },
            {header: '사용종류', fieldName: 'CARD_USE_TYPE_DESC', width: 90 },
            {header: '입력방법', fieldName: 'INP_FLAG', width: 80 },
            {header: '공제', fieldName: 'DED_SELECT', width: 60 },
            {header: '금액', fieldName: 'CARD_AMOUNT', width: 120,
                numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0'
            },
            {header: '배제금액', fieldName: 'CRED_CARD_REFUTE', width: 120,
                numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0'
            }
        ],
        "fields": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: "급여일", fieldName: "PAYDAY", width: 100},
            {header: "부양가족 정보", fieldName: "PERSON_RRN_FULL", width: 100},
            {header: "이름", fieldName: "PERSON_NAME", width: 100},
            {header: "나이", fieldName: "PERSON_AGE", width: 100},
            {
                header: "관계코드", fieldName: "PERSON_REL", width: 100,
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    return familyRelationRenderer(values[fieldNames.indexOf("PERSON_REL")]);
                }
            },
            {header: "기본공제", fieldName: "BASIC_DED_O"},
            {header: '자료원천', fieldName: 'DATA_SOURCE_DESC', width: 80 },
            {header: '카드종류', fieldName: 'CARD_TYPE_DESC', width: 90 },
            {header: '사용연도', fieldName: 'CARD_YEAR' },
            // {header: '기간구분', fieldName: 'CARD_PERIOD', width: 80,
            //     valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            //         let val = values[fieldNames.indexOf("CARD_PERIOD")];
            //         if (!val) {
            //             return '';
            //         }
            //         switch (val) {
            //             case '1':
            //                 return '상반기';
            //             case '2':
            //                 return '하반기';
            //             case '3':
            //                 return '연합계';
            //         }
            //     }
            // },
            {header: '사용종류', fieldName: 'CARD_USE_TYPE_DESC', width: 150, styleName: "left-column" },
            { header: '입력방법', fieldName: 'INP_FLAG', width: 80,
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                let val = values[fieldNames.indexOf("INP_FLAG")];
                    if (!val) {
                        return '';
                    }
                    switch (val) {
                        case 'S':
                            return '간소화';
                        case 'T':
                            return '간편';
                        case 'M':
                            return '수작업';
                        case 'A':
                            return '자동';
                    }
                }
            },
            {header: '공제', fieldName: 'DED_SELECT', width: 60,
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("DED_SELECT")];
                    if( ! val) {
                        return '';
                    }
                    switch( val) {
                        case '1':
                            return '공제';
                        case '2':
                            return '불공제';
                    }
                }
            },
            {header: '금액', fieldName: 'CARD_AMOUNT', dataType: 'number'},
            {header: '배제금액', fieldName: 'CRED_CARD_REFUTE', dataType: 'number'}
        ],
        groupByEmp: true
    },
    'CONTRACT': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: "급여일", fieldName: "PAYDAY", width: 100},
            {header: "대주성명", fieldName: "TRADE_NM", width: 100},
            {header: "대주 주민(사업자) 등록번호", fieldName: "BUSNID", width: 150, styleName: "left-column"},
            {header: "계약번호", fieldName: "ACC_NO", width: 100},
            {header: "대출일", fieldName: "LEND_DT", width: 100},
            {header: "임대인 성명", fieldName: "LESSOR_NAME", width: 150, styleName: "left-column"},
            {header: "임대인 주민등록(사업자)번호", fieldName: "LESSOR_NUMBER", width: 150},
            {header: "임대차계약기간 시작일", fieldName: "LENDING_START", width: 120},
            {header: "임대차계약기간 종료일", fieldName: "LENDING_END", width: 120},
            {header: "주택유형", fieldName: "HOUSE_TYPE", width: 150, styleName: "left-column"},
            {
                header: "전세보증금", width: 150,
                fieldName: "KEY_MONEY",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {header: "임대차계약서상 주소지", fieldName: "HOUSE_ADDR", width: 200, styleName: "left-column"},
            {header: "계약면적", fieldName: "SPACE_SIZE", width: 100, styleName: "right-column", numberFormat: "#,##0"},
            {header: "금전 소비대차계약 시작일", fieldName: "LEND_START", width: 125},
            {header: "금전 소비대차계약 종료일", fieldName: "LEND_END", width: 125},
            {
                header: "원금상환액", width: 150,
                fieldName: "PRINCIPAL_REDEMP",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "이자상환액", width: 150,
                fieldName: "INTEREST_PAID",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "차입금 이자율", width: 150,
                fieldName: "INTEREST_RATE",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {header: "입력방법", fieldName: "INP_FLAG", width: 100},
            {header: "공제선택", fieldName: "DED_SELECT", width: 100},
            {header: "비고", fieldName: "INP_REMARK", width: 100},
        ],
        "fields": [
            // {header: "사번", fieldName: "EMP_NUMBER"},
            {header: "사원이름", fieldName: "EMP_NAM"},
            {header: "급여일", fieldName: "PAYDAY"},
            {header: "대주성명", fieldName: "TRADE_NM"},
            {header: "대주 주민(사업자)등록번호", fieldName: "BUSNID"},
            {header: "계약번호", fieldName: "ACC_NO"},
            {header: "대출일", fieldName: "LEND_DT"},
            {header: "임대인 성명", fieldName: "LESSOR_NAME"},
            {header: "임대인 주민등록(사업자)번호", fieldName: "LESSOR_NUMBER"},
            {header: "임대차계약기간 시작일", fieldName: "LENDING_START"},
            {header: "임대차계약기간 종료일", fieldName: "LENDING_END"},
            {header: "주택유형", fieldName: "HOUSE_TYPE",
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("INP_FLAG")];
                    if (!val) {
                        return '';
                    }
                    switch( val) {
                        case '1':
                            return '단독주택'
                        case '2':
                            return '다가구'
                        case '3':
                            return '다세대주택'
                        case '4':
                            return '연립주택'
                        case '5':
                            return '아파트'
                        case '6':
                            return '오피스텔'
                        case '7':
                            return '기타'
                    }
                }
            },
            {header: "전세보증금", fieldName: "KEY_MONEY", dataType: 'number'},
            {header: "임대차계약서상 주소지", fieldName: "HOUSE_ADDR"},
            {header: "계약면적", fieldName: "SPACE_SIZE"},
            {header: "금전 소비대차계약기간 시작일", fieldName: "LEND_START"},
            {header: "금전 소비대차계약기간 종료일", fieldName: "LEND_END"},
            {header: "원금상환액", fieldName: "PRINCIPAL_REDEMP", dataType: 'number'},
            {header: "이자상환액", fieldName: "INTEREST_PAID", dataType: 'number'},
            {header: "차입금 이자율", fieldName: "INTEREST_RATE", dataType: 'number'},
            { header: '입력방법', fieldName: 'INP_FLAG',
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("INP_FLAG")];
                    if (!val) {
                        return '';
                    }
                    switch (val) {
                        case 'S':
                            return '간소화';
                        case 'T':
                            return '간편';
                        case 'M':
                            return '수작업';
                        case 'A':
                            return '자동';
                    }
                }
            },
            {header: "공제선택", fieldName: "DED_SELECT"},
            {header: "비고", fieldName: "INP_REMARK"},
        ],
        hideFooter: true
    },
    'DONA1': {
        "columns": [
            {header: '사원이름', fieldName: 'EMP_NAM', width: 100},
            {header: '유형', fieldName: 'DONA_TYPE_DESC', width: 180, styleName: "left-column"},
            {header: '기부내용', fieldName: 'DONA_METHOD', width: 100, styleName: "left-column"},
            {header: '기부처 상호(법인명)', fieldName: 'DONEE_NAME', width: 200, styleName: "left-column" },
            {header: '기부처 사업자등록번호', fieldName: 'DONEE_NUMBER', width: 160, styleName: "left-column" },
            {header: '기부자 관계코드/관계', fieldName: 'PERSON_REL', width: 180, styleName: "left-column" },
            {header: '기부자 성명', fieldName: 'PERSON_NAME', width: 120 },
            {header: '기부자 주민번호', fieldName: 'PERSON_RRN_FULL', width: 150 },
            {header: '기부자 나이', fieldName: 'PERSON_AGE', width: 120, styleName: "right-column"},
            {header: '기부자 연소득100만원', fieldName: 'PERSON_INCOME', width: 120},
            {header: '기부자 기본공제', fieldName: 'BASIC_DED', width : 120},
            {header: '입력방법', fieldName: 'INP_FLAG', width: 120, styleName: "left-column"},
            {
                header: '기부 건수', fieldName: 'DONA_COUNT', width: 120,
                numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0'
            },
            {
                header: '기부금 합계액', fieldName: 'DONA_AMOUNT', width: 150,
                numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0'
            },
            {
                header: '공제대상 기부액', fieldName: 'DONA_DEDUCTIBLE', width: 150,
                numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0'
            },
            {
                header: '기부장려금 신청 금액', fieldName: 'DONA_SUBSIDY', width: 150,
                numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0'
            }
        ],
        "fields": [
            {header: '사원이름', fieldName: 'EMP_NAM'},
            {header: '유형', fieldName: 'DONA_TYPE_DESC'},
            {header: '기부내용', fieldName: 'DONA_METHOD',
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("DONA_METHOD")];
                    if( ! val) {
                        return '';
                    }
                    switch( val) {
                        case '1':
                            return '현금';
                        case '2':
                            return '현물';
                    }
                }
            },
            {header: '기부처 상호(법인명)', fieldName: 'DONEE_NAME'},
            {header: '기부처 사업자등록번호', fieldName: 'DONEE_NUMBER',
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("DONEE_NUMBER")];
                    if( ! val) {
                        return '';
                    }
                    if( val.length == 10) {
                        val = val.substring( 0, 3) + '-' + val.substring( 3, 5) + '-' + val.substring( 5, 10);
                    }
                    return val;
                }
            },
            {header: '기부자 관계코드/관계', fieldName: 'PERSON_REL',
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("PERSON_REL")];
                    if( ! val) {
                        return '';
                    }
                    switch( val) {
                        case '0': return '0 - 본인';
                        case '1': return '1 - 소득자 직계존속';
                        case '2': return '2 - 배우자 직계존속';
                        case '3': return '3 - 배우자';
                        case '4': return '4 - 직계비속(자녀,입양자)';
                        case '5': return '5 - 직계비속(기타)';
                        case '6': return '6 - 형제자매';
                        case '7': return '7 - 수급자';
                        case '8': return '8 - 위탁아동';
                    }
                }
            },
            {header: '기부자 성명', fieldName: 'PERSON_NAME'},
            {header: '기부자 주민번호', fieldName: 'PERSON_RRN_FULL'},
            {header: '기부자 나이', fieldName: 'PERSON_AGE'},
            {header: '기부자 연소득100만원', fieldName: 'PERSON_INCOME',
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("PERSON_INCOME")];
                    if( ! val) {
                        return '';
                    }
                    return val == '1' ? '이하': '초과';
                }
            },
            {header: '기부자 기본공제', fieldName: 'BASIC_DED',
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("BASIC_DED")];
                    if (!val) {
                        return '';
                    }
                    return val == '1' ? 'Y' : 'N';
                }
            },
            {header: '입력방법', fieldName: 'INP_FLAG',
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("INP_FLAG")];
                    if( ! val) {
                        return '';
                    }
                    switch( val) {
                        case 'S': return '간소화';
                        case 'T': return '간편';
                        case 'M': return '수작업';
                        case 'A': return '자동';
                    }
                }
            },
            {header: '기부 건수', fieldName: 'DONA_COUNT', dataType: 'number'},
            {header: '기부금 합계액', fieldName: 'DONA_AMOUNT', dataType: 'number'},
            {header: '공제대상 기부액', fieldName: 'DONA_DEDUCTIBLE', dataType: 'number'},
            {header: '기부장려금 신청 금액', fieldName: 'DONA_SUBSIDY', dataType: 'number'}
        ],
        groupByEmp: true
    },
    'DONA2': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: "기부자 관계코드", fieldName: "DONOR_REL_CODE_DESC", width: 150, styleName: "left-column"},
            {header: "기부자 성명", fieldName: "PERSON_NAME", width: 100},
            {header: "기부자 주민번호", fieldName: "RRN_ENCRYPT", width: 120},
            {
                header: "10.법정 기부금", width: 180,
                fieldName: "SUM_STAT_DONA",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "20.정치자금 기부금", width: 180,
                fieldName: "SUM_POLI_DONA",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "40.종교단체 외 지정기부금", width: 180,
                fieldName: "SUM_DESIG_DONA",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "41.종교단체 지정기부금", width: 180,
                fieldName: "SUM_RELI_DONA",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "42.우리사주조합 기부금", width: 180,
                fieldName: "SUM_ESPP_DONA",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "50.공제제외 기부금", width: 180,
                fieldName: "SUM_NONDED_DONA",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
        ],
        "fields": [
            {header: "사원이름", fieldName: "EMP_NAM"},
            {header: "기부자 관계코드", fieldName: "DONOR_REL_CODE_DESC"},
            {header: "기부자 성명", fieldName: "PERSON_NAME"},
            {header: "기부자 주민번호", fieldName: "RRN_ENCRYPT"},
            {header: "10.법정 기부금", fieldName: "SUM_STAT_DONA", dataType: 'number'},
            {header: "20.정치자금 기부금", fieldName: "SUM_POLI_DONA", dataType: 'number'},
            {header: "40.종교단체 외 지정기부금", fieldName: "SUM_DESIG_DONA", dataType: 'number'},
            {header: "41.종교단체 지정기부금", fieldName: "SUM_RELI_DONA", dataType: 'number'},
            {header: "42.우리사주조합 기부금", fieldName: "SUM_ESPP_DONA", dataType: 'number'},
            {header: "50.공제제외 기부금", fieldName: "SUM_NONDED_DONA", dataType: 'number'},
        ],
        groupByEmp: true
    },
    'DONA3': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: "유형", fieldName: "DONA_TYPE_DESC", width: 200, styleName: "left-column"},
            {header: "기부연도", fieldName: "DONA_YEAR", width: 100},
            {
                header: "기부금액", width: 180,
                fieldName: "DONA_AMOUNT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "전년까지 공제된 금액", width: 180,
                fieldName: "PREV_DED",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "공제대상금액", width: 180,
                fieldName: "DED_TARGET",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: '해당연도 공제금액-세액(소득)공제', fieldName: 'CURR_DEDUCT', width: 250,
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },{
                header: '공제받지 못한 금액-소멸금액', fieldName: 'CARRY_EXPIRED', width: 200,
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },{
                header: '공제받지 못한 금액-이월금액', fieldName: 'CARRY_FORWARD', width: 200,
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            }
        ],
        "fields": [
            {header: "사원이름", fieldName: "EMP_NAM"},
            {header: "유형", fieldName: "DONA_TYPE_DESC"},
            {header: "기부연도", fieldName: "DONA_YEAR"},
            {header: "기부금액", fieldName: "DONA_AMOUNT", dataType: 'number'},
            {header: "전년까지 공제된 금액", fieldName: "PREV_DED", dataType: 'number'},
            {header: "공제대상금액", fieldName: "DED_TARGET", dataType: 'number'},
            {header: '해당연도 공제금액-세액(소득)공제', fieldName: 'CURR_DEDUCT', dataType: 'number'},
            {header: '공제받지 못한 금액-소멸금액', fieldName: 'CARRY_EXPIRED', dataType: 'number'},
            {header: '공제받지 못한 금액-이월금액', fieldName: 'CARRY_FORWARD', dataType: 'number'}
        ]
    },
    'EDU': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: "부양가족 주민번호", fieldName: "PERSON_RRN_FULL", width: 150},
            {header: "이름", fieldName: "PERSON_NAME", width: 100},
            {header: "나이", fieldName: "PERSON_AGE", width: 100},
            {header: "관계코드", fieldName: "PERSON_REL", width: 180, styleName: "left-column"},
            {header: "기본공제", fieldName: "BASIC_DED_O", width: 100},            
            {header: '자료원천', fieldName: 'DATA_SOURCE', width: 80},
            {header: '학교종류', fieldName: 'SCHOOL_TYPE', width: 80, styleName: "left-column"},
            {header: '비용종류', fieldName: 'TUITION_TYPE', width: 150, styleName: "left-column"},
            {
                header: '공납금(국세청)', fieldName: 'TUITION_NTS', width: 120,
                numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0",}, nanText: '0'
            },
            {
                header: '공납금', fieldName: 'TUITION', width: 120,
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {header: '입력방법', fieldName: 'INP_FLAG', width: 80 },
            {header: '공제선택', fieldName: 'DED_SELECT', width: 80 },
        ],
        "fields": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: "급여일", fieldName: "PAYDAY", width: 100},
            {header: "부양가족 정보", fieldName: "PERSON_RRN_FULL", width: 100},
            {header: "이름", fieldName: "PERSON_NAME", width: 100},
            {header: "나이", fieldName: "PERSON_AGE", width: 100},
            {header: "관계코드", fieldName: "PERSON_REL", width: 100,
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    return familyRelationRenderer(values[fieldNames.indexOf("PERSON_REL")]);
                }
            },
            {header: "기본공제", fieldName: "BASIC_DED_O", width: 100},
            {header: '자료원천', fieldName: 'DATA_SOURCE', width: 80,
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                let val = values[fieldNames.indexOf("DATA_SOURCE")];
                    if( ! val) {
                        return '';
                    }
                    switch( val) {
                        case '1':
                            return '국세청';
                        case '2':
                            return '기타';
                    }
                }
            },
            {header: '학교종류', fieldName: 'SCHOOL_TYPE', width: 80,
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("SCHOOL_TYPE")];
                    if( ! val) {
                        return '';
                    }
                    switch( val) {
                        case '1':
                            return '취학전 아동';
                        case '2':
                            return '초중고';
                        case '3':
                            return '대학교';
                        case '4':
                            return '장애인';
                        case '5':
                            return '대학원';
                        case '6':
                            return '직업훈련';
                        case 'Z':
                            return '공제대상 아님';
                    }
                }
            },
            {header: '비용종류', fieldName: 'TUITION_TYPE',
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("TUITION_TYPE")];
                    if( ! val) {
                        return '';
                    }
                    switch( val) {
                        case '1':
                            return '수업료 등';
                        case '2':
                            return '직업훈련비';
                        case '3':
                            return '교복구입비';
                    }
                }
            },
            { header: '공납금(국세청)', fieldName: 'TUITION_NTS', dataType: 'number' },
            { header: '공납금', fieldName: 'TUITION', dataType: 'number' },
            {header: '입력방법', fieldName: 'INP_FLAG', width: 80,
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("INP_FLAG")];
                    if( ! val) {
                        return '';
                    }
                    switch( val) {
                        case 'S':
                            return '간소화';
                        case 'T':
                            return '간편';
                        case 'M':
                            return '수작업';
                        case 'A':
                            return '자동';
                    }
                }
            },
            {header: '공제선택', fieldName: 'DED_SELECT', width: 80,
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("DED_SELECT")];
                    if( ! val) {
                        return '';
                    }
                    switch( val) {
                        case '1':
                            return '공제';
                        case '2':
                            return '불공제';
                    }
                }
            },
        ],
        groupByEmp: true
    },
    'EXEMPT': {
        "columns": [
            {header: "성명(한글)", fieldName: "EMP_NAM", width: 100},
            {header: "입사일", fieldName: "E_JOIN_DATE", width: 100},
            {header: "퇴직일", fieldName: "RETIRE_DATE", width: 100},
            {header: '감면시작일', fieldName: 'EXEMPT_START', width: 90},
            {header: '감면종료일', fieldName: 'EXEMPT_END', width: 90},
            {header: '소득코드', fieldName: 'TAX_CODE', width: 90},
            {header: '소득코드설명', fieldName: 'TAX_NAME', width: 250, styleName: "left-column"},
            {header: '직장정보', fieldName: 'COMP_NAME', width: 150, styleName: "left-column"},
            {header: '감면소득', fieldName: 'EXEMPT_SALARY', width: 150,
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {header: '세액감면액', fieldName: 'EXEMPT_AMOUNT', width: 150,
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            }
        ],
        "fields": [
            {header: "성명(한글)", fieldName: "EMP_NAM"},
            {header: "입사일", fieldName: "E_JOIN_DATE"},
            {header: "퇴직일", fieldName: "RETIRE_DATE"},
            {header: '감면시작일', fieldName: 'EXEMPT_START'},
            {header: '감면종료일', fieldName: 'EXEMPT_END'},
            {header: '소득코드', fieldName: 'TAX_CODE'},
            {header: '소득코드설명', fieldName: 'TAX_NAME'},
            {header: '직장정보', fieldName: 'COMP_NAME', },
            {header: '감면소득', fieldName: 'EXEMPT_SALARY', dataType: 'number'},
            {header: '세액감면액', fieldName: 'EXEMPT_AMOUNT', dataType: 'number' }
        ]
    },
    'WORK_ANNSAL': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 90},
            {header: "급여일", fieldName: "PAYDAY", width: 90},
            {header: "번호", fieldName: "WORK_SEQ_NO", width: 70},
            {header: "납세조합여부", fieldName: "TPA_JOIN", width: 100},
            {header: "근무처", fieldName: "COMP_NAME", width: 150, styleName: "left-column"},
            {header: "사업자번호", fieldName: "DV_VATID", width: 100},
            {header: "세목코드", fieldName: "TAX_CODE", width: 80},
            {header: "세목코드명", fieldName: "TAX_NAME", width: 150, styleName: "left-column"},
            {
                header: "금액", width: 120,
                fieldName: "AMOUNT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {header: "통화", fieldName: "FX_TYPE", width: 70},
            {
                header: "외화금액", width: 120,
                fieldName: "FX_AMOUNT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {header: "감면율", fieldName: "EXEMPT_RATE", width: 70}
        ],
        "fields": [
            // {header: "사번", fieldName: "EMP_NUMBER"},
            {header: "사원이름", fieldName: "EMP_NAM"},
            {header: "급여일", fieldName: "PAYDAY"},
            {header: "번호", fieldName: "WORK_SEQ_NO"},
            {header: "납세조합여부", fieldName: "TPA_JOIN"},
            {header: "근무처", fieldName: "COMP_NAME"},
            {header: "사업자번호", fieldName: "DV_VATID"},
            {header: "세목코드", fieldName: "TAX_CODE"},
            {header: "세목코드명", fieldName: "TAX_NAME"},
            {header: "금액", fieldName: "AMOUNT", dataType: 'number'},
            {header: "통화", fieldName: "FX_TYPE"},
            {header: "외화금액", fieldName: "FX_AMOUNT", dataType: 'number'},
            {header: "감면율", fieldName: "EXEMPT_RATE"}
        ],
        groupByEmp:true
    },
    'WORK_INFO': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 90},
            {header: "급여일", fieldName: "PAYDAY", width: 90},
            {header: "번호", fieldName: "WORK_SEQ_NO", width: 70},
            {header: "회사명", fieldName: "COMP_NAME", width: 180, styleName: 'left-column'},
            {header: "사업자등록번호", fieldName: "DV_VATID", width: 120},
            {header: "시작일", fieldName: "ST_DATE", width: 100},
            {header: "종료일", fieldName: "END_DATE", width: 100},
            {header: "감면 시작일", fieldName: "EXEMPT_START", width: 100},
            {header: "감면 종료일", fieldName: "EXEMPT_END", width: 100},
            {header: "납세조합여부", fieldName: "TPA_JOIN", width: 100}
        ],
        "fields": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM"},
            {header: "급여일", fieldName: "PAYDAY"},
            {header: "번호", fieldName: "WORK_SEQ_NO"},
            {header: "회사명", fieldName: "COMP_NAME"},
            {header: "사업자등록번호", fieldName: "DV_VATID"},
            {header: "시작일", fieldName: "ST_DATE"},
            {header: "종료일", fieldName: "END_DATE"},
            {header: "감면 시작일", fieldName: "EXEMPT_START"},
            {header: "감면 종료일", fieldName: "EXEMPT_END"},
            {header: "납세조합여부", fieldName: "TPA_JOIN"}
        ],
        hideFooter: true
    },
    'HOUSE': {
        "columns": [
            {header: "성명", fieldName: "EMP_NAME", width: 90},
            {header: "종류", fieldName: "HOUSE_DED_NAME", width: 200, styleName: "left-column"},
            {header: "설문작성", fieldName: "HAS_ANSWER", width: 90},
            {header: "공제신청", fieldName: "QUESTION_PASS", width: 90},
            {
                header: "신청액(국세청)", width: 120,
                fieldName: "DED_AMT_NTS",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "신청액(기타)", width: 120,
                fieldName: "DED_AMT_OTH",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "배제액", width: 120,
                fieldName: "NEW_REFUTE_AMT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "순신청액 (국세청)", width: 120,
                fieldName: "DED_REFUTE_AMT_NTS",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "순신청액 (기타)", width: 120,
                fieldName: "DED_REFUTE_AMT_OTH",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
        ],
        "fields": [
            {header: "성명", fieldName: "EMP_NAME"},
            {header: "종류", fieldName: "HOUSE_DED_NAME"},
            {header: "설문작성", fieldName: "HAS_ANSWER"},
            {header: "공제신청", fieldName: "QUESTION_PASS"},
            {header: "신청액(국세청)", fieldName: "DED_AMT_NTS", dataType: 'number'},
            {header: "신청액(기타)", fieldName: "DED_AMT_OTH", dataType: 'number'},
            {header: "배제액", fieldName: "NEW_REFUTE_AMT", dataType: 'number'},
            {header: "순신청액 (국세청)", fieldName: "DED_REFUTE_AMT_NTS", dataType: 'number'},
            {header: "순신청액 (기타)", fieldName: "DED_REFUTE_AMT_OTH", dataType: 'number'},
        ]
    },
    'INS': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: '부양가족이름', fieldName: 'PERSON_NAME', width: 120 },
            {header: '주민번호', fieldName: 'PERSON_RRN_FULL', width: 120},
            {header: '나이', fieldName: 'PERSON_AGE', width: 60 },
            {header: '관계코드', fieldName: 'PERSON_REL', width: 120},
            {header: '기본공제', fieldName: 'BASIC_DED_O', width: 80},
            {header: '자료원천', fieldName: 'DATA_SOURCE', width: 80},
            {
                header: '보험 종류', fieldName: 'INS_CODE', width: 100,
                renderer: function (val) {
                    if (!val) {
                        return '';
                    }
                    switch (val) {
                        case 'G1':
                            return '보장성';
                        case 'A5':
                            return '지역건강';
                        case 'C2':
                            return '지역국민연금';
                        case 'H1':
                            return '장애인 보장성';
                    }
                }
            },
            {
                header: '보험료(국세청)', fieldName: 'INS_AMOUNT_NTS', width: 120,
                numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0"}, nanText: '0'
            },
            {
                header: '보험료', fieldName: 'INS_AMOUNT', width: 120,
                numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0"}, nanText: '0'
            },
            { header: '상호', fieldName: 'BIZ_NAME', width: 180 },
            { header: '사업자등록번호', fieldName: 'BIZ_ID', width: 120 },
            { header: '직장순번', fieldName: 'WORK_SEQ_NO', width: 80 },
            {
                header: '입력방법', fieldName: 'INP_FLAG', width: 80,
                renderer: function (val) {
                    if (!val) {
                        return '';
                    }
                    switch (val) {
                        case 'S':
                            return '간소화';
                        case 'T':
                            return '간편';
                        case 'M':
                            return '수작업';
                        case 'A':
                            return '자동';
                    }
                }
            },
            {
                header: '공제선택', fieldName: 'DED_SELECT', width: 80,
                renderer: function (val) {
                    if (!val) {
                        return '';
                    }
                    switch (val) {
                        case '1':
                            return '공제';
                        case '2':
                            return '불공제';
                    }
                }
            },
            { header: '비고', fieldName: 'INP_REMARK', width: 90 }
        ],
        "fields": [
            {header: "사원이름", fieldName: "EMP_NAM"},
            {header: '부양가족이름', fieldName: 'PERSON_NAME' },
            {header: '주민번호', fieldName: 'PERSON_RRN_FULL'},
            {header: '나이', fieldName: 'PERSON_AGE'},
            {header: "관계코드", fieldName: "PERSON_REL",
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    return familyRelationRenderer(values[fieldNames.indexOf("PERSON_REL")]);
                }
            },
            {header: '기본공제', fieldName: 'BASIC_DED_O'},
            {header: '자료원천', fieldName: 'DATA_SOURCE',
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("DATA_SOURCE")];
                    if (!val) {
                        return '';
                    }
                    switch (val) {
                        case '1':
                            return '국세청';
                        case '2':
                            return '기타';
                    }
                }
            },
            {
                header: '보험 종류', fieldName: 'INS_CODE',
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("INS_CODE")];
                    if (!val) {
                        return '';
                    }
                    switch (val) {
                        case 'G1':
                            return '보장성';
                        case 'A5':
                            return '지역건강';
                        case 'C2':
                            return '지역국민연금';
                        case 'H1':
                            return '장애인 보장성';
                    }
                }
            },
            { header: '보험료(국세청)', fieldName: 'INS_AMOUNT_NTS', dataType: 'number'},
            { header: '보험료', fieldName: 'INS_AMOUNT', dataType: 'number'},
            { header: '상호', fieldName: 'BIZ_NAME' },
            { header: '사업자등록번호', fieldName: 'BIZ_ID' },
            { header: '직장순번', fieldName: 'WORK_SEQ_NO'},
            {
                header: '입력방법', fieldName: 'INP_FLAG',
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("INP_FLAG")];
                    if (!val) {
                        return '';
                    }
                    switch (val) {
                        case 'S':
                            return '간소화';
                        case 'T':
                            return '간편';
                        case 'M':
                            return '수작업';
                        case 'A':
                            return '자동';
                    }
                }
            },
            {
                header: '공제선택', fieldName: 'DED_SELECT',
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("DED_SELECT")];
                    if (!val) {
                        return '';
                    }
                    switch (val) {
                        case '1':
                            return '공제';
                        case '2':
                            return '불공제';
                    }
                }
            },
            { header: '비고', fieldName: 'INP_REMARK'}
        ],
        groupByEmp:true
    },
    'MED': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            //{header: "급여일", fieldName: "PAYDAY", width: 100},
            {header: "공제 대상자", fieldName: "PERSON_NAME", width: 100},
            {header: "관계코드", fieldName: "PERSON_REL", width: 180, styleName: "left-column"},
            {header: "주민등록번호", fieldName: "PERSON_RRN_FULL", width: 150},
            {header: '자료원천', fieldName: 'DATA_SOURCE_DESC', width: 80},
            {header: '자료코드', fieldName: 'DATA_TYPE_CODE_DESC', width: 140, styleName: "left-column"},
            {header: '본인 여부', fieldName: 'PATIENT_TYPE_DESC', width: 200, styleName: "left-column"},
            {header: '내외국인 코드', fieldName: 'PATIENT_NATIONAL', width: 80},
            {header: '장애인 여부', fieldName: 'HANDI_DED_DESC', width: 150, styleName: "left-column"},
            {header: '의료기관(지급처)사업자등록번호', fieldName: 'MED_INST_NUM', width: 150, styleName: "left-column"},
            {header: '의료기관 상호', fieldName: 'MED_INST_NAME', width: 200, styleName: "left-column"},
            {header: '의료증빙', fieldName: 'MED_EVID_CODE_DESC', width: 150, styleName: "left-column"},
            {header: '건수', fieldName: 'EVID_COUNT', width: 70,
                numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0"}, nanText: '0'
            },
            {header: '지출액', fieldName: 'EXP_AMOUNT', width: 120,
                numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0"}, nanText: '0'
            },
            {header: '배제금액', fieldName: 'REFUTE_AMOUNT', width: 120,
                numberFormat: "#,##0", styleName: "right-column", footer: {header: "0", expression: "sum", numberFormat: "#,##0"}, nanText: '0'
            },
            {header: '난임시술비 해당여부', fieldName: 'FERTIL_TREAT_DESC', width: 150}
        ],
        "fields": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM"},
            {header: "급여일", fieldName: "PAYDAY"},
            {header: "공제 대상자", fieldName: "PERSON_NAME"},
            {header: '자료원천', fieldName: 'DATA_SOURCE_DESC', width: 80},
            {header: '자료코드', fieldName: 'DATA_TYPE_CODE_DESC', width: 140},
            {header: "관계코드", fieldName: "PERSON_REL",
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    return familyRelationRenderer(values[fieldNames.indexOf("PERSON_REL")]);
                }
            },
            {header: "주민등록번호", fieldName: "PERSON_RRN_FULL"},
            {header: '본인 여부', fieldName: 'PATIENT_TYPE_DESC'},
            {header: '내외국인 코드', fieldName: 'PATIENT_NATIONAL'},
            {header: '장애인 여부', fieldName: 'HANDI_DED_DESC'},
            {header: '의료기관(지급처)사업자등록번호', fieldName: 'MED_INST_NUM'},
            {header: '의료기관 상호', fieldName: 'MED_INST_NAME'},
            {header: '의료증빙', fieldName: 'MED_EVID_CODE_DESC'},
            {header: '건수', fieldName: 'EVID_COUNT'},
            {header: '지출액', fieldName: 'EXP_AMOUNT', dataType: 'number'},
            {header: '배제금액', fieldName: 'REFUTE_AMOUNT', dataType: 'number'},
            {header: '난임시술비 해당여부', fieldName: 'FERTIL_TREAT_DESC'}
        ],
        groupByEmp:true
    },
    'OTH': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: "주민등록번호", fieldName: "PERSON_RRN_FULL", width: 120},
            {header: "자료원천", fieldName: "DATA_SOURCE", width: 100},
            {header: "항목구분", fieldName: "ITEM_TYPE", width: 120},
            {header: "항목코드", fieldName: "ITEM_CODE", width: 100},
            {header: "항목코드명", fieldName: "ITEM_CODE_NAME", width: 150},
            {header: "가입일자", fieldName: "CONTRACT_DATE", width: 100},
            {header: "기간종료일", fieldName: "EXPIRE_DATE", width: 100},
            {
                header: "신청금액(국세청)", width: 150,
                fieldName: "APPL_AMOUNT_NTS",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "신청금액", width: 150,
                fieldName: "APPL_AMOUNT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {header: "입력방법", fieldName: "INP_FLAG", width: 100},
            {header: "공제선택", fieldName: "DED_SELECT", width: 100},
            {header: "비고", fieldName: "INP_REMARK", width: 100}
        ],
        "fields": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: "주민등록번호", fieldName: "PERSON_RRN_FULL", width: 100},
            {header: '자료원천', fieldName: 'DATA_SOURCE', width: 80,
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) { let val = values[fieldNames.indexOf("DATA_SOURCE")];
                    if( ! val) {
                        return '';
                    }
                    switch( val) {
                        case '1':
                            return '국세청';
                        case '2':
                            return '기타';
                    }
                }
            },
            {header: "항목구분", fieldName: "ITEM_TYPE", width: 100},
            {header: "항목코드", fieldName: "ITEM_CODE", width: 100},
            {header: "항목코드명", fieldName: "ITEM_CODE_NAME", width: 100},
            {header: "가입일자", fieldName: "CONTRACT_DATE", width: 100},
            {header: "기간종료일", fieldName: "EXPIRE_DATE", width: 100},
            {header: "신청금액(국세청)", fieldName: "APPL_AMOUNT_NTS", dataType: 'number'},
            {header: "신청금액", fieldName: "APPL_AMOUNT", dataType: 'number'},
            { header: '입력방법', fieldName: 'INP_FLAG', width: 80,
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("INP_FLAG")];
                    if (!val) {
                        return '';
                    }
                    switch (val) {
                        case 'S':
                            return '간소화';
                        case 'T':
                            return '간편';
                        case 'M':
                            return '수작업';
                        case 'A':
                            return '자동';
                    }
                }
            },
            {header: "공제선택", fieldName: "DED_SELECT", width: 100},
            {header: "비고", fieldName: "INP_REMARK", width: 100}
        ],
        groupByEmp:true
    },
    'RENT': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            //{header: "급여일", fieldName: "PAYDAY", width: 100},
            {header: "지출자 주민등록번호", fieldName: "PERSON_RRN_FULL", width: 180},
            {header: "임대인성명(상호)", fieldName: "RENTER_NAME", width: 180, styleName: "left-column"},
            {header: "임대인 사업자(주민등록)번호", fieldName: "RENTER_NUMBER", width: 190},
            {header: "주택유형", fieldName: "HOUSE_TYPE_DESC", width: 150, styleName: "left-column"},
            {header: "주택계약면적", fieldName: "SPACE_SIZE", width: 100, numberFormat: "#,##0", styleName: "right-column"},
            {header: "임대차계약서상 주소지", fieldName: "HOUSE_ADDR", width: 250, styleName: "left-column"},
            {header: "계약기간 시작일", fieldName: "RENT_START", width: 120},
            {header: "계약기간 종료일", fieldName: "RENT_END", width: 120},
            {
                header: "연간월세액", width: 150,
                fieldName: "ANNUAL_RENT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "연간월세액 조정액", width: 150,
                fieldName: "ANNUAL_RENT_ADJ",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "세액공제금액", width: 150,
                fieldName: "RENT_DEDUCTION",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {header: "입력방법", fieldName: "INP_FLAG", width: 100},
            {header: "공제선택", fieldName: "DED_SELECT", width: 100},
            {header: "비고", fieldName: "INP_REMARK", width: 150},
        ],
        "fields": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: "급여일", fieldName: "PAYDAY", width: 100},
            {header: "지출자 주민등록번호", fieldName: "PERSON_RRN_FULL", width: 100},
            {header: "임대인성명(상호)", fieldName: "RENTER_NAME", width: 100},
            {header: "임대인 사업자(주민등록)번호", fieldName: "RENTER_NUMBER", width: 100},
            {header: "주택유형", fieldName: "HOUSE_TYPE_DESC", width: 100},
            {header: "주택계약면적", fieldName: "SPACE_SIZE", width: 100},
            {header: "임대차계약서상 주소지", fieldName: "HOUSE_ADDR", width: 100},
            {header: "계약기간 시작일", fieldName: "RENT_START", width: 100},
            {header: "계약기간 종료일", fieldName: "RENT_END", width: 100},
            {header: "연간월세액", fieldName: "ANNUAL_RENT", dataType: 'number'},
            {header: "연간월세액_조정액", fieldName: "ANNUAL_RENT_ADJ", dataType: 'number'},
            {header: "세액공제금액", fieldName: "RENT_DEDUCTION", dataType: 'number'},
            { header: '입력방법', fieldName: 'INP_FLAG', width: 80,
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("INP_FLAG")];
                    if (!val) {
                        return '';
                    }
                    switch (val) {
                        case 'S':
                            return '간소화';
                        case 'T':
                            return '간편';
                        case 'M':
                            return '수작업';
                        case 'A':
                            return '자동';
                    }
                }
            },
            {header: "공제선택", fieldName: "DED_SELECT", width: 100},
            {header: "비고", fieldName: "INP_REMARK", width: 100},
        ]
    },
    'RESULT2': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "성명(한글)", fieldName: "EMP_NAME", width: 100},
            {header: "부서코드", fieldName: "EMPDEPT_CD", width: 100},
            {header: "부서명", fieldName: "HRDEPT_NAMK", width: 100},
            {header: "입사일", fieldName: "E_JOIN_DATE", width: 100},
            {header: "퇴직일", fieldName: "RETIRE_DATE", width: 100},
            {header: "분납구분", fieldName: "ALLOT_APPL", width: 100},
            {
                header: "소득세 차감징수액",
                fieldName: "T2",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "지방소득세 차감징수액",
                fieldName: "R2",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "농특세 차감징수액",
                fieldName: "F2",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "건강보험정산",
                fieldName: "M1",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "노인장기요양보험정산",
                fieldName: "L1",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "고용보험정산",
                fieldName: "E1",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
        ],
        "fields": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "성명(한글)", fieldName: "EMP_NAME", width: 100},
            {header: "부서코드", fieldName: "EMPDEPT_CD", width: 100},
            {header: "부서명", fieldName: "HRDEPT_NAMK", width: 100},
            {header: "입사일", fieldName: "E_JOIN_DATE", width: 100},
            {header: "퇴직일", fieldName: "RETIRE_DATE", width: 100},
            {header: "분납구분", fieldName: "ALLOT_APPL", width: 100},
            {header: "소득세 차감징수액", fieldName: "T2", dataType: 'number'},
            {header: "지방소득세 차감징수액", fieldName: "R2", dataType: 'number'},
            {header: "농특세 차감징수액", fieldName: "F2", dataType: 'number'},
            {header: "건강보험정산", fieldName: "M1", dataType: 'number'},
            {header: "노인장기요양보험정산", fieldName: "L1", dataType: 'number'},
            {header: "고용보험정산", fieldName: "E1", dataType: 'number'},
        ]
    },
    'SAVING': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: "급여일", fieldName: "PAYDAY", width: 100},
            {header: "가족 주민등록번호", fieldName: "PERSON_RRN_FULL", width: 150},
            {header: "자료원천", fieldName: "DATA_SOURCE", width: 100},
            {header: "소득공제구분", fieldName: "SAVINGS_TYPE", width: 150, styleName: "left-column"},
            {header: "금융기관코드", fieldName: "INST_CODE", width: 100},
            {header: "금융기관상호", fieldName: "INST_NAME", width: 180, styleName: "left-column"},
            {header: "금융기관사업번호", fieldName: "INST_BIZID", width: 150},
            {header: "계좌번호", fieldName: "ACC_NO", width: 150, styleName: "left-column"},
            {header: "가입일자", fieldName: "CONTRACT_DATE", width: 100},
            {
                header: "납입금액(국세청)", width: 150,
                fieldName: "INS_AMOUNT_NTS",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "납입금액", width: 150,
                fieldName: "INS_AMOUNT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "소득", width: 150,
                fieldName: "DED_AMOUNT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {header: "입력방법", fieldName: "INP_FLAG", width: 100},
            {header: "공제선택", fieldName: "DED_SELECT", width: 100},
            // {header: "비고", fieldName: "INP_REMARK", width: 100}
        ],
        "fields": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: "급여일", fieldName: "PAYDAY", width: 100},
            {header: "가족 주민등록번호", fieldName: "PERSON_RRN_FULL", width: 150},
            {header: '자료원천', fieldName: 'DATA_SOURCE', width: 80,
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) { let val = values[fieldNames.indexOf("DATA_SOURCE")];
                    if( ! val) {
                        return '';
                    }
                    switch( val) {
                        case '1':
                            return '국세청';
                        case '2':
                            return '기타';
                    }
                }
            },
            {header: "소득공제구분", fieldName: "SAVINGS_TYPE",
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("SAVINGS_TYPE")];
                    if( ! val) {
                        return '';
                    }
                    switch( parseInt(val)) {
                        case 11:
                            return '근로자퇴직급여 보장법';
                        case 12:
                            return '과학기술인 공제';
                        case 21:
                            return '개인연금저축';
                        case 22:
                            return '연금저축';
                        case 31:
                            return '청약저축';
                        case 32:
                            return '주주택청약종합저축';
                        case 34:
                            return '근로자주택마련저축';
                        case 51:
                            return '장기집합투자증권저축';
                        case 61:
                            return '투자조합 출자';
                    }
                }
            },
            {header: "금융기관코드", fieldName: "INST_CODE", width: 100},
            {header: "금융기관상호", fieldName: "INST_NAME", width: 100},
            {header: "금융기관사업번호", fieldName: "INST_BIZID", width: 100},
            {header: "계좌번호", fieldName: "ACC_NO", width: 100},
            {header: "가입일자", fieldName: "CONTRACT_DATE", width: 100},
            {header: "납입금액(국세청)", fieldName: "INS_AMOUNT_NTS", dataType: 'number'},
            {header: "납입금액", fieldName: "INS_AMOUNT", dataType: 'number'},
            {header: "소득", fieldName: "DED_AMOUNT", dataType: 'number'},
            { header: '입력방법', fieldName: 'INP_FLAG', width: 80,
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    let val = values[fieldNames.indexOf("INP_FLAG")];
                    if (!val) {
                        return '';
                    }
                    switch (val) {
                        case 'S':
                            return '간소화';
                        case 'T':
                            return '간편';
                        case 'M':
                            return '수작업';
                        case 'A':
                            return '자동';
                    }
                }
            },
            {header: "공제선택", fieldName: "DED_SELECT", width: 100},
            {header: "비고", fieldName: "INP_REMARK", width: 100}
        ],
        groupByEmp:true
    },
    'SRPT': {
        "columns": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "성명", fieldName: "EMP_NAM", width: 100},
            // {header: "성명(영어)", fieldName: "EMP_ENAME", width: 100},
            {header: "부서코드", fieldName: "EMPDEPT_CD", width: 100},
            {header: "부서명", fieldName: "HRDEPT_NAM", width: 100},
            {header: "입사일", fieldName: "E_JOIN_DATE", width: 100},
            {header: "퇴직일", fieldName: "RETIRE_DATE", width: 100},
            {header: "분납구분", fieldName: "ALLOT_APPL", width: 100},
            {
                header: "총급여",
                fieldName: "D10A",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "소득세",
                fieldName: "TAX_AMOUNT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "지방소득세",
                fieldName: "LTAX_AMOUNT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "농특세",
                fieldName: "ATAX_AMOUNT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "건강보험(노인장기요양 포함)",
                fieldName: "MITAX_AMOUNT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "장기요양보험정산",
                fieldName: "LTTAX_AMOUNT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {
                header: "고용보험",
                fieldName: "EITAX_AMOUNT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            }
            // {
            //     header: "합계",
            //     fieldName: "TAXSUM_AMOUNT",
            //     numberFormat: "#,##0",
            //     styleName: "right-column",
            //     footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
            //     nanText: '0'
            // },
        ],
        "fields": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "성명", fieldName: "EMP_NAM", width: 100},
            {header: "성명(영어)", fieldName: "EMP_ENAME", width: 100},
            {header: "부서코드", fieldName: "EMPDEPT_CD", width: 100},
            {header: "부서명", fieldName: "HRDEPT_NAM", width: 100},
            {header: "입사일", fieldName: "E_JOIN_DATE", width: 100},
            {header: "퇴직일", fieldName: "RETIRE_DATE", width: 100},
            {header: "분납구분", fieldName: "ALLOT_APPL", width: 100},
            {header: "총급여", fieldName: "D10A", dataType: 'number'},
            {header: "소득세", fieldName: "TAX_AMOUNT", dataType: 'number'},
            {header: "지방소득세", fieldName: "LTAX_AMOUNT", dataType: 'number'},
            {header: "농특세", fieldName: "ATAX_AMOUNT", dataType: 'number'},
            {header: "건강보험(노인장기요양 포함)", fieldName: "MITAX_AMOUNT", dataType: 'number'},
            {header: "장기요양보험정산", fieldName: "LTTAX_AMOUNT", dataType: 'number'},
            {header: "고용보험", fieldName: "EITAX_AMOUNT", dataType: 'number'},
            {header: "합계", fieldName: "TAXSUM_AMOUNT", dataType: 'number'},
        ]
    },
    'WOMAN': {
        "columns": [
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: "관계코드", fieldName: "PERSON_REL", width: 120, styleName: "left-column"},
            {header: "성명", fieldName: "PERSON_NAME", width: 100},
            {header: "성별", fieldName: "GENDER", width: 100},
            {
                header: "근로소득금액", width: 150,
                fieldName: "INCOME_AMOUNT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {header: "정산방법", fieldName: "SETTLE_TYPE", width: 100},
            {header: "소득요건 충족여부", fieldName: "FILTER_1ST", width: 150},
            {header: "배우자 유무", fieldName: "SPOUSE", width: 100},
            {header: "세대주여부", fieldName: "HOUSE_HEAD", width: 100},
            {header: "부양가족수", fieldName: "DED_FAM_COUNT", width: 100},
            {header: "소득 외 요건 충족여부", fieldName: "FILTER_2ND", width: 150},
            {header: "요건 충족여부", fieldName: "FILTER_1AND2", width: 150},
            {
                header: "부녀자 공제액", width: 150,
                fieldName: "DEDUCT_AMOUNT",
                numberFormat: "#,##0",
                styleName: "right-column",
                footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                nanText: '0'
            },
            {header: "이상유무", fieldName: "FINAL_CHECK", width: 100},
        ],
        "fields": [
            // {header: "사번", fieldName: "EMP_NUMBER", width: 100},
            {header: "사원이름", fieldName: "EMP_NAM", width: 100},
            {header: "관계코드", fieldName: "PERSON_REL", width: 100,
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    return familyRelationRenderer(values[fieldNames.indexOf("PERSON_REL")]);
                }
            },
            {header: "성명", fieldName: "PERSON_NAME", width: 100},
            {header: "성별", fieldName: "GENDER", width: 100},
            {header: "근로소득금액", fieldName: "INCOME_AMOUNT", dataType: 'number'},
            {header: "정산방법", fieldName: "SETTLE_TYPE", width: 100},
            {header: "1차요건 충족여부", fieldName: "FILTER_1ST", width: 100},
            {header: "배우자 유무", fieldName: "SPOUSE", width: 100},
            {header: "세대주여부", fieldName: "HOUSE_HEAD", width: 100},
            {header: "부양가족수", fieldName: "DED_FAM_COUNT", width: 100},
            {header: "2차요건 충족여부", fieldName: "FILTER_2ND", width: 100},
            {header: "요건 충족여부", fieldName: "FILTER_1AND2", width: 100},
            {header: "부녀자 공제액", fieldName: "DEDUCT_AMOUNT", dataType: 'number'},
            {header: "이상유무", fieldName: "FINAL_CHECK", width: 100},
        ]
    }
}
export default gridData