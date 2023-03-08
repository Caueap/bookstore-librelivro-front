import {http} from '@/services/config'

export default {

    list: () => {
        return http.get('book')
    },
    
    save: (book) => {
        return http.post('book', book)
    },

    update: (id, book) => {
        return http.put('book/' + id, book)
    },

    delete: (id, book) => {
        return http.delete('book/' + id, book)
    },

    listMostRented: () => {
        return http.get('book/mostRented')
    }

}