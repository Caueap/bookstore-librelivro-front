import {http} from '@/services/config'

export default {

    list: () => {
        return http.get('rental')
    },

    save: (rental) => {
        return http.post('rental', rental)
    },

    update: (id, rental) => {
        return http.put('rental/' + id, rental)
    },

    delete: (id, rental) => {
        return http.delete('rental/' + id, rental)
    }
}