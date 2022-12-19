import {http} from '@/services/config'

export default {
    list: () => {
        return http.get('publisher')
    },

    save: (publisher) => {
        return http.post('publisher', publisher) 
    },

    delete: (id, publisher) => {
        return http.delete('publisher/' + id, publisher)
    },

    edit: (id, publisher) => {
        return http.put('publisher/' + id, publisher)
    }
}