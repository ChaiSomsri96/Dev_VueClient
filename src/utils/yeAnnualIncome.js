
let codeData = {
    "T1": {
        value: 'ABG',
        name: '과세급여',
        return: null,
        items: [
            {message: '급여', code: 'ABG'},
            {message: '상여', code: 'ABH'},
            {message: '인정상여', code: 'ABI'},
            {message: '우리사주조합 인출금', code: 'ABI2'},
            {message: '주식매수선택권 행사이익', code: 'ABG3'},
            {message: '임원퇴직금 손금 초과액', code: 'ABI3'},
            {message: '직무발명보상금', code: 'ABI4'},
            {message: '소득세 대납액', code: 'ABG5'},
            {message: '국민연금 대납액', code: 'ABG6'},
            {message: '건강보험 대납액', code: 'ABG7A'},
            {message: '노인장기 대납액', code: 'ABG7B'},
            {message: '고용보험 대납액', code: 'ABG8'}
        ]
    },
    "T2": { //공제액
        value: 'D22A',
        name: '공제액',
        return: null,
        items: [
            {message: '소득세(결정세액)', code: 'D22A'},
            {message: '지방소득세(결정세액)', code: 'D22B'},
            {message: '소득세(결정세액)', code: 'D22L'},
            {message: '지방소득세(결정세액)', code: 'D22M'},
            {message: '농어촌특별세(결정세액)', code: 'D22N'},
            {message: '국민연금보험료', code: 'BB1A'},
            {message: '공무원연금보험료', code: 'BB1B'},
            {message: '군인연금보험료', code: 'BB1C'},
            {message: '사립학교직원연금보험료', code: 'BB1D'},
            {message: '별정우체국연금보험료', code: 'BB1E'},
            {message: '건강보험료(장기요양포함)', code: 'BB2'},
            {message: '노인장기요양보험료', code: 'BB2A'},
            {message: '고용보험료', code: 'BB3'},
        ]
    },
    "T3": { //비과세급여
        value: null,
        name: '비과세급여',
        return: null,
        items: []
    },
    "T4": { //감면소득
        value: 'ACX',
        name: '감면소득',
        return: null,
        items: [
            {message: '중소기업취업 100%', code: 'ACX'},
            {message: '중소기업취업 50%', code: 'ACX2'},
            {message: '중소기업취업 70%', code: 'ACX3'},
            {message: '중소기업취업 90%', code: 'ACX6'},
            {message: '외국인기술자 감면', code: 'ACW'},
            {message: '교사,교수(조세조약)', code: 'ABO'},
            {message: '중소기업 경영성과급 50%', code: 'ACX7'},
            {message: '중소기업 핵심인력 보상기금 50%', code: 'ACX8'}
        ]
    }
}
export default codeData