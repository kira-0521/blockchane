async function main() {
  // const HelloWorld = await ethers.getContractFactory('HelloWorld')
  const TodoApp = await ethers.getContractFactory('TodoApp')

  // const hello_world = await HelloWorld.deploy('HelloWorld Second!')
  const todo_app = await TodoApp.deploy()
  // console.log('Hello World Contract deployed to address:', hello_world.address)
  console.log('TodoApp Contract deployed to address:', todo_app.address)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
