import {http} from '@/services/config'

export default {
    list: () => {
        return http.get('client')
    }
}