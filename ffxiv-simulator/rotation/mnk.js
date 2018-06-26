/**
 * 以下内容为循环判定，请参考文档进行修改：
 * */

module.exports = {

    'whichSkill': function (data) {

        /* 技能循环优先级逻辑 */
        if (data.player.job.form == 'coeurl' && data.player.dot.demolish.time <= 0 && data.battle.time >= 600) {
            return 'demolish';
        } else if (data.player.job.form == 'coeurl') {
            return 'snap_punch';
        } else if (data.player.job.form == 'raptor' && data.player.buff.twin_snakes <= 500) {
            return 'twin_snakes';
        } else if (data.player.job.form == 'raptor') {
            return 'true_strike';
        } else if (data.player.job.form == 'opo_opo' && data.player.debuff.resistance <= 500) {
            return 'dragon_kick';
        } else {
            return 'bootshine';
        }

    },

    'whichAbility': function (data) {

        /* 能力技循环优先级逻辑 */
        if (data.player.cd.potion <= 0) {
            return 'potion';
        } else if ((data.player.job.form == 'coeurl' && data.player.buff.twin_snakes > 1000 && data.player.cd.riddle_of_fire <= 0) || (data.player.job.for == 'opo_opo' && data.player.buff.resistance > 500 && data.player.cd.riddle_of_fire <= 0)) {
            return 'riddle_of_fire';
        } else if (data.player.job.form == 'raptor' && data.player.buff.twin_snakes > 500 && data.player.cd.internal_release <= 0) {
            return 'internal_release';
        } else if (data.player.job.chakra == 5 && data.player.cd.the_forbidden_chakra <= 0) {
            return 'the_forbidden_chakra';
        } else if (data.player.cd.elixir_field <= 0) {
            return 'elixir_field';
        } else if (data.player.cd.howling_fist <= 0) {
            return 'howling_fist';
        } else if (data.player.cd.steel_peak <= 0) {
            return 'steel_peak';
        } else if (data.player.fists == 'fire' && data.player.cd.shoulder_tackle <= 0) {
            return 'shoulder_tackle';
        } else if (data.player.cd.invigorate <= 0 && data.player.resource.tp <= 560) {
            return 'invigorate';
        } else {
            return 'snooze';
        }

    }
};