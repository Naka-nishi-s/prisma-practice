import axios from 'axios';
import { useState } from 'react';
import './App.css';

type User = {
  id: number,
  name: string,
  email: string
}

function App() {

  const [users, setUsers] = useState<User[]>([]);

  /** Userデータを取得 */
  const readUserData = () => {
    axios.get("http://localhost:3001/users")
      .then(res => setUsers(res.data))
      .catch(e => console.error(e))
  }

  // 登録するデータ
  const data = {
    name: "Tana",
    email: "sample@gmail.com",
  }

  /** Userデータを作成 */
  const createUserData = () => {
    axios.post("http://localhost:3001/users", data)
      .then(res => alert("データ作成完了しました!"))
      .catch(e => console.error(e))
  }

  // 更新するユーザー
  const userNum = 3;

  /** Userデータを更新 */
  const updateUserData = () => {
    axios.put(`http://localhost:3001/users/${userNum}`, data)
      .then(res => alert("データ更新完了しました!"))
      .catch(e => console.error(e))
  }

  /** Userデータを削除 */
  const deleteUserData = () => {
    axios.delete(`http://localhost:3001/users/${userNum}`)
      .then(res => alert("データ削除完了しました!"))
      .catch(e => console.error(e))
  }

  return (
    <div>
      <h1>Sample Page</h1>
      <button onClick={readUserData} >データ取得</button>
      <button onClick={createUserData} >データ作成</button>
      <button onClick={updateUserData} >データ更新</button>
      <button onClick={deleteUserData} >データ削除</button>

      <div>
        <h2>データ表示</h2>
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>名前</th>
              <th>メール</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
