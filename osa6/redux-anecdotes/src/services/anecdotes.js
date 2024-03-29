import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { 
    content,
    votes: 0,
    id: getId()
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const giveVote = async (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, giveVote }