export default {
    methods: {
        async loadFamily(labels,values){
            let {data} = await this.$httpPost({
                url: '/year-end/employee/family/list',
                param: {
                    'EID': this.eid,
                    'ATT_YEAR': this.attYear,
                    'PAYDAY': this.payday
                }
            });
            for(let i = 0; i < data.length; i ++) {
                labels.push(data[i]['PERSON_NAME']);
                values.push(data[i]['YES_ID']);
            }
        }
    }
}