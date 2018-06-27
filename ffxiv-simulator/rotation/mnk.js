/**
 * 以下内容为循环判定，请参考文档进行修改：
 * */

module.exports = {

    'whichSkill': function (data) {

        /* 技能循环优先级逻辑 */
        if (data.player.buff.greased_lightning_iii < 0 && data.player.buff.perfect_balance >= 0) {
            return 'snap_punch';
        } else if (data.player.job.form == 'coeurl' && data.player.dot.demolish.time <= 0 && data.battle.time >= 600) {
            return 'demolish';
        } else if (data.player.buff.perfect_balance >= 0 && data.player.buff.twin_snakes > 1000 && data.player.debuff.resistance > 800 && data.player.dot.demolish.time <= 1000 && data.battle.time >= 600) {
            return 'demolish';
        } else if (data.player.job.form == 'coeurl' && data.player.dot.demolish.time <= 600 && data.player.buff.riddle_of_fire >= 800) {
            return 'demolish';
        } else if (data.player.job.form == 'coeurl' || (data.player.buff.perfect_balance >= 0 && data.player.buff.twin_snakes > 1000 && data.player.debuff.resistance > 1000 && data.player.dot.demolish > 500)) {
            return 'snap_punch';
        } else if ((data.player.job.form == 'raptor' && data.player.buff.twin_snakes <= 500) || (data.player.buff.perfect_balance >= 0 && data.player.buff.twin_snakes <= 600 && data.player.debuff.resistance >= 1000)) {
            return 'twin_snakes';
        } else if (data.player.job.form == 'raptor') {
            return 'true_strike';
        } else if ((data.player.job.form == 'opo_opo' && data.player.debuff.resistance <= 500) || (data.player.buff.perfect_balance >= 0 && data.player.debuff.resistance <= 600)) {
            return 'dragon_kick';
        } else {
            return 'bootshine';
        }

    },

    'whichAbility': function (data) {

        /* 能力技循环优先级逻辑 */
        if (data.player.cd.potion <= 0) {
            return 'potion';
        } else if (data.player.buff.greased_lightning_i >= 0 && data.player.buff.fists_of_wind < 0 && data.player.cd.shoulder_tackle <= 200) {
            return 'fists_of_wind';
        } else if (data.player.buff.fists_of_fire < 0 && data.player.cd.shoulder_tackle > 1000 && data.player.buff.riddle_of_wind < 0) {
            return 'fists_of_fire';
        } else if (data.player.buff.greased_lightning_i >= 0 && data.player.buff.fists_of_wind >= 0 && data.player.cd.shoulder_tackle <= 0) {
            return 'shoulder_tackle';
        } else if (data.player.buff.greased_lightning_i >= 0 && data.player.buff.fists_of_wind >= 0 && data.player.buff.riddle_of_wind >= 0 && data.player.cd.shoulder_tackle <= 0) {
            return 'shoulder_tackle';
        } else if (data.player.buff.riddle_of_fire >= 0 && data.player.buff.greased_lightning_i >= 0 && data.player.cd.perfect_balance <= 0 && data.player.tick.gcd <= 100) {
            return 'perfect_balance';
        } else if (data.player.job.form !== 'opo_opo' && data.player.cd.riddle_of_fire <= 0 && data.player.tick.gcd <= 100) {
            return 'riddle_of_fire';
        } else if (data.player.buff.riddle_of_fire >= 0 && data.player.buff.riddle_of_fire <= 1600 && data.player.cd.brotherhood <= 0) {
            return 'brotherhood';
        } else if (!(data.player.cd.riddle_of_fire <= 1000 || data.player.buff.riddle_of_fire >= 1800) && data.player.cd.internal_release <= 0) {
            return 'internal_release';
        } else if (data.player.job.chakra == 5 && data.player.cd.the_forbidden_chakra <= 0 && data.player.buff.greased_lightning_iii >= 0) {
            return 'the_forbidden_chakra';
        } else if (data.player.cd.elixir_field <= 0 && data.player.buff.greased_lightning_iii >= 0 && data.player.cd.riddle_of_fire >= 1000) {
            return 'elixir_field';
        } else if (data.player.cd.howling_fist <= 0 && data.player.buff.greased_lightning_iii >= 0 && data.player.cd.riddle_of_fire >= 1000) {
            return 'howling_fist';
        } else if (data.player.cd.steel_peak <= 0 && data.player.buff.greased_lightning_iii >= 0 && data.player.cd.riddle_of_fire >= 1000) {
            return 'steel_peak';
        } else if (data.player.buff.fists_of_fire >= 0 && data.player.buff.brotherhood >= 0 && data.player.cd.shoulder_tackle <= 0 && data.player.buff.riddle_of_fire >= 0) {
            return 'shoulder_tackle';
        } else if (data.player.buff.riddle_of_fire <= 500 && data.player.buff.riddle_of_fire >= 0 && data.player.job.form == 'coeurl' && data.player.cd.tornado_kick && data.player.buff.greased_lightning_iii >= 0) {
            return 'tornado_kick';
        } else if (data.player.buff.riddle_of_fire < 0 && data.player.job.form == 'coeurl' && data.player.buff.greased_lightning_iii >= 0 && data.player.cd.elixir_field >= 500 && data.player.cd.howling_fist >= 500 && data.player.cd.steel_peak >= 500 && data.player.cd.shoulder_tackle <= 250 && data.player.cd.riddle_of_fire > 1000) {
            return 'tornado_kick';
        } else if (data.player.cd.invigorate <= 0 && data.player.resource.tp <= 560) {
            return 'invigorate';
        } else {
            return 'snooze';
        }

    }
};