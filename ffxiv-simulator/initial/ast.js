module.exports = {

    'init': function (data) {

        // 导入占星职业参数
        data.jobTrial = 1.3;
        data.jobK = 33;
        data.skillList = ['malefic_iii','combust_ii'];

        // DOT池初始化
        data.dot.combust_ii = {
            'time': 0,
            'damage': 0
        };

        // buff初始化
        data.buff.potion = 0;
        data.buff.cleric_stance = 0;
        data.buff.lucid_dreaming = 0;

        // cd初始化
        data.cd.potion = 0;
        data.cd.cleric_stance = 0;
        data.cd.lucid_dreaming = 0;

        return data;

    }

};