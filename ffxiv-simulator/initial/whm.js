function trans(arr, dic) {
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

        // 导入白魔职业参数
        data.jobTrial = 1.3;
        data.jobK = 33;
        data.skillList = ['stone_iv', 'aero_ii', 'aero_iii'];

        // DOT池初始化
        data.dot.aero_ii = {
            'time': 0,
            'name': 'Aero II',
            'translate': '烈风',
            'damage': [],
            'buff': []
        };
        data.dot.aero_iii = {
            'time': 0,
            'name': 'Aero III',
            'translate': '暴风',
            'damage': [],
            'buff': []
        };

        // buff初始化
        data.buff.presence_of_mind = 0;
        data.buff.potion = 0;
        data.buff.cleric_stance = 0;
        data.buff.lucid_dreaming = 0;

        // cd初始化
        data.cd.assize = 0;
        data.cd.presence_of_mind = 0;
        data.cd.potion = 0;
        data.cd.cleric_stance = 0;
        data.cd.lucid_dreaming = 0;

        // opener汉化
        var translation = {
            '崩石': 'stone_iv',
            '烈风': 'aero_ii',
            '暴风': 'aero_iii',
            '法令': 'assize',
            '神速咏唱': 'presence_of_mind',
            '战姿': 'cleric_stance',
            '爆发药': 'potion',
            '即刻咏唱': 'swift_cast',
            '醒梦': 'lucid_dreaming'
        };
        trans(data.opener, translation);

        return data;

    }

};