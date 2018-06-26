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

        // 导入武僧职业参数
        data.jobTrial = 1;
        data.jobK = 32;
        data.skillList = ['bootshine', 'true_strike', 'snap_punch', 'dragon_kick', 'twin_snakes', 'demolish'];
        data.job.fists = 'fire';     // 红莲体势起手
        data.job.form = 'coeurl';    // 魔猿起手
        data.job.chakra = 5;         // 5查克拉起手

        // DOT池初始化
        data.dot.demolish = {
            'time': 0,
            'name': 'Demolish',
            'translate': '破碎拳',
            'damage': [],
            'buff': []
        };

        // buff初始化
        data.buff.potion = 0;
        data.buff.internal_release = 0;
        data.buff.perfect_balance = 0;
        data.buff.riddle_of_fire = 0;
        data.buff.riddle_of_wind = 0;
        data.buff.fists_of_fire = 0;
        data.buff.fists_of_wind = 0;
        data.buff.brotherhood = 0;
        data.buff.greased_lightning_iii = 0;
        data.buff.greased_lightning_ii = 0;
        data.buff.greased_lightning_i = 0;


        //debuff初始化
        data.debuff.resistance = 0;

        // cd初始化
        data.cd.internal_release = 0;
        data.cd.perfect_balance = 0;
        data.cd.riddle_of_fire = 0;
        data.cd.brotherhood = 0;
        data.cd.shoulder_tackle = 0;
        data.cd.fists = 0;
        data.cd.steel_peak = 0;
        data.cd.howling_fist = 0;
        data.cd.the_forbidden_chakra = 0;
        data.cd.elixir_field = 0;
        data.cd.tornado_kick = 0;
        data.cd.invigorate = 0;

        // opener汉化
        var translation = {
            '连击': 'bootshine',
            '正拳': 'true_strike',
            '崩拳': 'snap_punch',
            '内劲': 'internal_release',
            '双掌打': 'twin_snakes',
            '破碎拳': 'demolish',
            '铁山靠': 'steel_peak',
            '空鸣拳': 'howling_fist',
            '震脚': 'perfect_balance',
            '罗刹冲': 'shoulder_tackle',
            '红莲体势': 'fists_of_fire',
            '疾风体势': 'fists_of_wind',
            '双龙脚': 'dragon_kick',
            '阴阳斗气斩': 'the_forbidden_chakra',
            '苍气炮': 'elixir_field',
            '斗魂旋风脚': 'tornado_kick',
            '红莲极意': 'riddle_of_fire',
            '义结金兰': 'brotherhood',
            '运气': 'invigorate',
            '爆发药': 'potion'
        };
        trans(data.opener, translation);

        return data;

    }

};