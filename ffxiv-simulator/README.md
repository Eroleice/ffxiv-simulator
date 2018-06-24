# ffxiv-simulator

### Instructor

This is a dps simulator built with NodeJS. The program is used to simulate a single target fight and output all battle event log through a json file. The program is still working in progress.

该程序是以NodeJs搭建的FFXIV DPS模拟程序。该程序用于模拟单目标战斗并以json文件的形式生成战斗记录。

### Battle log.json

All event is record as a single element in the object. You can tell which kind of event it is through the 'event' item.

所有战斗事件均记录为单个元素，事件种类可以使用元素内的'event'值来区分。时间发生时间为'time'的值，单位是0.01秒，即'time':500代表战斗第5秒发生的事件。

* 'event': 'Cast' -> 指玩家使用'name'技能，包括了技能、能力技和物品。'duration'为0即是瞬发技能，否则'duration'代表读条时间。'resource'代表玩家剩余能源。
* 'event': 'Buff Apply' -> 指玩家获得'name'状态，仅包含来自于自身技能的buff。'duration'为buff持续时间。
* 'event': 'Party Buff Apply' -> 指玩家获得的来自队伍的'name'状态，不包含来自自身的技能效果。'duration'为buff持续时间。
* 'event': 'DOT Apply' -> 指目标获得'name'的DOT效果，'base_damage'为该DOT释放时快照存下的基础伤害，实际伤害会经过暴击、直击和伤害浮动的修正。'duration'为dot持续时间。
* 'event': 'DOT Tick' -> 指目标身上的'name'DOT产生了'damage'的伤害，'crit'为暴击判定，'dh'为直击判定,'buff'为该伤害受哪些buff的即时加成。
* 'event': 'Damage' -> 指玩家技能/能力技'name'对目标造成了'damage'的伤害，'crit'为暴击判定，'deh'为直击判定,'buff'为该伤害受哪些buff的即时加成。
