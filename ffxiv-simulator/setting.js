module.exports = {

    set: function () {

        var job = 'ast';		        // 职业

        var status = {
            'wd': 135,			        // 武器性能
            'aa_delay': 3.2,            // 武器自动攻击间隔
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
            autoAttack: true,          // 自动攻击
            pet: false                  // 宠物 (如果职业没有宠物请填写false，否则会报错)
        };

        /* 占星 */
        var opener = ['战姿', '爆发药', '灾星', '祸星'];
        /* 白魔 */
        // var opener = ['战姿', '神速咏唱', '爆发药', '暴风', '烈风'];
        /* 学者 */
        // var opener = ['爆发药','战姿','瘴气','猛毒菌','能量吸收','瘴疠','能量吸收','瘴疠','连环计','暗影核爆','瘴疠','能量吸收','以太超流','魔炎法','能量吸收','魔炎法','魔炎法','瘴疠','能量吸收'];
        
        simulate.times = (simulate.battleLog) ? 1 : simulate.times;  // 输出战斗记录时仅进行单次模拟

        return {
            'job': job,
            'status': status,
            'simulate': simulate,
            'opener': opener
        };

    }

}