module.exports = {

    set: function () {

        var job = 'ast';		        // 职业

        var status = {
            'wd': 135,			        // 武器性能
            'ap': 2544,		        	// 攻击力or魔法攻击力
            'crt': 1047,	          	// 暴击率
            'det': 952,		        	// 信念
            'ss': 1366,		        	// 技能速度or咏唱速度
            'dh': 364,		        	// 直击
            'ten': 364,		        	// 韧性
            'mp': 20000                 // 蓝量
        };

        var simulate = {
            duration: 24000,	        // 模拟木桩时间，单位10毫秒 (秒数x100)
            times: 1,	    		    // 模拟次数
            expectMode: false,	        // 期望值模式
            battleLog: true,	        // 输出战斗记录，开启情况下只能进行单次模拟
            partyBuff: true,            // 团队辅助buff
            partyMember: ['brd','mch','nin','drg','smn'],     // 队伍内其他职业构成
            autoAttack: false,          // 自动攻击
            pet: false                  // 宠物 (如果职业没有宠物请填写false，否则会报错)
        };

        var opener = ['站姿', '爆发药', '灾星', '祸星'];     // 占星
        // var opener = ['cleric_stance', 'presence_of_mind', 'potion', 'aero_iii', 'aero_ii']; // 白魔
        // var opener = ['potion','cleric_stance','miasma','bio_ii','energy_drain','miasma_ii','energy_drain','miasma_ii','chain_strategem','shadow_flare','miasma_ii','energy_drain','aetherflow','broil_ii','energy_drain','broil_ii','broil_ii','miasma_ii','energy_drain']; // 学者
        
        simulate.times = (simulate.battleLog === true) ? 1 : simulate.times;  // 输出战斗记录时仅进行单次模拟

        return {
            'job': job,
            'status': status,
            'simulate': simulate,
            'opener': opener
        };

    }

}