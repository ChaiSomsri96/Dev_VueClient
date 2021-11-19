const yearendCodes = {
    familyRelation: {
        codeList: ['0','1','2','3','4','5','6','7','8'],
        values: {
            '0': '본인',
            '1': '소득자 직계존속',
            '2': '배우자 직계존속',
            '3': '배우자',
            '4': '직계비속(자녀,입양자)',
            '5': '직계비속(기타)',
            '6': '형제자매',
            '7': '수급자',
            '8': '위탁아동'
        }
    },
    familyPersonLiving: {
        codeList: ['1','2','3','4'],
        values: {
            '1': '동거',
            '2': '취학 질병등으로 일시퇴거',
            '3': '주거형편상 별거',
            '4': '별거'
        }
    },
    insCode: {
        codeList: ['G1','A5','C2','H1'],
        values: {
            'G1': '보장성',
            'A5': '지역건강',
            'C2': '지역국민연금',
            'H1': '장애인 보장성'
        }
    },
    dedAble: {
        codeList: ['1','2'],
        values: {
            '1': '가능',
            '2': '불가능'
        }
    },
    evidCode: {
        codeList: ['1','2','3','4','5'],
        values: {
            '1': '국세청 의료비 자료',
            '2': '국민건강보험공단 명세서',
            '3': '진료비/약제비 계산서',
            '4': '장기요양급여비용',
            '5': '기타 의료비'
        }
    },
    dataTypeCode: {
        codeList: ['G0003','G0003-1','G0025','G0026','G0027','G0034','G0040'],
        values: {
            'G0003': '일반 의료비',
            'G0003-1': '난임 시술 의료비',
            'G0025': '의료기기',
            'G0026': '안경 또는 콘택트렌즈',
            'G0027': '보청기 또는 장애인 보장구',
            'G0034': '산후조리원비용',
            'G0040': '실손보험-배제액'
        }
    },

    dataSource: {
        codeList: ['1','2'],
        values: {
            '1': '국세청',
            '2': '기타'
        }
    },
    schoolType: {
        codeList: ['1','2','3','4','5','6','Z'],
        values: {
            '1': '취학전 아동',
            '2': '초중고',
            '3': '대학교',
            '4': '장애인',
            '5': '대학원',
            '6': '직업훈련',
            'Z': '공제대상 아님'
        }
    },
    tuitionType: {
        codeList: ['1','2','3'],
        values: {
            '1': '수업료 등',
            '2': '직업훈련비',
            '3': '교복구입비'
        }
    },
    donaMethod: {
        codeList: ['1','2'],
        values: {
            '1': '현금',
            '2': '현물'
        }
    },
    donaType: {
        codeList: ['10','20','40','41','42','50'],
        values: {
            '10': '법정기부금',
            '20': '정치자금기부금',
            '40': '종교단체외 지정기부금',
            '41': '종교단체 지정기부금',
            '42': '우리사주조함 기부금',
            '50': '기타기부금(불공제)'
        }
    },
    originFlag: {
        codeList: ['P','C'],
        values: {
            'P': '연말정산',
            'C': '이월액입력'
        }
    },
    cardType: {
        codeList: ['1','2','3'],
        values: {
            '1': '신용카드',
            '2': '직불카드',
            '3': '현금영수증'
        }
    },
    cardUseType: {
        codeList: ['1','2','3','4'],
        values: {
            '1': '일반사용',
            '2': '전통시장사용',
            '3': '대중교통',
            '4': '도서공연'
        }
    },
    savingType: {
        codeList: ['11','12','21','22','51'],
        values: {
            '11': '근로자퇴직급여 보장법',
            '12': '과학기술인 공제',
            '21': '개인연금저축',
            '22': '연금저축',
            '51': '장기집합투자증권저축'
        }
    },
    evidType: {
        codeList: ['B','C','D','F','G','H','I','L','M','N','P','Q'],
        values: {
            'B': '소득',
            'C': '부양가족',
            'D': '국세청 파일',
            'F': '보험료',
            'G': '의료비',
            'H': '교육비',
            'I': '신용카드',
            'L': '기부금',
            'M': '연금저축',
            'N': '주택자금',
            'P': '기타',
            'Q': '외납세액'
        }
    },

    othersItemType: {
        codeList: ['1','2','3','4'],
        values: {
            '1': '소상공인공제부금',
            '2': '투자조합출자',
            '3': '우리사주조합출연금',
            '4': '고용유지중소기업 근로자'
        }
    },

    houseSavingsType: {
        codeList: ['31','32','34'],
        values: {
            '31': '청약저축',
            '32': '주택청약종합저축',
            '34': '근로자주택마련저축'
        }
    },

    houseType: {
        codeList: ['1','2','3','4','5','6','7','8'],
        values: {
            '1': '단독주택',
            '2': '다가구',
            '3': '다세대주택',
            '4': '연립주택',
            '5': '아파트',
            '6': '오피스텔',
            '7': '고시원',
            '8': '기타'
        }
    },

    houseLoanType: {
        codeList: ['1','2','3'],
        values: {
            '1': '무주택자의 중도금 대출',
            '2': '기존주택구입',
            '3': '주택분양권 대출'
        }
    },
};

