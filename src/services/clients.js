import {http} from '@/services/config'

export default {
    list: () => {
        return http.get('client')
    },

    save: (client) => {
        return http.post('client', client)
    },

    update: (id, client) => {
        return http.put('client/' + id, client)
    },

    delete: (id, client) => {
        return http.delete('client/' + id, client)
    }


}