let p1 = Promise.resolve(3);
// ここに同期処理が挟まれているが一番上は同期的に処理される
let p2 = new Promise((resolve) => setTimeout(() => resolve('second'), 1000))
let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("third");
    }, 100);
});

export const promiseAll = () => {
    Promise.all([p1, p2, p3]).then(values => console.log(values))
}