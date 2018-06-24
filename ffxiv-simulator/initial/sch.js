module.exports = {

    'init': function (data) {

        // 导入学者职业参数
        data.jobTrial = 1.3;
        data.jobK = 33;
        data.skillList = ['broil_ii', 'bio_ii', 'miasma', 'miasma_ii', 'ruin_ii'];
        data.job.aether = 3;        // 起手3以太

        // DOT池初始化
        data.dot.bio_ii = {
            'time': 0,
            'damage': 0,
            'buff': []
        };
        data.dot.miasma = {
            'time': 0,
            'damage': 0,
            'buff': []
        };
        data.dot.miasma_ii = {
            'time': 0,
            'damage': 0,
            'buff': []
        };
        data.dot.shadow_flare = {
            'time': 0,
            'damage': 0,
            'buff': []
        };

        // buff初始化
        data.buff.chain_strategem = 0;
        data.buff.potion = 0;
        data.buff.cleric_stance = 0;
        data.buff.lucid_dreaming = 0;

        // cd初始化
        data.cd.shadow_flare = 0;
        data.cd.atherflow = 0;
        data.cd.chain_strategem = 0;
        data.cd.potion = 0;
        data.cd.cleric_stance = 0;
        data.cd.lucid_dreaming = 0;

        return data;

    }

};