import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faTh } from '@fortawesome/free-solid-svg-icons'
import { faTimes, faTag, faTasks, faClock, faUser, faTrashAlt, faEllipsisH, faCheck, faCheckSquare, faPencil, faChevronUp, faChevronLeft, faSlidersH, faList, faPaintRoller, faPaperclip, faFileAlt, faComment, faAlignJustify, faPlus, faImagePolaroid } from '@fortawesome/pro-light-svg-icons'
library.add(faHome, faTh, faTrashAlt, faEllipsisH, faTimes, faUser, faClock, faTag, faTasks, faCheck, faCheckSquare, faPencil, faChevronUp, faChevronLeft, faSlidersH, faList, faPaintRoller, faPaperclip, faFileAlt, faComment, faAlignJustify, faPlus, faImagePolaroid)

Vue.component('font-awesome-icon', FontAwesomeIcon)