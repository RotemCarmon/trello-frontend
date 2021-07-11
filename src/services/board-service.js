import { makeId } from './util-service';
import { storageService } from './async-storage.service.js';

const KEY = 'board';

// Just for now
const currMember = {
  _id: 'u101',
  name: 'Rotem Carmon',
  email: 'tetch6@gmail.com',
  imgUrl: 'https://res.cloudinary.com/rotemc/image/upload/v1624316086/headshot_kppzkw.jpg'
}

const gMemebers = [
  {
    _id: 'u101',
    name: 'Rotem Carmon',
    email: 'tetch6@gmail.com',
    imgUrl: 'https://res.cloudinary.com/rotemc/image/upload/v1624316086/headshot_kppzkw.jpg'
  },
  {
    _id: 'u102',
    name: 'Quamika Elmer',
    email: 'YWallace@vestibulum.net',
    imgUrl: 'https://randomuser.me/api/portraits/thumb/women/44.jpg'
  },
  {
    _id: 'u103',
    name: 'Sandro Symes',
    email: 'DDayton@rutrum.org',
    imgUrl: 'https://randomuser.me/api/portraits/thumb/women/12.jpg'
  },
  {
    _id: 'u104',
    name: 'Destinee Jun',
    email: 'DHobson@odio.gov',
    imgUrl: 'https://randomuser.me/api/portraits/thumb/women/1.jpg'
  },
  {
    _id: 'u105',
    name: 'Maki Logsden',
    email: 'PYoung@sollicitudin.net',
    imgUrl: 'https://randomuser.me/api/portraits/thumb/women/23.jpg'
  },
  {
    _id: 'u106',
    name: 'Canzady Downing',
    email: 'LAlunde@porta.ly',
    imgUrl: 'https://randomuser.me/api/portraits/thumb/women/40.jpg'
  },
  {
    _id: 'u107',
    name: 'Ying Boynton',
    email: 'CHopkins@placerat.gov',
    imgUrl: 'https://randomuser.me/api/portraits/thumb/women/14.jpg'
  },
  {
    _id: 'u108',
    name: 'Allana Culaciati',
    email: 'BPoer@massa.org',
    imgUrl: 'https://randomuser.me/api/portraits/thumb/women/22.jpg'
  },
  {
    _id: 'u109',
    name: 'Sherrye Vinton',
    email: 'GBirnstill@consectetur.ly',
    imgUrl: 'https://randomuser.me/api/portraits/thumb/women/50.jpg'
  },
  {
    _id: 'u110',
    name: 'Howard Higdon',
    email: 'SSlonaker@porttitor.com',
    imgUrl: 'https://randomuser.me/api/portraits/thumb/women/99.jpg'
  },
  {
    _id: 'u111',
    name: 'Milton Clanton',
    email: 'DBelched@amet.org',
    imgUrl: 'https://randomuser.me/api/portraits/thumb/women/88.jpg'
  }
];