function appendValueList(){
    for(let p in yearendCodes){
        let list = [];
        for(let cd of yearendCodes[p].codeList){
            list.push(yearendCodes[p].values[cd]);
        }
        yearendCodes[p].valueList = list;
    }
}

function createItemList(){
    for(let p in yearendCodes){
        let list = [];
        for(let cd of yearendCodes[p].codeList){
            list.push({
                code: cd,
                message: yearendCodes[p].values[cd]
            });
        }
        yearendCodes[p].items = list;
    }
}

export function getYearendCodeList(){
    appendValueList();
    createItemList();
    return yearendCodes;
}

function getCodeList(codeType){
    if(yearendCodes[codeType]){
        return yearendCodes[codeType].codeList;
    }
}
function getNameList(codeType){
    let c;
    let codeValues;
    let ret = [];
    if(yearendCodes[codeType]){
        codeValues = yearendCodes[codeType].values;
        for( c in yearendCodes[codeType].codeList){
            ret.push(codeValues[c]);
        }
    }
    return ret;
}

export const evidCodeList = function (type) {
    const codeType = 'evidCode';
    return type == 'labels' ? getNameList(codeType) : getCodeList(codeType);
}

export const dataTypeList = function (type) {
    const codeType = 'dataType';
    return type == 'labels' ? getNameList(codeType) : getCodeList(codeType);
}

export const getNameFromIdRenderer = function (value, _data, c_element, g_element) {
    if (!(Array.isArray(_data) && _data.length > 0))
        return value;
    for (let i = 0; i < _data.length; i++) {
        if (value == _data[i][c_element]) {
            return _data[i][g_element];
        }
    }
    return value;
}

export const familyRelationRenderer = function (value) {
    return value+'-'+yearendCodes.familyRelation.values[value];
}
export const familyRelationInfo = function (value) {
    return yearendCodes.familyRelation.values[value] || value;
}
export const familyPersonLivingRenderer = function (value) {
    return yearendCodes.familyPersonLiving.values[value] || value;
}
export const insCodeRenderer = function (value) {
    return yearendCodes.insCode.values[value] || value;
}
export const dedAbleRenderer = function (value) {
    return yearendCodes.dedAble.values[value] || value;
}
export const evidCodeRenderer = function (value) {
    return yearendCodes.evidCode.values[value] || value;
}
export const dataTypeCodeRenderer = function (value) {
    return yearendCodes.dataTypeCode.values[value] || value;
}
export const dataSourceRenderer = function (value) {
    return yearendCodes.dataSource.values[value] || value;
}
export const schoolTypeRenderer = function (value) {
    return yearendCodes.schoolType.values[value] || value;
}
export const tuitionTypeRenderer = function (value) {
    return yearendCodes.tuitionType.values[value] || value;
}
export const donaMethodRenderer = function (value) {
    return yearendCodes.donaMethod.values[value] || value;
}
export const donaTypeRenderer = function (value) {
    return value+'-'+yearendCodes.donaType.values[value];
}
export const originFlagRenderer = function (value) {
    return yearendCodes.originFlag.values[value] || value;
}
export const cardTypeRenderer = function (value) {
    return yearendCodes.cardType.values[value] || value;
}
export const cardUseTypeRenderer = function (value) {
    return yearendCodes.cardUseType.values[value] || value;
}
export const savingTypeRenderer = function (value) {
    return yearendCodes.savingType.values[value] || value;
}
export const evidTypeRenderer = function (value) {
    return yearendCodes.evidType.values[value] || value;
}
export const getDateTimeFromTimeStamp = function (_timestamp) {
    let date = new Date(Math.round(_timestamp));
    return String(date.getFullYear()) + '-' +
        (date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' +
        (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()) + ' ' +
        (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ':' +
        (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
}