import axios from 'axios'

export default {
  async getCategories() {
    return (await axios.get('https://www.wordgamedb.com/api/v1/categories')).data
  },

  async getWords(query) {
    return (await axios.get(`https://www.wordgamedb.com/api/v1/words/?category=${query}`)).data
  },

  async getHint(query) {
    return (await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)).data
  }
}
