//SPDX-License-Identifier: MIT
pragma solidity >=0.7.3;

// コントラクト名を定義
contract TodoApp {

    uint num = 0;

    // struct型は構造体を格納するデータ型です。
    // Todoに符号なし整数型のtaskidと文字列型のtask、bool型のflagを格納しています。
    struct Todo {
        uint taskid;
        string task;
        bool flag;
    }

    // publicは内部か、メッセージ経由で呼び出し可能。publicなstate変数の場合、自動的にgetter関数が生成されます。
    Todo[] public todoList;

    // mappingを利用した配列のような処理が可能
    mapping (uint => address) public todoToOwner;
    mapping (address => uint) public ownerTodoCount;

    // ☆タスク追加の関数
    function createTodo(string memory _task) public {  
        todoList.push(Todo(num,_task,true));
        uint id = todoList.length - 1;
        todoToOwner[id] = msg.sender;
        ownerTodoCount[msg.sender]++;
        num++;
    }

    // ☆ コントラクトアドレスを用いてタスクのリストを取得する関数
    // memoryは、処理中だけ保持され、終わったら保持されない。
  	function getTodoListByOwner(address owner) external view returns(uint[] memory) {
    	uint[] memory result = new uint[](ownerTodoCount[owner]);
    	uint counter = 0;
    	for (uint i = 0; i < todoList.length; i++) {
    		if (todoToOwner[i] == owner){
    			result[counter] = i;
    			counter++;
    		}
    	}
    	return result;
	}
}
