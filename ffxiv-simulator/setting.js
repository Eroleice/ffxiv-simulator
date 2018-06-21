module.exports = {

    set: function () {

        var job = 'ast';		//职业

        var status = {
            'wd': 135,			//武器性能
            'ap': 2544,			//攻击力or魔法攻击力
            'crt': 1047,		//暴击率
            'det': 952,			//信念
            'ss': 1366,			//技能速度or咏唱速度
            'dh': 364,			//直击
            'ten': 364			//韧性
        };

        var simulate = {
            duration: 24000,	//模拟木桩时间，单位毫秒
            times: 10,			//模拟次数
            expect_mode: true,	//期望值模式
            battle_log: false	//输出战斗记录
        };

        var opener = ['Cleric Stance', 'Potion', 'Combust II'];

        return {
            'job': job,
            'status': status,
            'simulate': simulate,
            'opener': opener
        };

    }

}