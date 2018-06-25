function trans(arr,dic) {
    for (var i = 0; i < arr.length; i++) {
        for (var k in dic) {
            if (arr[i] == k) {
                arr[i] = dic[k];
            }
        }
    }
}

module.exports = {

    'init': function (data) {

        // 导入占星职业参数
        data.jobTrial = 1.3;
        data.jobK = 33;
        data.skillList = ['malefic_iii','combust_ii'];

        // DOT池初始化
        data.dot.combust_ii = {
            'time': 0,
            'damage': 0,
            'buff': []
        };

        // buff初始化
        data.buff.potion = 0;
        data.buff.cleric_stance = 0;
        data.buff.lucid_dreaming = 0;

        // cd初始化
        data.cd.potion = 0;
        data.cd.cleric_stance = 0;
        data.cd.lucid_dreaming = 0;

        // opener汉化
        var translation = {
            '祸星': 'malefic_iii',
            '灾星': 'combust_ii',
            '战姿': 'cleric_stance',
            '爆发药': 'potion',
            '即刻咏唱': 'swift_cast',
            '醒梦': 'lucid_dreaming'
        };
        trans(data.opener,translation);

        return data;

    }

};