import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faTh } from '@fortawesome/free-solid-svg-icons'
import { faTimes, faTag, faTasks, faClock, faUser, faTrashAlt, faEllipsisH, faCheck, faPencil } from '@fortawesome/pro-light-svg-icons'
library.add(faHome, faTh, faTrashAlt, faEllipsisH, faTimes, faUser, faClock, faTag, faTasks, faCheck, faPencil)

Vue.component('font-awesome-icon', FontAwesomeIcon)