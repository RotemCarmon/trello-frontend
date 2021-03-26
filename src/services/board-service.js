import { makeId } from './util';
import { storageService } from './async-storage.service.js';

const KEY = 'board'

var gBoards = [
  {
    _id: 'b101',
    title: 'My board',
    bgc: '#87a3ff',
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
        _id: 'u101',
        name: 'Rotem Carmon',
        email: 'tetch6@gmail.com',
        imgUrl: ''
      }
    ],
    lists: [
      {
        _id: 'l101',
        title: 'Todo list',
        inBoard: {
          boardId: 'b101',
          boardTitle: 'My board'
        },
        cards: [
          {
            _id: 'c101',
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
            dueDate: new Date(),
          },
          {
            _id: 'c102',
            createdAt: Date.now(),
            labels: [],
            checkLists: [],
            inList: {
              listId: 'l101',
              listTitle: 'Todo list'
            },
            title: 'My other card',
            description: 'This is the description of the second card',
            dueDate: new Date(),
          }
        ]
      },
      {
        _id: 'l102',
        title: 'In progress',
        inBoard: {
          boardId: 'b101',
          boardTitle: 'My board'
        },
        cards: [
          {
            _id: 'c103',
            createdAt: Date.now(),
            labels: [],
            checkLists: [],
            inList: {
              listId: 'l102',
              listTitle: 'In progress'
            },
            title: 'In progress card',
            description: 'lorem ipsom',
            dueDate: new Date(),

          },
          {
            _id: 'c104',
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
    ]
  },
  {
    _id: 'b102',
    title: 'Second Board',
    labels: [
      { color: '#61bd4f', txt: 'UI', isActive: true },
      { color: '#f2d600', txt: '', isActive: false },
      { color: '#ff9f1a', txt: '', isActive: false },
      { color: '#eb5a46', txt: '', isActive: true },
      { color: '#89609e', txt: '', isActive: false },
      { color: '#055a8c', txt: '', isActive: false },
    ],
    membrers: [],
    lists: [
      {
        _id: 'l103',
        title: 'aaa',
        inBoard: {
          boardId: 'b102',
          boardTitle: 'Second Board'
        },
        cards: [
          {
            _id: 'c108',
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
    ]
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
  return await storageService.get(KEY, boardId)
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
    _id: 'l' + makeId(),
    title: listTitle,
    cards: [
    ]
  }
}

export const boardService = {
  getBoards,
  getBoardById,
  removeBoard,
  addBoard,
  updateBoard,
  getEmptyList
}

function _getEmptyBoard() {
  return {
    title: 'New Board',
    membrers: [],
    labels: [],
    lists: [
      {
        _id: 'l101',
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

// function _getNextId() {
//   const id = gBoards[gBoards.length - 1]._id
//   return id.charAt(0) + (parseInt(id.slice(1)) + 1)
// }