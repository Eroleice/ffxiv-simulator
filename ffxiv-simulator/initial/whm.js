module.exports = {

    'init': function (data) {

        // 导入白魔职业参数
        data.jobTrial = 1.3;
        data.jobK = 33;
        data.skillList = ['stone_iv', 'aero_ii', 'aero_iii'];

        // DOT池初始化
        data.dot.aero_ii = {
            'time': 0,
            'damage': 0,
            'buff': []
        };
        data.dot.aero_iii = {
            'time': 0,
            'damage': 0,
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

        return data;

    }

};