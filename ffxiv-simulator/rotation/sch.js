/**
 * 以下内容为循环判定，请参考文档进行修改：
 * */

module.exports = {

    'whichSkill': function (data) {

        /* 技能循环优先级逻辑 */
        if (data.player.dot.bio_ii.time <= 170 && data.battle.time >= 2100) {
            return 'bio_ii';
        } else if (data.player.dot.miasma <= 170 && data.battle.time >= 2100) {
            return 'miasma';
        } else if (data.player.cd.energy_drain <= 0.67 && data.player.job.aetherflow > 0) {
            return 'miasma_ii';
        } else {
            return 'broil_ii';
        }

    },

    'whichAbility': function (data) {

        /* 能力技循环优先级逻辑 */
        if (data.player.cd.potion <= 0) {
            return 'potion';
        } else if (data.player.cd.cleric_stance <= 0) {
            return 'cleric_stance';
        } else if (data.player.cd.chain_strategem <= 0) {
            return 'chain_strategem';
        } else if (data.player.cd.aetherflow <= 0 && data.player.job.aetherflow == 0) {
            return 'aetherflow';
        } else if (data.player.cd.energy_drain <= 0 && data.player.job.aetherflow > 0) {
            return 'energy_drain';
        } else if (data.player.cd.shadow_flare <= 0) {
            return 'shadow_flare';
        } else if (data.player.cd.lucid_dreaming <= 0 && data.player.resource.mp <= data.setting.player.mp * 0.9) {
            return 'lucid_dreaming';
        } else {
            return 'snooze';
        }

    }
};