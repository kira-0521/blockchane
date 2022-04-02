import { Sema } from 'async-sema'

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000))

export async function main() {
    const items = []

    for (let i = 0; i < 20; i++) items.push(i + 1)

    // 同時に処理する数を定義
    const s = new Sema(5)
    await Promise.all(
        items.map(async (elem) => {
            // 利用可能なリソースを減らす＝＝＝＞デクリメント
            const ac = await s.acquire()
            console.log('ac: ', ac)
            console.log('elem: ' + elem, '残りの処理数：' + s.nrWaiting())
            await wait()
            // セマフォを解放＝＝＝＞インクリメント
            s.release()
        })
    )
    console.log('main done')
}

