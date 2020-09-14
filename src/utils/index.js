/**
 * 包含n个工具函数的模块
 */

// 通讯录根据昵称拼音首字母排序并分组
export const pySegSort = list => {
    if (!String.prototype.localeCompare) return null
    let letters = 'abcdefghjklmnopqrstwxyz'.split('')
    let zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('')
    let segs = []
    letters.forEach((item, i) => {
        let cur = {letter: item, data: []}
        list.forEach(item => {
            const nickname = item.nick_remark || item.nickname
            if (nickname.localeCompare(zh[i]) >= 0 && nickname.localeCompare(zh[i + 1]) < 0) {
                cur.data.push(item)
            }
        })
        if (cur.data.length) segs.push(cur)
    })
    return segs
}