const gBoards = [
  {
    _id: 'b101',
    title: 'My board',
    bgc: '#87a3ff',
    imgUrl: '',
    bgType: 'bgc',
    labels: [
      { color: '#61bd4f', txt: '', isActive: true },
      { color: '#f2d600', txt: '', isActive: false },
      { color: '#ff9f1a', txt: '', isActive: true },
      { color: '#eb5a46', txt: '', isActive: false },
      { color: '#89609e', txt: '', isActive: false },
      { color: '#055a8c', txt: '', isActive: false },
    ],
    members: [
      {
        id: 'u101',
        name: 'Rotem Carmon',
        email: 'tetch6@gmail.com',
        imgUrl: 'https://res.cloudinary.com/rotemc/image/upload/v1624316086/headshot_kppzkw.jpg'
      }
    ],
    lists: [
      {
        id: 'l101',
        title: 'Todo list',
        inBoard: {
          boardId: 'b101',
          boardTitle: 'My board'
        },
        cards: [
          {
            id: 'c101',
            createdAt: Date.now(),
            labels: [2, 3],
            checkLists: [
              {
                id: makeId(),
                title: 'My list',
                todos: [
                  {
                    id: makeId(),
                    txt: 'Finish todo list',
                    isDone: false,
                    cretaedAt: Date.now()
                  },
                  {
                    id: makeId(),
                    txt: 'Clean scss from components',
                    isDone: false,
                    cretaedAt: Date.now()
                  },
                  {
                    id: makeId(),
                    txt: 'Add icons to card',
                    isDone: false,
                    cretaedAt: Date.now()
                  }
                ],
              },
              {
                id: makeId(),
                title: 'Another list',
                todos: [
                  {
                    id: makeId(),
                    txt: 'todo1',
                    isDone: false,
                    cretaedAt: Date.now()
                  },
                  {
                    id: makeId(),
                    txt: 'todo2',
                    isDone: false,
                    cretaedAt: Date.now()
                  }
                ],
              }
            ],
            inList: {
              listId: 'l101',
              listTitle: 'Todo list'
            },
            title: 'My card',
            description: 'This is the description',
            dueDate: '',
            members: []
          },
          {
            id: 'c102',
            createdAt: Date.now(),
            labels: [],
            checkLists: [],
            inList: {
              listId: 'l101',
              listTitle: 'Todo list'
            },
            title: 'My other card',
            description: 'This is the description of the second card',
            dueDate: '',
          }
        ]
      },
      {
        id: 'l102',
        title: 'In progress',
        inBoard: {
          boardId: 'b101',
          boardTitle: 'My board'
        },
        cards: [
          {
            id: 'c103',
            createdAt: Date.now(),
            labels: [],
            checkLists: [],
            inList: {
              listId: 'l102',
              listTitle: 'In progress'
            },
            title: 'In progress card',
            description: 'lorem ipsom',
            dueDate: '',

          },
          {
            id: 'c104',
            createdAt: Date.now(),
            labels: [],
            checkLists: [],
            inList: {
              listId: 'l102',
              listTitle: 'In progress'
            },
            title: 'In progress 2nd card',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque voluptas vitae nam a aliquid optio, perspiciatis laborum error dolorum',
            dueDate: new Date(),
          }
        ]
      }
    ],
    activities: [
      {
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 1624792727055,
        byMember: {
          id: 'u101',
          name: 'Rotem Carmon',
          email: 'tetch6@gmail.com',
          imgUrl: 'https://res.cloudinary.com/rotemc/image/upload/v1624316086/headshot_kppzkw.jpg'
        },
        card: {
          id: 'c101',
          title: 'My card'
        }
      }
    ]
  },
  {
    _id: 'b102',
    title: 'Second Board',
    bgc: '#4bbf6b',
    imgUrl: '',
    bgType: 'bgc',
    labels: [
      { color: '#61bd4f', txt: 'UI', isActive: true },
      { color: '#f2d600', txt: '', isActive: false },
      { color: '#ff9f1a', txt: '', isActive: false },
      { color: '#eb5a46', txt: '', isActive: true },
      { color: '#89609e', txt: '', isActive: false },
      { color: '#055a8c', txt: '', isActive: false },
    ],
    members: [],
    lists: [
      {
        id: 'l103',
        title: 'aaa',
        inBoard: {
          boardId: 'b102',
          boardTitle: 'Second Board'
        },
        cards: [
          {
            id: 'c108',
            createdAt: Date.now(),
            labels: [],
            inList: {
              listId: 'l103',
              listTitle: 'aaa'
            },
            title: 'asd',
            description: ' afdasdaf  asfds fasfadsfasdf',
            dueDate: new Date(),
          }
        ]
      }
    ],
    activities: []
  }
];

async function getBoards() {
  var boards = await storageService.query(KEY)
  if (!boards | !boards.length) {
    boards = gBoards;
    storageService.postMany(KEY, boards)
  }
  return boards;
}

async function getBoardById(boardId) {
  const board = await storageService.get(KEY, boardId)
  if (!board) {
    await getBoards()
    return await storageService.get(KEY, boardId) || null
  }
  return board
}

async function removeBoard(boardId) {
  return await storageService.remove(KEY, boardId)
}

async function addBoard() {
  const newBoard = _getEmptyBoard()
  return await storageService.post(KEY, newBoard)
}

async function updateBoard(board) {
  return await storageService.put(KEY, board)
}

function getEmptyList(listTitle = '') {
  return {
    id: 'l' + makeId(),
    title: listTitle,
    cards: [
    ]
  }
}

function createActivity({ txt, card, list, type = 'card' }) {
  return {
    id: 'a' + makeId(),
    txt,
    createdAt: Date.now(),
    byMember: currMember,
    card: (card && { id: card.id, title: card.title }),
    list: (list && { id: list.id, title: list.title }),
    type
  }
}
function createComment({ txt, cardId }) {
  return {
    id: 'cmt' + makeId(),
    txt,
    createdAt: Date.now(),
    byMember: currMember,
    cardId
  }
}

export const boardService = {
  getBoards,
  getBoardById,
  removeBoard,
  addBoard,
  updateBoard,
  getEmptyList,
  getMemebers,
  createActivity,
  createComment
}

function _getEmptyBoard() {
  return {
    title: 'New Board',
    bgc: '#ffe5e5',
    imgUrl: '',
    bgType: 'bgc',
    members: [
      { ...currMember }
    ],
    labels: [],
    activities: [],
    lists: [
      {
        id: 'l101',
        title: 'New List',
        inBoard: {
          // boardId: id,
          boardTitle: 'New Board'
        },
        cards: []
      }
    ]
  }
}

async function getMemebers() {
  return await gMemebers
}